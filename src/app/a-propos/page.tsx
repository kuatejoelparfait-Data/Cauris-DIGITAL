import type { Metadata } from 'next';
import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import FinalCTA from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    'Découvrez CAURIS DIGITAL : notre histoire, notre mission, notre équipe et notre vision pour l\'innovation numérique en Afrique francophone.',
};

const TEAM = [
  {
    name: 'Jean-Pierre M.',
    role: 'CEO & Co-fondateur',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    linkedin: '#',
  },
  {
    name: 'Aïcha B.',
    role: 'COO & Co-fondatrice',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    linkedin: '#',
  },
  {
    name: 'Samuel T.',
    role: 'Directeur des programmes',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    linkedin: '#',
  },
  {
    name: 'Marie-Claire N.',
    role: 'Head of Partnerships',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    linkedin: '#',
  },
];

const BOARD = [
  { name: 'Pr. Ahmadou Diallo', institution: 'Université de Yaoundé I' },
  { name: 'Mme Christelle Kouam', institution: 'Banque Africaine de Développement' },
  { name: 'M. Boris Manga', institution: 'Orange Digital Center' },
  { name: 'Pr. Fatima El-Hassani', institution: 'Polytechnique Montréal' },
  { name: 'M. Patrick Ngono', institution: 'CEMAC – Direction Innovation' },
  { name: 'Mme Yvette Tchakounté', institution: 'Ministère de l\'Économie Numérique' },
];

const VALUES = [
  { title: 'Excellence', description: 'Standards professionnels internationaux dans tout ce que nous faisons.' },
  { title: 'Inclusion', description: 'Accessibilité pour tous les profils de fondateurs, sans discrimination.' },
  { title: 'Impact', description: 'Mesure concrète des résultats sur les communautés et l\'économie.' },
  { title: 'Collaboration', description: 'Co-construction entre startups, experts et partenaires.' },
  { title: 'Enracinement', description: 'Solutions adaptées aux contextes africains, par et pour les Africains.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-cauris-cream/40">
        <div className="container-cauris">
          <div className="max-w-3xl">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-cauris-orange">
              À propos de CAURIS DIGITAL
            </p>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-cauris-black mb-6">
              L&apos;Afrique numérique se construit ici.
            </h1>
            <p className="text-lg text-cauris-gray-text leading-relaxed">
              Depuis 2021, CAURIS DIGITAL accompagne les fondateurs les plus ambitieux du continent
              pour faire émerger une nouvelle génération de champions tech africains.
            </p>
          </div>
        </div>
      </section>

      {/* Qui sommes-nous */}
      <section id="qui-sommes-nous" className="section">
        <div className="container-cauris">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <Reveal>
                <SectionTitle
                  eyebrow="Qui sommes-nous"
                  title="Une ambition continentale, des racines locales"
                  align="left"
                />
                <div className="mt-8 space-y-5 text-cauris-gray-text leading-relaxed">
                  <p>
                    CAURIS DIGITAL est né en 2021 à Douala d&apos;une conviction simple : l&apos;Afrique
                    francophone dispose d&apos;un vivier de talents tech extraordinaire, mais manque
                    d&apos;infrastructures d&apos;accompagnement à la hauteur de ses ambitions. Inspirés
                    du modèle Centech (Montréal) — incubateur universitaire de référence mondiale —
                    nous avons construit un dispositif pensé pour les réalités du continent : durée
                    de programme adaptée, mentors locaux et internationaux, accès à un réseau de
                    partenaires actifs au Cameroun, dans la zone CEMAC et au-delà.
                  </p>
                  <p>
                    Notre nom — Cauris — fait référence au coquillage utilisé comme monnaie d&apos;échange
                    en Afrique précoloniale. Symbole de richesse, de circulation et de connexion. Trois
                    valeurs qui structurent notre approche : l&apos;innovation comme richesse à créer,
                    le réseau comme circulation à animer, l&apos;écosystème comme connexion à tisser
                    entre l&apos;Afrique et le reste du monde.
                  </p>
                  <p>
                    Aujourd&apos;hui, CAURIS DIGITAL c&apos;est plus de 80 startups accompagnées par an,
                    300+ emplois créés, 2M$ de capitaux levés par nos diplômés, et un classement
                    parmi les 10 meilleurs incubateurs africains.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150} className="lg:col-span-2">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-card overflow-hidden shadow-card-hover">
                  <img
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80"
                    alt="Équipe CAURIS DIGITAL en réunion"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="bg-cauris-black text-white p-6 rounded-card">
                  <p className="text-sm font-semibold uppercase tracking-wider text-cauris-orange mb-2">
                    Notre mission
                  </p>
                  <p className="text-base leading-relaxed">
                    Stimuler l&apos;entrepreneuriat numérique en Afrique francophone en formant,
                    incubant et connectant les entrepreneurs tech de demain — de la conceptualisation
                    jusqu&apos;à la commercialisation de leur produit.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="section bg-cauris-gray-bg">
        <div className="container-cauris">
          <SectionTitle
            eyebrow="Nos valeurs fondatrices"
            title="Cinq principes qui guident chaque décision"
          />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 80}>
                <div className="card bg-white p-6 h-full border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-cauris-orange/10 text-cauris-orange flex items-center justify-center font-heading font-bold mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-cauris-black mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-cauris-gray-secondary leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section id="equipe" className="section bg-white">
        <div className="container-cauris">
          <SectionTitle
            eyebrow="Notre équipe"
            title="Les femmes et hommes derrière CAURIS DIGITAL"
            description="Une équipe pluridisciplinaire qui combine expertise tech, expérience entrepreneuriale et ancrage continental."
          />

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 80}>
                <article className="group">
                  <div className="aspect-square rounded-card overflow-hidden mb-4 shadow-card group-hover:shadow-card-hover transition-shadow">
                    <img
                      src={member.photo}
                      alt={`Portrait de ${member.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-cauris-black">
                    {member.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-cauris-gray-secondary">{member.role}</p>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cauris-gray-secondary hover:text-cauris-orange transition-colors"
                      aria-label={`LinkedIn de ${member.name}`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Conseil d'administration */}
      <section id="ca" className="section bg-cauris-cream/40">
        <div className="container-cauris">
          <SectionTitle
            eyebrow="Gouvernance"
            title="Notre Conseil d'Administration"
            description="Un conseil composé d'institutions de référence garantissant la qualité et l'impartialité de notre démarche."
          />

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BOARD.map((member, i) => (
              <Reveal key={member.name} delay={i * 60}>
                <div className="bg-white rounded-card p-5 border border-gray-100 hover:border-cauris-orange/30 transition-colors">
                  <p className="font-semibold text-cauris-black">{member.name}</p>
                  <p className="text-sm text-cauris-gray-secondary mt-0.5">{member.institution}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
