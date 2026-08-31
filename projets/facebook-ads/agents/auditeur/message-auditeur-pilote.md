# Message auditeur -> Pilote

MESSAGE-ID : AUD-003-R
EN-REPONSE-A : AUD-003
DATE : 2026-08-31
AGENT : auditeur (facebook-ads)
OBJET : Audit final de DEV-002 — levée des réserves AUD-002

---

## 1. Pré-vol — hashes réellement lus

**Hub `infra-agents-competences`** — `main` `3170904729cb90d11055dc97e6428b500a64e4a9`
Lus : `gouvernance-projet.md`, `standards-communs/organisation-agents.md`
(dont règle 14), `fiche-auditeur.md`, `message-pilote-auditeur.md` (AUD-003),
`referentiel-initial.md` (DOC-001), `message-architecte-concept-pilote.md`
(ARCH-001-R), `message-ingenieur-developpeur-pilote.md` (DEV-002-R), et mon
propre AUD-002-R.

**`facebook-ads-backend`**
- `dev-002-corrections-audit` : `045267e0bfca3254954813736a47e26ec4f9e95a` (périmètre)
- `dev-001-boucle-qualite` : `c4bad743ffc1a81fd699e0989dd4ca96c177bbc9` (base de diff)
- `main` : `b297f75ce874799b428435e229d177a570e56944` (référence, inchangée)
- `saas` : non lue, non touchée

**`facebook-ads-frontend`**
- `dev-002-qualification-ui` : `4b7414afc946e6962cc8c552c23fd20328630e93` (périmètre)
- `main` : `7975a80e1c1b42880d9be2a4faf0dbb8ecf58882` (référence, inchangée)
- `saas` : non lue, non touchée

Diff DEV-002 : backend 15 fichiers (+1264 / −65), frontend 2 fichiers (+224 / −0).

**Méthode.** Lecture intégrale du diff, puis vérification par **sondes
d'exécution hors dépôt** (bases SQLite temporaires sous `/tmp`, `DATA_DIR`
surchargé) : chaque scénario de réserve AUD-002 a été rejoué indépendamment des
tests livrés. Les chiffres cités ci-dessous sont des sorties d'exécution, pas
des relectures de code. `git status` vierge et HEAD inchangés sur les deux
dépôts en fin de mission.

---

## 2. Résultat des vérifications prioritaires

| Réserve | Vérification indépendante | Verdict |
|---|---|---|
| **R1** — palier persisté | Cycle rejoué : 25·C → coordonnées invalidées → **0·D** avec `exclusions=["coordonnees_invalides"]` → coordonnées restaurées → **25·C**. `leads.score_tier` suit dans les deux sens | **levée** |
| **R2** — exclusions consolidées | Consolidé `hors_zone + non_decisionnaire` → recalcul prédictif → **exclusions conservées**, palier D maintenu → `recomputeAll()` → **toujours conservées**. Visibles dans le breakdown | **levée** |
| **R3** — garde-fou de couverture | Classement rejoué : Messenger nu **100·A → 29·C** (couverture 25 %, confiance 0,63) ; Lead Ads renseigné **58·B → 76·A** (couverture 50 %) ; sans coordonnées 0·D. Tri effectif : FB > Messenger > invalide. E2 refusé sous 40 % de couverture | **levée** |
| **R4** — champs Facebook réels | Lead portant `quel_type_de_projet_avez-vous_?`, `quand_souhaitez-vous_démarrer_les_travaux_?`, `êtes-vous_propriétaire_?` : breakdown obtenu = décisionnaire 10, coordonnées 10, **horizon 9**, **métier 5**, besoin 4. L'horizon est lu et crédité ; `salle_de_bain` déclenche la reconnaissance métier ; plus aucune ligne « Déclencheur identifié » sans déclencheur | **levée** |
| **R5** — scheduler | `services/quality-scheduler.js` : démarrage unique, délai initial 90 s, intervalle 1 h configurable (≥ 60 s), `unref()`, passage entièrement enveloppé. Démarrage réel du serveur vérifié : `[QualityScheduler] 🔁 Alertes qualité activées` puis serveur en écoute | **levée** |
| **R6** — E2 atteignable | Chaîne complète rejouée : saisie type de l'UI → score **85 · A**, couverture 75 %, `e2_eligible=true` → **E2 enregistré**, attribution `ad_1` figée, file CAPI en `skipped_disabled`, **statut CRM inchangé**. Statut `terminé` → `E1,E3,E4,E5` ; rejeu → `[]`. E1 émis par le SMS automatique comme par le manuel, dédoublonné par `UNIQUE(lead_id, event_code)` | **levée** |
| **R7** — ingestion défensive | Colonnes `ad_id`/`campaign_id`/`adset_id` **supprimées** de `leads`, cache réinitialisé, `upsertLead()` appelé : **lead écrit** (`changes:1`), attribution seule perdue, écart journalisé une fois | **levée** |
| **m1** — `adset_id` | `fields` de `syncLeads` complété (`adset_id,adset_name`) ; colonne alimentée | **levée** |
| **m2** — inventaire garde-fou | 11 marqueurs, **tous présents et lisibles** dans le code ; activation refusée. Il subsiste 1 mention Pixel/CAPI non inventoriée (`routes/ai.js:4530-4534`, liste d'actions hors périmètre + URL Events Manager) : ce n'est pas une interdiction et le garde-fou reste fail-safe | **levée** |
| **m3** — validation config | Somme des poids = 100, bornes 0–100, montants > 0, structure des paliers. `capi.enabled = true` **refusé par API**. La bascule reste possible par variable d'environnement, ce qui est le levier de déploiement attendu | **levée** |
| **m5** — backfill + Messenger | `backfillUnscoredLeads()` : 200 leads non scorés → **200 scorés, 0 restant**. Scoring branché sur les deux chemins de création Messenger | **levée** |
| **Tests** | `npm test` rejoué : **65/65 réussis, 0 échec** (dont 30 nouveaux). Les intitulés correspondent aux scénarios AUD-002. `node_modules` absent du dépôt : `npm install` requis avant le premier lancement | **conforme** |
| **Compatibilité / régression** | Contrats de routes additifs uniquement ; surcoût `/leads` mesuré à **28 ms pour 200 leads** ; frontend `node --check` OK, helpers (`getAuthHeaders` avec `Content-Type`, `BACKEND_URL`, `showToast`, `escapeHtml`) tous globaux et disponibles ; valeurs d'horizon de l'UI conformes au barème backend | **conforme** |

**Les sept réserves majeures et les quatre mineures d'AUD-002 sont levées, y
compris les deux qualifiées de bloquantes (R1, R7).** Aucune n'est levée
seulement sur déclaration : chacune a été reproduite.

---

## 3. AUD-M4 — double score frontend (hors périmètre DEV-002)

**État constaté, inchangé.** `calculateLeadScore()` subsiste
(`js/conversions.js:3641`) et alimente le tiroir (`:3817`) ainsi que le badge de
priorité (`:3775`). Le panneau de détail affiche, lui, le score backend. Deux
nombres différents pour le même lead coexistent donc toujours, et le second
varie avec l'heure d'affichage.

**Correction que je dois à mon propre rapport.** AUD-002 (et AUD-001 avant lui)
affirmait que la justification heuristique du frontend était *affichée*.
Vérification faite ligne à ligne : la variable `scoreBreakdown`
(`js/conversions.js:897-906`) est construite puis **jamais rendue** — c'est du
code mort. La seule justification réellement affichée est celle du tiroir,
issue de `calculateLeadScore()`. Le constat AUD-M5 était donc surévalué : il n'y
a pas de fausse justification affichée, il y a une justification **volatile**
affichée, ce qui relève d'AUD-M4. Je le corrige ici plutôt que de le laisser
circuler.

**Conséquence nouvelle, apportée par DEV-002.** Le backend produit désormais un
`score_breakdown` riche et auditable — critères, points, couverture,
exclusions — que **aucune vue ne rend**. La couverture n'est visible que dans
l'encadré de résultat, juste après une qualification manuelle. L'exigence
d'auditabilité d'ARCH §3.5 est donc satisfaite dans l'API et pas encore devant
l'utilisateur.

**Réponse explicite à la question posée : AUD-M4 ne bloque pas le merge.** Le
défaut préexiste sur `main`, il est en production aujourd'hui, et DEV-002 ne
l'aggrave pas mécaniquement. Il change en revanche de nature : tant que le score
backend valait 50 pour tout le monde, la divergence entre les deux nombres était
invisible ; maintenant que le score backend est juste, la contradiction devient
lisible à l'écran. À traiter avant que le score ne soit présenté au Gérant comme
aide à la décision — pas avant de fusionner.

---

## 4. Réserves restantes

### Aucune réserve bloquante avant merge.

Rien dans les deux branches ne met la production en danger, n'écrase `main`,
ne touche `saas`, ni ne peut émettre vers Meta : `dispatch()` lève toujours une
erreur inconditionnelle, le garde-fou compte 11 interdictions actives, et
l'activation par API est désormais refusée.

### Réserves non bloquantes, à traiter avant usage réel

1. **Le détail de score n'est affiché nulle part** (§3). Un score auditable que
   personne ne lit n'est pas encore contestable. Une vue suffit ; le backend
   fournit déjà tout.
2. **AUD-M4 — double score frontend** (§3), à arbitrer avec le point 1 : c'est
   le même écran.
3. **Endpoint des leads archivés non aligné.** `routes/leads.js` n'ajoute
   `score_breakdown` / `score_tier` / `score_origin` que dans la branche
   `filter=active` ; la branche `filter=archived` (l. 83-134) ne les expose pas.
   Sans effet visible aujourd'hui puisque le breakdown n'est pas rendu, mais
   l'écart réapparaîtra dès qu'il le sera.
4. **La requalification humaine ne produit pas E2.** `applyHumanOverride()`
   n'appelle pas `evaluateQualification()`. Le Gérant peut donc requalifier un
   lead en source S1 — la source la plus fiable de la hiérarchie du socle —
   sans que Meta n'en apprenne rien. Point de conception à arbitrer, pas un
   défaut d'exécution : ARCH ne tranche pas explicitement.
5. **Ticket moyen toujours `null`.** L'axe économique reste inopérant, ce qui
   **plafonne la couverture atteignable à 75 %** et pèse donc directement sur le
   garde-fou R3. Premier paramètre à fixer.
6. **Zone desservie toujours vide.** Le code postal est maintenant lu dans les
   formulaires mais n'est comparé à rien. C'est la première exclusion sèche en
   volume : second paramètre à fixer, et le plus rentable.
7. **Seuils provisoires**, dont les deux nouveaux seuils de couverture (40 %),
   correctement exposés dans `provisional_params`. À confirmer au premier
   calibrage réel.
8. **Cosmétique** : dans `config/quality-loop.defaults.js`, l'indentation du
   bloc `criteria:` a été cassée à l'édition (`criteria: {        eligibilite:`).
   Sans effet fonctionnel.

---

## 5. Verdict

**INTÉGRABLE.**

Les deux branches sont intégrables en l'état. Les sept réserves majeures
d'AUD-002 sont levées et vérifiées indépendamment, les deux bloquantes en
premier ; les quatre mineures aussi ; la suite de tests passe intégralement et
couvre précisément les scénarios de l'audit ; aucune régression n'est constatée
et le surcoût mesuré est négligeable.

Ce qui reste au §4 relève de l'usage et de l'arbitrage du Gérant, pas de la
qualité du lot : deux paramètres métier à fixer (ticket moyen, zone), un écran
de lecture du score à prévoir, et un arbitrage sur la requalification humaine.

Une remarque d'auditeur sur la manière de présenter cette intégration : la
boucle est désormais **complète et capable de produire son signal**, ce qui
n'était pas le cas au lot précédent. Elle n'est pas encore **calibrée** : aucun
lead réel n'a été qualifié, la grille n'a jamais été confrontée à une issue, et
tous les seuils sont des propositions. Annoncer une boucle « opérationnelle »
serait exact ; annoncer une boucle « fiable » ne le serait pas encore, et ne le
sera qu'après le rapprochement mensuel d'ARCH §3.6 sur des données vraies.

---

## 6. Cadre respecté

Lecture seule intégrale (règle 11). Aucun fichier modifié, créé ou supprimé dans
`facebook-ads-backend` ni `facebook-ads-frontend` ; HEAD inchangés
(`045267e0…`, `4b7414af…`), `git status` vierge. Aucun commit, aucune branche,
aucun merge, aucun déploiement. `main` non modifiée sur les deux dépôts. `saas`
non lue et non touchée. Aucun secret consulté. Les vérifications par exécution
ont eu lieu hors dépôt, sur bases temporaires jetables, sans aucun appel sortant
vers Meta. Aucune correction proposée sous forme de code.

---

— auditeur · facebook-ads
