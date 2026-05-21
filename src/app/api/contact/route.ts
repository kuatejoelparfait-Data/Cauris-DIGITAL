import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { SITE_CONFIG } from '@/lib/constants';

/**
 * Endpoint de réception des messages de contact (CDC §6.1).
 *
 * Flow :
 *  1. Validation côté serveur (anti-spam, champs, email, longueur)
 *  2. Envoi de l'email via Resend (https://resend.com)
 *  3. Réponse JSON au client
 *
 * Configuration requise dans .env.local :
 *  - RESEND_API_KEY        → clé API Resend (https://resend.com/api-keys)
 *  - CONTACT_EMAIL_FROM    → email expéditeur vérifié sur Resend (ex: noreply@caurisdigital.org)
 *  - CONTACT_EMAIL_TO      → email destinataire de l'équipe (ex: hello@caurisdigital.org)
 *
 * En l'absence de RESEND_API_KEY, le message est uniquement loggé en console (mode dev fallback).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      country,
      subject,
      message,
      consent,
      website, // honeypot
      recaptchaToken,
    } = body;

    // 1. Honeypot anti-spam — si rempli, on fait croire que tout va bien sans rien faire
    if (website) {
      return NextResponse.json({ success: true });
    }

    // 2. Validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs marqués d\'une * sont obligatoires.' },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 });
    }
    if (typeof message !== 'string' || message.length < 20) {
      return NextResponse.json(
        { error: 'Votre message doit faire au moins 20 caractères.' },
        { status: 400 },
      );
    }
    if (!consent) {
      return NextResponse.json(
        { error: 'Vous devez accepter la politique de confidentialité.' },
        { status: 400 },
      );
    }

    // 2bis. Vérification reCAPTCHA v3 (CDC §6.1)
    // Skip si secret non configuré (mode dev) OU si pas de token (mode dev)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret && recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken, recaptchaSecret);
      if (!recaptchaResult.success) {
        console.warn('[contact] reCAPTCHA invalide:', recaptchaResult.errorCodes);
        return NextResponse.json(
          { error: 'Vérification anti-spam échouée. Réessayez en rafraîchissant la page.' },
          { status: 400 },
        );
      }
      if (recaptchaResult.score < 0.5) {
        console.warn(
          `[contact] reCAPTCHA score trop bas: ${recaptchaResult.score} — rejet probable bot`,
        );
        return NextResponse.json(
          { error: 'Votre soumission semble suspecte. Si vous êtes humain, contactez-nous par email directement.' },
          { status: 403 },
        );
      }
      console.log(`[contact] reCAPTCHA OK (score: ${recaptchaResult.score})`);
    } else if (recaptchaSecret && !recaptchaToken) {
      // Secret configuré côté serveur mais aucun token reçu → suspicion
      console.warn('[contact] RECAPTCHA_SECRET_KEY configurée mais aucun token reçu du client.');
    }

    // 3. Construction de l'email
    const fullName = `${firstName} ${lastName}`.trim();
    const safeMessage = String(message).slice(0, 10000); // garde-fou anti-payload trop gros
    const subjectLine = `[CAURIS] ${subject} — ${fullName}`;

    const html = `
      <!DOCTYPE html>
      <html lang="fr">
        <body style="font-family: -apple-system, system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #E8640A; margin-bottom: 8px;">Nouveau message via le formulaire de contact</h2>
          <p style="color: #6C757D; font-size: 14px; margin-top: 0;">Site CAURIS DIGITAL — ${SITE_CONFIG.url}</p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #6C757D; width: 120px;">Nom</td><td style="padding: 6px 0; font-weight: 600;">${escape(fullName)}</td></tr>
            <tr><td style="padding: 6px 0; color: #6C757D;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escape(email)}" style="color: #E8640A;">${escape(email)}</a></td></tr>
            ${country ? `<tr><td style="padding: 6px 0; color: #6C757D;">Pays</td><td style="padding: 6px 0;">${escape(country)}</td></tr>` : ''}
            <tr><td style="padding: 6px 0; color: #6C757D;">Objet</td><td style="padding: 6px 0; font-weight: 600;">${escape(subject)}</td></tr>
          </table>

          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />

          <h3 style="color: #1A1A2E; font-size: 16px;">Message :</h3>
          <div style="background: #FFF5EE; border-left: 4px solid #E8640A; padding: 16px 20px; border-radius: 6px; white-space: pre-wrap;">${escape(safeMessage)}</div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />

          <p style="color: #6C757D; font-size: 12px;">
            Cet email a été envoyé automatiquement depuis le site CAURIS DIGITAL.<br />
            Pour répondre, utilisez directement l'adresse : <a href="mailto:${escape(email)}" style="color: #E8640A;">${escape(email)}</a>
          </p>
        </body>
      </html>
    `;

    const text = `Nouveau message via le formulaire de contact CAURIS DIGITAL\n\n` +
      `Nom : ${fullName}\n` +
      `Email : ${email}\n` +
      `${country ? `Pays : ${country}\n` : ''}` +
      `Objet : ${subject}\n\n` +
      `Message :\n${safeMessage}\n\n` +
      `---\nRépondre directement à : ${email}`;

    // 4. Mode fallback dev — si pas de clé Resend, on log juste
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('[contact] RESEND_API_KEY non configurée. Mode log uniquement.');
      console.log('[contact]', { fullName, email, subject, country, message: safeMessage.slice(0, 80) + '…' });
      return NextResponse.json({
        success: true,
        message: 'Votre message a bien été reçu. Réponse dans les plus brefs délais.',
        dev: true,
      });
    }

    // 5. Envoi via Resend
    const resend = new Resend(apiKey);
    const from = process.env.CONTACT_EMAIL_FROM ?? 'CAURIS DIGITAL <onboarding@resend.dev>';
    const to = process.env.CONTACT_EMAIL_TO ?? SITE_CONFIG.email;

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: subjectLine,
      html,
      text,
    });

    if (error) {
      console.error('[contact] Erreur Resend:', error);
      return NextResponse.json(
        { error: 'Impossible d\'envoyer le message pour le moment. Réessayez plus tard.' },
        { status: 500 },
      );
    }

    console.log('[contact] Message envoyé ✓', data?.id);

    return NextResponse.json({
      success: true,
      message: 'Votre message a bien été reçu. Réponse dans les plus brefs délais.',
    });
  } catch (error) {
    console.error('[contact] Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur. Réessayez plus tard.' }, { status: 500 });
  }
}

/**
 * Échappe les caractères HTML dangereux dans le contenu utilisateur
 * (XSS protection basique pour les emails HTML).
 */
function escape(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface RecaptchaResult {
  success: boolean;
  score: number;
  action?: string;
  errorCodes?: string[];
}

/**
 * Vérifie un token reCAPTCHA v3 auprès des serveurs Google.
 * Documentation : https://developers.google.com/recaptcha/docs/v3
 */
async function verifyRecaptcha(token: string, secret: string): Promise<RecaptchaResult> {
  try {
    const params = new URLSearchParams({ secret, response: token });
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!res.ok) {
      console.error('[recaptcha] HTTP non-OK:', res.status);
      return { success: false, score: 0, errorCodes: ['http-error'] };
    }

    const data = (await res.json()) as {
      success: boolean;
      score?: number;
      action?: string;
      'error-codes'?: string[];
    };

    return {
      success: data.success === true,
      score: typeof data.score === 'number' ? data.score : 0,
      action: data.action,
      errorCodes: data['error-codes'],
    };
  } catch (err) {
    console.error('[recaptcha] Erreur réseau:', err);
    return { success: false, score: 0, errorCodes: ['network-error'] };
  }
}
