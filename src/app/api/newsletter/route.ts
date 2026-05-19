import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { SITE_CONFIG } from '@/lib/constants';

/**
 * Endpoint d'inscription newsletter (CDC §6.5).
 *
 * Flow :
 *  1. Validation de l'email
 *  2. Ajout du contact à l'audience Resend (RESEND_AUDIENCE_ID)
 *  3. Envoi d'un email de bienvenue stylé CAURIS
 *  4. Réponse JSON
 *
 * Variables .env.local requises :
 *  - RESEND_API_KEY        → même clé que pour le formulaire de contact
 *  - RESEND_AUDIENCE_ID    → ID de l'audience Resend (créée dans le dashboard)
 *  - CONTACT_EMAIL_FROM    → adresse expéditrice vérifiée
 *
 * En l'absence de configuration, la route log uniquement (mode dev fallback).
 */
export async function POST(request: Request) {
  try {
    const { email, firstName } = await request.json();

    // 1. Validation
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 });
    }
    const cleanEmail = email.trim().toLowerCase();
    const cleanFirstName = typeof firstName === 'string' ? firstName.trim().slice(0, 80) : undefined;

    // 2. Mode fallback dev — pas de clé
    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      console.warn(
        '[newsletter] RESEND_API_KEY ou RESEND_AUDIENCE_ID non configurés. Mode log uniquement.',
      );
      console.log('[newsletter] Inscription:', cleanEmail);
      return NextResponse.json({
        success: true,
        message: 'Inscription enregistrée (mode dev).',
        dev: true,
      });
    }

    const resend = new Resend(apiKey);
    const from = process.env.CONTACT_EMAIL_FROM ?? 'CAURIS DIGITAL <onboarding@resend.dev>';

    // 3. Ajout à l'audience Resend
    const { error: contactError } = await resend.contacts.create({
      email: cleanEmail,
      firstName: cleanFirstName,
      unsubscribed: false,
      audienceId,
    });

    // Si déjà inscrit, ce n'est pas une erreur grave — on continue avec un email de bienvenue
    if (contactError) {
      const errorMessage = String(contactError.message ?? '').toLowerCase();
      const isAlreadySubscribed =
        errorMessage.includes('already') || errorMessage.includes('exist');

      if (!isAlreadySubscribed) {
        console.error('[newsletter] Erreur Resend contacts.create:', contactError);
        return NextResponse.json(
          { error: 'Impossible de vous inscrire pour le moment. Réessayez plus tard.' },
          { status: 500 },
        );
      }

      console.log('[newsletter] Email déjà inscrit:', cleanEmail);
      return NextResponse.json({
        success: true,
        message: 'Cette adresse est déjà inscrite à notre newsletter. Merci !',
      });
    }

    // 4. Envoi de l'email de bienvenue (Textes_Site_v1 §12)
    const welcomeHtml = `
      <!DOCTYPE html>
      <html lang="fr">
        <body style="font-family: -apple-system, system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 24px; background: #FFF5EE;">
          <div style="background: #1A1A2E; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">
              Bienvenue dans la communauté <span style="color: #E8640A;">CAURIS DIGITAL</span> 🌍
            </h1>
          </div>

          <div style="background: white; padding: 32px 28px; border-radius: 0 0 12px 12px;">
            <p>Bonjour${cleanFirstName ? ` <strong>${escape(cleanFirstName)}</strong>` : ''},</p>

            <p>Votre inscription est confirmée. Bienvenue dans la communauté CAURIS DIGITAL !</p>

            <p>Vous faites maintenant partie d'un réseau d'entrepreneurs, mentors et partenaires qui construisent l'Afrique numérique de demain.</p>

            <h3 style="color: #1A1A2E; margin-top: 28px; margin-bottom: 12px;">Pour commencer :</h3>

            <ul style="padding-left: 20px;">
              <li style="margin-bottom: 8px;">
                <a href="${SITE_CONFIG.url}/programme-incubation" style="color: #E8640A; text-decoration: none; font-weight: 600;">Découvrez nos programmes d'incubation et d'accélération</a>
              </li>
              <li style="margin-bottom: 8px;">
                <a href="${SITE_CONFIG.url}/startups" style="color: #E8640A; text-decoration: none; font-weight: 600;">Explorez les startups que nous accompagnons</a>
              </li>
              <li style="margin-bottom: 8px;">
                <a href="${SITE_CONFIG.url}/contact?objet=candidature" style="color: #E8640A; text-decoration: none; font-weight: 600;">Candidatez si vous avez un projet tech</a>
              </li>
            </ul>

            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="margin: 0; font-style: italic;">À très bientôt,</p>
              <p style="margin: 4px 0 0; font-weight: 600;">L'équipe CAURIS DIGITAL</p>
            </div>
          </div>

          <p style="text-align: center; color: #6C757D; font-size: 11px; margin-top: 20px;">
            Vous avez reçu cet email parce que vous vous êtes inscrit à la newsletter de CAURIS DIGITAL.<br />
            Pour vous désinscrire, contactez-nous à <a href="mailto:${SITE_CONFIG.email}" style="color: #6C757D;">${SITE_CONFIG.email}</a>.
          </p>
        </body>
      </html>
    `;

    const welcomeText = `Bienvenue dans la communauté CAURIS DIGITAL 🌍\n\n` +
      `Bonjour${cleanFirstName ? ` ${cleanFirstName}` : ''},\n\n` +
      `Votre inscription est confirmée. Bienvenue dans la communauté CAURIS DIGITAL !\n\n` +
      `Pour commencer :\n` +
      `→ Découvrez nos programmes : ${SITE_CONFIG.url}/programme-incubation\n` +
      `→ Explorez les startups : ${SITE_CONFIG.url}/startups\n` +
      `→ Candidatez : ${SITE_CONFIG.url}/contact?objet=candidature\n\n` +
      `À très bientôt,\n` +
      `L'équipe CAURIS DIGITAL`;

    const { error: emailError } = await resend.emails.send({
      from,
      to: [cleanEmail],
      subject: 'Bienvenue dans la communauté CAURIS DIGITAL 🌍',
      html: welcomeHtml,
      text: welcomeText,
    });

    if (emailError) {
      // L'inscription a réussi mais l'email de bienvenue a échoué — on log et on continue
      console.error('[newsletter] Erreur email bienvenue:', emailError);
    }

    console.log('[newsletter] Inscription réussie ✓', cleanEmail);

    return NextResponse.json({
      success: true,
      message: 'Inscription confirmée ! Vérifiez votre boîte mail.',
    });
  } catch (error) {
    console.error('[newsletter] Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur. Réessayez plus tard.' }, { status: 500 });
  }
}

/** Échappe les caractères HTML dangereux dans le contenu utilisateur (XSS protection). */
function escape(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
