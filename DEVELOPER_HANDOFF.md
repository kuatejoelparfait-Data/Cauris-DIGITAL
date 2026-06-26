# CAURIS DIGITAL — Developer Handoff & Design System
> Document de référence complet pour la continuité du développement.  
> Version 1.0 — Mai 2026 | Stack : Next.js 14 · React 18 · Tailwind CSS · Lucide React

---

## TABLE DES MATIÈRES

1. [Statut du projet](#1-statut-du-projet)
2. [Design System — Couleurs](#2-design-system--couleurs)
3. [Design System — Typographie](#3-design-system--typographie)
4. [Design System — Espacement & Layout](#4-design-system--espacement--layout)
5. [Design System — Composants](#5-design-system--composants)
6. [Design System — Animations](#6-design-system--animations)
7. [Logo & Identité visuelle](#7-logo--identité-visuelle)
8. [Pages à créer](#8-pages-à-créer)
9. [Données placeholder à remplacer](#9-données-placeholder-à-remplacer)
10. [Assets manquants](#10-assets-manquants)
11. [Architecture technique](#11-architecture-technique)
12. [Checklist de lancement](#12-checklist-de-lancement)

---

## 1. STATUT DU PROJET

### Pages implémentées ✅

| Page | Route | Composants clés | Statut |
|---|---|---|---|
| Accueil | `/` | Hero, PartnerStrip, IntroBlock, KeyNumbers, ProgramsOverview, Sectors, FeaturedStartups, Testimonials, FinalCTA | ✅ Complète |
| À propos | `/a-propos` | Histoire, Mission/Vision, Valeurs (6), Équipe (4), Conseil d'admin (6), FinalCTA | ✅ Complète (données placeholder) |
| Programme Incubation | `/programme-incubation` | Hero, Présentation, Bénéfices, Phases (3), Profil, Témoignages, Processus 4 étapes, FinalCTA | ✅ Complète (données placeholder) |
| Contact | `/contact` | Formulaire (Prénom, Nom, Email, Pays, Objet, Message), Coordonnées, Carte OSM | ✅ Complète |
| 404 | `/not-found` | Page personnalisée | ✅ |

### Pages manquantes ❌ (à créer — voir §8)

| Page | Route | Priorité |
|---|---|---|
| Programme Accélération | `/programme-acceleration` | 🔴 HAUTE |
| Nos startups | `/startups` | 🔴 HAUTE |
| FAQ | `/faq` | 🔴 HAUTE |
| Innovation Corporative | `/innovation-corporative` | 🟠 MOYENNE |
| Partenaires | `/partenaires` | 🟠 MOYENNE |
| Actualités | `/actualites` | 🟠 MOYENNE |
| Événements | `/evenements` | 🟠 MOYENNE |
| Mentions légales | `/mentions-legales` | 🟡 BASSE |
| Politique de confidentialité | `/politique-de-confidentialite` | 🟡 BASSE |

---

## 2. DESIGN SYSTEM — COULEURS

### Palette principale

```
┌─────────────────────────────────────────────────────────────┐
│  CAURIS DIGITAL — Charte chromatique (CDC §5.1)            │
├──────────────────┬──────────────┬───────────────────────────┤
│  Nom             │  Hex         │  Utilisation               │
├──────────────────┼──────────────┼───────────────────────────┤
│  Orange          │  #E8640A     │  CTA, accents, liens actifs│
│  Orange foncé    │  #C9540A     │  Hover boutons orange      │
│  Orange clair    │  #F58A3D     │  Gradient, badges          │
│  Noir (Navy)     │  #1A1A2E     │  Textes, fonds sombres     │
│  Crème           │  #FFF5EE     │  Fonds sections alternées  │
│  Gris texte      │  #333333     │  Corps de texte            │
│  Gris secondaire │  #6C757D     │  Sous-titres, labels       │
│  Gris fond       │  #F5F5F5     │  Sections grises           │
│  Succès          │  #2ECC71     │  Badges "Diplômée", checks │
│  Erreur          │  #E74C3C     │  Erreurs de formulaire     │
└──────────────────┴──────────────┴───────────────────────────┘
```

### Tokens Tailwind (déjà configurés dans `tailwind.config.ts`)

```ts
// Utilisation dans les classes Tailwind :
bg-cauris-orange        // #E8640A
bg-cauris-orange-dark   // #C9540A
bg-cauris-orange-light  // #F58A3D
bg-cauris-black         // #1A1A2E
bg-cauris-cream         // #FFF5EE
text-cauris-gray-text   // #333333
text-cauris-gray-secondary // #6C757D
bg-cauris-gray-bg       // #F5F5F5
text-cauris-success     // #2ECC71
text-cauris-error       // #E74C3C
```

### Variables CSS (`globals.css`)

```css
:root {
  --color-cauris-orange: 232 100 10;   /* RGB pour opacity variable */
  --color-cauris-black:  26 26 46;
  --color-cauris-cream:  255 245 238;
}
```

### Règles d'usage couleur

| Règle | Détail |
|---|---|
| Orange = action | Tous les CTA, liens actifs, icônes interactives |
| Navy = autorité | Fonds sombres (hero, footer, blocs "bon à savoir") |
| Crème = douceur | Sections alternées, fonds "hero" des pages internes |
| Gris fond = neutre | Sections sans accroche particulière |
| Blanc = respiration | Cartes, formulaires, espaces de lecture |
| **Jamais de texte orange sur fond orange** | — |
| **Jamais de texte crème sur fond blanc** | Trop peu de contraste |

---

## 3. DESIGN SYSTEM — TYPOGRAPHIE

### Polices (Google Fonts — déjà chargées dans `layout.tsx`)

```
Heading : Montserrat — weights 400, 500, 600, 700, 800
Body    : Inter     — weights 400, 500, 600, 700
```

### Échelle typographique

```
┌──────────────┬──────────────┬──────────┬───────────┬──────────────────────────────┐
│  Niveau      │  Police      │  Taille  │  Weight   │  Classe Tailwind             │
├──────────────┼──────────────┼──────────┼───────────┼──────────────────────────────┤
│  Display XL  │  Montserrat  │  64px    │  700      │  font-heading text-display-xl│
│  Display LG  │  Montserrat  │  48px    │  700      │  font-heading text-display-lg│
│  H1          │  Montserrat  │  48px    │  700      │  font-heading text-h1        │
│  H2          │  Montserrat  │  36px    │  600      │  font-heading text-h2        │
│  H3          │  Montserrat  │  26px    │  600      │  font-heading text-h3        │
│  Body Large  │  Inter       │  18px    │  400      │  text-lg                     │
│  Body        │  Inter       │  16px    │  400      │  text-base                   │
│  Body Small  │  Inter       │  14px    │  400      │  text-sm                     │
│  Caption     │  Inter       │  12px    │  500      │  text-xs                     │
│  Eyebrow     │  Inter       │  13px    │  600 CAPS │  text-[13px] uppercase       │
│              │              │          │           │  tracking-[0.18em]           │
└──────────────┴──────────────┴──────────┴───────────┴──────────────────────────────┘
```

### Pattern "Eyebrow" (label de section)

Utilisé systématiquement au-dessus des H2 de section :

```tsx
<p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-cauris-orange">
  Libellé court
</p>
```

### Gradient texte orange

```tsx
<span className="text-gradient-orange">mot clé</span>
// Résultat : gradient from-cauris-orange to-cauris-orange-light sur le texte
```

---

## 4. DESIGN SYSTEM — ESPACEMENT & LAYOUT

### Container

```tsx
<div className="container-cauris">
  {/* mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 */}
</div>
```

### Sections

```tsx
// Section standard (py-20)
<section className="section">

// Section avec fond alterné
<section className="section bg-cauris-cream/40">
<section className="section bg-cauris-gray-bg">
<section className="section bg-white">
<section className="section bg-cauris-black text-white">

// Section plein écran (hero pages internes)
<section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-cauris-cream/40">
```

### Espacement tokens

```
section     = 80px  (py-section → py-20)
section-lg  = 120px (py-section-lg)
gap cartes  = 24px à 32px (gap-6 lg:gap-8)
padding carte = 28px à 40px (p-7 lg:p-10)
```

### Grilles standard

```tsx
// 2 colonnes (programmes, mission/vision)
<div className="grid md:grid-cols-2 gap-6 lg:gap-8">

// 3 colonnes (secteurs, valeurs, startups)
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

// 4 colonnes (équipe, étapes)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

// 5/3 colonnes (contenu + sidebar)
<div className="grid lg:grid-cols-5 gap-12">
  <div className="lg:col-span-3"> // texte principal
  <div className="lg:col-span-2"> // sidebar/image

// 2/3 + 1/3 (formulaire + sidebar)
<div className="grid lg:grid-cols-3 gap-12">
  <div className="lg:col-span-2"> // formulaire
  <div className="lg:col-span-1"> // coordonnées
```

---

## 5. DESIGN SYSTEM — COMPOSANTS

### Boutons

Trois variantes dans `globals.css` + `Button.tsx` :

```tsx
// Primaire — orange plein (CTA principal)
<Button href="..." size="lg">Texte CTA</Button>
// → bg-cauris-orange, hover: orange-dark + shadow-cta + -translate-y-0.5

// Secondaire — contour orange (action secondaire)
<Button href="..." variant="secondary">Texte</Button>
// → border-2 border-cauris-orange, hover: bg-cauris-orange text-white

// Tertiaire — lien orange souligné (action douce)
<Button href="..." variant="tertiary">Texte</Button>
// → text-cauris-orange, hover: underline

// CTA inverse (sur fond orange — FinalCTA)
<a className="inline-flex items-center gap-2 rounded-btn bg-white px-8 py-4 text-base 
              font-semibold uppercase tracking-wide text-cauris-orange
              hover:-translate-y-0.5 hover:shadow-2xl">
```

**Sizes disponibles :**  
`sm` → px-5 py-2.5 text-[13px]  
`md` (défaut) → px-7 py-3.5 text-[15px]  
`lg` → px-8 py-4 text-base  

**Règle clé :** `border-radius: 6px` (rounded-btn) — jamais plus arrondi.

---

### Cartes

```tsx
// Carte standard (hover élève légèrement)
<article className="card group p-7 lg:p-8 h-full border border-gray-100">
// → rounded-card(12px) shadow-card hover:shadow-card-hover hover:-translate-y-1

// Carte sur fond sombre
<div className="bg-cauris-black text-white rounded-card p-6 lg:p-8">

// Carte orange (vision, CTA)
<article className="card bg-cauris-orange text-white p-8 lg:p-10 h-full">

// Carte icône + texte (secteurs, valeurs)
<article className="card group p-7 bg-white border border-gray-100">
  <div className="w-14 h-14 rounded-xl bg-cauris-orange/10 group-hover:bg-cauris-orange 
                  flex items-center justify-center mb-5 transition-colors">
    <Icon className="w-7 h-7 text-cauris-orange group-hover:text-white transition-colors" />
  </div>
```

**Shadows :**
```
shadow-card       = 0 4px 16px rgba(0,0,0,0.08)
shadow-card-hover = 0 8px 24px rgba(0,0,0,0.12)
shadow-cta        = 0 6px 20px rgba(232,100,10,0.35)
```

---

### Tags / Chips

```tsx
// Tag sectoriel (fond crème, texte orange)
<span className="text-xs font-medium px-2.5 py-1 rounded-full bg-cauris-cream text-cauris-orange">
  Label
</span>

// Tag avec icône (durée, format)
<span className="tag">
  <Clock className="w-3 h-3 mr-1" />
  6 mois
</span>
// → bg-cauris-cream, px-3 py-1, text-[13px] text-cauris-orange

// Badge statut startup
// Diplômée   → bg-cauris-success/10 text-cauris-success
// En incubation → bg-cauris-orange/10 text-cauris-orange
// Alumni      → bg-cauris-black/5 text-cauris-black
```

---

### Formulaires

Référence : `src/components/forms/ContactForm.tsx`

```tsx
// Champ texte standard
<input
  className="w-full rounded-btn border border-gray-200 bg-white px-4 py-3
             text-cauris-black placeholder:text-gray-400
             focus:border-cauris-orange focus:outline-none focus:ring-2 
             focus:ring-cauris-orange/20 transition-colors"
/>

// Label
<label className="block text-sm font-medium text-cauris-black mb-1.5">
  Champ <span className="text-cauris-orange">*</span>
</label>

// Message d'erreur
<p className="mt-1 text-xs text-cauris-error">Message d'erreur</p>

// Select
<select className="w-full rounded-btn border border-gray-200 bg-white px-4 py-3
                   text-cauris-black focus:border-cauris-orange focus:outline-none
                   focus:ring-2 focus:ring-cauris-orange/20">

// Textarea
<textarea className="w-full rounded-btn border border-gray-200 bg-white px-4 py-3
                     text-cauris-black placeholder:text-gray-400 resize-none
                     focus:border-cauris-orange focus:outline-none focus:ring-2
                     focus:ring-cauris-orange/20 min-h-[140px]" />
```

---

### SectionTitle (composant réutilisable)

```tsx
// Centré (défaut)
<SectionTitle
  eyebrow="Label court"
  title="Titre de la section"
  description="Sous-titre optionnel en body text."
/>

// Aligné à gauche
<SectionTitle eyebrow="..." title="..." align="left" />
```

---

### Reveal (animation au scroll)

```tsx
<Reveal>           // fadeInUp au scroll — délai 0ms
<Reveal delay={100}>  // délai 100ms
<Reveal delay={150} className="lg:col-span-2">
```

Delays recommandés pour les grilles : `0, 80, 160, 240...` (incrément 60-100ms).

---

### Navigation header

- **Sticky** + smart hide/show au scroll (cf. `Header.tsx`)
- **Desktop** (≥ 1024px) : liens texte + sous-menus dropdown au hover
- **Mobile** (< 1024px) : hamburger → menu plein écran + accordéons
- **CTA Candidater** toujours visible (SM+ desktop, desktop)

---

## 6. DESIGN SYSTEM — ANIMATIONS

```ts
// Tokens Tailwind disponibles :
animate-fade-in       // opacity 0→1, 0.6s
animate-fade-in-up    // opacity 0→1 + translateY(20px→0), 0.7s
animate-slide-in-left // opacity 0→1 + translateX(-30px→0), 0.6s
animate-count-up      // scale 0.8→1, 2s (CountUp numbers)
animate-marquee       // translation infinie -50%, 40s (partenaires)
animate-bounce        // (scroll indicator Hero)
animate-pulse         // (dot badge candidatures)

// Easing custom
ease-cauris = cubic-bezier(0.4, 0, 0.2, 1)

// Durées standard
transition-all duration-200  // interactions UI (hover, focus)
transition-all duration-300  // cartes, menus
transition-all duration-700  // reveals au scroll
```

**Respect prefers-reduced-motion :** déjà géré dans `globals.css`, toutes les animations sont désactivées si l'utilisateur le demande.

---

## 7. LOGO & IDENTITÉ VISUELLE

### Fichier logo

```
/public/brand/cauris-logo.jpg   ← logo carré (symbole cauris stylisé sur fond noir)
```

### Utilisation du composant Logo

```tsx
import Logo from '@/components/ui/Logo';

// Header (fond clair) — défaut
<Logo size={40} />
// → texte navy, hover orange, wordmark "CAURIS.DIGITAL"

// Footer (fond sombre)
<Logo variant="light" size={44} />
// → texte blanc, wordmark blanc

// Sans lien (footer par ex.)
<Logo asLink={false} size={40} />

// Sans wordmark (mobile compact)
<Logo showWordmark={false} size={36} />
```

### Wordmark typographique

```
CAURIS·DIGITAL
  ↑ navy      ↑ orange (le point "." est orange)
Police : Montserrat ExtraBold (800)
Tracking : tracking-tight (-0.025em)
```

### Zone de protection du logo

Minimum : `= taille du symbole / 2` de marge de chaque côté.

### À ne pas faire avec le logo

- Ne pas changer les couleurs (sauf variante dark/light prévue)
- Ne pas déformer le ratio
- Ne pas placer sur fond orange ou fond crème très clair (lisibilité)
- Ne pas retirer le point orange dans le wordmark

---

## 8. PAGES À CRÉER

### 8.1 — `/programme-acceleration` 🔴 HAUTE

**Modèle :** Reproduire la structure de `/programme-incubation` en adaptant les données.

**Contenu spécifique :**
```
Hero :
  Eyebrow : "Programme CAURIS DIGITAL"
  H1 : "Programme Accélération"
  Sous-titre : "12 semaines pour franchir votre prochain palier."
  Badges : Durée: 12 semaines | Format: 100% en ligne | Accessible partout
  CTA : "Candidater" (primary) + "Découvrir le programme" (tertiary)

Présentation :
  Cible : startups déjà en traction (premiers revenus ou +500 utilisateurs)
  Gratuit ou contribution symbolique (préciser selon session)
  Pas de prise de capital

Ce que vous obtenez (depuis constants.ts → PROGRAMS[1].benefits) :
  - Audit complet de votre startup
  - Stratégie de croissance data-driven
  - Optimisation du pricing
  - Préparation pitch investisseurs
  - Demo Day ouvert aux investisseurs
  - Intégration réseau alumni

Phases (12 semaines) :
  Semaines 1-3   : Diagnostic & Priorités
  Semaines 4-7   : Exécution & Croissance
  Semaines 8-10  : Scaling & Financement
  Semaines 11-12 : Demo Day & Suite

Profil recherché :
  - Startup avec MVP validé et premiers utilisateurs/revenus
  - Équipe fondatrice d'au moins 2 personnes
  - Marché africain ou international avec potentiel de scale
  - Prêt à consacrer 10-15h/semaine au programme

Processus de candidature : identique à l'Incubation (4 étapes)

FinalCTA : standard
```

---

### 8.2 — `/startups` 🔴 HAUTE

**Structure :**

```
Hero :
  Eyebrow : "Notre portefeuille"
  H1 : "Les startups que nous propulsons"
  Sous-titre : "Des entrepreneurs qui changent l'Afrique depuis Yaoundé — et bien au-delà."

Filtres (statut + secteur) :
  Boutons radio : Toutes | En incubation | Diplômées | Alumni
  Boutons radio : Tous secteurs | Agritech | Fintech | Edtech | Healthtech | Smart Cities

Grille de startups (depuis constants.ts → FEATURED_STARTUPS) :
  → Reprendre le composant FeaturedStartups mais en pleine page
  → Grille 3 colonnes (md:2, lg:3)
  → Carte : logo initial + nom + pays + secteur + année + statut + tagline

Section "Rejoindre nos startups" :
  → Bloc CTA centré avec bouton "Candidater au programme"

FinalCTA : standard
```

**Composant carte startup :**
```tsx
// Réutiliser le pattern de FeaturedStartups.tsx
// + ajouter un lien facultatif vers la fiche startup (si disponible)
```

---

### 8.3 — `/faq` 🔴 HAUTE

**Structure :**

```
Hero :
  Eyebrow : "FAQ"
  H1 : "Questions fréquentes"
  Sous-titre : "Tout ce que vous avez besoin de savoir avant de candidater."

Accordéons par thème (depuis constants.ts → FAQ_ITEMS — 5 thèmes, 15 questions) :
  - À propos de CAURIS DIGITAL (3 questions)
  - Candidatures et sélection (5 questions)
  - Financement et coût (3 questions)
  - Mentorat et accompagnement (2 questions)
  - Partenariats corporate (2 questions)

Pattern accordéon :
  → Titre thème en h2 avec filet orange
  → Items : question en font-heading bold, réponse en body text
  → State ouvert/fermé avec icône ChevronDown rotatif
  → Transition hauteur fluide (max-height ou framer-motion si disponible)

FinalCTA : standard
```

**Exemple de composant accordéon :**
```tsx
'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="font-heading font-semibold text-cauris-black pr-4">{q}</span>
        <ChevronDown className={cn('w-5 h-5 text-cauris-orange shrink-0 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="pb-5 text-cauris-gray-text leading-relaxed">{a}</div>
      )}
    </div>
  );
}
```

---

### 8.4 — `/innovation-corporative` 🟠 MOYENNE

```
Hero :
  H1 : "Innovation Corporative"
  Sous-titre : "Intégrez l'innovation des startups africaines dans votre stratégie."

Sections :
  1. Le Lab d'innovation (id="lab")
     → Qu'est-ce que le lab, comment ça fonctionne
     → Grille 3 offres : Co-développement | Hackathons | Open Innovation

  2. Programmes corporatifs (id="programmes")
     → Offres de partenariat corporate (4 niveaux : Bronze, Silver, Gold, Platinum)
     → Tableau comparatif des avantages

  3. Partenaires actuels
     → Utiliser PARTNER_CATEGORIES depuis constants.ts

  4. CTA partenariat
     → Lien vers /contact avec ?objet=Partenariat+corporate

FinalCTA : standard
```

---

### 8.5 — `/partenaires` 🟠 MOYENNE

```
Hero :
  H1 : "Nos partenaires"
  Sous-titre : "L'écosystème qui nous permet d'aller plus loin."

Sections par catégorie (PARTNER_CATEGORIES depuis constants.ts) :
  1. Partenaires institutionnels
  2. Partenaires financiers
  3. Partenaires académiques
  4. Partenaires corporatifs

Chaque section :
  → Titre + description de la catégorie
  → Grille de logos partenaires (utiliser les vrais SVG quand disponibles)
  → Actuellement : logos textuels depuis PARTNERS (à enrichir)

CTA partenariat :
  → "Devenir partenaire" → /contact?objet=Partenariat+corporate

FinalCTA : standard
```

---

### 8.6 — `/actualites` 🟠 MOYENNE

```
Hero :
  H1 : "Actualités"
  Sous-titre : "Suivez l'actualité de CAURIS DIGITAL et de l'écosystème tech africain."

Grille articles :
  → 3 colonnes (md:2, lg:3)
  → Carte : image + catégorie (tag) + titre + date + extrait + lien "Lire la suite"
  → Pagination ou "Charger plus"

Note : Peut être alimenté via un CMS headless (Sanity, Contentful, Strapi) ou
       des fichiers MDX locaux. À définir avec l'équipe.

Sidebar (optionnel) :
  → Catégories : Événements | Startups | Programmes | Partenariats
  → Newsletter inline
```

---

### 8.7 — `/evenements` 🟠 MOYENNE

```
Hero :
  H1 : "Événements"
  Sous-titre : "Demo Days, ateliers, hackathons — restez dans la boucle."

Prochains événements :
  → Liste verticale ou grille 2 colonnes
  → Carte : date (grand format) + titre + lieu + description + bouton inscription

Événements passés :
  → Galerie condensée (3 colonnes) avec année

Note : Peut être alimenté via un CMS ou Google Calendar embed.
```

---

### 8.8 — `/mentions-legales` 🟡 BASSE

```
Structure :
  - Éditeur du site (nom association, adresse, RCCM, représentant légal)
  - Hébergeur (ex: Vercel Inc.)
  - Propriété intellectuelle
  - Responsabilité
  - Données personnelles (renvoi vers politique de confidentialité)

→ Page simple, une colonne, max-w-3xl centré, prose body text
→ Pas de composants complexes, juste du texte bien structuré
```

---

### 8.9 — `/politique-de-confidentialite` 🟡 BASSE

```
Sections (avec id pour ancres) :
  - Responsable du traitement
  - Données collectées (formulaire, cookies, analytics)
  - Finalités du traitement
  - Base légale
  - Durée de conservation
  - Droits des utilisateurs (accès, rectification, suppression)
  - Cookies (id="cookies")
  - Contact DPO

→ Même structure que mentions-légales
→ À faire valider par un juriste avant publication
```

---

## 9. DONNÉES PLACEHOLDER À REMPLACER

### Dans `src/lib/constants.ts`

```ts
// ⚠️ À remplacer avant le lancement :
phone: '+237 6 XX XX XX XX'      → Vrai numéro de téléphone
fullAddress: '[Adresse complète]' → Adresse réelle du siège
```

### Dans `src/app/a-propos/page.tsx`

```ts
// Équipe — 4 membres (TEAM array) :
name:     '[Prénom NOM]'          → Noms réels de l'équipe
role:     'Directeur Général...'  → Vérifier les titres exacts
photo:    URLs Unsplash           → Photos réelles en /public/team/
bio:      '[X] ans d'expérience'  → Bios rédigées
linkedin: '#'                     → Vraies URLs LinkedIn

// Conseil d'administration (BOARD array — 6 membres) :
name:        '[Nom du membre]'    → Noms réels
institution: '[Institution]'     → Titres et institutions réels
```

### Dans `src/app/programme-incubation/page.tsx`

```ts
// Témoignages programme (PROGRAM_TESTIMONIALS) :
name:     '[Prénom NOM]'          → Vrais noms (avec accord)
startup:  '[Nom startup]'         → Vraies startups
location: '[Pays]'                → Vrais pays
promo:    'Promo [Année]'         → Vraies années
```

### Dans `src/components/sections/Testimonials.tsx`

```ts
// Témoignages homepage (TESTIMONIALS dans constants.ts) :
→ Vérifier que Amina N., Jean-Paul M., Rodrigue K. sont réels
→ Ou les remplacer par des vrais témoignages avec accord de diffusion
```

### Carte OSM dans `/contact`

```tsx
// Coordonnées actuelles (approximatives Yaoundé) :
bbox=9.6%2C3.95%2C9.85%2C4.15&marker=4.05%2C9.7
// → Remplacer par les coordonnées GPS exactes du siège
```

---

## 10. ASSETS MANQUANTS

### Logo et brand

```
/public/brand/cauris-logo.jpg     ✅ Présent
/public/brand/cauris-logo.svg     ❌ Manquant (version vectorielle propre)
/public/brand/cauris-logo-white.svg ❌ Manquant (version blanche pour fonds sombres)
/public/og-image.jpg              ❌ Manquant (1200×630px — image Open Graph)
/public/favicon.ico               ❌ Vérifier présence
/public/apple-touch-icon.png      ❌ Manquant (180×180px)
```

### Logos partenaires (actuellement affichés en texte)

```
/public/partners/au.svg           ❌ Union Africaine
/public/partners/bad.svg          ❌ Banque Africaine de Développement
/public/partners/cemac.svg        ❌ CEMAC
/public/partners/uy1.svg          ❌ Université de Yaoundé I
/public/partners/polytech.svg     ❌ Polytechnique Yaoundé
/public/partners/orange.svg       ❌ Orange Digital Center
```

**Format requis pour les logos partenaires :**
- SVG vectoriel, couleur unique (#1A1A2E ou monochrome)
- Ratio : largeur libre, hauteur max 48px
- Pas de fond ni border

### Photos d'équipe

```
/public/team/[prenom-nom].jpg    ❌ × 4 membres (ratio 1:1, min 400×400px)
```

### Images réelles à remplacer (Unsplash actuellement)

```
Hero homepage :
  URL: https://images.unsplash.com/photo-1531482615713-2afd69097998
  → Remplacer par photo réelle de l'espace CAURIS DIGITAL ou session

IntroBlock (4 photos) :
  → Photos réelles de pitchs, mentorat, coworking, ateliers

Page À propos (1 photo) :
  URL: https://images.unsplash.com/photo-1521737711867-e3b97375f902
  → Photo réelle de l'équipe

Page Incubation (1 photo) :
  URL: https://images.unsplash.com/photo-1600880292203-757bb62b4baf
  → Photo réelle d'une session de pitch
```

---

## 11. ARCHITECTURE TECHNIQUE

### Structure des fichiers

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout racine (Header + Footer + fonts)
│   ├── globals.css              # Design tokens CSS + composants Tailwind
│   ├── page.tsx                 # Accueil
│   ├── not-found.tsx            # 404
│   ├── a-propos/page.tsx
│   ├── programme-incubation/page.tsx
│   ├── contact/page.tsx
│   └── [pages à créer...]/
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Sticky smart navbar
│   │   └── Footer.tsx           # 4 colonnes + newsletter
│   ├── sections/                # Sections homepage
│   │   ├── Hero.tsx
│   │   ├── PartnerStrip.tsx    # Marquee partenaires
│   │   ├── IntroBlock.tsx
│   │   ├── KeyNumbers.tsx      # CountUp animé
│   │   ├── ProgramsOverview.tsx
│   │   ├── Sectors.tsx
│   │   ├── FeaturedStartups.tsx
│   │   ├── Testimonials.tsx    # Carousel
│   │   └── FinalCTA.tsx        # Réutilisé sur toutes les pages
│   ├── forms/
│   │   ├── ContactForm.tsx     # Formulaire complet (client)
│   │   └── NewsletterForm.tsx  # Formulaire newsletter (client)
│   └── ui/
│       ├── Button.tsx           # 3 variantes + sizes
│       ├── CountUp.tsx          # Animation chiffres
│       ├── Logo.tsx             # Composant logo (dark/light)
│       ├── Reveal.tsx           # Animation au scroll (IntersectionObserver)
│       └── SectionTitle.tsx     # Eyebrow + H2 + description
└── lib/
    ├── constants.ts             # Toutes les données du site (source unique)
    └── utils.ts                 # cn() helper (clsx + tailwind-merge)
```

### Pattern de création d'une nouvelle page

```tsx
// src/app/[slug]/page.tsx

import type { Metadata } from 'next';
import FinalCTA from '@/components/sections/FinalCTA';
// ... imports

export const metadata: Metadata = {
  title: 'Titre Page | CAURIS DIGITAL',
  description: 'Description meta 150-160 caractères.',
};

export default function PageName() {
  return (
    <>
      {/* Hero — fond crème */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-cauris-cream/40">
        <div className="container-cauris">
          <div className="max-w-3xl">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-cauris-orange">
              Eyebrow
            </p>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl 
                           leading-[1.1] text-cauris-black mb-6">
              Titre H1
            </h1>
            <p className="text-lg text-cauris-gray-text leading-relaxed">
              Sous-titre descriptif.
            </p>
          </div>
        </div>
      </section>

      {/* Sections du contenu */}
      <section className="section">
        <div className="container-cauris">
          {/* Contenu */}
        </div>
      </section>

      {/* Toujours en dernier */}
      <FinalCTA />
    </>
  );
}
```

### Source unique de données : `constants.ts`

Toutes les données du site sont centralisées dans `src/lib/constants.ts`.  
**Ne jamais hardcoder des données textuelles directement dans les composants.**  
Ajouter les nouvelles données dans `constants.ts` et les importer.

### Formulaires (client)

Les formulaires utilisent `'use client'` + state local React.  
Pour la soumission, prévoir :
- Un endpoint API Route : `src/app/api/contact/route.ts`
- Ou une intégration directe (Resend, EmailJS, Formspree)

Actuellement : les formulaires n'ont pas d'action de soumission branchée.

---

## 12. CHECKLIST DE LANCEMENT

### Contenu & Données

- [ ] Remplacer tous les membres de l'équipe (noms, bios, photos, LinkedIn)
- [ ] Compléter le Conseil d'Administration (6 membres)
- [ ] Remplacer l'adresse complète dans `SITE_CONFIG.fullAddress`
- [ ] Remplacer le numéro de téléphone dans `SITE_CONFIG.phone`
- [ ] Mettre les vrais témoignages (avec accords de diffusion)
- [ ] Vérifier les chiffres clés (80+ startups, 2M$, 300+ emplois, etc.)
- [ ] Renseigner les vraies URLs réseaux sociaux dans `SITE_CONFIG.social`
- [ ] Coordonnées GPS exactes dans la carte OSM (page Contact)

### Assets visuels

- [ ] Logo SVG vectoriel (dark + white)
- [ ] OG image 1200×630px (`/public/og-image.jpg`)
- [ ] Favicon + apple-touch-icon
- [ ] Photos d'équipe réelles (4 portraits carrés)
- [ ] Logos partenaires SVG (6 partenaires)
- [ ] Remplacement des images Unsplash par photos réelles

### Pages

- [ ] `/programme-acceleration` ← priorité 1
- [ ] `/startups` ← priorité 2
- [ ] `/faq` ← priorité 3
- [ ] `/innovation-corporative`
- [ ] `/partenaires`
- [ ] `/actualites`
- [ ] `/evenements`
- [ ] `/mentions-legales`
- [ ] `/politique-de-confidentialite`

### Technique

- [ ] Brancher l'envoi de formulaire (Contact + Newsletter)
- [ ] Configurer `NEXT_PUBLIC_SITE_URL` en variable d'environnement
- [ ] Configurer le domaine réel (`caurisdigital.org`)
- [ ] Activer Google Analytics ou Plausible (analytics)
- [ ] Vérifier les robots.txt et sitemap.xml
- [ ] Test Lighthouse (Performance, Accessibilité, SEO) → objectif 90+
- [ ] Test WCAG 2.1 AA (contraste, focus, ARIA)
- [ ] Test mobile (iPhone SE, iPhone 14, Samsung Galaxy)
- [ ] Test navigateurs (Chrome, Firefox, Safari, Edge)

### SEO & Marketing

- [ ] Vérifier toutes les balises `<title>` et `<description>` de chaque page
- [ ] Créer et soumettre le sitemap.xml (`/app/sitemap.ts`)
- [ ] Ouvrir Google Search Console
- [ ] Créer l'image OG et la tester sur [opengraph.xyz](https://opengraph.xyz)
- [ ] Vérifier les balises Twitter Card

---

## ANNEXE — Références rapides

### Breakpoints Tailwind

```
sm  : 640px   (téléphones paysage)
md  : 768px   (tablettes)
lg  : 1024px  (petits écrans desktop)
xl  : 1280px  (grands écrans)
2xl : 1536px  (très grands écrans)
```

### Container max-width

```
max-w-7xl = 1280px (container-cauris)
max-w-5xl = 1024px (sections texte larges)
max-w-4xl = 896px  (listes, formulaires)
max-w-3xl = 768px  (texte seul, hero pages internes)
```

### Icônes (Lucide React — déjà installé)

```tsx
import { ArrowRight, Check, ChevronDown, Menu, X, 
         Globe, MapPin, Phone, Mail, Clock,
         Trophy, Users, Target, Handshake,
         Linkedin, Twitter, Youtube, Facebook,
         Quote, Play, Calendar, Rocket } from 'lucide-react';
```

### Commandes développement

```bash
npm run dev          # Serveur de développement (port 3000)
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # ESLint
npm run type-check   # TypeScript (tsc --noEmit)
```

---

*Document généré le 7 mai 2026 — CAURIS DIGITAL*  
*À mettre à jour à chaque ajout de page ou modification de la charte.*
