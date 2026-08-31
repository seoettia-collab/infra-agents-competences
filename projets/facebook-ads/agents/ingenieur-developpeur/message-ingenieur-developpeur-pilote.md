# Message ingenieur-developpeur -> Pilote

MESSAGE-ID : DEV-002-R
EN-REPONSE-A : DEV-002
DATE : 2026-08-31
AGENT : ingenieur-developpeur (facebook-ads)
OBJET : Levée des réserves AUD-002 (R1 → R7 + mineures)

---

## 1. Hashes réellement lus

**Hub `infra-agents-competences`** — `main` `ed33ed1b5242d9cadc145328018250b00ff257a3`
Lus : `gouvernance-projet.md`, `standards-communs/organisation-agents.md`
(dont règle 14), `fiche-ingenieur-developpeur.md`,
`message-pilote-ingenieur-developpeur.md` (DEV-002),
`referentiel-initial.md` (DOC-001),
`message-architecte-concept-pilote.md` (ARCH-001-R),
`message-auditeur-pilote.md` (AUD-002-R), et mon propre DEV-001-R.

**`facebook-ads-backend`**
- `main` : `b297f75ce874799b428435e229d177a570e56944` (référence, non modifiée)
- `dev-001-boucle-qualite` : `c4bad743ffc1a81fd699e0989dd4ca96c177bbc9` (base auditée)
- **`dev-002-corrections-audit`** (branche fille, travail de ce lot) :
  `045267e0bfca3254954813736a47e26ec4f9e95a`
- `saas` : `8152f03806bc7b297b35367a7d4ab49ee68cd3ff` — non lue, non touchée

**`facebook-ads-frontend`**
- `main` : `7975a80e1c1b42880d9be2a4faf0dbb8ecf58882` (référence, non modifiée)
- **`dev-002-qualification-ui`** (branche fille) :
  `4b7414afc946e6962cc8c552c23fd20328630e93`
- `saas` : `7e2b8464831fdaa27aec0ede00468c1d39695598` — non touchée
- Lu pour R6 : `js/conversions.js` (panneau de détail lead, helpers
  `normalizeFormKey` / `extractFormField`), `js/config.js`, `css/conversions.css`

Diff DEV-002 seul : 15 fichiers, +1264 / −65.

---

## 2. Corrections R1 → R7

### R1 — BLOQUANT — le palier persisté reflète le résultat frais

`savePredictive()` écrivait `tier = COALESCE(lead_scores.tier, excluded.tier)` :
l'ancien palier survivait au recalcul. Un lead exclu à 0 point restait affiché
palier A — faux exactement là où l'utilisateur regarde.

Le palier et les exclusions persistés passent désormais par
`resolvePersistedState()`, appelée à chaque écriture. Règle : exclusions
effectives non vides ⇒ `tier = 'D'`, sans exception. Le scénario exact de
l'audit est rejoué en test (calcul, invalidation des coordonnées, recalcul,
relecture de la ligne stockée **et** de `leads.score_tier`), avec le cas
symétrique de remontée du palier.

### R2 — MAJEUR — les exclusions du terrain survivent au recalcul

Les exclusions constatées au téléphone sont stockées à part
(`lead_scores.consolidated_exclusions`, colonne migrée). Un recalcul prédictif,
et donc un `POST /recompute` après changement de pondération, ne peut plus les
effacer : les exclusions effectives sont l'union des consolidées et des
fraîches. Seul un nouveau score consolidé les remplace explicitement.

Trois tests : survie au recalcul prédictif, remplacement légitime par un
nouveau consolidé, survie au `recomputeAll()` global. Le détail affiché
continue de montrer les exclusions, et l'alerte `QUALITE_PART_HORS_ZONE` cesse
donc de sous-estimer le hors-zone.

### R3 — MAJEUR — garde-fou de couverture

Le constat de l'audit tenait : neutraliser les critères sans information est la
bonne idée, mais sans correctif elle inverse le classement. Le lead dont on ne
savait rien sortait à 100/100 palier A devant le lead renseigné à 58.

Correctif déterministe et explicable, sans valeur métier inventée :
`confiance = min(1, couverture / seuil)` puis `score = brut × confiance`.
Le score brut, la couverture et la confiance restent consultables ; le score
pondéré est celui qui trie et qui fixe le palier.

Scénario de l'audit rejoué :

| Cas | Avant | Après |
|---|---|---|
| Lead presque inconnu (couverture 10 %) | 100 · A | **25 · C** |
| Lead renseigné (couverture 40 %) | 58 · B | **100 · A** |
| Lead sans coordonnées | 0 · D | 0 · D (inchangé) |

La couverture devient visible : ligne dédiée dans `score_breakdown`
(« Information disponible : 10 % de la grille — score brut 100 pondéré à 25 »),
colonnes `coverage_pct` et `confidence` persistées.

Une couverture insuffisante bloque aussi E2 : un lead qu'on n'a pas vérifié ne
se qualifie pas, même si le peu qu'on en sait est bon.

Le seuil (`scoring.min_coverage_pct`, `min_coverage_pct_for_e2`) est un
paramètre **provisoire** comme les autres, listé dans `provisional_params`, et
le garde-fou est désactivable. Cinq tests, dont l'égalité stricte
`score = round(brut × confiance)` qui verrouille le déterminisme.

### R4 — MAJEUR — lecture des vraies clés de formulaire

`services/lead-form-fields.js` reprend la logique déjà éprouvée du frontend
(`normalizeFormKey` / `extractFormField`) plutôt que d'en inventer une seconde :
backend et frontend lisent désormais la même chose.

Sont lus, sur les formes réelles décrites par AUD
(`quel_type_de_projet_avez-vous_?`, `budget_estimé_?`,
`quand_souhaitez-vous_démarrer_les_travaux_?`) : type de projet, budget, délai
de démarrage, code postal, statut d'occupation (propriétaire/locataire →
décisionnaire).

- L'horizon de démarrage — le critère le plus décisif du déclaratif — est
  maintenant lu et crédité.
- `salle_de_bain` déclenche la reconnaissance métier (valeurs nettoyées de
  leurs underscores avant comparaison).
- Une fourchette de budget est ramenée à sa **borne basse** : hypothèse
  prudente, déclarée telle quelle plutôt qu'une moyenne qui aurait l'air d'une
  donnée.
- Le libellé « Déclencheur identifié » ne s'affiche plus quand aucun
  déclencheur n'a été identifié : le ratio plancher de 0,2 est supprimé et
  l'entrée est retirée du breakdown. Un libellé qui affirme le contraire de ce
  qui s'est passé abîmait la contestabilité recherchée par ARCH §3.5.

Un formulaire vide ne produit aucune valeur : tout reste `null`, donc
information manquante, jamais information neutre.

### R5 — MAJEUR — les alertes s'exécutent seules

`services/quality-scheduler.js`, calqué sur les deux planificateurs existants
(`syncService`, `auto-sms-service`) : démarrage unique, délai initial de 90 s,
intervalle configurable (`QL_ALERTS_INTERVAL_MS`, 1 h par défaut), `unref()` sur
l'intervalle, exécution entièrement enveloppée.

Le délai initial évite le bruit au démarrage : sans lui, on alerterait sur une
boucle « muette » qui n'a simplement pas encore démarré sa première sync. La
déduplication existante est conservée telle quelle.

Démarré depuis `server.js` sous `try/catch` : une feature auxiliaire ne doit
jamais empêcher le serveur de se lever. Quatre tests, dont un qui simule une
panne du moteur d'alertes et vérifie qu'elle ne remonte pas, et un qui vérifie
qu'un second `start()` ne crée pas de double planification.

### R6 — MAJEUR — la boucle peut produire E2

**Saisie post-contact (frontend).** Carte « Qualification après contact » dans
le panneau de détail du lead existant, à côté du Rédacteur IA — aucune nouvelle
architecture, aucun nouvel écran. Champs : zone desservie, décisionnaire,
métier, faisabilité, horizon, visite acceptée, budget annoncé, ampleur estimée,
délai de réponse, et trois signaux négatifs (comparateur de prix, démarchage,
doublon).

Les champs inconnus restent sur « ? » et ne sont pas envoyés : une information
absente vaut mieux qu'une information inventée, et la couverture le reflète.
Le bouton appelle `POST /api/quality/score/:id/consolidated`, puis affiche le
score, le palier, le verdict, la couverture et le caractère provisoire du
barème, avant de rafraîchir la liste.

ARCH respecté : décision humaine prioritaire (l'override reste disponible),
aucun rejet automatique. Un lead sous le seuil affiche explicitement « relance
possible — aucun rejet automatique » et conserve son statut CRM. Test de
bout en bout vérifiant qu'aucun statut n'est modifié par le moteur.

**Chemins événementiels complétés.**
- Statut CRM `terminé` (et `termine`) → `E1, E3, E4, E5`. C'est le statut
  terminal réel du pipeline, celui qui protège le lead de la résurrection dans
  `upsertLead()` ; il ne produisait rien, donc jamais la vérité terrain du
  calibrage. Idempotence vérifiée : rejouer le statut ne recrée rien.
- SMS **automatique** (`auto-sms-service.js`) → E1, comme le SMS manuel. C'est
  le chemin de contact réel de la production ; la couverture de E1 était donc
  inverse de l'usage. Test explicite : les deux chemins produisent un seul E1,
  jamais deux.

### R7 — BLOQUANT — l'ingestion des leads est défensive

`upsertLead()` construit son INSERT à partir des colonnes réellement présentes
dans `leads` (cache invalidable). Si l'initialisation du schéma qualité a
échoué, le lead est écrit quand même, sans attribution, et l'écart est
journalisé **une fois** en erreur explicite. Le cœur d'ingestion ne peut plus
être cassé par une feature auxiliaire.

En complément, l'échec d'initialisation n'est plus un log noyé : il est signalé
comme CRITIQUE avec sa conséquence (« boucle qualité inopérante, ingestion
préservée »).

Test reproduisant l'échec : base construite sans les colonnes d'attribution,
INSERT défensif, lead écrit. Plus deux tests sur base saine vérifiant que
l'attribution est bien écrite et qu'un re-sync sans attribution n'écrase pas
une attribution connue.

---

## 3. Réserves mineures traitées

- **m1** — `adset_id` est maintenant demandé à Graph (`fields` de `syncLeads`
  complété avec `adset_id,adset_name`) et réellement alimenté. Vérifié par test.
- **m2** — L'inventaire du garde-fou passe de **4 à 11 marqueurs** : toutes les
  interdictions Pixel/CAPI de `routes/ai.js` et `services/claude-api.js` sont
  couvertes. Les 11 sont vérifiés présents dans le code par test. La garantie
  annoncée en DEV-001-R est désormais vraie sans réserve.
- **m3** — Les valeurs de configuration sont validées : somme des poids = 100,
  bornes 0–100 sur les seuils, montants strictement positifs, structure des
  paliers. `capi.enabled = true` est **refusé par API** : l'activation relève du
  lot d'activation, avec amendement des prompts et arbitrage RGPD.
- **m4** — Le commentaire qui parlait de « redistribution » est corrigé : le
  poids d'un axe inopérant est **retiré du dénominateur**, ce qui est
  précisément ce que le garde-fou R3 vient compenser.
- **m5** — Le scheduler rattrape à chaque passage les leads jamais scorés
  (`backfillUnscoredLeads`). Les leads **Messenger** sont désormais scorés eux
  aussi (`routes/webhook.js`, deux chemins de création). La condition qui
  faisait fabriquer une justification heuristique par le frontend
  (`score_breakdown` vide + `score = 50`) cesse donc de s'appliquer au parc.

Non traité, hors périmètre DEV-002 : **AUD-M4** — `calculateLeadScore()` reste
actif dans le frontend, deux scores contradictoires coexistent toujours. Sa
suppression touche du code d'affichage hors du périmètre de ce lot ; à arbitrer.

---

## 4. Fichiers

**Backend — créés** : `services/lead-form-fields.js`,
`services/quality-scheduler.js`, `tests/dev-002-corrections.test.js`.

**Backend — modifiés** : `config/quality-loop.defaults.js` (bloc `scoring`,
commentaire m4), `services/lead-scoring.js` (R1, R2, R3, R4, breakdown),
`services/quality-schema.js` (colonnes `consolidated_exclusions`,
`coverage_pct`, `confidence`), `services/quality-config.js` (validation m3),
`services/database.js` (R7), `services/lead-events.js` (R6 `terminé`),
`services/auto-sms-service.js` (R6 E1), `services/syncService.js` (m1),
`services/capi-prompt-guard.js` (m2), `routes/webhook.js` (m5), `server.js`
(R5), `docs/BOUCLE_QUALITE_DEV-001.md`.

**Frontend — modifiés** : `js/conversions.js` (carte de qualification +
`submitQualification`), `css/conversions.css` (styles, tokens du design
system v2).

---

## 5. Tests

`npm test` — **65 tests, 65 réussis, 0 échec**, dont **30 nouveaux** dans
`tests/dev-002-corrections.test.js`, tous issus des scénarios AUD-002 :

- R1 (2) : persistance du palier après recalcul, à la baisse et à la hausse.
- R2 (3) : survie des exclusions consolidées au recalcul prédictif, au
  `recomputeAll`, et remplacement légitime par un nouveau consolidé.
- R3 (5) : inversion du classement corrigée, déterminisme du produit
  brut × confiance, couverture visible dans le breakdown, garde-fou
  désactivable et paramétrable, blocage de E2 sur couverture insuffisante.
- R4 (5) : lecture des libellés accentués et ponctués, reconnaissance métier
  depuis le type de projet, suppression du libellé de déclencheur mensonger,
  crédit d'un déclencheur réel, formulaire vide sans valeur inventée.
- R5 (4) : passage du scheduler, démarrage unique, panne absorbée, backfill.
- R6 (4) : `terminé` → E5 idempotent, E1 unique entre SMS auto et manuel,
  qualification de bout en bout, absence de rejet automatique.
- R7 (3) : INSERT sur base sans colonnes d'attribution, attribution écrite sur
  base saine, protection COALESCE au re-sync.
- Mineures (2) : inventaire du garde-fou complet, validation des valeurs de
  configuration.

Contrôles complémentaires : `node --check` sur tous les fichiers touchés
(backend et frontend), démarrage réel du serveur avec scheduler actif et
migrations appliquées, `git diff --stat` contre `main` sur les deux dépôts.

---

## 6. Commits

- Backend `dev-002-corrections-audit` :
  `045267e0bfca3254954813736a47e26ec4f9e95a`
- Frontend `dev-002-qualification-ui` :
  `4b7414afc946e6962cc8c552c23fd20328630e93`

Les deux branches sont poussées.

---

## 7. Réserves restantes

1. **R2 du Gérant — divergence `main` / `saas`** : toujours non arbitrée. Les
   branches restent isolées.
2. **Ticket moyen et enveloppes** (ARCH §5.2) : toujours `null`, l'axe
   « cohérence économique » reste inopérant. C'est aussi ce qui plafonne la
   couverture maximale atteignable, donc ce qui pèse le plus sur le garde-fou
   R3. Premier paramètre à fixer.
3. **Zone desservie** : `zone.code_postal_prefixes` toujours vide. Le code
   postal est désormais lu dans les formulaires, mais il n'est comparé à rien.
   Second paramètre à fixer, et le plus rentable : c'est la première exclusion
   sèche en volume.
4. **Seuils chiffrés** (ARCH §5.1) : seuil E2, pondérations, seuils d'alerte,
   et désormais seuil de couverture. Tous provisoires, tous exposés dans
   `provisional_params`.
5. **Base légale RGPD et périmètre des données** (ARCH §5.3) : bloquant pour
   toute activation CAPI.
6. **AUD-M4** : double score frontend (`calculateLeadScore()`) non traité,
   hors périmètre — à arbitrer.
7. **Calibrage** : la boucle peut maintenant produire E2, mais aucune donnée
   réelle n'existe encore. Le rapprochement score/issue d'ARCH §3.6 ne devient
   exploitable qu'après quelques semaines d'usage.

---

## 8. Confirmations de verrous

- Aucun merge vers `main`. Backend `main` reste `b297f75c…`, frontend `main`
  reste `7975a80e…`.
- Aucun toucher à `saas`. Backend `saas` reste `8152f038…`, frontend `saas`
  reste `7e2b8464…`. Branche gelée respectée.
- Aucun déploiement production, ni Render ni Netlify.
- Aucun événement CAPI réel. `dispatch()` lève toujours une erreur
  inconditionnelle ; le garde-fou compte désormais 11 interdictions actives et
  `capi.enabled` ne peut plus être activé par API.
- Aucun secret consulté ni écrit dans un fichier versionné.

---

— ingenieur-developpeur · facebook-ads
