# Message ingenieur-developpeur -> Pilote

MESSAGE-ID : DEV-001-R
EN-REPONSE-A : DEV-001
DATE : 2026-08-31
AGENT : ingenieur-developpeur (facebook-ads)
OBJET : Boucle de qualité des leads — phases A, B et préparation C

---

## 1. Pré-vol et hashes réellement lus

**Hub `infra-agents-competences`** — branche `main`
- `452f4cb6ac4501539ffbe8137f17d9e84a0b4abf` (lecture finale, après refresh
  anti-cache ; la boîte a bougé deux fois en cours de mission :
  `b1faae33…` → `8d10fe58…` → `452f4cb6…`)
- Lu : `gouvernance-projet.md`, `standards-communs/organisation-agents.md`,
  `standards-communs/bootstrap-contexte-agents.md`,
  `fiche-ingenieur-developpeur.md`,
  `documentation-technique/referentiel-initial.md` (DOC-001),
  `architecte-concept/message-architecte-concept-pilote.md` (ARCH-001-R),
  `message-pilote-ingenieur-developpeur.md` (dont la directive §0).

**`facebook-ads-backend`**
- `main` : `b297f75ce874799b428435e229d177a570e56944` (26/05/2026)
- `saas` : `8152f03806bc7b297b35367a7d4ab49ee68cd3ff` (12/05/2026) — non touchée
- Branche de travail `dev-001-boucle-qualite` : `c4bad743ffc1a81fd699e0989dd4ca96c177bbc9`
- Documentaire lu intégralement : `docs/ARCHITECTURE.md` (657 l.),
  `docs/CHECKLIST.md` (693 l.), `docs/FICHE_TECHNIQUE.md` (940 l.), `README.md` (116 l.)

**`facebook-ads-frontend`**
- `main` : `7975a80e1c1b42880d9be2a4faf0dbb8ecf58882` (28/05/2026)
- `saas` : `7e2b8464831fdaa27aec0ede00468c1d39695598` (12/05/2026) — non touchée
- Pas de dossier `docs/` (conforme à la directive). Racine inventoriée ; seul
  document technique présent : `MODIFICATIONS_INDEX_HTML.txt`.
  Implémentation concernée lue : `js/conversions.js`.

### Écarts documentation / code constatés

La documentation interne s'arrête au 23/04/2026. Le code a été pris comme
vérité opérationnelle. Écarts relevés sur le périmètre de la mission :

1. `docs/FICHE_TECHNIQUE.md` décrit `leads.score` comme « score de
   qualification », ce qui laisse croire à un score alimenté. C'était une
   constante `INTEGER DEFAULT 50`.
2. `docs/CHECKLIST.md` annonce « Tri automatique par score — Production ». La
   mécanique de tri existait, mais elle ordonnait des valeurs identiques.
3. `docs/CHECKLIST.md` liste « Pixel/CAPI (report) » — cohérent avec D5 et avec
   le garde-fou implémenté dans ce lot.
4. `js/conversions.js` consommait déjà un champ `score_breakdown` que le backend
   n'a jamais fourni, et le reconstituait par heuristique côté navigateur.

## 2. Pré-vol production (lecture seule)

| Élément | État constaté |
|---|---|
| Backend Render `/health` | 200 en 0,35 s — `twilio_voice: configured`, `sms_gateway: configured` |
| Frontend Netlify | 200 |
| Authentification `/api/*` | effective (401 sans `x-api-key`) |
| Graph API Meta | vivante — `/api/facebook/campaigns` 200, token non expiré |
| Persistance SQLite | opérationnelle — 16 leads actifs |

**Non vérifiable depuis mon accès, déclaré sans le masquer :**
- santé réelle du téléphone Android passerelle SMSGate (V7) : seul le
  « configured » côté backend est visible ;
- échéance des tokens Facebook (60 j, V8) : l'appel passe aujourd'hui, la date
  d'expiration n'est pas exposée ;
- sauvegarde SQLite (V5) et emplacements de `ENCRYPTION_SECRET` (V6) ;
- aucun secret ni token consulté.

Aucune dépendance critique de la boucle n'est hors service à ce jour.

## 3. Architecture technique retenue

Ordre d'exécution conforme à l'arbitrage R1 : qualité interne, puis alertes et
intégrité, puis préparation CAPI sans activation.

### Phase A — qualité interne

- **Score en deux temps.** Prédictif à T0, calculé à la réception dans
  `syncService`, sur le seul déclaratif : il ordonne la file de rappel, ne
  qualifie personne, ne produit aucun événement. Consolidé après contact, sur
  ce qui a été vérifié au téléphone : seul déclencheur possible de E2.
- **Traçabilité.** Chaque point est rattaché à son critère et persisté en JSON.
  Un critère dont l'information manque est retiré du dénominateur et déclaré
  (`applicable: false`, `coverage_pct`) : le score exprime ce qu'il sait au lieu
  de pénaliser en silence ce qu'il ignore.
- **Exclusions bloquantes.** Indépendantes du total : elles forcent le palier D
  et interdisent E2. Un lead hors zone à 85 points reste palier D.
- **Requalification humaine.** Source S1, prioritaire sur le calcul. Le score
  calculé est conservé à côté de la correction : c'est le matériau du
  rapprochement mensuel, exposé par `GET /api/quality/calibration`.
- **Aucune décision automatique de rejet.** Le moteur note et documente ; il ne
  modifie aucun statut CRM et n'écarte aucun lead.
- **Constat DOC-001 §5 corrigé.** `leads.score` est désormais alimenté par le
  score effectif (override > consolidé > prédictif). Le tri et le badge Top 3
  redeviennent informatifs.
- **Attribution préservée.** `ad_id` / `campaign_id` / `adset_id` étaient déjà
  demandés à Graph par `syncService` mais perdus à l'écriture en base. Ils sont
  persistés, et figés sur chaque événement à sa création : le lien à la
  publicité d'origine ne peut plus se perdre si le lead est modifié ensuite.
- **Idempotence.** Contrainte `UNIQUE(lead_id, event_code)` : aucun double
  comptage possible, y compris en cas de rejeu. Les événements sont cumulatifs,
  E5 ne remplace jamais E2.

### Phase B — alertes

Quatre familles conformes à ARCH §4 : qualité, économie, traitement, intégrité
de la boucle. Déduplication sur fenêtre configurable, volume plancher avant de
crier, action attendue portée par chaque alerte.

`INTEGRITE_BOUCLE_MUETTE` (critique) se déclenche quand des leads arrivent sans
qu'aucun événement ne soit produit — le cas où l'absence de signal est le
signal. Les alertes économiques restent muettes tant que la dépense n'est pas
fournie, plutôt que d'inventer un CPL.

### Phase C — CAPI : préparation, aucune activation

Quatre verrous indépendants, tous à lever pour qu'un envoi soit possible :
`capi.enabled`, `capi.dry_run`, identifiants + `CAPI_ACCESS_TOKEN`, et le
garde-fou de prompts. `dispatch()` lève une erreur explicite : le `POST /events`
appartient au lot d'activation, pas à celui-ci.

Les événements sont malgré tout tracés dans `capi_outbox` au statut
`skipped_disabled` : la file est la preuve auditable de ce qui *serait* parti.
E6 n'y entre jamais — il n'existe pas de conversion négative.

`buildPayload` laisse `user_data` vide tant que `capi.consent_basis` n'est pas
fixé : le chemin est prêt, aucune donnée personnelle n'est préparée.

**Réponse à la question du §8 — garantir qu'une activation future ne parte pas
avec des prompts contradictoires.** Les quatre interdictions Pixel/CAPI présentes
dans `routes/ai.js` et `services/claude-api.js` (héritage de D5) sont
inventoriées dans `services/capi-prompt-guard.js` par marqueur textuel. Le
service CAPI refuse de s'activer tant qu'un marqueur est détecté — y compris
avec `force`, qui contourne la configuration mais jamais ce garde-fou.
Conséquence mécanique : on ne peut pas activer CAPI sans amender les prompts, et
on ne peut pas retirer les interdictions sans mettre à jour l'inventaire. Les
deux modifications appartiennent au même lot par construction, pas par
discipline. Un test vérifie que l'inventaire correspond au code réel.

## 4. Paramètres métier — aucun n'est gravé en dur

Tous les seuils vivent dans `config/quality-loop.defaults.js`, marqués
PROVISOIRES, et sont surchargeables sans redéploiement (table `quality_config`
via `PUT /api/quality/config/:key`, ou variables d'environnement).
`GET /api/quality/config` renvoie `provisional_params` : la liste de ce qui
tourne encore sur des propositions non arbitrées.

Sont donc provisoires et non appliqués comme vérité : seuil E2 >= 50,
pondérations 30/25/25/20, tous les seuils d'alerte, ticket moyen et enveloppes.

**Conséquence à signaler.** `economics.ticket_moyen_eur` étant `null`, l'axe
« cohérence économique » (25 points) est déclaré **inopérant** et neutralisé —
il n'est pas rempli avec une valeur inventée. Il le restera tant que le Gérant
n'aura pas fixé le ticket moyen (réserve ARCH §5.2). Un test verrouille ce
comportement.

## 5. Fichiers

**Créés** — `config/quality-loop.defaults.js`, `services/quality-config.js`,
`services/quality-schema.js`, `services/lead-scoring.js`,
`services/lead-events.js`, `services/capi-service.js`,
`services/capi-prompt-guard.js`, `services/quality-alerts.js`,
`routes/quality.js`, `tests/quality-loop.test.js`,
`docs/BOUCLE_QUALITE_DEV-001.md`.

**Modifiés** — `services/database.js` (schéma qualité, persistance de
l'attribution, `DATA_DIR` surchargeable pour les tests),
`services/syncService.js` (attribution + score prédictif à la réception),
`routes/leads.js` (événements dérivés du statut CRM, exposition du détail de
score), `routes/comms.js` (E1 sur SMS sortant), `server.js` (montage
`/api/quality`), `package.json` (script `test`).

Les branchements dans le code existant sont sous `try/catch` : une défaillance
de la boucle qualité ne peut pas casser une fonction de production.

## 6. Commits

- `2d1a63b6ef88fe25cb5ad46997bd0ef939a73398` — boucle de qualité (phases A, B, C préparée)
- `c4bad743ffc1a81fd699e0989dd4ca96c177bbc9` — détail de score exposé au frontend + écarts doc

Branche `dev-001-boucle-qualite` poussée sur `seoettia-collab/facebook-ads-backend`.

## 7. Tests exécutés

`npm test` — **35 tests, 35 réussis, 0 échec** (`node --test`, aucune dépendance
ajoutée, base temporaire isolée via `DATA_DIR`).

Couverture : création du schéma ; déterminisme du calcul ; information absente
déclarée et non pénalisée ; axe économique inopérant sans ticket moyen ; signal
comparateur de prix ; exclusion forçant le palier D malgré un score élevé ;
détection des coordonnées inexploitables ; seuil E2 paramétrable ; prédictif ne
qualifiant pas ; `leads.score` non inerte ; override humain prioritaire et
conservé au recalcul ; idempotence des événements ; cumulativité ; attribution
figée ; absence de valeur estimée sur E4/E5 ; dérivation CRM idempotente ;
émission E2 ; exclusion vers E6 sans E2 ; absence de rejet automatique ; file
CAPI en `skipped_disabled` ; E6 hors file ; `user_data` vide sans base légale ;
refus d'activation avec liste des verrous ; garde-fou prompts bloquant même en
`force` ; inventaire des prompts conforme au code ; paramètres provisoires
signalés ; surcharge de configuration réversible ; clé inconnue refusée ; alerte
d'intégrité critique ; déduplication ; désactivation globale ; acquittement ;
format et robustesse du détail de score.

Contrôles complémentaires : `node --check` sur les 14 fichiers touchés, et
démarrage réel du serveur avec migrations appliquées sans erreur.

## 8. Ce qui est prêt

- Score interne fiable, auditable, corrigeable, exposé au frontend existant sans
  modification de celui-ci.
- Journal d'événements idempotent avec attribution préservée.
- Dispositif d'alertes complet, dont l'alerte d'intégrité de la boucle.
- Chemin CAPI construit, testé et verrouillé.
- Suite de tests là où il n'en existait aucune (V4).

## 9. Ce qui reste bloqué par arbitrage Gérant

1. **R2 — divergence `main` / `saas`.** Non arbitrée : la branche reste isolée,
   aucun merge, aucun déploiement.
2. **Ticket moyen et enveloppes de référence** (ARCH §5.2). Bloquant réel :
   l'axe économique reste neutralisé tant qu'ils ne sont pas fixés.
3. **Seuils chiffrés** (ARCH §5.1) : seuil E2, pondérations, seuils d'alerte.
   Utilisables en l'état comme valeurs provisoires, à confirmer au premier
   calibrage.
4. **Périmètre des données transmises à Meta et base légale RGPD** (ARCH §5.3).
   Bloquant pour toute activation CAPI.
5. **Zone desservie** : `zone.code_postal_prefixes` est vide, donc le contrôle de
   zone automatique est inactif et le critère déclaré non applicable. À
   renseigner par le Gérant.
6. **Volume d'apprentissage** (ARCH §5.4) : risque à admettre, pas à découvrir.
   L'alerte `INTEGRITE_VOLUME_E2_FAIBLE` le rendra visible.

## 10. Confirmations explicites

- Aucun merge vers `main`. `main` backend reste `b297f75c…`, `main` frontend
  reste `7975a80e…`.
- Aucun toucher à `saas`. Backend `saas` reste `8152f038…`, frontend `saas` reste
  `7e2b8464…`. Branche gelée respectée.
- Aucun déploiement production, ni Render ni Netlify.
- Aucun envoi CAPI production. Aucun événement réel émis vers Meta. Aucun
  basculement d'optimisation Meta.
- Aucun secret consulté ni écrit dans un fichier versionné.

---

— ingenieur-developpeur · facebook-ads
