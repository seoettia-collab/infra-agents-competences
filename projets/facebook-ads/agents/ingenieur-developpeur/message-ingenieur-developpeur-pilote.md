# Message ingenieur-developpeur -> Pilote

MESSAGE-ID : DEV-004-R
EN-REPONSE-A : DEV-004
DATE : 2026-09-01
AGENT : ingenieur-developpeur (facebook-ads)
OBJET : Route read-only `GET /api/facebook/recommendations`

---

## 0. Note de routage

Un message adressé à **META (`META-007`)** m'a été transmis dans le même
échange, avec instruction de le traiter. Je ne l'ai pas traité : il est adressé
à l'agent `meta-ads`, et DEV-003 §5 comme DEV-004 §0 me l'interdisent
explicitement — toute expertise Meta vient de META. J'ai seulement vérifié le
destinataire dans le dépôt, puis lu **ma** boîte, qui contenait DEV-004.
Aucune recherche métier Meta n'a été conduite.

Précision technique : je lis le dépôt par `git fetch` + `git reset --hard` sur
la branche active, pas par URL HTTP. La consigne de cache `?v=<n>` ne
s'applique donc pas à mon accès ; le hash lu est toujours celui de `origin/main`
au moment de la lecture.

---

## 1. Sources et hashes lus

| Source | Référence |
|---|---|
| Hub `infra-agents-competences` | `main` `c8a27a29fb89d81c1cb920154e266e4ebf534a6a` |
| Socle | `standards-communs/organisation-agents.md` (règles 9, 14) |
| DEV-004 | boîte `ingenieur-developpeur`, même commit |
| META-007-R | `projets/facebook-ads/agents/meta-ads/message-meta-ads-pilote.md` — verdict `ACCES_TECHNIQUE_MANQUANT`, paquet technique repris tel quel |
| Backend `main` | `b297f75ce874799b428435e229d177a570e56944` |

---

## 2. Branche et commit

- Branche : **`dev-004-meta-recommendations-readonly`**, créée depuis `main`
- Commit : **`b0741a97db33288c5445e2a7cc3cd364dbd3b0b6`** — poussé
- `main` inchangée (`b297f75c…`), `saas` inchangée (`8152f038…`)

---

## 3. Fichiers

**Créés**
- `services/meta-recommendations.js` — lecture seule des recommandations et de
  l'Opportunity Score
- `tests/meta-recommendations.test.js` — 18 tests, Graph entièrement mocké

**Modifiés**
- `services/facebook-api.js` — méthode `getRecommendations()` qui délègue au
  service ; le jeton est lu là où il l'est déjà et n'en sort jamais
- `routes/campaigns.js` — route `GET /api/facebook/recommendations` ajoutée dans
  le routeur déjà monté sur `/api/facebook`, donc derrière l'authentification et
  le rate-limit existants. Aucune nouvelle architecture.
- `package.json` — ajout du script `test`. `main` n'en avait aucun : sans lui, la
  consigne « exécuter les tests » n'était pas exécutable.

Aucun fichier frontend touché.

---

## 4. Ce que fait la route

Ordre d'appel strictement celui fourni par META-007, sans initiative de ma part :

1. `GET /v25.0/act_1485808979635813/recommendations` avec les dix champs
   demandés : `id,title,importance,recommendation_type,confidence,created_time,campaign_id,adset_id,ad_id,display_link`
2. si Meta refuse un champ optionnel → même edge, réduit aux **seuls trois
   champs déjà validés** par META-006/META-007 (`title,importance,recommendation_type`).
   Aucun mapping inventé ; l'erreur brute du premier essai reste dans le
   diagnostic.
3. si l'edge est indisponible → field expansion du fallback META-007 :
   `GET /v25.0/act_...?fields=recommendations{id,title,importance,recommendation_type}`

Opportunity Score : essai séparé et **non bloquant**
(`fields=opportunity_score,opportunity_score_trends`). Refusé ou absent →
`NON_ACCESSIBLE`. Aucun score reconstruit ni calculé. Un échec du score ne
contamine pas les recommandations (testé).

**Réponse** : `source: "meta"`, `fetched_at`, `ad_account_id`, `api_version`,
`outcome`, les recommandations Graph **brutes et non filtrées**, le statut du
score, et un `diagnostic` (tentatives + erreurs).

`outcome` permet au Pilote de distinguer les quatre cas de DEV-004 §4 :
`RECOMMANDATIONS` · `ZERO_RECOMMENDATION` · `FIELD_REJECTED` ·
`ENDPOINT_UNAVAILABLE` · `PERMISSION` · `RATE_LIMIT` · `GRAPH_ERROR` ·
`CONFIG_MANQUANTE`.

**Point de vigilance corrigé en cours de route.** Meta étiquette
`type: "OAuthException"` des erreurs qui n'ont rien à voir avec les droits
(codes 1 et 2, transitoires). Ma première version classait donc une panne
passagère en `PERMISSION` — ce qui aurait envoyé corriger des permissions
correctes, exactement le contresens que DEV-003-R signalait. La classification
ne repose plus que sur les codes Graph qui désignent réellement un refus de
droits (10, 190, 200, 272, 294, 299) ou sur un 401/403 HTTP. Un test verrouille
ce comportement.

C'est une classification **technique** de codes d'erreur, pas une lecture métier
Meta. Aucun type de recommandation n'est interprété : les objets Meta sont
renvoyés intacts, au Pilote et à META d'en lire le sens.

---

## 5. Tests

`npm test` — **18 tests, 18 réussis, 0 échec**. Graph est entièrement mocké via
un client HTTP injecté : aucun appel réseau, aucun jeton réel.

Couverture demandée par DEV-004 §5 :

| Cas demandé | Test |
|---|---|
| 1+ recommandation | objet Meta renvoyé intact, `count=1`, `via=edge` |
| — | les champs envoyés sont **exactement** ceux de META-007 |
| Tableau vide valide | `ZERO_RECOMMENDATION`, `available=true`, zéro erreur |
| Champ optionnel refusé puis lecture minimale | repli sur les 3 champs validés, erreur du 1er essai conservée |
| — | edge indisponible → field expansion du fallback META-007 |
| Opportunity Score absent | `NON_ACCESSIBLE`, valeur `null` |
| — | score refusé par Meta → `NON_ACCESSIBLE` sans contaminer les recommandations |
| — | score présent → valeur et tendances remontées telles quelles |
| Erreur Graph | `PERMISSION` distinct de `ZERO_RECOMMENDATION` ; erreur générique non maquillée |
| — | erreur transitoire non prise pour un défaut de droits |
| Aucun token renvoyé | aucune trace du jeton dans la réponse sérialisée |
| — | jeton présent dans un message d'erreur Graph → masqué `[REDACTED]` |
| — | le module ne contient aucun verbe d'écriture (vérifié sur le source) |
| — | seuls des GET sont émis, y compris sur le chemin de repli |

**Vérification de bout en bout** : serveur démarré localement, route appelée.
Réponse `HTTP 200`, `outcome: CONFIG_MANQUANTE` (aucun jeton en local, ce qui
est le comportement attendu), log `[META_RECO]` émis. La route est donc bien
montée et protégée par l'authentification existante.

Une seule occurrence de la chaîne `access_token` apparaît dans la réponse : le
**nom** de la variable d'environnement dans le message
« FB_ACCESS_TOKEN ou compte publicitaire non configuré côté serveur ». Aucune
valeur. Contrôlé par expression régulière : aucun motif `access_token=<valeur>`,
aucun motif `EAA…`.

---

## 6. Ce qui reste à faire pour lever la réserve R2 d'ARCH-003

La route existe mais **n'est pas déployée** — DEV-004 §6 l'interdit. Tant
qu'elle vit sur sa branche, elle ne dit rien du compte réel.

Deux gestes, dans cet ordre, à l'arbitrage du Pilote :

1. **Décider du merge et du déploiement** de `dev-004-meta-recommendations-readonly`
   sur Render. C'est une commande à part, que je n'ai pas.
2. Une fois en ligne, un seul appel suffit :
   `GET /api/facebook/recommendations` avec la clé API du dashboard. Le champ
   `outcome` et le tableau `recommendations.data` trancheront directement la
   question de META-006-CORR §4 — et c'est à META, pas à moi, de qualifier les
   `recommendation_type` observés.

Rappel de DEV-003-R, toujours valable : le jeton de production porte bien
`ads_read` et `business_management`. Si l'appel échoue une fois déployé, la
cause ne sera pas un défaut de droits.

---

## 7. Réserves

1. **Rien n'a encore été lu sur le compte réel.** Ce lot livre l'outil, pas la
   réponse. Le verdict `PARTIEL` de DEV-003 reste en l'état.
2. Le repli sur trois champs suppose que Meta accepte au moins ceux-là. Si Meta
   les refusait aussi, la route retournerait `FIELD_REJECTED` avec l'erreur
   brute — et il faudrait alors une décision de META, pas de moi.
3. `main` n'a **aucun test automatisé** hors de ce lot : les 65 tests de
   DEV-001/DEV-002 vivent sur leurs branches respectives, non fusionnées. Je
   n'ai donc pas pu exécuter de suite « existante » sur cette base. Les fichiers
   touchés ici ne sont modifiés par aucune des deux autres branches, donc aucun
   conflit attendu.
4. La route n'est pas mise en cache : elle sert à constater l'état réel du
   compte. Si elle devait être appelée souvent, un cache court serait à ajouter.

---

## 8. Confirmations

- **Zéro write Meta.** Aucun POST, PATCH ou DELETE vers Graph. Le module ne
  contient aucun verbe d'écriture — vérifié par un test qui lit son propre code
  source, et par un `git diff` contre `main` : zéro ligne ajoutée contenant
  `axios.post/put/patch/delete` ou `method: 'POST'`.
- **Zéro secret.** Aucun jeton lu, affiché, journalisé, testé ou versionné. Le
  jeton de test est une chaîne factice. Une redaction défensive masque toute
  valeur qui remonterait d'un message d'erreur tiers.
- **Zéro SaaS.** Branche `saas` non lue, non touchée : `8152f038…` inchangé.
- **Zéro frontend.** Aucun fichier du dépôt frontend modifié.
- **Zéro merge, zéro déploiement.** `main` reste `b297f75c…`.
- **Zéro activation CAPI**, aucune campagne, adset ou ad créé, modifié ou mis en
  pause, aucune modification de permissions.

---

— ingenieur-developpeur · facebook-ads
