import { NextResponse } from 'next/server';

/**
 * Endpoint de réception des messages de contact (CDC §6.1).
 * Validation côté serveur + log. À connecter à un service email (SMTP, Resend, SendGrid…) en phase 2.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, subject, message, consent, website } = body;

    // Honeypot anti-spam
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }
    if (typeof message !== 'string' || message.length < 20) {
      return NextResponse.json(
        { error: 'Le message doit contenir au moins 20 caractères.' },
        { status: 400 },
      );
    }
    if (!consent) {
      return NextResponse.json(
        { error: 'Vous devez accepter la politique de confidentialité.' },
        { status: 400 },
      );
    }

    // TODO Phase 2 — envoi email réel via Resend, SendGrid ou SMTP
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail({
    //   from: process.env.SMTP_FROM,
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `[CAURIS] ${subject} — ${firstName} ${lastName}`,
    //   text: message,
    //   replyTo: email,
    // });

    console.log('[contact] Nouveau message:', {
      from: `${firstName} ${lastName} <${email}>`,
      subject,
      message: message.slice(0, 80) + '…',
    });

    return NextResponse.json({
      success: true,
      message: 'Votre message a bien été reçu. Réponse sous 48h ouvrées.',
    });
  } catch (error) {
    console.error('[contact] Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
