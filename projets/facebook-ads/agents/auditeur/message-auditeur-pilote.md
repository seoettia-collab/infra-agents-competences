# Message auditeur -> Pilote

MESSAGE-ID : AUD-004-R
EN-REPONSE-A : AUD-004
DATE : 2026-09-01
AGENT : auditeur (facebook-ads)
OBJET : Audit de `dev-004-meta-recommendations-readonly` avant activation

---

## 1. Sources et hashes réellement lus

| Source | Référence |
|---|---|
| Hub `infra-agents-competences` | `main` `2a7ca979c1d5339b715bbfb007375b1e3ac54093` |
| Socle | `standards-communs/organisation-agents.md`, `gouvernance-projet.md`, `fiche-auditeur.md` |
| DIR-002 | `fad854552bd4ad2ec9d37a9d92d9fe8db77e63a2` |
| META-007-R | `6261ee1517b90d43ec40f6ae5b629d7875de8da6` |
| DEV-004-R | boîte `ingenieur-developpeur`, hub `2a7ca97…` |
| Backend `main` | `b297f75ce874799b428435e229d177a570e56944` |
| **Branche auditée** | `dev-004-meta-recommendations-readonly` — `b0741a97db33288c5445e2a7cc3cd364dbd3b0b6` |
| Backend `saas` | `8152f03806bc7b297b35367a7d4ab49ee68cd3ff` — non lue, non touchée |
| Frontend `main` | `7975a80e1c1b42880d9be2a4faf0dbb8ecf58882` — aucune branche DEV-004 côté frontend |

Diff contre `main` : **1 commit, 5 fichiers, +633 / −1**.
`package.json` (+1 ligne), `routes/campaigns.js` (+32), `services/facebook-api.js`
(+14), `services/meta-recommendations.js` (nouveau, 288), `tests/meta-recommendations.test.js`
(nouveau, 297).

**Méthode.** Lecture intégrale du diff, puis vérification par exécution : suite
de tests rejouée, serveur démarré localement sur port isolé, route appelée avec
et sans clé d'API, et sondes directes du service avec un client HTTP instrumenté
pour observer les URL réellement émises et chercher une fuite de jeton. Les
résultats ci-dessous sont des sorties d'exécution.

---

## 2. Contrôles demandés

### 2.1 Route strictement GET / read-only — **conforme**

- Une seule route ajoutée : `router.get('/recommendations', …)` dans
  `routes/campaigns.js`, routeur déjà monté sur `/api/facebook`.
- Recherche exhaustive de verbes d'écriture sur l'ensemble du diff : **aucune
  ligne ajoutée** ne contient `axios.post/put/patch/delete` ni
  `method: 'POST'/'PUT'/'PATCH'/'DELETE'`. Les seules occurrences de ces chaînes
  sont la **liste d'assertions du test** qui vérifie leur absence.
- Le client HTTP par défaut du module est `axios.get`, sans autre méthode
  accessible.
- Vérifié en exécution sur le serveur local : `POST`, `PUT`, `PATCH`, `DELETE`
  sur `/api/facebook/recommendations` renvoient tous **404** — la route n'existe
  qu'en GET.
- Sonde avec client instrumenté : les seules URL émises sont
  `…/v25.0/act_1/recommendations` et `…/v25.0/act_1`, toutes deux en GET.

### 2.2 Réutilisation du mécanisme de jeton existant — **conforme**

`FacebookApiService.getRecommendations()` délègue au nouveau service en lui
passant `this.accessToken` et `this.adAccountId`, c'est-à-dire
`process.env.FB_ACCESS_TOKEN` et `process.env.FB_AD_ACCOUNT_ID`
(`services/facebook-api.js:131-132`), déjà en place.

**Aucune nouvelle variable secrète.** Le compte n'est pas codé en dur : il vient
de l'environnement, ce qui est plus sain que l'`act_…` littéral du paquet
META-007. Écart assumé et correct par rapport à DIR-002 §2, qui mentionnait
`META_ACCESS_TOKEN` : c'est bien le mécanisme courant qui a été réutilisé,
conformément à la consigne d'AUD-004 §2.

### 2.3 Aucun jeton ni secret exposé — **conforme**

- Diff contrôlé par motif : aucune occurrence de `EAA…`, `ghp_`, `sk-` ni de la
  clé du dashboard. Le jeton des tests est une chaîne factice.
- Sonde de fuite : `readAll()` appelé avec un jeton réaliste, réponse
  sérialisée intégralement — **aucune occurrence du jeton**, à aucun niveau.
- Cas hostile rejoué : Meta renvoyant un message d'erreur contenant
  `?access_token=<valeur>` → la valeur est **masquée** avant d'entrer dans la
  réponse comme dans le log.
- La seule occurrence de la chaîne « FB_ACCESS_TOKEN » dans la réponse est le
  **nom** de la variable dans le message `CONFIG_MANQUANTE` — vérifié en
  exécution. Aucune valeur.
- Les logs `[MetaReco]` et `[META_RECO]` ne journalisent que classification,
  code HTTP, code Graph et message rédacté.

Observation technique, non bloquante : le jeton circule en **paramètre de
requête** (`access_token=…`) et non en en-tête `Authorization: Bearer`, alors
que META-007 proposait l'en-tête. Les deux sont acceptés par Graph, et c'est la
pratique déjà en vigueur partout ailleurs dans ce backend. Passer au Bearer
réduirait la surface d'exposition dans les journaux d'intermédiaires ; à traiter
globalement, pas dans ce lot.

### 2.4 Aucun frontend, SaaS, CAPI ni write campagne — **conforme**

- Aucun fichier frontend modifié ; aucune branche DEV-004 dans le dépôt frontend.
- `saas` inchangée (`8152f038…`), non lue.
- **Zéro occurrence** de `capi`, `saas` ou `pixel` dans tout le diff.
- Aucune route de modification de campagne/adset/ad touchée ; les routes
  d'écriture existantes de `routes/campaigns.js` sont inchangées.

### 2.5 Protection par l'auth et le rate-limit existants — **conforme, vérifié en exécution**

La route est montée sur `/api/facebook`, donc après `app.use('/api/', authMiddleware)`
(`server.js:93`) et `rateLimiters.general` (`server.js:85`).

Sonde live, serveur démarré avec `DASHBOARD_API_KEY` :
- sans en-tête → **HTTP 401** `{"error":"Authentification requise"}` ;
- avec en-tête → **HTTP 200**, `outcome: CONFIG_MANQUANTE` (aucun jeton en local,
  comportement attendu), log `[META_RECO]` émis.

Aucun conflit de route : `/recommendations` est déclarée en tête de
`routes/campaigns.js`, avant toute route paramétrée, et le seul routeur monté
plus tôt sur `/api/facebook` (`ads-decline`) n'expose que deux `POST /ads/:id/…`.

### 2.6 Robustesse des réponses Graph — **conforme**

Classification rejouée indépendamment sur des erreurs fabriquées :

| Cas injecté | Résultat |
|---|---|
| Code 17 (quota) | `RATE_LIMIT` |
| Code 190 (jeton invalide) | `PERMISSION` |
| Code 2, `type: OAuthException`, HTTP 500 | `GRAPH_ERROR` — **pas** `PERMISSION` |
| `Tried accessing nonexisting field` | `FIELD_REJECTED` |
| `Unsupported get request` | `ENDPOINT_UNAVAILABLE` |
| Recommandation présente | `RECOMMANDATIONS`, objet Meta **renvoyé intact** |
| Tableau vide | `ZERO_RECOMMENDATION`, `available: true`, zéro erreur |
| Config absente | `CONFIG_MANQUANTE` **sans appeler Graph** |

Le point de vigilance signalé par DEV-004-R est réel et correctement traité :
Meta étiquette `OAuthException` des incidents transitoires ; les classer en
`PERMISSION` enverrait corriger des droits qui sont corrects. La classification
ne retient que les codes qui désignent vraiment un refus (10, 190, 200, 272,
294, 299) ou un 401/403 HTTP. Vérifié.

La cascade est bien celle de META-007 : champs complets → champs minimaux
validés si un champ est refusé → field expansion si l'edge est indisponible.
Aucun mapping inventé, aucune recommandation filtrée ou interprétée : les objets
Graph sont renvoyés bruts, et le `diagnostic` conserve chaque tentative et
chaque erreur.

*Observation mineure* : `outcome` reprend la classification de la **dernière**
erreur de la cascade. Si le premier échec est `FIELD_REJECTED` et que le repli
échoue ensuite autrement, `outcome` affichera la seconde cause. Le
`diagnostic.errors` conserve la séquence complète, donc rien n'est perdu — mais
c'est `diagnostic`, pas `outcome`, qu'il faudra lire en cas de cascade.

### 2.7 Opportunity Score non bloquant — **conforme**

Essai séparé sur le nœud compte
(`fields=opportunity_score,opportunity_score_trends`). Champ absent → `NON_ACCESSIBLE`
avec `value: null` ; refus Meta → `NON_ACCESSIBLE` avec la classification en
`reason`, **sans contaminer les recommandations** (vérifié). Aucun score
reconstruit ni calculé de substitution — conforme à META-007 qui le déclare non
accessible en V1.

### 2.8 Tests rejoués — **18/18 réussis**

`npm test` exécuté sur la branche après `npm install` : **18 tests, 18 réussis,
0 échec**, en 1,3 s. Graph est entièrement mocké par un client injecté : aucun
appel réseau, aucun jeton réel. Les intitulés correspondent aux cas exigés par
AUD-004 §6 et §7, y compris les deux contrôles de non-fuite de jeton et le test
qui lit le code source du module pour vérifier l'absence de verbe d'écriture.

Note d'exploitation : `node_modules` n'est pas versionné ; `npm install` est
requis avant le premier `npm test`.

### 2.9 Dépendances et risque de régression — **conforme**

- **Aucune dépendance ajoutée.** `package.json` ne gagne qu'un script `test`
  (`node --test tests/*.test.js`) ; le bloc `dependencies` est inchangé et il
  n'y a pas de `package-lock.json` modifié.
- `axios` était déjà une dépendance du projet.
- Surface de régression nulle sur l'existant : le seul fichier existant modifié
  au-delà d'un commentaire est `services/facebook-api.js`, qui reçoit une
  **méthode nouvelle** sans toucher `request()` ni aucune méthode en place.
- Précision sur la réserve 3 de DEV-004-R : `package.json` est en fait modifié
  aussi par `dev-001` et `dev-002`, mais avec **la ligne strictement identique**
  et au même endroit — la fusion se résoudra sans conflit. Aucun autre fichier
  n'est commun aux trois branches.
- Pas de cache sur la route : voulu, puisqu'elle sert à constater l'état réel.
  Si elle devait être sollicitée en boucle, un TTL court serait à prévoir — sans
  objet pour l'usage de constat prévu ici.

---

## 3. Verdict

**INTÉGRABLE.**

La branche est intégrable pour un merge et un déploiement, temporaire ou
permanent. Elle est additive, sans dépendance nouvelle, sans surface d'écriture,
protégée par l'authentification existante, et testée sur les huit cas de réponse
Graph qui comptent. Le comportement annoncé par DEV-004-R a été reproduit point
par point, pas seulement relu.

**Aucun bloqueur.**

Points non bloquants, à connaître avant lecture du résultat :

1. Le jeton passe en paramètre de requête plutôt qu'en en-tête `Bearer` —
   pratique déjà généralisée dans ce backend, à traiter globalement si le sujet
   est ouvert un jour.
2. En cas de cascade d'erreurs, lire `diagnostic.errors` et pas seulement
   `outcome`, qui ne porte que la dernière cause.
3. Ce lot livre l'outil, pas la réponse : tant qu'il n'est pas déployé, il ne dit
   rien du compte réel. Le verdict `ACCES_TECHNIQUE_MANQUANT` de META-007 ne
   sera levé qu'après un appel en production.
4. La qualification des `recommendation_type` observés appartient à META, pas à
   la route : celle-ci renvoie les objets Meta bruts, ce qui est exactement ce
   qu'il faut pour trancher `RECO_UTILE` / `RECO_BRUIT` / `0_RECO` sans
   pré-interprétation.

Aucun point ne relève d'une question métier Meta : je n'en ai soulevé aucune et
n'ai conduit aucune recherche de ce type.

---

## 4. Confirmations

- **Zéro write Meta** — aucune méthode HTTP autre que GET dans le module ni
  dans le diff ; vérifié par lecture, par sonde d'URL et par appel réel des
  quatre verbes d'écriture sur la route (404 sur les quatre).
- **Zéro secret** — aucun jeton dans la réponse, les logs, les tests ou le
  commit ; masquage vérifié sur un message d'erreur piégé.
- **Zéro SaaS** — branche `saas` non lue, non touchée, `8152f038…` inchangée.
- **Zéro frontend**, **zéro CAPI**, **zéro modification de campagne, adset ou ad**.
- **Zéro merge, zéro déploiement** — `main` reste `b297f75c…`.
- Lecture seule intégrale : aucun fichier créé, modifié ou supprimé dans les
  dépôts de code ; `git status` vierge, HEAD de la branche auditée inchangé
  (`b0741a97…`). Les vérifications par exécution ont eu lieu en local, sur port
  isolé, sans aucun jeton réel et sans appel sortant vers Meta.

---

— auditeur · facebook-ads
