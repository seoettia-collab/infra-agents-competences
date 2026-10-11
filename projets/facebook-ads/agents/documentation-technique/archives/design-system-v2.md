# Archive — Design System v2 (frontend)

Fiche de trace. Le chantier est terminé et fusionné ; ce document existe pour
qu'on n'ait plus besoin des fichiers de patch qui traînaient dans le contexte du
projet Claude.

## Ce que c'était

Refonte visuelle du dashboard en deux temps, mai 2026 :

1. **UI-DESIGN-01** — `css/redesign.css`, override progressif chargé en dernier :
   coins carrés partout, bordures 1 px, accent indigo `#6e7bff` à la place du bleu
   Facebook, orange Mistral `#F5B041` sur les titres, Plus Jakarta Sans en corps
   et JetBrains Mono sur les chiffres, suppression des gradients et des ombres.
   Réversible en commentant la balise `<link>`.
2. **UI-DESIGN-02** — `css/ui_kit_components.css` + `js/ui_kit_sparklines.js` :
   structure que l'override seul ne pouvait pas produire — sidebar 232 px sticky,
   topbar (fil d'Ariane, recherche, sélecteur de période, pastille API), KPI avec
   sparklines SVG, jauge de score circulaire. Classes préfixées `.uk-*`.
   Seule rupture : `<nav class="main-nav">` remplacée par `<aside class="uk-side">`,
   et les sélecteurs `.nav-tab` migrés vers `.uk-side-item[data-view]` dans
   `js/navigation.js` et `js/api.js`.

## État

Fusionné dans `main` du dépôt `facebook-ads-frontend`. Les branches
`redesign/sharp-flat-system` et `redesign/ui-kit-complete` sont à zéro commit
d'avance. `index.html` charge `css/redesign.css`, `css/ui_kit_components.css` et
`js/ui_kit_sparklines.js`.

## Où vit la vérité

| Élément | Emplacement |
|---|---|
| Feuille d'override | `facebook-ads-frontend` · `css/redesign.css` |
| Composants UI Kit | `facebook-ads-frontend` · `css/ui_kit_components.css` |
| Rendu des sparklines | `facebook-ads-frontend` · `js/ui_kit_sparklines.js` |
| Structure appliquée | `facebook-ads-frontend` · `index.html` |

## Fichiers retirés du contexte du projet Claude

`redesign.css`, `ui_kit_components.css`, `ui_kit_sparklines.js` — copies des
fichiers ci-dessus, risque de corriger la copie au lieu du dépôt.
`INSTRUCTIONS_DEV.md`, `UI_KIT_INSTRUCTIONS_DEV.md` — modes d'emploi d'une
intégration terminée.
`ui_kit_layout.html` et `ui-kit-snippets.html` — gabarit de référence en double,
superseded par l'`index.html` réel.

Aucun des quatre derniers n'était versionné nulle part ; leur contenu n'avait
plus de valeur une fois le patch appliqué, d'où cette fiche plutôt qu'une copie.

## Dette liée

Fichiers frontend orphelins, non référencés par `index.html` :
`js/ads-manager-BACKUP.js`, `js/creatives.js`, `css/buttons-v2.css`,
`css/dashboard.css`, `css/styles.css`.

---
*documentation-technique — 11/10/2026*
