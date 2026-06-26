# CAURIS DIGITAL — Audit Critique & Cahier des Charges Complet
> Document de référence unique : Audit visuel + fonctionnel de l'existant · Spécifications complètes du restant à faire  
> Version 1.0 — 14 mai 2026 | Destinataires : Développeur + Client / Chef de projet

---

## TABLE DES MATIÈRES

**PARTIE 1 — AUDIT CRITIQUE DE L'EXISTANT**
1. [Bilan global](#1-bilan-global)
2. [Audit page par page](#2-audit-page-par-page)
3. [Problèmes transversaux](#3-problèmes-transversaux)
4. [Priorités de correction](#4-priorités-de-correction)

**PARTIE 2 — CAHIER DES CHARGES COMPLET**
5. [Vision & objectifs du site](#5-vision--objectifs-du-site)
6. [Utilisateurs cibles](#6-utilisateurs-cibles)
7. [Architecture & navigation](#7-architecture--navigation)
8. [Charte graphique & design system](#8-charte-graphique--design-system)
9. [Spécifications fonctionnelles par page](#9-spécifications-fonctionnelles-par-page)
10. [Fonctionnalités transversales](#10-fonctionnalités-transversales)
11. [Spécifications techniques](#11-spécifications-techniques)
12. [Contenus & assets à fournir](#12-contenus--assets-à-fournir)
13. [Critères d'acceptance & tests](#13-critères-dacceptance--tests)
14. [Roadmap & priorités](#14-roadmap--priorités)

---

# PARTIE 1 — AUDIT CRITIQUE DE L'EXISTANT

## 1. BILAN GLOBAL

### Pages — Inventaire complet

| Page | Route | Code | Visuellement | Fonctionnel | Données |
|---|---|---|---|---|---|
| Accueil | `/` | ✅ | ✅ Bon | ⚠️ Partiel | ⚠️ Placeholder |
| À propos | `/a-propos` | ✅ | ✅ Bon | ✅ OK | ❌ Tout placeholder |
| Programme Incubation | `/programme-incubation` | ✅ | ✅ Bon | ✅ OK | ⚠️ Partiel |
| Programme Accélération | `/programme-acceleration` | ✅ | ✅ Bon | ✅ OK | ⚠️ Partiel |
| Startups | `/startups` | ✅ | ✅ Bon | ⚠️ Liens morts | ⚠️ Données fictives |
| FAQ | `/faq` | ✅ | ✅ Bon | ✅ OK | ✅ Contenu réel |
| Innovation Corporative | `/innovation-corporative` | ✅ | ✅ Bon | ✅ OK | ⚠️ Partiel |
| Partenaires | `/partenaires` | ✅ | ✅ Bon | ✅ OK | ❌ Logos manquants |
| Actualités | `/actualites` | ✅ | ✅ Bon | ❌ Articles 404 | ❌ Données fictives |
| Événements | `/evenements` | ✅ | ✅ Bon | ⚠️ Liens morts | ⚠️ Données fictives |
| Contact | `/contact` | ✅ | ✅ Bon | ❌ Non branché | ⚠️ Placeholder |
| Mentions légales | `/mentions-legales` | ✅ | ✅ Bon | ✅ OK | ❌ Placeholder |
| Politique confidentialité | `/politique-de-confidentialite` | ✅ | ✅ Bon | ✅ OK | ⚠️ Partiel |
| Articles (détail) | `/actualites/[slug]` | ❌ Manquant | — | — | — |
| Startups (détail) | `/startups/[slug]` | ❌ Manquant | — | — | — |

**Score d'avancement : 13/15 pages créées · 4/13 entièrement prêtes**

---

## 2. AUDIT PAGE PAR PAGE

### 2.1 — ACCUEIL `/`

#### ✅ Ce qui fonctionne bien
- Hero impactant : image Unsplash professionnelle, gradient bien dosé, H1 lisible
- Badge "Candidatures ouvertes" animé (pulse) — bonne accroche
- Sections bien ordonnées : Hero → Partenaires → Intro → Chiffres → Programmes → Secteurs → Startups → Témoignages → CTA
- Animations de scroll (Reveal) fluides et professionnelles
- CountUp sur les chiffres clés — bonne impression

#### ⚠️ Problèmes identifiés

**Layout mobile (critique) :**
- Le bouton "DÉCOUVRIR NOS PROGRAMMES" est sur-dimensionné sur mobile : prend toute la largeur, hauteur excessive, rendu trop compact/carré → manque d'élégance
- Sur mobile, les deux CTA hero sont empilés mais sans hiérarchie visuelle claire entre le primaire et le secondaire

**Section KeyNumbers :**
- Sur mobile (2 colonnes), le texte du H2 "Un écosystème qui livre des résultats" chevauchait visuellement la décoration blur orange en arrière-plan → problème de lisibilité potentiel selon la résolution
- La grille affiche 6 chiffres en 2×3 sur mobile, ce qui est correct, mais les très grands chiffres (text-7xl) débordent légèrement sur petits écrans

**PartnerStrip :**
- Section entièrement en texte brut (pas de vrais logos) → donne une impression de site non terminé
- Les noms de partenaires sont en texte gris, très peu de contraste sur fond blanc — visuellement vide

**IntroBlock :**
- La mosaïque de 4 photos (colonne gauche + colonne droite décalée) ne s'affiche pas sur mobile → une seule colonne texte puis le badge "+80"
- Le badge "+80 startups" est positionné en `absolute -bottom-4 -left-4` → peut déborder hors du conteneur sur certains écrans

**ProgramsOverview :**
- Le tag durée (chip "6 mois") a un fond crème identique à d'autres éléments — manque de différenciation visuelle entre les deux programmes sur mobile

**FinalCTA :**
- Le lien "En savoir plus sur nos programmes" pointe vers `#programmes` — fonctionne uniquement sur la page d'accueil. Sur toutes les autres pages (il est réutilisé via `<FinalCTA />`), ce lien est brisé → doit pointer vers `/programme-incubation` ou `/programme-acceleration`

---

### 2.2 — À PROPOS `/a-propos`

#### ✅ Ce qui fonctionne bien
- Structure claire : Histoire → Mission/Vision → Valeurs → Équipe → CA
- Card "Vision" en fond orange — beau contraste
- Sticky sidebar avec image + encadré mission — élégant sur desktop

#### ⚠️ Problèmes identifiés

**Contenu entièrement placeholder :**
- 4 membres équipe : noms `[Prénom NOM]`, bios `[X] ans d'expérience`, photos Unsplash génériques
- 6 membres CA : tout en `[Nom du membre]` / `[Institution / Titre]`
- Note de bas de page **visible publiquement** : *"Note : les noms et bios ci-dessus sont des modèles à personnaliser"* → à supprimer impérativement avant mise en ligne
- Photos Unsplash : 3 hommes / 1 femme, photos génériques sans rapport avec CAURIS DIGITAL

**UX équipe :**
- Les liens LinkedIn pointent tous vers `href="#"` → clic sans effet, frustrant
- Pas d'indication visuelle que le lien LinkedIn est inactif (pas de cursor:not-allowed, pas de tooltip)

**Layout :**
- Sur mobile, la section Équipe affiche 1 colonne (correct) mais les photos carrées sont très grandes → scroll excessif
- La section CA (6 cartes en grille 3 colonnes) est correcte mais vide visuellement — risque d'impression "site demo"

---

### 2.3 — PROGRAMME INCUBATION `/programme-incubation`

#### ✅ Ce qui fonctionne bien
- Structure en 4 phases très claire
- Checklist "Profil recherché" bien présentée (check verts)
- Étapes candidature en 4 cards avec numéros flottants orange — design distinctif
- Encadré noir "Promotion 100% accessible à distance" — bonne alternative sombre

#### ⚠️ Problèmes identifiés

**Témoignages programme :**
- 2 témoignages entièrement fictifs : `[Prénom NOM]`, `[Nom startup]`, `[Pays]`, `[Année]`
- Initialle du nom calculée avec `t.name.charAt(1)` au lieu de `.charAt(0)` → affiche "P" (le crochet "[") au lieu de la première lettre → **bug visuel**

**Image hero :**
- Photo Unsplash générique (réunion bureau occidental) → ne représente pas l'Afrique ni CAURIS DIGITAL

**Bouton CTA final :**
- `<Trophy>` et `<Users>` insérés inline dans un `<p>` avec du texte → rendu étrange sur certains navigateurs (icônes et texte pas alignés)

---

### 2.4 — PROGRAMME ACCÉLÉRATION `/programme-acceleration`

#### ✅ Ce qui fonctionne bien
- Structure proche de l'Incubation, cohérente
- Tableau comparatif Incubation vs Accélération — très utile
- Image différente du programme Incubation (bonne différenciation)

#### ⚠️ Problèmes identifiés

**Sur mobile :**
- Le H1 "Programme Accélération" déborde légèrement sur les très petits écrans (320px) car `text-6xl` sans `break-words`

**Témoignages :**
- Témoignages placeholder identiques au problème de la page Incubation

**Tableau comparatif :**
- Sur mobile, le tableau déborde horizontalement (scroll horizontal non intentionnel)
- Pas de `overflow-x-auto` sur le wrapper du tableau

---

### 2.5 — STARTUPS `/startups`

#### ✅ Ce qui fonctionne bien
- Filtres dynamiques (recherche + secteur + pays + statut) — fonctionnels côté client
- État vide bien géré (illustration + message)
- Badges statut colorés clairs

#### ⚠️ Problèmes identifiés

**Liens morts — critique :**
- Les boutons ExternalLink et LinkedIn dans chaque carte startup sont des `<button>` avec `title="à venir"` → cliquables mais sans action. L'icône de curseur ne change pas → UX trompeuse
- Correction : masquer ces boutons tant que les URLs ne sont pas renseignées, ou les afficher grisés avec `cursor-not-allowed`

**Données :**
- Seulement 6 startups (données de démonstration) → grille clairsemée
- Le champ `countryName` n'existe pas dans `FEATURED_STARTUPS` de `constants.ts` → **bug TypeScript / erreur runtime probable** → vérifier la structure des données

**Page de détail manquante :**
- Aucune page `/startups/[slug]` n'existe → les cartes ne sont pas cliquables vers une fiche détail
- Pour l'instant, pas de lien sur les cartes (correct provisoirement), mais il faut prévoir la navigation

---

### 2.6 — FAQ `/faq`

#### ✅ Ce qui fonctionne bien
- 15 questions réparties en 5 thèmes — contenu complet et de qualité
- Navigation par ancres/thèmes sur la gauche — excellent UX desktop
- Accordéon accessible (aria-expanded, ChevronDown rotatif)
- Seule page entièrement prête à être mise en ligne côté contenu

#### ⚠️ Problèmes identifiés

**Navigation thèmes :**
- Sur mobile, la sidebar de navigation des thèmes est masquée — l'utilisateur n'a pas de vue d'ensemble des 5 thèmes → ajouter un select ou une liste horizontale scrollable sur mobile

---

### 2.7 — INNOVATION CORPORATIVE `/innovation-corporative`

#### ✅ Ce qui fonctionne bien
- Hero navy avec titre orange imposant — design B2B assertif
- Structure claire : Pourquoi → Offres → Formules → Processus → CTA

#### ⚠️ Problèmes identifiés

**Contraste hero :**
- Sur le hero navy, le texte du H1 est en orange ET le fond est navy avec texte décoratif "corporative" en orange transparent → superposition qui peut gêner la lisibilité sur écrans à faible contraste

**Tarification :**
- Les 4 formules de partenariat (Bronze/Silver/Gold/Platinum) ont des prix en FCFA fictifs → à valider avec l'équipe avant publication
- Aucune mention de TVA ou conditions → problème légal potentiel

**CTA partenariat :**
- Pointe vers `/contact?objet=Partenariat+corporate` → le paramètre `objet` doit pré-remplir le select du formulaire de contact. À vérifier que la page Contact lit bien ce paramètre côté URL

---

### 2.8 — PARTENAIRES `/partenaires`

#### ✅ Ce qui fonctionne bien
- 4 catégories bien structurées avec descriptions
- Section CTA partenariat en bas — claire

#### ⚠️ Problèmes identifiés

**Logos manquants — critique :**
- Tous les logos partenaires sont affichés en texte typographique (pas de SVG/PNG)
- La section ressemble à un placeholder non terminé
- Sans vrais logos, cette page ne peut pas être mise en ligne

**Partenaires fictifs :**
- Les 6 partenaires listés (Union Africaine, BAD, CEMAC, UY1, Polytech, Orange Digital) doivent être confirmés comme partenaires réels avant publication

---

### 2.9 — ACTUALITÉS `/actualites`

#### ✅ Ce qui fonctionne bien
- Filtres par catégorie (6 catégories) fonctionnels
- Barre de recherche avec debounce
- Pagination côté client
- Métadonnées de lecture (date, temps de lecture, auteur) — professionnel
- 6 articles de démonstration de bonne qualité rédactionnelle

#### ⚠️ Problèmes identifiés

**Pages détail manquantes — critique :**
- Les liens `/actualites/[slug]` n'existent pas → 404 si l'utilisateur clique sur un article
- C'est le problème le plus bloquant de cette page

**Images alt vides :**
- `<img alt="" ...>` sur les images d'articles → problème d'accessibilité (WCAG 2.1 AA)
- Les images de couverture d'articles doivent avoir un alt descriptif

**Architecture données :**
- Les articles sont hardcodés dans le composant → impossible à administrer sans toucher au code
- À migrer vers un CMS ou des fichiers MDX

---

### 2.10 — ÉVÉNEMENTS `/evenements`

#### ✅ Ce qui fonctionne bien
- Onglets "À venir / Passés" avec compteurs dynamiques
- Calcul automatique du statut basé sur la date du jour
- Cards événements détaillées (date, heure, lieu, prix, lien inscription)
- Gestion de l'état vide par onglet

#### ⚠️ Problèmes identifiés

**Liens inscription morts :**
- `registerUrl: '#'` sur tous les événements → le bouton "S'inscrire" ne mène nulle part
- Correction : remplacer `#` par un vrai lien (Eventbrite, Google Form, etc.) ou masquer le bouton si pas d'URL

**Architecture données :**
- Même problème que les Actualités : données hardcodées dans le composant

---

### 2.11 — CONTACT `/contact`

#### ✅ Ce qui fonctionne bien
- Formulaire complet (Prénom, Nom, Email, Pays, Objet, Message)
- Validation côté client
- Cards coordonnées bien présentées (Email, Tél, Adresse, Horaires)
- Carte OpenStreetMap intégrée

#### ⚠️ Problèmes identifiés

**Soumission non branchée — critique :**
- Le formulaire n'envoie rien → soumission silencieuse ou non fonctionnelle
- Aucune API Route créée (`/api/contact`)
- Aucun provider email configuré (Resend, SendGrid, EmailJS...)

**Coordonnées placeholder :**
- Téléphone : `+237 6 XX XX XX XX` visible publiquement
- Adresse : `[Adresse complète]` visible dans le footer et la carte

**Carte OSM :**
- Coordonnées approximatives (centre de Yaoundé, pas l'adresse exacte)

**Select "Objet" :**
- Le pré-remplissage via `?objet=` dans l'URL doit être testé avec les différentes valeurs (candidature, partenariat, etc.) pour vérifier que le matching fonctionne

---

### 2.12 — MENTIONS LÉGALES & POLITIQUE DE CONFIDENTIALITÉ

#### ✅ Ce qui fonctionne bien
- Structure juridique conforme aux standards
- Sommaire avec ancres dans la politique de confidentialité

#### ⚠️ Problèmes identifiés
- `Association loi [applicable locale]` → à préciser (loi camerounaise applicable)
- `[Adresse complète]` → placeholder visible
- `[Nom du responsable légal]` → placeholder visible
- `Directeur de la publication : [Nom]` → placeholder
- Ces pages doivent être validées par un juriste avant mise en ligne
- **Ces pages NE PEUVENT PAS être publiées avec des placeholders** → risque légal

---

## 3. PROBLÈMES TRANSVERSAUX

### 3.1 Bugs à corriger immédiatement

| # | Problème | Fichier | Impact |
|---|---|---|---|
| B1 | Initiale témoignage : `charAt(1)` → affiche `[` | `programme-incubation/page.tsx` ligne 331 | Visuel |
| B2 | `countryName` absent de `FEATURED_STARTUPS` | `constants.ts` + `StartupsExplorer.tsx` | Runtime error |
| B3 | FinalCTA lien `#programmes` cassé hors accueil | `FinalCTA.tsx` | Navigation |
| B4 | Tableau comparatif accélération : pas de scroll horizontal | `programme-acceleration/page.tsx` | Mobile UX |
| B5 | Alt="" sur images articles blog | `NewsExplorer.tsx` | Accessibilité |
| B6 | Liens LinkedIn/Site startups : boutons non fonctionnels sans indication | `StartupsExplorer.tsx` | UX |

### 3.2 Formulaires non branchés

| Formulaire | Fichier | Statut |
|---|---|---|
| Contact | `ContactForm.tsx` | ❌ Pas d'API Route |
| Newsletter footer | `NewsletterForm.tsx` | ❌ Pas d'API Route |

### 3.3 Données placeholder visibles en production

| Donnée | Emplacement | Urgence |
|---|---|---|
| `[Adresse complète]` | Footer + Mentions légales + Contact | 🔴 Bloquant |
| `+237 6 XX XX XX XX` | Contact + Footer | 🔴 Bloquant |
| `[Nom du responsable légal]` | Mentions légales | 🔴 Bloquant |
| Noms équipe `[Prénom NOM]` | À propos | 🔴 Bloquant |
| Bios équipe | À propos | 🔴 Bloquant |
| Conseil d'administration | À propos | 🔴 Bloquant |
| Note "modèles à personnaliser" | À propos | 🔴 Bloquant |
| Témoignages programme fict. | Incubation + Accélération | 🟠 Important |
| Photos équipe Unsplash | À propos | 🟠 Important |
| Logos partenaires manquants | Partenaires + PartnerStrip | 🟠 Important |
| Tarifs Innovation Corporate | Innovation corporative | 🟠 À valider |
| URLs réseaux sociaux genériques | Footer + constants.ts | 🟡 Avant lancement |

### 3.4 Assets manquants

| Asset | Format requis | Utilisation |
|---|---|---|
| `/public/og-image.jpg` | 1200×630px JPEG | Partage social (OG + Twitter) |
| `/public/brand/cauris-logo.svg` | SVG vectoriel | Usage général |
| `/public/brand/cauris-logo-white.svg` | SVG blanc | Fonds sombres |
| `/public/favicon.ico` | ICO 32×32 | Onglet navigateur |
| `/public/apple-touch-icon.png` | PNG 180×180 | iOS |
| `/public/partners/*.svg` | SVG monochrome | ×6 logos partenaires |
| `/public/team/*.jpg` | JPG 1:1 min 400px | ×4 photos équipe |
| Images articles réels | JPEG 800×500px min | À remplacer Unsplash |

### 3.5 Pages manquantes critiques

| Page | Impact |
|---|---|
| `/actualites/[slug]` | Tous les articles du blog sont cliquables mais mènent en 404 |
| `/startups/[slug]` | Prévoir pour les fiches startup détaillées (optionnel phase 1) |
| `/sitemap.xml` | SEO (fichier `sitemap.ts` créé mais vérifier le rendu) |
| `/robots.txt` | SEO |

---

## 4. PRIORITÉS DE CORRECTION

### 🔴 BLOQUANT — À corriger avant toute mise en ligne

1. Remplacer TOUTES les données placeholder (adresse, tél, noms, bios)
2. Brancher le formulaire de contact (API Route + service email)
3. Brancher le formulaire newsletter
4. Supprimer la note "modèles à personnaliser" de la page À propos
5. Corriger le bug `charAt(1)` → `charAt(0)` dans Programme Incubation
6. Créer la page `/actualites/[slug]` (détail article)
7. Faire valider Mentions légales et Politique de confidentialité par un juriste
8. Fournir les logos partenaires SVG
9. Créer l'OG image (1200×630px)

### 🟠 IMPORTANT — À corriger avant lancement public

10. Remplacer photos équipe (vraies photos)
11. Remplacer témoignages placeholder par de vrais témoignages
12. Corriger le tableau accélération (scroll horizontal mobile)
13. Corriger le lien FinalCTA `#programmes` → URL absolue
14. Corriger l'alt="" des images blog
15. Ajouter `robots.txt`
16. Valider que le sitemap.xml se génère correctement
17. Tester le pré-remplissage `?objet=` du formulaire Contact
18. Corriger les boutons LinkedIn/Site startups (masquer ou désactiver visuellement)
19. Ajouter les URLs réseaux sociaux réels

### 🟡 AMÉLIORATION — Avant lancement ou en V2

20. Ajouter la navigation thèmes FAQ sur mobile
21. Optimiser le Hero mobile (boutons secondaires)
22. Migrer articles et événements vers CMS
23. Créer pages détail startups `/startups/[slug]`
24. Ajouter analytics (Plausible ou Google Analytics)
25. Optimiser les images Unsplash restantes

---

# PARTIE 2 — CAHIER DES CHARGES COMPLET

## 5. VISION & OBJECTIFS DU SITE

### Vision
Site institutionnel de CAURIS DIGITAL, incubateur numérique d'excellence basé à Yaoundé, Cameroun. Le site doit être la vitrine principale de l'organisation, générer des candidatures aux programmes et attirer des partenaires corporate.

### Objectifs primaires
1. **Générer des candidatures** — Transformer les visiteurs en candidats aux programmes Incubation et Accélération
2. **Crédibiliser l'organisation** — Démontrer l'expertise, l'impact et la légitimité de CAURIS DIGITAL
3. **Attirer des partenaires** — Convaincre institutions, corporates et investisseurs de rejoindre l'écosystème
4. **Informer** — Tenir à jour la communauté via le blog et les événements

### Objectifs secondaires
- Référencement naturel (SEO) sur les termes "incubateur Cameroun", "startup Afrique francophone"
- Internationalisation de la visibilité (Afrique + Diaspora Europe/Canada)
- Accessibilité WCAG 2.1 AA

### KPIs de succès
- Taux de conversion visiteur → formulaire de candidature > 2%
- Temps moyen sur la page Programme > 3 minutes
- Score Lighthouse Performance > 85, Accessibilité > 90, SEO > 95
- Zéro lien mort en production

---

## 6. UTILISATEURS CIBLES

### Persona 1 — L'entrepreneur en herbe (cible principale)
- **Profil** : 22-35 ans, étudiant ou jeune professionnel, Afrique francophone + diaspora
- **Besoin** : Comprendre les programmes, évaluer son éligibilité, candidater
- **Comportement** : Visite sur mobile, compare plusieurs incubateurs, cherche des témoignages
- **Pages clés** : Accueil → Programme Incubation/Accélération → FAQ → Contact

### Persona 2 — Le décideur corporate (partenaire)
- **Profil** : 35-55 ans, directeur innovation ou RSE, grande entreprise ou institution
- **Besoin** : Comprendre la valeur du partenariat, voir le track record, contacter
- **Comportement** : Visite sur desktop, lecture longue, cherche des preuves d'impact
- **Pages clés** : Accueil → À propos → Innovation Corporative → Partenaires → Contact

### Persona 3 — Le journaliste / bailleur de fonds
- **Profil** : Média tech africain, fondation, bailleur international
- **Besoin** : Chiffres d'impact, équipe, crédibilité institutionnelle
- **Pages clés** : À propos → Startups → Actualités → Contact

---

## 7. ARCHITECTURE & NAVIGATION

### Arborescence complète

```
/ (Accueil)
├── /a-propos
│   ├── #qui-sommes-nous
│   ├── #equipe
│   └── #ca
├── /programme-incubation
├── /programme-acceleration
├── /startups
│   └── /startups/[slug]          ← À CRÉER
├── /innovation-corporative
│   ├── #lab
│   └── #programmes
├── /partenaires
├── /evenements
├── /actualites
│   └── /actualites/[slug]        ← À CRÉER
├── /faq
├── /contact
├── /mentions-legales
└── /politique-de-confidentialite
    └── #cookies
```

### Navigation principale (header)

```
Logo | À propos ▾ | Startups ▾ | Innovation Corporative ▾ | Événements | Actualités | Partenaires | FAQ | Contact | [CANDIDATER]
```

**Règle** : Le bouton "CANDIDATER" est toujours orange et visible. Sur mobile, il reste visible à côté du hamburger.

### Navigation footer (4 colonnes)

```
Col 1 : Logo + slogan + newsletter
Col 2 : À propos (liens)
Col 3 : Programmes (liens)
Col 4 : Légal + Réseaux sociaux
```

---

## 8. CHARTE GRAPHIQUE & DESIGN SYSTEM

### Palette couleurs

| Nom | Hex | RGB | Usage |
|---|---|---|---|
| **Orange** (principal) | `#E8640A` | 232, 100, 10 | CTA, accents, actif |
| **Orange foncé** | `#C9540A` | 201, 84, 10 | Hover boutons |
| **Orange clair** | `#F58A3D` | 245, 138, 61 | Gradients, badges |
| **Navy** (noir) | `#1A1A2E` | 26, 26, 46 | Textes, fonds sombres |
| **Crème** | `#FFF5EE` | 255, 245, 238 | Fonds sections alternées |
| **Gris texte** | `#333333` | 51, 51, 51 | Corps de texte |
| **Gris secondaire** | `#6C757D` | 108, 117, 125 | Labels, sous-titres |
| **Gris fond** | `#F5F5F5` | 245, 245, 245 | Fonds neutres |
| **Succès** | `#2ECC71` | 46, 204, 113 | Validation, "Diplômée" |
| **Erreur** | `#E74C3C` | 231, 76, 60 | Erreurs formulaire |

### Typographie

| Niveau | Police | Taille desktop | Taille mobile | Weight |
|---|---|---|---|---|
| Display / Hero H1 | Montserrat | 64–72px | 36–40px | 800 ExtraBold |
| H1 page interne | Montserrat | 48–56px | 32–36px | 800 ExtraBold |
| H2 section | Montserrat | 36–40px | 28–32px | 700 Bold |
| H3 carte | Montserrat | 20–24px | 18–20px | 700 Bold |
| Eyebrow | Inter | 13px | 13px | 600 SemiBold CAPS |
| Body large | Inter | 18px | 16px | 400 Regular |
| Body | Inter | 16px | 15px | 400 Regular |
| Body small | Inter | 14px | 14px | 400 Regular |
| Caption | Inter | 12px | 12px | 500 Medium |

### Composants UI

#### Boutons
```
Primaire  : fond #E8640A · texte blanc · radius 6px · padding 14px 28px
           hover: #C9540A + élévation -2px + ombre orange
Secondaire: border 2px #E8640A · texte orange · radius 6px
           hover: fond orange + texte blanc
Tertiaire : texte orange · pas de border · hover: underline
Taille SM : padding 10px 20px · text-13px
Taille MD : padding 14px 28px · text-15px  
Taille LG : padding 16px 32px · text-16px
```

#### Cartes
```
fond: blanc · radius: 12px · shadow: 0 4px 16px rgba(0,0,0,0.08)
hover: shadow: 0 8px 24px rgba(0,0,0,0.12) + translateY(-4px)
border: 1px solid #F0F0F0
padding: 28px (mobile) → 40px (desktop)
```

#### Formulaires
```
Input/Select/Textarea:
  border: 1px solid #E2E2E2 · radius: 6px · padding: 12px 16px
  focus: border #E8640A + ring rgba(232,100,10,0.2)
  error: border #E74C3C + message rouge en-dessous
Label: text-sm · font-medium · couleur navy · mb-6px
Placeholder: couleur #9CA3AF
```

#### Sections
```
Alternance des fonds de section :
  1. Blanc      → Sections principales
  2. Crème/40%  → Sections alternées (intro, valeurs, profil...)
  3. Gris #F5F5F5 → Sections tertiaires
  4. Navy #1A1A2E → Sections impact (chiffres clés, FinalCTA)
  5. Orange #E8640A → FinalCTA exclusivement
Padding standard : 80px vertical (desktop) · 56px (mobile)
```

### Grilles responsives

```
1 colonne  : < 640px (mobile)
2 colonnes : ≥ 640px (tablette portrait)
3 colonnes : ≥ 1024px (desktop)
4 colonnes : ≥ 1024px (équipe, étapes process)
Container  : max-width 1280px · padding latéral 16/24/32px
```

---

## 9. SPÉCIFICATIONS FONCTIONNELLES PAR PAGE

### 9.1 — Accueil `/`

**Sections et ordre :**

| # | Section | Fond | Composant |
|---|---|---|---|
| 1 | Hero plein écran | Image + Navy overlay | `Hero.tsx` |
| 2 | Bande partenaires (marquee) | Blanc | `PartnerStrip.tsx` |
| 3 | Bloc introduction | Crème | `IntroBlock.tsx` |
| 4 | Chiffres clés animés | Navy | `KeyNumbers.tsx` |
| 5 | Aperçu programmes | Blanc | `ProgramsOverview.tsx` |
| 6 | Secteurs d'activité | Gris | `Sectors.tsx` |
| 7 | Startups vedettes | Blanc | `FeaturedStartups.tsx` |
| 8 | Témoignages carousel | Crème | `Testimonials.tsx` |
| 9 | CTA final | Orange | `FinalCTA.tsx` |

**Corrections requises :**
- FinalCTA : lien "#programmes" → `/programme-incubation`
- PartnerStrip : remplacer texte par vrais logos SVG
- Hero mobile : réduire taille bouton secondaire

---

### 9.2 — Page À propos `/a-propos`

**Sections :**
1. Hero (fond crème) — H1 + sous-titre
2. Notre histoire — texte 3/5 + image + encadré mission 2/5 sticky
3. Mission & Vision — 2 cards côte à côte (blanc + orange)
4. Valeurs fondatrices (6) — grille 3 colonnes
5. Équipe (4 membres) — grille 4 colonnes
6. Conseil d'administration (6 membres) — grille 3 colonnes
7. FinalCTA

**Contenu à fournir par le client :**
- [ ] Noms, rôles, bios des 4 membres de l'équipe
- [ ] Photos professionnelles carrées (min 400×400px, format JPG)
- [ ] URLs LinkedIn de chaque membre
- [ ] Noms et institutions des 6 membres du CA
- [ ] Suppression de la note "modèles à personnaliser"

---

### 9.3 — Programme Incubation `/programme-incubation`

**Sections :**
1. Hero — H1 + sous-titre + badges (durée / lieu / format) + 2 CTA
2. Présentation du programme
3. Ce que vous obtenez (8 bénéfices en checklist 2 colonnes)
4. Déroulement 3 phases (mois 1-2 / 3-4 / 5-6)
5. Profil recherché (checklist verte) + encadré "accessible à distance"
6. Témoignages participants (2 cartes)
7. Processus candidature (4 étapes)
8. FinalCTA

**Corrections requises :**
- Bug `charAt(1)` → `charAt(0)` ligne 331
- Remplacer témoignages placeholder par vrais témoignages
- Remplacer image Unsplash par photo réelle session

---

### 9.4 — Programme Accélération `/programme-acceleration`

**Sections :** Identiques à l'Incubation (adapté au programme 12 semaines)

**Corrections requises :**
- Ajouter `overflow-x-auto` autour du tableau comparatif
- Corriger témoignages placeholder
- Remplacer image Unsplash

---

### 9.5 — Startups `/startups`

**Fonctionnalités :**
- Barre de recherche (texte libre : nom, secteur, tagline)
- Filtre Secteur (select)
- Filtre Pays (select)
- Filtre Statut (select : Toutes / En incubation / Diplômées / Alumni)
- Compteur résultats + bouton reset filtres
- Grille 3 colonnes (md:2, lg:3)
- État vide illustré

**Corrections requises :**
- Corriger `countryName` dans `constants.ts` (ajouter le champ manquant)
- Masquer les boutons ExternalLink/LinkedIn tant qu'aucune URL n'est renseignée

**À créer — Page détail `/startups/[slug]` :**
```
Contenu d'une fiche startup :
  - Logo / initiale startup
  - Nom + pays + secteur + année + statut
  - Tagline orange
  - Description complète
  - Fondateurs (noms + LinkedIn)
  - Problème résolu
  - Solution
  - Métriques clés (si disponibles)
  - Site web + réseaux sociaux
  - CTA : "Candidater au programme"
```

---

### 9.6 — FAQ `/faq`

**Fonctionnalités :**
- Navigation thèmes (sidebar desktop / select ou liste horizontale mobile)
- Accordéon par question (aria-expanded, animation hauteur)
- 5 thèmes, 15 questions (contenu prêt dans `constants.ts`)
- CTA contact en bas

**Correction requise :**
- Ajouter navigation mobile par thème (select `<select>` ou boutons scrollables horizontalement)

---

### 9.7 — Innovation Corporative `/innovation-corporative`

**Sections :**
1. Hero navy — "Pour les grandes entreprises"
2. Pourquoi co-innover
3. Nos offres (3 services : Co-développement, Hackathons, Open Innovation)
4. Formules partenariat (4 niveaux avec tableau)
5. Processus en 4 étapes
6. CTA → Contact

**Correction requise :**
- Valider les tarifs FCFA avec l'équipe CAURIS DIGITAL
- Ajouter mention légale sur les prix si nécessaire

---

### 9.8 — Partenaires `/partenaires`

**Sections :**
1. Hero — "Nos partenaires"
2. 4 catégories (institutionnels, financiers, académiques, corporatifs)
3. Par catégorie : titre + description + grille de logos
4. CTA "Devenir partenaire" → Contact

**Correction requise :**
- Intégrer les vrais logos SVG/PNG dès qu'ils sont fournis
- Confirmer la liste des partenaires réels

---

### 9.9 — Actualités `/actualites`

**Fonctionnalités actuelles :**
- Filtres catégorie (pill buttons)
- Recherche texte
- Grille articles (2 colonnes md / 3 colonnes lg)
- Pagination côté client (6 articles/page)
- Métadonnées (date, durée lecture, auteur)

**À CRÉER — Page détail `/actualites/[slug]` :**
```
Structure d'un article :
  - Image de couverture (full width, ratio 16:9)
  - Catégorie + date + temps de lecture + auteur
  - H1 titre
  - Corps de l'article (texte riche : paragraphes, H2, H3, citations, images inline)
  - Section "Articles similaires" (3 cartes en bas)
  - CTA latéral ou bas de page : "Candidater au programme"

Routes : /actualites/[slug]
Données : fichiers MDX dans /content/articles/[slug].mdx
  OU API CMS (Sanity, Contentful, Strapi)
```

**Architecture données recommandée :**
```
Option A (simple) : Fichiers MDX locaux dans /content/articles/
  Avantage : pas de CMS, code uniquement
  Inconvénient : nécessite un dev pour ajouter des articles

Option B (recommandée) : CMS headless Sanity.io
  Avantage : interface admin pour l'équipe non-dev
  Inconvénient : setup initial + coût (plan gratuit disponible)
```

---

### 9.10 — Événements `/evenements`

**Fonctionnalités actuelles :**
- Onglets "À venir / Passés" avec compteurs
- Calcul automatique du statut basé sur la date
- Cards événements avec date, heure, lieu, type, prix, lien inscription

**Corrections requises :**
- Remplacer `registerUrl: '#'` par des vrais liens d'inscription (Eventbrite, Google Forms, Luma...)
- Même choix d'architecture que les Actualités (MDX ou CMS)

---

### 9.11 — Contact `/contact`

**Fonctionnalités requises :**

```
Formulaire :
  Champs : Prénom* · Nom* · Email* · Pays* · Objet* · Message*
  Validation : côté client (déjà fait) + côté serveur (à faire)
  Soumission :
    1. POST vers /api/contact
    2. Validation serveur (Zod ou autre)
    3. Envoi email via Resend ou SendGrid
    4. Email destinataire : hello@caurisdigital.org
    5. Email de confirmation automatique à l'expéditeur
    6. Affichage message succès ou erreur
  Anti-spam : Honeypot field ou reCAPTCHA v3

Coordonnées (à remplir) :
  Email : hello@caurisdigital.org ✅
  Téléphone : ❌ à fournir
  Adresse : ❌ à fournir
  Horaires : Lun-Ven 8h-18h (UTC+1) ✅

Carte OSM :
  Coordonnées à ajuster vers l'adresse exacte du siège
```

**API Route à créer : `src/app/api/contact/route.ts`**
```ts
// Structure minimale
export async function POST(req: Request) {
  const body = await req.json();
  // 1. Validation (Zod)
  // 2. Anti-spam
  // 3. Envoi email (Resend)
  // 4. Retour JSON {success: true} ou erreur
}
```

---

### 9.12 — Pages légales

**Mentions légales `/mentions-legales` — À compléter :**
- Nom de l'association (forme légale exacte)
- Numéro d'immatriculation (RCCM ou équivalent camerounais)
- Adresse complète du siège
- Nom du directeur de publication
- Hébergeur (Vercel Inc., San Francisco, CA — à confirmer)
- À valider par un juriste avant mise en ligne

**Politique de confidentialité `/politique-de-confidentialite` — À compléter :**
- Détailler les cookies utilisés (analytics, fonctionnels)
- Confirmer la durée de conservation des données
- Coordonnées du DPO si applicable
- À valider par un juriste

---

## 10. FONCTIONNALITÉS TRANSVERSALES

### 10.1 — Header / Navigation

**Comportement :**
- Sticky au scroll, fond blanc opaque après 8px de scroll
- Smart hide : disparaît au scroll bas (après 100px), réapparaît au scroll haut
- Sous-menus dropdown au hover sur desktop
- Menu mobile hamburger (slide depuis la droite)
- Fermeture automatique au clic sur un lien (mobile)

**Breakpoints :**
- Desktop (≥ 1024px) : navigation complète + CTA
- Tablet (640-1023px) : hamburger + CTA
- Mobile (< 640px) : hamburger + CTA (taille réduite)

### 10.2 — Footer

**Contenu :**
- Logo CAURIS DIGITAL (variante blanche)
- Slogan + formulaire newsletter
- 3 colonnes de liens (À propos / Programmes / Légal)
- Réseaux sociaux (4 icônes rondes)
- Copyright avec année dynamique
- Adresse siège

**Newsletter :**
- Champ email + bouton "S'inscrire"
- Validation email côté client
- Soumission vers `/api/newsletter` (à créer)
- Intégration recommandée : Mailchimp ou Brevo (ex-Sendinblue)

### 10.3 — Cookie Banner (RGPD)

**Comportement actuel :**
- S'affiche au premier chargement
- "J'accepte" → ferme le bandeau + stocke le consentement
- "Refuser les non-essentiels" → ferme + stocke refus
- "En savoir plus" → `/politique-de-confidentialite#cookies`

**À vérifier :**
- Clé localStorage : vérifier que `CookieBanner.tsx` et la lecture du consentement utilisent la même clé
- Les cookies analytics ne doivent pas se charger avant le consentement

### 10.4 — SEO

**Metadata par page (déjà configuré) :**
- `<title>` avec template `%s | CAURIS DIGITAL`
- `<description>` 150-160 caractères
- Open Graph (og:title, og:description, og:image, og:url)
- Twitter Card

**À créer :**
```
/public/robots.txt :
  User-agent: *
  Allow: /
  Disallow: /api/
  Sitemap: https://caurisdigital.org/sitemap.xml

/src/app/sitemap.ts : (déjà créé — vérifier les URLs)
  Toutes les pages statiques
  Fréquence de mise à jour par type de page
  Priorité relative
```

**Mots-clés cibles :**
- "incubateur numérique Cameroun"
- "incubateur startup Afrique francophone"
- "programme incubation Yaoundé"
- "startup tech Afrique"
- "accompagnement startup Cameroun"

### 10.5 — Performance

**Objectifs Lighthouse :**
| Métrique | Objectif |
|---|---|
| Performance | ≥ 85 |
| Accessibilité | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 95 |

**Optimisations requises :**
- Remplacer toutes les images `<img>` par `<Image>` de Next.js (avec `sizes`, `width`, `height`)
- Ajouter `loading="lazy"` sur images below the fold (déjà fait sur plusieurs)
- Optimiser les images Unsplash restantes (passer par `/api/image` ou CDN)
- Vérifier le bundle size (pas de lib non nécessaire)

### 10.6 — Accessibilité (WCAG 2.1 AA)

**Déjà implémenté :**
- Skip link "Aller au contenu principal"
- `aria-label` sur boutons icon-only
- Focus visible (outline orange)
- `prefers-reduced-motion` respecté

**À corriger :**
- Images blog : `alt=""` → description de l'image
- Contraste texte : vérifier ratio ≥ 4.5:1 pour tous les textes
- Tableau comparatif : ajouter `<caption>` et `<th scope>`
- Formulaires : vérifier `aria-describedby` sur les erreurs

---

## 11. SPÉCIFICATIONS TECHNIQUES

### Stack
```
Framework  : Next.js 14.2 (App Router)
Langage    : TypeScript 5
Style      : Tailwind CSS 3
Icônes     : Lucide React
Polices    : Google Fonts (Montserrat + Inter) via next/font
Images     : next/image (à utiliser systématiquement)
Hébergement : Vercel (recommandé pour Next.js)
```

### Variables d'environnement requises

```bash
# .env.local (ne jamais committer)
NEXT_PUBLIC_SITE_URL=https://caurisdigital.org
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # Google Analytics (si utilisé)

# Serveur uniquement (non NEXT_PUBLIC)
RESEND_API_KEY=re_xxxxxxxxxxxx           # Service d'envoi email
CONTACT_EMAIL=hello@caurisdigital.org    # Destinataire des contacts
NEWSLETTER_API_KEY=xxxx                  # Mailchimp/Brevo API key
RECAPTCHA_SECRET_KEY=xxxx               # Si reCAPTCHA utilisé
```

### Architecture recommandée pour le CMS

```
Option retenue : Fichiers MDX locaux (Phase 1) → CMS Sanity (Phase 2)

Phase 1 - MDX :
  /content/
  ├── articles/
  │   ├── amina-farmtrack-portrait.mdx
  │   └── candidatures-promo-2026.mdx
  └── events/
      └── demo-day-2026.mdx

Phase 2 - Sanity :
  npm install next-sanity @sanity/image-url
  Studio admin : studio.caurisdigital.org
  Dataset : production
```

### API Routes à créer

```
src/app/api/
├── contact/route.ts      → Formulaire de contact
└── newsletter/route.ts   → Inscription newsletter
```

### Déploiement (Vercel)

```
1. Connecter repo GitHub à Vercel
2. Configurer les variables d'environnement dans le dashboard Vercel
3. Domaine : caurisdigital.org (configurer DNS)
4. Activert les Preview Deployments sur les PRs
5. Protection de branche : main = production uniquement
```

---

## 12. CONTENUS & ASSETS À FOURNIR

### Par le client (CAURIS DIGITAL) — BLOQUANT

| Asset | Format | Deadline |
|---|---|---|
| Adresse complète du siège | Texte | Avant lancement |
| Numéro de téléphone | Texte | Avant lancement |
| Noms et rôles des 4 membres d'équipe | Texte | Avant lancement |
| Bios des 4 membres (3-5 lignes chacune) | Texte | Avant lancement |
| Photos de l'équipe | JPG carré min 400×400px | Avant lancement |
| URLs LinkedIn des membres | URL | Avant lancement |
| Noms et institutions des 6 membres CA | Texte | Avant lancement |
| Vrais témoignages (3 minimum avec accord) | Texte | Avant lancement |
| Logos partenaires (6) | SVG monochrome | Avant lancement |
| Confirmation liste partenaires réels | Validation | Avant lancement |
| Validation tarifs Innovation Corporative | Validation | Avant lancement |
| Nom directeur de publication (légal) | Texte | Avant lancement |
| Numéro RCCM ou équivalent | Texte | Avant lancement |
| URLs réseaux sociaux réels | URLs | Avant lancement |

### Par le développeur (à créer)

| Asset | Specs | Priorité |
|---|---|---|
| OG image | 1200×630px · Branding CAURIS | 🔴 |
| Favicon | ICO 32×32 + PNG 192×192 | 🔴 |
| Apple touch icon | PNG 180×180 | 🟠 |
| Logo SVG vectoriel | Blanc + Couleur | 🟠 |
| robots.txt | Fichier statique | 🟠 |

---

## 13. CRITÈRES D'ACCEPTANCE & TESTS

### Tests fonctionnels à valider avant mise en ligne

#### Navigation
- [ ] Tous les liens de la navigation principale mènent à la bonne page
- [ ] Les sous-menus s'affichent correctement au hover (desktop)
- [ ] Le menu mobile s'ouvre/ferme correctement
- [ ] Le header se cache/réapparaît au scroll
- [ ] Le lien "Aller au contenu principal" fonctionne (Tab)

#### Formulaires
- [ ] Le formulaire de contact valide les champs obligatoires
- [ ] Le formulaire de contact envoie bien un email à hello@caurisdigital.org
- [ ] L'expéditeur reçoit un email de confirmation
- [ ] Le formulaire newsletter envoie bien l'inscription
- [ ] Les messages d'erreur s'affichent correctement
- [ ] Les messages de succès s'affichent après soumission

#### Pages & contenu
- [ ] Aucun lien ne mène vers une page 404
- [ ] Aucun placeholder `[xxx]` n'est visible
- [ ] Aucune image manquante (icône cassée)
- [ ] Les témoignages affichent les vraies données
- [ ] Les chiffres clés sont à jour
- [ ] Les tarifs Innovation Corporative sont validés

#### Fonctionnalités interactives
- [ ] Filtres Startups : recherche, secteur, pays, statut
- [ ] Filtres Actualités : catégorie + recherche
- [ ] Pagination Actualités fonctionne
- [ ] Onglets Événements "À venir / Passés"
- [ ] FAQ accordéon : ouverture/fermeture
- [ ] Carousel Témoignages : navigation prev/next/dots
- [ ] CountUp chiffres clés s'anime au scroll
- [ ] Cookie banner : accepter / refuser / fermer

#### Responsive (tester sur)
- [ ] iPhone SE (375px)
- [ ] iPhone 14 (390px)
- [ ] iPad (768px)
- [ ] Desktop 1280px
- [ ] Desktop 1920px

#### Navigateurs (tester sur)
- [ ] Chrome (dernière version)
- [ ] Firefox (dernière version)
- [ ] Safari (Mac + iOS)
- [ ] Edge (dernière version)

#### Performance & SEO
- [ ] Lighthouse Performance ≥ 85 sur mobile
- [ ] Lighthouse Accessibilité ≥ 90
- [ ] Lighthouse SEO ≥ 95
- [ ] Aucune image sans attribut alt
- [ ] Toutes les pages ont un `<title>` et `<description>` uniques
- [ ] sitemap.xml accessible à /sitemap.xml
- [ ] robots.txt accessible à /robots.txt
- [ ] OG image affichée correctement sur WhatsApp/LinkedIn/Twitter

---

## 14. ROADMAP & PRIORITÉS

### Phase 1 — Corrections bloquantes (1-2 semaines)
*Objectif : rendre le site publiable*

**Développeur :**
- [ ] Corriger bug `charAt(1)` → `charAt(0)`
- [ ] Corriger bug `countryName` dans StartupsExplorer
- [ ] Corriger lien FinalCTA `#programmes` → URL absolue
- [ ] Ajouter `overflow-x-auto` tableau accélération
- [ ] Corriger `alt=""` images articles
- [ ] Créer `src/app/api/contact/route.ts` + intégration Resend
- [ ] Créer `src/app/api/newsletter/route.ts` + intégration Brevo/Mailchimp
- [ ] Créer `/public/robots.txt`
- [ ] Créer `/public/og-image.jpg` (1200×630px)
- [ ] Créer favicon + apple-touch-icon
- [ ] Ajouter navigation thèmes FAQ sur mobile

**Client :**
- [ ] Fournir toutes les données équipe (noms, bios, photos, LinkedIn)
- [ ] Fournir données CA (6 membres)
- [ ] Fournir adresse complète + téléphone
- [ ] Fournir vrais témoignages (avec accords)
- [ ] Valider liste des partenaires
- [ ] Valider les tarifs Innovation Corporative
- [ ] Fournir logos partenaires SVG
- [ ] Fournir validation juriste des pages légales

### Phase 2 — Contenu & blog (2-3 semaines)
*Objectif : site complet avec contenu réel*

- [ ] Créer page `/actualites/[slug]` avec rendu MDX
- [ ] Migrer les 6 articles démo vers vrais articles MDX
- [ ] Créer vrais événements avec liens d'inscription
- [ ] Remplacer toutes les images Unsplash par images réelles
- [ ] Configurer analytics (Plausible ou GA4)
- [ ] Audit accessibilité complet + corrections

### Phase 3 — CMS & automatisation (optionnel, V2)
*Objectif : autonomie de l'équipe CAURIS DIGITAL*

- [ ] Intégrer Sanity.io CMS
- [ ] Migrer articles, événements, startups vers Sanity
- [ ] Interface admin pour l'équipe
- [ ] Créer pages détail `/startups/[slug]`
- [ ] Système de candidature en ligne (formulaire étendu ou Typeform)
- [ ] Intégration CRM (HubSpot ou autre)

---

*Document rédigé le 14 mai 2026 — CAURIS DIGITAL*  
*Maintenir ce document à jour à chaque sprint de développement.*  
*Ce document fait foi en cas de désaccord sur les spécifications.*
