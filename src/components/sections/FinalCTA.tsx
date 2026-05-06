import { ArrowRight } from 'lucide-react';

/**
 * CTA final plein largeur (CDC §2.1).
 */
export default function FinalCTA() {
  return (
    <section className="relative py-20 lg:py-section-lg bg-cauris-orange overflow-hidden">
      {/* Motif décoratif */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white blur-3xl" />
      </div>
      <div className="container-cauris relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
            Votre idée mérite d&apos;être propulsée
          </h2>
          <p className="text-lg lg:text-xl text-white/90 mb-10 leading-relaxed">
            Rejoignez le programme d&apos;incubation CAURIS DIGITAL dès aujourd&apos;hui et bénéficiez
            d&apos;un accompagnement sur-mesure pour transformer votre vision en startup à impact.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-btn bg-white px-8 py-4 text-base font-semibold uppercase tracking-wide text-cauris-orange transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
          >
            Déposer ma candidature
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-6 text-sm text-white/75">
            Candidatures ouvertes jusqu&apos;au 30 juin · Réponse sous 30 jours
          </p>
        </div>
      </div>
    </section>
  );
}
