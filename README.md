# Studio ABC·M2PA

**Application web autonome** destinée à l'**ingénieur pédagogique** (formateur, enseignant, concepteur de parcours) qui veut **concevoir et scénariser une formation sur plusieurs séances** en s'ancrant sur l'**ABC Learning Design**, tout en intégrant **dès la conception** les codes de la **M2PA** (Méthode de Planification Pédagogique de l'Accessibilité), dans l'esprit de la **Conception universelle de l'apprentissage (CUE-A / CUA)**.

- 100 % local : aucun backend, aucune donnée envoyée sur un serveur, persistance dans le navigateur (localStorage), fonctionne hors ligne.
- UI en français, thème clair/sombre, charte graphique du projet « compétences » (preset shadcn `b20tL3xCXS` : style vega, base taupe, police Raleway).

## Parcours de l'application

```
Accueil (liste des séquences) → /sequence/[id]
   1 · Cadrage (M2PA)  →  2 · Storyboard ABC LD  →  (V1.1 : Différenciation N2/N3)  →  Export
```

### 1 · Cadrage (formulaire inspiré de la fiche de cadrage M2PA de la forge)

Réutilise le formulaire de cadrage du projet [M2PA sur la forge](https://forge.apps.education.fr/m2pa/m2pa.forge.apps.education.fr) (`rag/m2pa-cadrage-v2-fiche-amelioree.md`) :

- informations de la séquence (titre, niveau, discipline, nombre de séances, durée totale, effectif) ;
- **objectif pédagogique** vs **objectif d'apprentissage**, activité support, prérequis, critères de réussite (communs, non abaissés) ;
- **identification amont des obstacles potentiels**, à partir du catalogue des **10 obstacles transversaux** M2PA rattachés aux **4 domaines de fonctionnement** (affectif, cognitif, psychomoteur, social) ;
- contexte et variables : **4 modalités de présence** (présentiel, synchrone distanciel, asynchrone distanciel, asynchrone présentiel/atelier), plateforme (Moodle en V1 ; Google Classroom et Apple Classe en roadmap), contraintes ;
- rappel des **8 besoins partagés** du niveau 1 (N1), toujours actifs dans la scénarisation générale.

### 2 · Storyboard ABC Learning Design

Tableau **multi-séances** construit par **étiquetage** : chaque activité est une carte étiquetée —

- **type ABC LD** (6 types, code couleur : Acquisition, Collaboration, Discussion, Enquête, Production, Pratique/Entraînement — Young & Perović, UCL, issus du *Conversational Framework* de Laurillard) ;
- **modalité de présence** (les 4 volets ci-dessus) ;
- **outil numérique** : correspondance type ABC → ressources/activités **Moodle (ELEA)**, **H5P** et outils externes (source : DRANE Guyane) ;
- **durée** en minutes.

**Panneau de synthèse automatique** : temps par type ABC (acquisition vs collaboration…), pluralité des modalités de présence, synthèse des outils utilisés, et alertes de cohérence (0 collaboration, une seule modalité, aucun outil, durée dépassant le cadrage, types ABC manquants).

### 3 · Différenciation (V1.1)

Prévu : leviers N2 (contenus / processus / productions) sur chaque activité, et fiches N3 par apprenant à besoins particuliers (chaîne M2PA : domaine → obstacle transversal → manifestation contextualisée → besoin « Besoin de… pour… » → adaptation ciblée → fonction d'aide → vigilance), en partant des obstacles identifiés au cadrage.

### Export

Format **tableau intégré à l'ABC LD**, pensé pour la coopération et les outils numériques — volontairement **pas d'export Word/LibreOffice** :

- **Markdown** (copiable directement dans Moodle, un ENT, un wiki, un pad) ;
- **CSV**, **HTML** autonome imprimable, **JSON** (réimportable dans l'app) ;
- impression navigateur.

## Stack technique

- **Vite + SvelteKit** (`adapter-static`, build 100 % statique avec fallback SPA) + **Svelte 5** (runes) + **TypeScript** strict
- **Tailwind CSS v4** + **shadcn-svelte** (style vega, preset `b20tL3xCXS`, icônes Tabler) — composants dans `src/lib/components/ui`
- Store réactif en `.svelte.ts` (`$state`), persistance `localStorage`, aucun appel réseau
- Structure : `src/lib/types.ts` (modèle), `src/lib/data/` (référentiels ABC/M2PA/Moodle), `src/lib/stores/`, `src/lib/compteurs.ts`, `src/lib/export.ts`, `src/lib/components/` (métier)

## Installation et démarrage

```bash
git clone https://github.com/sambarnades/Studio-ABC-M2PA.git
cd Studio-ABC-M2PA
npm install
npm run dev      # développement
npm run build    # production → build/ (site statique déployable tel quel)
npm run preview  # prévisualisation du build
npm run check    # svelte-check
```

Prérequis : Node.js 20+ (testé avec Node 22).

## Roadmap

- [x] V1 : accueil multi-séquences, cadrage M2PA, storyboard ABC LD étiqueté multi-séances, synthèse + alertes, export MD/CSV/HTML/JSON, persistance locale, Moodle (ELEA + H5P)
- [ ] V1.1 : onglet Différenciation (N2 par activité, fiches N3), connecteurs Google Classroom et Apple Classe
- [ ] Import de storyboard existant, bibliothèque d'activités types, édition coopérative

## Références

- [M2PA — académie de Nantes](https://pedagogie.ac-nantes.fr/poles-et-actions-educatives/ecole-inclusive/boite-a-outils/accessibilite-pedagogique-et-pedagogie-universelle/m2pa-methode-de-planification-pedagogique-de-laccessibilite)
- [Planification pour tous les apprenants (PAL) et CUA — Reverbère](https://reverbereeducation.com/conception-universelle-de-lapprentissage-cua/planification/) (le PAL n'est pas un onglet : la M2PA le remplace ici)
- [Scénariser avec l'ABC Learning Design — DRANE Guyane](https://dane.ins.ac-guyane.fr/scenariser-son-enseignement-a-l.html) (correspondance ABC LD ↔ Moodle ELEA / H5P)
- [Projet M2PA sur la forge de l'Éducation nationale](https://forge.apps.education.fr/m2pa/m2pa.forge.apps.education.fr) (formulaire de cadrage, catalogue des obstacles transversaux, niveaux N1/N2/N3 — Ryckebusch, Carra & Cadalen, 2026)
- Young, C. & Perović, N. (2015). *ABC Learning Design*, UCL — [abc-ld.org](https://abc-ld.org) (storyboards dérivés sous licence CC BY-NC-SA)
- Laurillard, D. (2012). *Teaching as a Design Science*
- CAST (2024). [Directives de la CUE-A v3.0](https://udlguidelines.cast.org)
