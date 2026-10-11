# Message documentation-technique -> Pilote

MESSAGE-ID : DOC-002-R
EN-REPONSE-A : DOC-002
DATE : 2026-09-01

## 0. Méthode

Source primaire lue : `facebook-ads-backend/docs/FICHE_TECHNIQUE.md` (branche `main`)
+ référentiel courant du hub. **Constat : la fiche technique ne contient AUCUNE
valeur d'identifiant Meta** — elle ne documente que les NOMS de variables
d'environnement. Elle est par ailleurs arrêtée au 18/04/2026.

Recoupement effectué dans le code actuel, conformément à la règle « le code fait
foi ». Les identifiants ci-dessous proviennent donc majoritairement du frontend,
où ils sont écrits en dur. Le backend ne contient aucun identifiant : tout passe
par des variables d'environnement Render, non lisibles depuis le dépôt.

---

## PAQUET_META

### A. Identification du compte

| Donnée | Valeur | Source | Statut |
|---|---|---|---|
| Business Manager / Business ID | — | introuvable | **ABSENT** |
| Ad Account ID | `act_1485808979635813` | contexte projet historique ; **absent du dépôt** — en production injecté via `FB_AD_ACCOUNT_ID` | **À VÉRIFIER** |
| Page ID Facebook | `921876644351567` | `facebook-ads-frontend/index.html` champ `#pubPageId` (readonly) | **CONFIRMÉ** |
| App ID Meta | — | seul le nom `FB_APP_ID` est documenté ; valeur en ENV Render | **ABSENT** |

### B. Objets publicitaires

| Donnée | Valeur | Source | Statut |
|---|---|---|---|
| Campaign ID principale | `120239096216380417` — « Devis Rénovation IDF » | `js/ai-recommendations.js:452` et `js/cockpit.js:1003` (`MAIN_CAMPAIGN_ID`) | **CONFIRMÉ** |
| Ad Set ID par défaut (publication) | `120239096216390417` | `js/publish.js:763` | **CONFIRMÉ** |
| Lead Form ID par défaut (fallback) | `2119048292014561` | `js/publish.js` (3 occurrences) | **CONFIRMÉ** — valeur de repli ; la liste réelle des formulaires est chargée dynamiquement dans `#pubLeadForm` |
| Ad ID(s) | — | jamais figés : récupérés à la volée via `/api/facebook/ads/details` | **ABSENT** (par conception) |

### C. Suivi de conversion

| Donnée | Valeur | Source | Statut |
|---|---|---|---|
| Pixel / Dataset / Event Source ID | aucun | décision structurante D5 du référentiel | **ABSENT — assumé** |

> Le suivi passe **exclusivement** par Graph API Lead Ads. Aucun pixel n'est
> installé, aucun événement n'est renvoyé à Meta. Les prompts IA
> (`routes/ai.js`, `services/claude-api.js`) interdisent même explicitement de
> recommander pixel / CAPI / Events Manager. C'est le trou identifié en V1 du
> référentiel : si META doit travailler sur la boucle de qualité, il n'existe
> aujourd'hui aucun Dataset à lui transmettre — il faudra en créer un.

### D. Points d'accès techniques

| Donnée | Valeur | Statut |
|---|---|---|
| Version Graph API — production `main` | `v25.0` (constante `FB_API_VERSION`, cohérente dans tous les services) | **CONFIRMÉ** |
| Version Graph API — branche `saas` | `v18.0` (`routes/saas-facebook.js`) | **CONFIRMÉ** — écart de 7 versions entre les deux branches, à signaler |
| URL backend production | `https://facebook-ads-backend-s20a.onrender.com` | **CONFIRMÉ** |
| URL frontend production | `https://mistral-fb-ads-dashboard.netlify.app` | **CONFIRMÉ** |
| Authentification backend | header `x-api-key` sur `/api/*` | **CONFIRMÉ** |

### E. Routes backend qui lisent Meta

| Méthode | Route | Objet |
|---|---|---|
| GET | `/api/facebook/account` | infos compte publicitaire |
| GET | `/api/facebook/campaigns` | liste campagnes |
| GET | `/api/facebook/insights` | métriques de performance |
| GET | `/api/facebook/insights/intraday` | séries intraday |
| GET | `/api/facebook/geographic` | performance par région |
| GET | `/api/facebook/ads/details` | ads + métriques |
| GET | `/api/facebook/ads/filters` | filtres campagnes / adsets |
| GET | `/api/facebook/ads/:id/details` | détail d'une ad |
| POST | `/api/facebook/ads/:id/update-creative` | modification créative |
| POST | `/api/facebook/ads/:id/status` | activer / pause une ad |
| POST | `/api/facebook/adsets/:id/status` | activer / pause un adset |
| GET | `/api/facebook/leads` | leads Lead Ads |
| GET | `/api/facebook/conversations` | conversations Messenger |
| GET | `/api/facebook/conversations/:id/messages` | messages d'une conversation |
| POST | `/api/facebook/conversations/:id/reply` | réponse Messenger |
| GET | `/api/context/campaign` · `/api/context/ad` | contexte métier injecté dans l'IA |

Montage : `routes/campaigns.js`, `insights.js`, `geographic.js`, `leads.js`,
`messenger.js`, `ads-decline.js`, `video.js`, `context.js`. Services appelants :
`facebook-api.js`, `facebook-publish.js`, `messenger-api.js`, `syncService.js`,
`autoReplyService.js`.

### F. Variables d'environnement Meta (noms uniquement)

`FB_APP_ID` · `FB_APP_SECRET` · `FB_ACCESS_TOKEN` · `FB_PAGE_ACCESS_TOKEN`
`FB_AD_ACCOUNT_ID` · `FB_PAGE_ID` · `FB_VERIFY_TOKEN`
Branche `saas` uniquement : `FB_OAUTH_CONFIG_ID` (Facebook Login for Business),
`ENCRYPTION_SECRET` (chiffrement des tokens FB par tenant).

### G. Scopes / permissions

| Permission | État | Source |
|---|---|---|
| `ads_management` | déclarée | `routes/saas-facebook.js` — constante `SCOPES` |
| `ads_read` | déclarée | idem |
| `business_management` | déclarée | idem |
| `pages_show_list` | déclarée | idem |
| `pages_read_engagement` | déclarée | idem |
| `pages_messaging` | **non obtenue** — App Review à soumettre, bloquée par Business Verification | `docs/CHECKLIST.md` |
| `leads_retrieval` | **non déclarée** dans les scopes OAuth SaaS alors que la récupération des leads est au cœur du produit | lecture du code |

---

## 1. Données manquantes à obtenir auprès du Gérant

1. **Business Manager / Business ID** — introuvable dans le dépôt.
2. **App ID Meta** — valeur en ENV Render uniquement.
3. **Confirmation de l'Ad Account ID** `act_1485808979635813` — non retrouvé dans
   le dépôt, à confirmer depuis le Business Manager ou les ENV Render.
4. **Dataset / Event Source ID** — n'existe pas ; à créer si la boucle de qualité
   (CAPI) est ouverte.
5. Statut réel de la **Business Verification** Meta (dernier état documenté :
   « en cours », avril 2026).

Les trois premières se lisent en une minute dans le Business Manager ou dans le
tableau ENV du service Render — aucune recherche complexe côté Gérant.

---

## 2. Sécurité

**Confirmation explicite : aucun secret n'a été reproduit dans ce rapport.**

- `FB_ACCESS_TOKEN`, `FB_APP_SECRET`, `FB_PAGE_ACCESS_TOKEN`, `FB_VERIFY_TOKEN`,
  `ENCRYPTION_SECRET` : **SECRET PRÉSENT — NON REPRODUIT**.
  Emplacement fonctionnel : variables d'environnement du service Render, lues par
  `services/facebook-api.js`, `facebook-publish.js`, `messenger-api.js` et
  `routes/webhook.js` (validation de signature).
- La fiche technique ne contient aucune valeur secrète : elle ne liste que des
  noms de variables. Bon point à conserver.

**Réserve de sécurité relevée en passant** (hors périmètre DOC-002, signalée car
constatée) : la clé d'API du dashboard est écrite **en clair dans le dépôt
frontend**, fichier `js/config.js`. Valeur **NON REPRODUITE** ici. Le dépôt étant
accessible et le fichier servi publiquement par Netlify, cette clé ne protège
rien. À arbitrer par le Pilote — ce n'est pas un identifiant Meta, mais c'est la
seule barrière devant toutes les routes `/api/*`.

---

## 3. Réserves

- R1 — Ad Account ID à confirmer avant transmission à META (statut À VÉRIFIER).
- R2 — Aucun Dataset/Pixel n'existe : META ne pourra pas travailler la qualité
  des leads sans qu'un chantier CAPI soit ouvert au préalable.
- R3 — Écart de version Graph API entre `main` (v25.0) et `saas` (v18.0).
- R4 — `leads_retrieval` absente des scopes OAuth SaaS.
- R5 — Clé d'API dashboard exposée en clair dans le dépôt frontend (§2).

Aucune réserve bloquante pour la transmission du paquet à META, sous réserve de
R1.

## 4. Cadre respecté

Aucune modification backend/frontend, aucun déploiement, aucune écriture de code
(règle 9). Écriture limitée à mon fichier de sortie, en remplacement.
