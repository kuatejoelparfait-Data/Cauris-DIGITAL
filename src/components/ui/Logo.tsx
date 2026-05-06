import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  /** Variante d'affichage : sombre = sur fond clair, claire = sur fond sombre */
  variant?: 'dark' | 'light';
  /** Affiche le wordmark à côté du symbole */
  showWordmark?: boolean;
  /** Taille du symbole en pixels (carré) */
  size?: number;
  /** Désactive le lien vers / (pour les contextes hors navigation) */
  asLink?: boolean;
  className?: string;
}

/**
 * Logo officiel CAURIS DIGITAL.
 * Utilise l'image fournie (cauri stylisé sur fond noir).
 */
export default function Logo({
  variant = 'dark',
  showWordmark = true,
  size = 40,
  asLink = true,
  className,
}: LogoProps) {
  const content = (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 font-heading font-extrabold transition-colors',
        variant === 'dark' ? 'text-cauris-black hover:text-cauris-orange' : 'text-white',
        className,
      )}
    >
      <span
        className="relative shrink-0 rounded-lg overflow-hidden bg-cauris-black ring-1 ring-cauris-black/10"
        style={{ width: size, height: size }}
      >
        <Image
          src="/brand/cauris-logo.jpg"
          alt="Logo CAURIS DIGITAL"
          fill
          sizes={`${size}px`}
          className="object-cover"
          priority
        />
      </span>
      {showWordmark && (
        <span className="text-lg sm:text-xl tracking-tight">
          CAURIS<span className="text-cauris-orange">.</span>DIGITAL
        </span>
      )}
    </span>
  );

  if (!asLink) return content;

  return (
    <Link href="/" aria-label="CAURIS DIGITAL — Accueil" className="inline-flex">
      {content}
    </Link>
  );
}
