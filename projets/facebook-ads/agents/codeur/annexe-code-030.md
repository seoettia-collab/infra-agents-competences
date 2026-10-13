# Annexe CODE-030 — vérifications et livraison

## Bases et livraison

- Pré-vol initial du hub : `6562b25eb9bced417e65a684c05be9b9f67c2306`.
- Backend main de départ : `359225f3ba612118de298926f18cf32abced3556`.
- Frontend main de départ : `f503aab2b691f4f9c6a03945da84981850c51d6c`.
- Branche isolée des deux dépôts : `code-030-history-metrics`.
- Backend publié sur main : `ea239c3b683e164b03dd2f4856689641d128baf2`.
- Frontend publié sur main : `66a2189fff4f7630fb267cbf58b330e31ab5037d`.
- Arbres publiés identiques aux arbres testés localement ; références main vérifiées et mises à jour avec contrôle du SHA attendu.
- Déploiement Render `dep-db6s3u6q1p3s73elvor0`, statut live à `2026-10-13T05:31:55.629809Z`.
- Unique service Render concerné : `srv-d6cq3hi4d50c73aa1rkg`, workspace `tea-d4qdtsali9vc739s5000`.
- Frontend Netlify : script déployé identique au fichier local testé.

## F01 — historique

- `/api/ai/copilot-latest` impose `restored: true`, `historical: true`, `actionable: false`, même si les métadonnées historiques manquaient.
- Les rapports sources restaurés reçoivent les mêmes marqueurs.
- Le frontend impose aussi ces marqueurs lors de la restauration.
- La date et le caractère historique restent visibles ; les recommandations restent consultables.
- Exécution individuelle, application groupée, confirmation groupée et vérification « c'est fait » sont bloquées avant tout appel réseau.
- Boutons d'action, de traitement et de navigation depuis les recommandations masqués ; bouton de relance explicite.
- Une analyse lancée ou échouée ne déverrouille pas l'ancien rapport ; une nouvelle analyse réussie permet les actions.
- Test avec une recommandation pause actionnable : aucun bouton d'exécution historique, aucun appel réseau via les quatre entrées ; nouvelle analyse : boutons réactivés.
- Rapport réel restauré : date `2026-10-13T05:33:07.582Z`, deux recommandations visibles, aucune exécution proposée.

## F02 — métriques

- Les valeurs absentes, vides, invalides et les ratios sans dénominateur restent indisponibles.
- Une somme partiellement inconnue reste inconnue ; une action lead absente ne fabrique pas un zéro.
- Un vrai zéro est conservé lorsque les mesures permettent son calcul.
- Le CPM n'étant pas collecté dans ce chemin, il reste null ; aucune nouvelle collecte ou formule CPM introduite.
- Le contexte numérique envoyé à la performance IA emploie `indisponible` ; l'audit emploie aussi cette mention pour les leads et le CPL absents.
- Le tableau des cinq métriques affiche « — » pour l'absence, avec une légende explicite.

## Analyse réelle après déploiement

- POST `/api/ai/copilot-orchestrate`, période today, filtre active ; aucun endpoint de mutation Meta appelé.
- Analyse terminée le 13/10/2026 à 05h33 UTC / 07h33 Paris ; performance et audit réussis.
- Source performance : CPM, CPL et taux de conversion indisponibles ; CPC agrégé ≈ 0,515€ ; CTR agrégé ≈ 3,016%.
- Extension : 71 impressions, 0 clic mesuré, CTR 0%, CPC/CPL/CPM/conversion indisponibles.
- Salle de bain : 360 impressions, 13 clics, CPC ≈ 0,445€, CTR ≈ 3,611%, CPL/CPM/conversion indisponibles.
- Le bloc métriques du prompt a été reconstruit avec la fonction de production depuis le périmètre renvoyé par la source performance ; son contexte est identique à `meta.metrics_context`, issu des mêmes données que l'appel IA.
- Aucun CPM/CPL/taux de conversion absent n'apparaît comme 0 dans ce bloc ; les métriques individuelles inconnues sont null dans le contexte structuré.
- Rendu avec le script frontend réellement servi et le JSON réellement restauré : sept cellules indisponibles « — », CTR mesuré 0% conservé, date visible, aucun bouton d'exécution.
- Deux actions finales `info_only`, non exécutables ; apprentissage protégé, ancienneté d'environ 9,3 heures.

## Validation

- Node 20.11.1 ; backend `DATA_DIR` temporaire et PORT 39303.
- `node --test tests/*.test.js` : backend 101/101, frontend 10/10 ; aucun échec ni test ignoré.
- `node --check` réussi sur tous les fichiers JavaScript modifiés et ajoutés avant commit.
- `git diff --check` réussi ; moteurs, modèles, réduction, HOUSING, D5 et règles 72 heures inchangés.
- F03 à F06 non traités conformément à la mission ; Studio Pub et Rédacteur IA inchangés.
- Détails numériques et preuves structurées : `preuves-code-030.json`.

## Fichiers modifiés dans les dépôts de code

- Backend : `routes/ai.js`, `services/ai-delivery-scope.js`, `services/claude-api.js`, nouveau `services/ai-metrics.js`, nouveau `tests/code-030-metrics-history.test.js`.
- Frontend : `js/ai-recommendations.js`, nouveau `tests/code-030-copilot-history.test.js`.
