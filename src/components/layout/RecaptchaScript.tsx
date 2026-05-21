'use client';

import Script from 'next/script';

/**
 * Charge le SDK Google reCAPTCHA v3 de manière différée (lazyOnload).
 *
 * Utilisation : à inclure une fois dans le layout (la balise badge est masquée
 * via CSS global, voir globals.css).
 *
 * Note : si NEXT_PUBLIC_RECAPTCHA_SITE_KEY n'est pas configurée, le composant
 * ne fait rien (rendu null) — utile en dev local sans config Google.
 */
export default function RecaptchaScript() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) return null;

  return (
    <Script
      src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
      strategy="lazyOnload"
    />
  );
}
