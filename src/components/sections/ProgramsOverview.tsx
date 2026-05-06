import { ArrowRight, Clock } from 'lucide-react';
import { PROGRAMS } from '@/lib/constants';
import Button from '@/components/ui/Button';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';

/**
 * Aperçu des programmes (CDC §2.1).
 */
export default function ProgramsOverview() {
  return (
    <section className="section bg-white">
      <div className="container-cauris">
        <SectionTitle
          eyebrow="Nos programmes"
          title="Deux trajectoires, un même objectif : votre succès"
          description="Que vous soyez en phase d'idéation ou prêt à passer à l'échelle, nous avons le programme qu'il vous faut."
        />

        <div className="mt-14 grid md:grid-cols-2 gap-6 lg:gap-8">
          {PROGRAMS.map((program, i) => (
            <Reveal key={program.id} delay={i * 100}>
              <article className="card group h-full p-8 lg:p-10 border border-gray-100 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="tag">
                    <Clock className="w-3 h-3 mr-1" />
                    {program.duration}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-2xl lg:text-3xl text-cauris-black mb-3">
                  {program.name}
                </h3>
                <p className="text-cauris-orange font-medium mb-4">{program.tagline}</p>
                <p className="text-cauris-gray-text leading-relaxed mb-6 flex-1">
                  {program.description}
                </p>
                <ul className="space-y-2 mb-8 text-sm text-cauris-gray-text">
                  {program.benefits.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cauris-orange shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Button href={program.href} variant="secondary" className="self-start">
                  {program.cta}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
