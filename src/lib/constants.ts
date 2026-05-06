/**
 * Constantes globales du site CAURIS DIGITAL
 * Conformes au cahier des charges v1.0 - Avril 2026
 */

export const SITE_CONFIG = {
  name: 'CAURIS DIGITAL',
  tagline: 'Incubateur numérique d\'excellence',
  description:
    'CAURIS DIGITAL stimule l\'entrepreneuriat tech et forme les entrepreneurs numériques de demain en Afrique francophone.',
  url: 'https://caurisdigital.org',
  email: 'contact@caurisdigital.org',
  phone: '+237 6 XX XX XX XX',
  address: 'Douala, Cameroun',
  founded: 2021,
  social: {
    linkedin: 'https://linkedin.com/company/cauris-digital',
    twitter: 'https://twitter.com/caurisdigital',
    youtube: 'https://youtube.com/@caurisdigital',
    facebook: 'https://facebook.com/caurisdigital',
  },
} as const;

/**
 * Navigation principale (CDC §4.1)
 */
export const MAIN_NAV = [
  {
    label: 'À propos',
    href: '/a-propos',
    submenu: [
      { label: 'Qui sommes-nous ?', href: '/a-propos#qui-sommes-nous' },
      { label: 'Notre équipe', href: '/a-propos#equipe' },
      { label: 'Conseil d\'administration', href: '/a-propos#ca' },
    ],
  },
  {
    label: 'Startups',
    href: '/startups',
    submenu: [
      { label: 'Programme Incubation', href: '/programme-incubation' },
      { label: 'Programme Accélération', href: '/programme-acceleration' },
      { label: 'Nos startups', href: '/startups' },
      { label: 'Entrepreneurs en résidence', href: '/startups#residence' },
    ],
  },
  {
    label: 'Innovation Corporative',
    href: '/innovation-corporative',
    submenu: [
      { label: 'Lab d\'innovation', href: '/innovation-corporative#lab' },
      { label: 'Partenaires', href: '/partenaires' },
      { label: 'Programmes corporatifs', href: '/innovation-corporative#programmes' },
    ],
  },
  { label: 'Événements', href: '/evenements' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'Partenaires', href: '/partenaires' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const;

/**
 * Chiffres clés (CDC §2.1)
 */
export const KEY_NUMBERS = [
  { value: 5, suffix: '+', label: 'années d\'expérience en accompagnement tech' },
  { value: 80, suffix: '+', label: 'entreprises accompagnées par an' },
  { value: 2, suffix: 'M$', label: 'en capitaux levés par nos startups' },
  { value: 300, suffix: '+', label: 'emplois créés par nos diplômés' },
  { value: 40, suffix: '+', label: 'experts, coachs et mentors en résidence' },
  { value: 10, prefix: 'TOP ', label: 'des incubateurs africains' },
] as const;

/**
 * Secteurs d'activité (CDC §2.1)
 */
export const SECTORS = [
  {
    id: 'agritech',
    title: 'Agritech & Climate Tech',
    description:
      'Innovations pour l\'agriculture durable, la sécurité alimentaire et la résilience climatique en Afrique.',
    icon: 'Sprout',
    tags: ['IoT', 'Drones', 'Satellite', 'Bio-tech', 'Climate AI'],
  },
  {
    id: 'fintech',
    title: 'Fintech & Inclusion financière',
    description:
      'Solutions financières innovantes pour démocratiser l\'accès aux services bancaires et au crédit.',
    icon: 'Banknote',
    tags: ['Mobile Money', 'Blockchain', 'Microfinance', 'Insurtech', 'API'],
  },
  {
    id: 'edtech',
    title: 'Edtech & Formation numérique',
    description:
      'Plateformes éducatives nouvelles générations, formation en ligne et upskilling pour la jeunesse africaine.',
    icon: 'GraduationCap',
    tags: ['IA', 'LMS', 'Mobile-first', 'Gamification', 'Vidéo'],
  },
] as const;

/**
 * Programmes (CDC §2.1, §3.3, §3.4)
 */
export const PROGRAMS = [
  {
    id: 'incubation',
    name: 'Programme Incubation',
    duration: '6 mois',
    tagline: 'Du prototype au product-market fit.',
    description:
      'Notre programme phare accompagne les fondateurs en phase d\'idéation et de prototypage avec un suivi intensif, du mentorat et un accès complet à notre écosystème.',
    href: '/programme-incubation',
    cta: 'En savoir plus',
    benefits: [
      'Espace de coworking dans nos locaux',
      'Mentorat hebdomadaire avec experts sectoriels',
      'Accès au réseau d\'investisseurs et corporates',
      'Bourse de démarrage (selon promotion)',
      'Ateliers techniques et business 2x/semaine',
    ],
  },
  {
    id: 'acceleration',
    name: 'Programme Accélération',
    duration: '12 semaines',
    tagline: 'Scaler votre startup à l\'échelle continentale.',
    description:
      'Programme intensif pour les startups en phase de croissance. Focus go-to-market, levée de fonds et expansion régionale.',
    href: '/programme-acceleration',
    cta: 'Explorer',
    benefits: [
      'Coaching de croissance avec serial entrepreneurs',
      'Investor readiness & pitch training',
      'Mise en relation avec VC et business angels',
      'Démo Day devant 50+ investisseurs',
      'Soutien juridique et structuration',
    ],
  },
] as const;

/**
 * Témoignages (placeholder - à remplacer par vrais témoignages via CMS)
 */
export const TESTIMONIALS = [
  {
    name: 'Aminata D.',
    startup: 'GreenFarm CI',
    quote:
      'CAURIS DIGITAL nous a permis de structurer notre offre, lever notre premier tour et entrer sur le marché ivoirien en 6 mois. L\'écosystème est exceptionnel.',
  },
  {
    name: 'Kwame N.',
    startup: 'PayMobile CM',
    quote:
      'Le mentorat de qualité internationale combiné à l\'expertise du marché local — c\'est ce qui fait la différence chez CAURIS.',
  },
  {
    name: 'Fatou S.',
    startup: 'EduConnect',
    quote:
      'Sortie d\'incubation avec un MVP validé, 5000 utilisateurs actifs et un partenariat avec un ministère. Inestimable.',
  },
];

/**
 * Logos partenaires (CDC §2.1)
 */
export const PARTNERS = [
  { name: 'Union Africaine', logo: '/partners/au.svg' },
  { name: 'Banque Africaine de Développement', logo: '/partners/bad.svg' },
  { name: 'CEMAC', logo: '/partners/cemac.svg' },
  { name: 'Université de Yaoundé I', logo: '/partners/uy1.svg' },
  { name: 'Polytechnique Yaoundé', logo: '/partners/polytech.svg' },
  { name: 'Orange Digital Center', logo: '/partners/orange.svg' },
];

/**
 * Startups vedettes (placeholder)
 */
export const FEATURED_STARTUPS = [
  { name: 'GreenFarm', sector: 'Agritech', country: '🇨🇮', status: 'En incubation' as const, year: 2025 },
  { name: 'PayMobile', sector: 'Fintech', country: '🇨🇲', status: 'En incubation' as const, year: 2025 },
  { name: 'EduConnect', sector: 'Edtech', country: '🇸🇳', status: 'Diplômée' as const, year: 2024 },
  { name: 'HealthLink', sector: 'Healthtech', country: '🇨🇲', status: 'Diplômée' as const, year: 2024 },
  { name: 'AgriPredict', sector: 'Agritech', country: '🇧🇫', status: 'En incubation' as const, year: 2025 },
  { name: 'CryptoSahel', sector: 'Fintech', country: '🇲🇱', status: 'Diplômée' as const, year: 2023 },
];
