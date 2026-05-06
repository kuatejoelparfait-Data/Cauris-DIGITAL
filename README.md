# CAURIS DIGITAL — Site web institutionnel

Site web officiel de **CAURIS DIGITAL**, incubateur numérique d'excellence dédié à l'accompagnement des startups technologiques en Afrique francophone.

## Stack technique

- **Framework** : [Next.js 14](https://nextjs.org/) (App Router)
- **Langage** : TypeScript (strict)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Polices** : Inter + Montserrat (Google Fonts)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **CMS** _(à venir Phase 2)_ : [Sanity.io](https://www.sanity.io/) (headless)
- **Déploiement cible** : [Vercel](https://vercel.com/)

## Structure du projet

```
cauris-digital/
├── src/
│   ├── app/                    # Pages (App Router)
│   │   ├── api/                # Routes API (contact, newsletter)
│   │   ├── a-propos/
│   │   ├── programme-incubation/
│   │   ├── contact/
│   │   ├── layout.tsx          # Layout racine
│   │   ├── page.tsx            # Page d'accueil
│   │   ├── globals.css         # Styles globaux + Tailwind
│   │   ├── sitemap.ts          # Sitemap XML auto
│   │   ├── robots.ts           # robots.txt
│   │   └── not-found.tsx       # Page 404
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── sections/           # Sections de page
│   │   ├── forms/              # Contact, Newsletter
│   │   └── ui/                 # Composants UI (Button, etc.)
│   └── lib/
│       ├── constants.ts        # Constantes globales (nav, partenaires…)
│       └── utils.ts            # Helpers (cn pour Tailwind)
├── public/                     # Assets statiques
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

## Démarrage rapide

### 1. Installation

```bash
npm install
```

### 2. Variables d'environnement

```bash
cp .env.example .env.local
# Éditer .env.local avec vos clés (SMTP, Sanity, etc.)
```

### 3. Lancement en développement

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

### 4. Build de production

```bash
npm run build
npm run start
```

## Pages disponibles (V1 — MVP)

- `/` — Accueil (Hero, partenaires, programmes, secteurs, startups, témoignages, CTA)
- `/a-propos` — Qui sommes-nous, équipe, conseil d'administration
- `/programme-incubation` — Programme d'incubation 6 mois
- `/contact` — Formulaire + coordonnées + carte

### Pages prévues en V1.5 / V2

- `/startups` — Portefeuille avec filtres
- `/programme-acceleration` — Programme accélération
- `/innovation-corporative` — Lab d'innovation
- `/evenements`, `/actualites`, `/partenaires`, `/faq`

## Charte graphique

| Usage | Couleur | HEX |
|---|---|---|
| Principal | Orange CAURIS | `#E8640A` |
| Secondaire | Noir profond | `#1A1A2E` |
| Fond clair | Blanc cassé | `#FFF5EE` |
| Texte | Gris foncé | `#333333` |

Polices : **Montserrat** (titres) + **Inter** (corps de texte).

## Conformité au cahier des charges

Le site respecte le **Cahier des charges v1.0 — Avril 2026** sur les axes suivants :

- ✅ Charte graphique (couleurs, typographies, boutons, ombres)
- ✅ Architecture des pages (4 pages MVP)
- ✅ Header sticky avec smart navbar (CDC §4.1)
- ✅ Footer 4 colonnes (CDC §4.3)
- ✅ Hero, chiffres clés animés, programmes, secteurs (CDC §2.1)
- ✅ Formulaire contact avec validation + honeypot (CDC §6.1)
- ✅ Newsletter (CDC §6.5)
- ✅ SEO : metadata, sitemap, robots.txt, Open Graph (CDC §7.1)
- ✅ Accessibilité WCAG 2.1 AA : skip link, focus visible, ARIA, contrastes (CDC §7.3)
- ✅ Performance : `next/image`, font-display swap, lazy loading (CDC §7.2)

## Déploiement sur Vercel

```bash
npm i -g vercel
vercel
```

Ou via l'interface : connectez le repo GitHub à votre compte Vercel.

## Licence

© 2026 CAURIS DIGITAL — Tous droits réservés.
