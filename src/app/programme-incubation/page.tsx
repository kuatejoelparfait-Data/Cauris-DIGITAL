import type { Metadata } from 'next';
import { ArrowRight, Check, Calendar, Users, Trophy, Briefcase, Lightbulb, Network } from 'lucide-react';
import Button from '@/components/ui/Button';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import FinalCTA from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'Programme Incubation — 6 mois pour propulser votre startup',
  description:
    'Programme d\'incubation phare de CAURIS DIGITAL. 6 mois d\'accompagnement intensif, mentorat, espace de travail et accès au réseau. Gratuit pour les startups sélectionnées.',
};

const RESOURCES = [
  { icon: Briefcase, title: 'Espace de coworking', description: 'Bureau dédié dans nos locaux à Douala, accès 7j/7 et infrastructure tech complète.' },
  { icon: Users, title: 'Mentorat hebdomadaire', description: 'Une session 1:1 par semaine avec un mentor sectoriel et bi-mensuel avec un mentor business.' },
  { icon: Network, title: 'Réseau de partenaires', description: 'Accès direct à nos investisseurs, corporates partenaires et alumni.' },
  { icon: Lightbulb, title: 'Ateliers expert·es', description: 'Plus de 40 ateliers techniques et business sur les 6 mois (UX, growth, fundraising, juridique).' },
  { icon: Trophy, title: 'Demo Day final', description: 'Présentation à un jury de 50+ investisseurs et corporates en clôture du programme.' },
  { icon: Calendar, title: 'Suivi post-programme', description: '6 mois de suivi alumni inclus, accès à vie à la communauté CAURIS.' },
];

const WEEK = [
  { day: 'Lundi', activity: 'Stand-up équipe + objectif de la semaine', time: '9h00 — 10h00' },
  { day: 'Mardi', activity: 'Atelier sectoriel ou technique', time: '14h00 — 17h00' },
  { day: 'Mercredi', activity: 'Mentorat 1:1 (slot personnalisé)', time: '60 min' },
  { day: 'Jeudi', activity: 'Workshop business / fundraising', time: '14h00 — 16h00' },
  { day: 'Vendredi', activity: 'Demo Friday — pitch interne et feedback', time: '15h00 — 17h00' },
];

const ELIGIBILITY = [
  'Projet tech (digital, hardware, deeptech) en phase d\'idéation ou de prototypage',
  'Équipe d\'au moins 2 co-fondateurs résidant en Afrique francophone',
  'Marché cible : Afrique (CEMAC en priorité, autres zones acceptées)',
  'Engagement temps plein des fondateurs sur les 6 mois du programme',
  'Volonté de constituer une société commerciale en sortie de programme',
];

const TESTIMONIALS = [
  {
    name: 'Fatou S.',
    role: 'Fondatrice EduConnect',
    quote: 'En 6 mois, notre MVP est devenu une plateforme avec 5000 utilisateurs actifs. Le réseau CAURIS a fait toute la différence.',
  },
  {
    name: 'Kwame N.',
    role: 'CEO PayMobile',
    quote: 'Le mentorat sectoriel sur la fintech mobile money en Afrique centrale est inégalé. Nous avons levé notre première Série A à la sortie.',
  },
];

export default function IncubationProgramPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-cauris-cream/40 relative overflow-hidden">
        <div className="container-cauris relative">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-cauris-orange">
                Programme phare CAURIS DIGITAL
              </p>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-cauris-black mb-6">
                6 mois pour transformer votre idée en startup viable.
              </h1>
              <p className="text-lg text-cauris-gray-text leading-relaxed mb-8">
                Le programme Incubation accompagne des fondateurs en phase d&apos;idéation et de
                prototypage avec un dispositif intensif : mentorat, espace de travail, accès au
                réseau d&apos;investisseurs et de corporates. <strong className="text-cauris-black">100% gratuit</strong> pour les startups sélectionnées.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button href="#candidater" size="lg">
                  Déposer ma candidature
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button href="#programme" variant="tertiary">
                  En savoir plus
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-cauris-gray-secondary">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cauris-orange" />
                  Durée : 6 mois
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cauris-orange" />
                  Promotions de 12 startups max.
                </span>
                <span className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-cauris-orange" />
                  Bourse de démarrage incluse
                </span>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="aspect-[4/5] rounded-card overflow-hidden shadow-card-hover">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
                  alt="Session de pitch durant le programme d'incubation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que vous obtenez */}
      <section id="programme" className="section">
        <div className="container-cauris">
          <SectionTitle
            eyebrow="Ce que vous obtenez"
            title="Un dispositif complet pour faire décoller votre projet"
            description="Tout ce dont une startup en phase précoce a besoin, réuni dans un seul programme."
          />

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES.map((r, i) => (
              <Reveal key={r.title} delay={i * 60}>
                <div className="card p-7 h-full border border-gray-100">
                  <div className="w-12 h-12 rounded-lg bg-cauris-orange/10 text-cauris-orange flex items-center justify-center mb-4">
                    <r.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-cauris-black mb-2">
                    {r.title}
                  </h3>
                  <p className="text-sm text-cauris-gray-text leading-relaxed">{r.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Calendrier type */}
      <section className="section bg-cauris-gray-bg">
        <div className="container-cauris">
          <SectionTitle
            eyebrow="Une semaine type"
            title="L'intensité d'un programme structuré"
            description="Une cadence pensée pour avancer vite sans s'épuiser."
          />

          <div className="mt-14 max-w-4xl mx-auto">
            <div className="bg-white rounded-card overflow-hidden shadow-card border border-gray-100">
              {WEEK.map((day, i) => (
                <div
                  key={day.day}
                  className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-5 ${
                    i !== WEEK.length - 1 ? 'border-b border-gray-100' : ''
                  } hover:bg-cauris-cream/30 transition-colors`}
                >
                  <div className="sm:w-28 shrink-0">
                    <span className="font-heading font-bold text-cauris-orange uppercase tracking-wider text-sm">
                      {day.day}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-cauris-black">{day.activity}</p>
                  </div>
                  <div className="text-sm text-cauris-gray-secondary sm:text-right">{day.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Critères d'éligibilité */}
      <section className="section">
        <div className="container-cauris">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Reveal>
              <SectionTitle
                eyebrow="Critères d'éligibilité"
                title="Êtes-vous au bon endroit ?"
                align="left"
              />
              <p className="mt-6 text-cauris-gray-text leading-relaxed">
                Notre processus de sélection est rigoureux. Nous cherchons des fondateurs ambitieux
                portant des projets à fort potentiel d&apos;impact sur le continent. Voici les critères
                principaux :
              </p>
              <ul className="mt-6 space-y-3">
                {ELIGIBILITY.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-cauris-success/15 text-cauris-success flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="text-cauris-gray-text">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={150}>
              <div className="bg-cauris-black text-white rounded-card p-8 lg:p-10">
                <h3 className="font-heading font-bold text-2xl mb-4">
                  Processus de sélection en 4 étapes
                </h3>
                <ol className="space-y-5 mt-6">
                  {[
                    { title: 'Candidature en ligne', desc: 'Formulaire détaillé + pitch deck (10 jours pour candidater).' },
                    { title: 'Entretien équipe', desc: 'Visio de 45 min avec deux membres de l\'équipe CAURIS.' },
                    { title: 'Présentation au jury', desc: 'Pitch devant un panel d\'experts et mentors (présentiel ou visio).' },
                    { title: 'Décision finale', desc: 'Annonce sous 30 jours. 12 startups retenues par promotion.' },
                  ].map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-cauris-orange flex items-center justify-center font-bold shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold">{step.title}</p>
                        <p className="text-sm text-white/70 mt-0.5">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="section bg-cauris-cream/40">
        <div className="container-cauris">
          <SectionTitle
            eyebrow="Ils l'ont vécu"
            title="Témoignages d'anciens participants"
          />
          <div className="mt-14 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <article className="card bg-white p-7 border border-gray-100 h-full">
                  <p className="text-cauris-gray-text leading-relaxed mb-5 italic">« {t.quote} »</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cauris-orange to-cauris-orange-light flex items-center justify-center text-white font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-cauris-black text-sm">{t.name}</p>
                      <p className="text-xs text-cauris-gray-secondary">{t.role}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA candidature */}
      <section id="candidater" className="section bg-white scroll-mt-24">
        <div className="container-cauris">
          <div className="max-w-2xl mx-auto text-center">
            <SectionTitle
              eyebrow="Prêt·e à candidater ?"
              title="La prochaine promotion démarre en septembre"
              description="Les candidatures sont ouvertes jusqu'au 30 juin. Ne tardez pas — chaque promotion est limitée à 12 startups."
            />
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact?objet=candidature-incubation" size="lg">
                Déposer ma candidature
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/faq" variant="secondary" size="lg">
                Questions fréquentes
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
