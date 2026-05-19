import Image from 'next/image';
import { HOMEPAGE_PARTNERS } from '@/lib/constants';

/**
 * Bande de logos partenaires (CDC §2.1).
 * Défilement marquee automatique. Logos en niveaux de gris au repos, couleur au hover.
 */
export default function PartnerStrip() {
  // On double la liste pour la marquee continue (boucle infinie sans saut)
  const logos = [...HOMEPAGE_PARTNERS, ...HOMEPAGE_PARTNERS];

  return (
    <section
      className="py-10 lg:py-12 bg-white border-y border-gray-100"
      aria-label="Nos partenaires"
    >
      <div className="container-cauris mb-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-cauris-gray-secondary">
          Ils nous font confiance
        </p>
      </div>
      <div className="mask-fade-x overflow-hidden">
        <div className="flex items-center gap-12 lg:gap-16 animate-marquee min-w-max">
          {logos.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="relative flex items-center justify-center min-w-[140px] h-14 lg:h-16 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all"
              title={partner.name}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={140}
                height={64}
                className="max-h-full max-w-[140px] object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
