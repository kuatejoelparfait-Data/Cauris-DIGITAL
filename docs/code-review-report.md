# Rapport de revue de code — CAURIS DIGITAL

> **Généré le :** 2026-06-01  
> **Branche :** `main`  
> **Derniers commits analysés :** `0297aa4` → `a174c80` (5 commits, ~1 006 lignes ajoutées)  
> **Outil :** Analyse statique locale (gh CLI non disponible)

---

## Résumé des changements récents

| Commit | Périmètre | Lignes |
|--------|-----------|--------|
| `0297aa4` | SEO — sitemap mis à jour | +2 |
| `1e85574` | Bandeau consentement cookies (RGPD) | +114 |
| `6f6957c` | Pages Mentions légales + Politique confidentialité | +228 |
| `6a9b600` | Blog Actualités — catégories + pagination | +295 |
| `a174c80` | Page Événements — onglets À venir/Passés | +267 |

---

## ✅ Points forts

### Architecture & qualité générale
- **Typage TypeScript strict** : interfaces claires (`Event`, `Article`, `Consent`) avec unions de types explicites.
- **Séparation des responsabilités** : données mockées isolées en constantes en tête de fichier, clairement marquées `// à remplacer par CMS`.
- **`useMemo` utilisé correctement** dans `EventsExplorer` et `NewsExplorer` pour éviter les recalculs coûteux.
- **Accessibilité (a11y)** : `role="dialog"`, `aria-labelledby`, `aria-describedby`, `aria-label` et `aria-hidden` bien positionnés dans le `CookieBanner`. `role="tablist"` + `aria-selected` dans `EventsExplorer`.
- **Protection SSR/CSR** dans `CookieBanner` : le double état `mounted` évite les erreurs d'hydratation.
- **SEO** : `layout.tsx` complet avec Open Graph, Twitter Card, `metadataBase`, `robots` et skip-link d'accessibilité.
- **Honeypot anti-spam** dans `route.ts` contact : simple et efficace.
- **Sitemap typé** avec `MetadataRoute.Sitemap` et `NEXT_PUBLIC_SITE_URL` en variable d'environnement.

---

## ⚠️ Points à corriger

### 1. APIs de contact/newsletter — fausse confirmation à l'utilisateur (risque UX)

**Fichier :** [`src/app/api/newsletter/route.ts`](../src/app/api/newsletter/route.ts)  
**Problème :** La route renvoie `success: true` et le message *"Confirmation envoyée par email"* alors qu'aucun email n'est envoyé. L'utilisateur croit avoir reçu une confirmation.

```ts
// Actuel (trompeur)
return NextResponse.json({
  success: true,
  message: 'Inscription enregistrée. Confirmation envoyée par email.',
});
```

**Correction suggérée :**
```ts
return NextResponse.json({
  success: true,
  message: 'Inscription enregistrée. Vous recevrez bientôt nos actualités.',
});
```

Même remarque pour `route.ts` contact ligne 55 : *"Réponse sous 48h ouvrées"* — vrai pour la phase 2, mais trompeur si aucun email n'est envoyé côté serveur.

---

### 2. Images Unsplash hardcodées dans `NewsExplorer` — CORS & performance

**Fichier :** [`src/components/sections/NewsExplorer.tsx:33`](../src/components/sections/NewsExplorer.tsx)  
**Problème :** URLs `images.unsplash.com` en dur dans les données mock. Si Next.js Image Optimization est activé ultérieurement, ces domaines devront être whitelistés dans `next.config`. En l'état, le `<img>` natif sans `next/image` ne bénéficie pas du lazy loading optimisé.

**Correction suggérée :** Remplacer par `next/image` avec `fill` ou dimensions fixes, et whitelister `images.unsplash.com` dans `next.config.js`.

---

### 3. Liens d'inscription événements — `href="#"` non fonctionnel

**Fichier :** [`src/components/sections/EventsExplorer.tsx:33`](../src/components/sections/EventsExplorer.tsx)  
**Problème :** Tous les `registerUrl` valent `"#"`. L'utilisateur clique sur "S'inscrire" et la page remonte sans action.

**Correction suggérée :** Désactiver le lien ou le remplacer par un bouton `disabled` avec tooltip *"Inscription bientôt disponible"* jusqu'à la phase 2.

---

### 4. `today` recalculé à chaque rendu dans `EventsExplorer`

**Fichier :** [`src/components/sections/EventsExplorer.tsx:130`](../src/components/sections/EventsExplorer.tsx)  
**Problème :** `const today = new Date().toISOString().slice(0, 10)` est déclaré dans le corps du composant et inclus dans les dépendances de `useMemo`. Il change de référence à chaque rendu (même si sa valeur est stable pour une session).

```ts
// Actuel
const today = new Date().toISOString().slice(0, 10); // nouvelle string à chaque rendu

const { upcoming, past } = useMemo(() => { ... }, [today]); // se recalcule inutilement
```

**Correction suggérée :**
```ts
const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
```

---

### 5. `NewsExplorer` — clé de pagination non réinitialisée sur changement de catégorie via recherche

**Fichier :** [`src/components/sections/NewsExplorer.tsx:169`](../src/components/sections/NewsExplorer.tsx)  
**Problème :** Le `onChange` de l'input remet `page` à 1, mais la variable `safePage = Math.min(page, totalPages)` gère le dépassement silencieusement. Ce n'est pas un bug bloquant, mais si `page` vaut 3 et `totalPages` vaut 1 après filtrage, l'affichage est correct mais l'état interne reste incohérent.

**Correction suggérée :** Réinitialiser `page` à 1 dans `handleCategoryChange` (déjà fait ✅) et aussi dans le `onChange` de l'input (déjà fait ✅ à la ligne 171). C'est en réalité bien géré — **point fermé**.

---

### 6. `CookieBanner` — fermer ≠ refuser (UX RGPD ambiguë)

**Fichier :** [`src/components/layout/CookieBanner.tsx:103`](../src/components/layout/CookieBanner.tsx)  
**Problème :** Le bouton `X` (fermer) appelle `handleChoice('refused')`. Fermer un bandeau ≠ refuser activement. Selon les recommandations CNIL, l'action de fermeture doit être neutre ou équivalente à un refus explicite *documenté*. Le comportement actuel est défendable mais nécessite une mention dans la politique de confidentialité.

**Suggestion :** Ajouter dans la page politique de confidentialité : *"La fermeture du bandeau sans choix est traitée comme un refus des cookies non essentiels."*

---

### 7. Pas de `rate limiting` sur les API routes

**Fichiers :** `src/app/api/contact/route.ts`, `src/app/api/newsletter/route.ts`  
**Problème :** Aucun rate limiting. En production, un bot peut spammer les endpoints.

**Correction suggérée (phase 2) :** Utiliser `@upstash/ratelimit` + Redis, ou activer le WAF Vercel, ou ajouter un token reCAPTCHA.

---

## 📋 Checklist pour la prochaine PR

- [ ] Corriger le message de confirmation newsletter (ne pas promettre d'email non envoyé)
- [ ] Remplacer `<img>` par `next/image` dans `NewsExplorer` + whitelist Unsplash dans config
- [ ] Désactiver ou afficher comme indisponibles les liens `href="#"` dans `EventsExplorer`
- [ ] Extraire `today` dans un `useMemo([], [])` dans `EventsExplorer`
- [ ] Documenter le comportement "fermeture = refus" dans la politique de confidentialité
- [ ] Planifier l'intégration rate limiting avant mise en production (phase 2)
- [ ] Vérifier que `og-image.jpg` existe dans `/public` (référencé dans `layout.tsx`)

---

## 📊 Score de qualité global

| Critère | Note |
|---------|------|
| Qualité du code TypeScript | ⭐⭐⭐⭐⭐ |
| Accessibilité | ⭐⭐⭐⭐⭐ |
| SEO | ⭐⭐⭐⭐⭐ |
| Sécurité API | ⭐⭐⭐ (rate limiting manquant) |
| UX formulaires | ⭐⭐⭐ (messages trompeurs) |
| Performance images | ⭐⭐⭐ (img natif vs next/image) |
| **Global** | **⭐⭐⭐⭐** |

---

*Ce rapport est mis à jour manuellement à chaque PR. Pour l'automatiser, installer `gh` CLI et relancer `/review`.*
