'use client';

import { useState, type FormEvent } from 'react';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const SUBJECTS = [
  { value: 'general', label: 'Question générale' },
  { value: 'candidature-incubation', label: 'Candidature programme Incubation' },
  { value: 'candidature-acceleration', label: 'Candidature programme Accélération' },
  { value: 'partenariat', label: 'Partenariat institutionnel' },
  { value: 'corporate', label: 'Partenariat corporate / Innovation' },
  { value: 'presse', label: 'Demande presse / médias' },
  { value: 'autre', label: 'Autre' },
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
          Message envoyé avec succès
        </h3>
        <p className="text-cauris-gray-text">
          Merci pour votre message. Notre équipe vous répondra dans les 48 heures ouvrées.
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
          <a href="/confidentialite" className="text-cauris-orange hover:underline">
            politique de confidentialité
          </a>
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
