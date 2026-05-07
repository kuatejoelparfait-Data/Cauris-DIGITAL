'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * Objets du formulaire (Textes_Site_v1)
 * Note : 'candidature' (depuis le bouton Hero) mappe sur 'Candidature à un programme'.
 */
const SUBJECTS = [
  { value: 'candidature', label: 'Candidature à un programme' },
  { value: 'candidature-incubation', label: 'Candidature programme Incubation' },
  { value: 'candidature-acceleration', label: 'Candidature programme Accélération' },
  { value: 'partenariat-corporate', label: 'Partenariat corporate' },
  { value: 'mentorat', label: 'Demande de mentorat' },
  { value: 'presse', label: 'Presse et médias' },
  { value: 'evenement', label: 'Invitation à un événement' },
  { value: 'autre', label: 'Autre' },
];

/**
 * Pays prioritaires en haut, puis liste alphabétique courte (FR/Afrique).
 */
const COUNTRIES = [
  'Cameroun',
  'Côte d\'Ivoire',
  'Sénégal',
  'République Démocratique du Congo',
  'République du Congo',
  'Gabon',
  'Tchad',
  'Centrafrique',
  'Bénin',
  'Burkina Faso',
  'Mali',
  'Niger',
  'Togo',
  'Guinée',
  'Madagascar',
  'France',
  'Belgique',
  'Suisse',
  'Canada',
  'Maroc',
  'Tunisie',
  'Algérie',
  'Autre',
];

export default function ContactForm({ defaultSubject = '' }: { defaultSubject?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);

    // Honeypot anti-spam (CDC §6.1)
    if (formData.get('website')) {
      setStatus('success'); // Faux succès pour ne pas alerter le bot
      return;
    }

    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erreur lors de l\'envoi.');
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Une erreur est survenue.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-cauris-success/10 border border-cauris-success/30 rounded-card p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-cauris-success/20 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-cauris-success" />
        </div>
        <h3 className="font-heading font-bold text-xl text-cauris-black mb-2">
          Merci pour votre message !
        </h3>
        <p className="text-cauris-gray-text mb-2">
          Notre équipe vous répondra dans les 48h ouvrées.
        </p>
        <p className="text-sm text-cauris-gray-secondary">
          En attendant, découvrez{' '}
          <Link href="/programme-incubation" className="text-cauris-orange hover:underline">
            nos programmes
          </Link>{' '}
          ou abonnez-vous à notre newsletter pour rester informé de nos actualités.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-cauris-orange font-semibold hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* Honeypot caché */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-cauris-black mb-2">
            Prénom <span className="text-cauris-error">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className="w-full px-4 py-3 border border-gray-200 rounded-btn focus:outline-none focus:border-cauris-orange focus:ring-1 focus:ring-cauris-orange transition-colors"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-cauris-black mb-2">
            Nom <span className="text-cauris-error">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className="w-full px-4 py-3 border border-gray-200 rounded-btn focus:outline-none focus:border-cauris-orange focus:ring-1 focus:ring-cauris-orange transition-colors"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-cauris-black mb-2">
            Email <span className="text-cauris-error">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full px-4 py-3 border border-gray-200 rounded-btn focus:outline-none focus:border-cauris-orange focus:ring-1 focus:ring-cauris-orange transition-colors"
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-cauris-black mb-2">
            Pays <span className="text-cauris-error">*</span>
          </label>
          <select
            id="country"
            name="country"
            required
            autoComplete="country-name"
            defaultValue=""
            className="w-full px-4 py-3 border border-gray-200 rounded-btn focus:outline-none focus:border-cauris-orange focus:ring-1 focus:ring-cauris-orange transition-colors bg-white"
          >
            <option value="" disabled>
              Sélectionnez un pays…
            </option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-cauris-black mb-2">
          Objet <span className="text-cauris-error">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue={defaultSubject}
          className="w-full px-4 py-3 border border-gray-200 rounded-btn focus:outline-none focus:border-cauris-orange focus:ring-1 focus:ring-cauris-orange transition-colors bg-white"
        >
          <option value="">Sélectionnez un objet…</option>
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-cauris-black mb-2">
          Message <span className="text-cauris-error">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={20}
          className="w-full px-4 py-3 border border-gray-200 rounded-btn focus:outline-none focus:border-cauris-orange focus:ring-1 focus:ring-cauris-orange transition-colors resize-y"
          placeholder="Décrivez votre demande en quelques lignes…"
        />
        <p className="mt-1 text-xs text-cauris-gray-secondary">Minimum 20 caractères.</p>
      </div>

      <div className="flex items-start gap-2">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 w-4 h-4 rounded border-gray-300 text-cauris-orange focus:ring-cauris-orange"
        />
        <label htmlFor="consent" className="text-sm text-cauris-gray-secondary leading-relaxed">
          J&apos;accepte que mes données soient utilisées pour traiter ma demande, conformément à la{' '}
          <Link href="/politique-de-confidentialite" className="text-cauris-orange hover:underline">
            politique de confidentialité
          </Link>
          .
        </label>
      </div>

      {status === 'error' && (
        <div role="alert" className="flex items-start gap-2 p-4 rounded-btn bg-cauris-error/10 border border-cauris-error/30 text-cauris-error text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full sm:w-auto disabled:opacity-60"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Envoi en cours…
          </>
        ) : (
          <>
            Envoyer le message
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
