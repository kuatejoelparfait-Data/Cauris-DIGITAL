import { NextResponse } from 'next/server';

/**
 * Endpoint d'inscription newsletter (CDC §6.5).
 * À connecter à Mailchimp ou Brevo en phase 2 via NEWSLETTER_API_KEY / NEWSLETTER_LIST_ID.
 * Pour le moment, log uniquement et renvoie un succès simulé.
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }

    // TODO: Intégration Mailchimp / Brevo en phase 2
    // const apiKey = process.env.NEWSLETTER_API_KEY;
    // const listId = process.env.NEWSLETTER_LIST_ID;
    // if (apiKey && listId) { ... }

    console.log('[newsletter] Inscription:', email);

    return NextResponse.json({
      success: true,
      message: 'Inscription enregistrée. Confirmation envoyée par email.',
    });
  } catch (error) {
    console.error('[newsletter] Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
