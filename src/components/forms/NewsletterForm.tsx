'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erreur');
      setStatus('success');
      setMessage('Merci ! Vérifiez votre email pour confirmer votre inscription.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Une erreur est survenue.');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Adresse email
      </label>
      <div className="flex">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          autoComplete="email"
          disabled={status === 'loading'}
          className="flex-1 min-w-0 px-3 py-2.5 text-sm bg-white/10 border border-white/20 rounded-l-md text-white placeholder:text-white/50 focus:outline-none focus:border-cauris-orange focus:bg-white/15 transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 bg-cauris-orange hover:bg-cauris-orange-dark text-white rounded-r-md transition-colors disabled:opacity-60 flex items-center justify-center"
          aria-label="S'inscrire à la newsletter"
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : status === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
      {message && (
        <p
          role="status"
          className={`text-xs ${status === 'error' ? 'text-cauris-error' : 'text-cauris-success'}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
