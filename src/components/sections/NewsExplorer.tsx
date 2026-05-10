'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Search, X, User } from 'lucide-react';

type Category = 'Annonces' | 'Portraits' | 'Ressources' | 'Événements' | 'Opinions';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string; // ISO YYYY-MM-DD
  author: string;
  readingTime: number; // minutes
  image: string;
}

/**
 * Articles d'exemple — à remplacer par CMS.
 */
const ARTICLES: Article[] = [
  {
    slug: 'amina-farmtrack-portrait',
    title: 'Amina a transformé une idée en startup qui fait 50K FCFA/mois en 6 mois',
    excerpt:
      '73% des startups africaines échouent en moins d\'un an. Amina N. ne fait pas partie de ces statistiques — et voici pourquoi son parcours dans le programme Incubation peut inspirer toute une génération.',
    category: 'Portraits',
    date: '2026-04-15',
    author: 'Équipe CAURIS DIGITAL',
    readingTime: 6,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
  },
  {
    slug: 'candidatures-promo-2026',
    title: 'Les candidatures pour la Promotion 2026 du programme Incubation sont ouvertes',
    excerpt:
      'Du 1er mai au 30 juin 2026, déposez votre dossier pour rejoindre les 12 startups de notre prochaine cohorte. Mentorat, accès au réseau et Demo Day mondial.',
    category: 'Annonces',
    date: '2026-05-01',
    author: 'Équipe CAURIS DIGITAL',
    readingTime: 4,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
  },
  {
    slug: 'guide-pitch-deck-startup',
    title: 'Le guide ultime du pitch deck pour startups tech africaines',
    excerpt:
      'Structure, narratif, financials, design : tout ce que vous devez savoir pour construire un pitch deck qui convainc les investisseurs africains et internationaux. Modèle gratuit inclus.',
    category: 'Ressources',
    date: '2026-03-22',
    author: 'Équipe CAURIS DIGITAL',
    readingTime: 12,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  },
  {
    slug: 'fintech-afrique-tendances-2026',
    title: 'Fintech Afrique : les 5 tendances qui vont marquer 2026',
    excerpt:
      'Mobile money, embedded finance, crypto, scoring alternatif, banque verte : analyse des modèles qui décollent sur le continent et de ceux qui s\'essoufflent.',
    category: 'Opinions',
    date: '2026-02-10',
    author: 'Équipe CAURIS DIGITAL',
    readingTime: 9,
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80',
  },
  {
    slug: 'demo-day-2025-recap',
    title: 'Demo Day 2025 : les 12 startups qui ont marqué l\'édition',
    excerpt:
      'Retour sur la promotion 2025 du programme Incubation : 12 pitchs, 250 participants, 8 partenariats annoncés et 1,2M€ en intentions d\'investissement. Récap en vidéo et statistiques.',
    category: 'Événements',
    date: '2025-12-05',
    author: 'Équipe CAURIS DIGITAL',
    readingTime: 7,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  },
  {
    slug: 'femmes-entrepreneures-afrique',
    title: 'Femmes entrepreneures : pourquoi nous doublons leur représentation en 2026',
    excerpt:
      'L\'Afrique est le continent où les femmes entreprennent le plus — mais où elles peinent le plus à lever des fonds. Notre nouveau programme dédié et nos engagements concrets.',
    category: 'Annonces',
    date: '2026-03-08',
    author: 'Équipe CAURIS DIGITAL',
    readingTime: 5,
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
  },
];

const CATEGORIES: Array<'Toutes' | Category> = [
  'Toutes',
  'Annonces',
  'Portraits',
  'Ressources',
  'Événements',
  'Opinions',
];

const CATEGORY_COLORS: Record<Category, string> = {
  Annonces: 'bg-cauris-orange/10 text-cauris-orange',
  Portraits: 'bg-pink-100 text-pink-700',
  Ressources: 'bg-cauris-success/10 text-cauris-success',
  Événements: 'bg-purple-100 text-purple-700',
  Opinions: 'bg-blue-100 text-blue-700',
};

const PAGE_SIZE = 6;

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function NewsExplorer() {
  const [category, setCategory] = useState<'Toutes' | Category>('Toutes');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      if (category !== 'Toutes' && a.category !== category) return false;
      if (q && !`${a.title} ${a.excerpt}`.toLowerCase().includes(q)) return false;
      return true;
    }).sort((a, b) => b.date.localeCompare(a.date));
  }, [category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleCategoryChange = (cat: 'Toutes' | Category) => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <section className="section">
      <div className="container-cauris">
        {/* Filtres : catégories + recherche */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-cauris-orange text-white shadow-cta'
                    : 'bg-cauris-cream text-cauris-gray-text hover:bg-cauris-orange/10 hover:text-cauris-orange'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative lg:max-w-xs lg:w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cauris-gray-secondary" aria-hidden="true" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Rechercher un article…"
              className="w-full pl-10 pr-9 py-2.5 border border-gray-200 rounded-btn focus:outline-none focus:border-cauris-orange focus:ring-1 focus:ring-cauris-orange transition-colors text-sm bg-white"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cauris-gray-secondary hover:text-cauris-orange"
                aria-label="Effacer la recherche"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Articles */}
        {visible.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="font-heading font-bold text-xl text-cauris-black mb-2">
              Aucun article ne correspond à votre recherche
            </h3>
            <p className="text-cauris-gray-text">
              Essayez avec d&apos;autres mots-clés ou changez de catégorie.
            </p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {visible.map((article) => (
                <article key={article.slug} className="group flex flex-col">
                  <Link
                    href={`/actualites/${article.slug}`}
                    className="block overflow-hidden rounded-card mb-4 shadow-card group-hover:shadow-card-hover transition-shadow aspect-[16/10]"
                  >
                    <img
                      src={article.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </Link>

                  <span
                    className={`inline-flex self-start text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full mb-3 ${CATEGORY_COLORS[article.category]}`}
                  >
                    {article.category}
                  </span>

                  <h2 className="font-heading font-bold text-lg lg:text-xl text-cauris-black leading-tight mb-2 group-hover:text-cauris-orange transition-colors">
                    <Link href={`/actualites/${article.slug}`}>{article.title}</Link>
                  </h2>

                  <p className="text-sm text-cauris-gray-text leading-relaxed mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto flex items-center gap-3 text-xs text-cauris-gray-secondary">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      {formatDate(article.date)}
                    </span>
                    <span aria-hidden>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {article.readingTime} min
                    </span>
                    <span aria-hidden>·</span>
                    <span className="flex items-center gap-1 truncate">
                      <User className="w-3 h-3" aria-hidden="true" />
                      <span className="truncate">{article.author}</span>
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                aria-label="Pagination des articles"
                className="mt-14 flex items-center justify-center gap-2"
              >
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="px-4 py-2 rounded-btn border border-gray-200 text-sm font-medium text-cauris-gray-text hover:border-cauris-orange hover:text-cauris-orange disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Précédent
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    aria-current={safePage === p ? 'page' : undefined}
                    className={`w-10 h-10 rounded-btn text-sm font-semibold transition-colors ${
                      safePage === p
                        ? 'bg-cauris-orange text-white'
                        : 'border border-gray-200 text-cauris-gray-text hover:border-cauris-orange hover:text-cauris-orange'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="px-4 py-2 rounded-btn border border-gray-200 text-sm font-medium text-cauris-gray-text hover:border-cauris-orange hover:text-cauris-orange disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Suivant
                  <ArrowRight className="inline w-3.5 h-3.5 ml-1" />
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
