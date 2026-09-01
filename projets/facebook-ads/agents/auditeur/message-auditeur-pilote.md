# Message auditeur -> Pilote

MESSAGE-ID : AUD-006-R
EN-REPONSE-A : AUD-006
DATE : 2026-09-01
AGENT : auditeur (facebook-ads)
OBJET : Audit Voie B — `dev-006-meta-drive-github-proxy` avant activation

---

## 1. Sources et hashes réellement lus

| Source | Référence |
|---|---|
| Hub `infra-agents-competences` | `main` `87f49b4ac5dacb08dad6348909c5de2e4ac225d4` |
| Socle | `standards-communs/organisation-agents.md`, `gouvernance-projet.md`, `fiche-auditeur.md` |
| AUD-006 | boîte auditeur, même commit |
| DEV-006-R2 | boîte développeur, même commit |
| GPT-PILOTE-DIR-20260901-15 | `87f49b4…` (configuration serveur finale) |
| Backend `main` | `6b1a3a1ab4f057ea5330c5e7fc2b2276168776c2` |
| **Branche auditée** | `dev-006-meta-drive-github-proxy` — `53dca34ca6abc41820d5f6356585210931c06261` |
| Backend `saas` | `8152f03806bc7b297b35367a7d4ab49ee68cd3ff` — non lue, non touchée |
| Frontend | non lu, non touché |

Diff contre `main` : **1 commit, 7 fichiers, +1617 / −0**. Aucun fichier existant
supprimé ni réécrit ; `server.js` gagne 4 lignes, `package.json` 2.

**Méthode.** Lecture intégrale du diff, puis vérification par exécution : suite
de tests rejouée, serveur démarré localement sur ports isolés dans trois
configurations (sans secret, avec secret, et **sur le runtime cible simulé**),
route sondée avec charges hostiles, et inspection des deux dépendances
ajoutées. Les résultats ci-dessous sont des sorties d'exécution.

---

## 2. Verdict

# NON INTÉGRABLE — en l'état.

**Un bloqueur unique, technique, reproduit :** la dépendance `@octokit/rest`
retenue ne peut pas être chargée par le runtime Node du service. La conséquence
n'est pas une dégradation, c'est l'échec de la seule fonction que cette branche
existe pour rendre — écrire dans GitHub — et cet échec ne se manifesterait qu'à
la toute dernière étape du plan d'activation, en production.

Tout le reste de l'audit est conforme, et souvent au-dessus de ce qui était
demandé. Le bloqueur est étroit et isolé ; ce n'est pas un rejet de la
conception.

---

## 3. Bloqueur — `@octokit/rest@21` est ESM, le service tourne en Node 20.11

### Les faits, vérifiés

| Constat | Source |
|---|---|
| Runtime imposé du service | `.node-version` = **20.11.1**, `package.json` → `engines.node` = **`20.x`** (déjà sur `main`, inchangé par la branche) |
| Version installée | `@octokit/rest` **21.1.1** |
| Nature du paquet | `"type": "module"`, et son champ `exports` ne propose **que** la condition `import` — aucune build CommonJS |
| Chargement dans le code | `services/pilote-drive-proxy.js` → `defaultGithubClient()` fait `require('@octokit/rest')` en CommonJS |

`require()` d'un module ESM n'est possible qu'à partir de **Node 20.19 / 22.12**.
En 20.11.1, il lève `ERR_REQUIRE_ESM`.

### Reproduction

Environnement d'audit en Node 22.22, où `require(esm)` est actif par défaut :
`require('@octokit/rest')` réussit — ce qui explique que rien n'ait alerté côté
développement. Le même appel, exécuté avec `--no-experimental-require-module`
pour reproduire le comportement de Node 20.11 :

```
Error [ERR_REQUIRE_ESM]: require() of ES Module
  node_modules/@octokit/rest/dist-src/index.js not supported.
```

Puis, en reproduisant exactement le corps de `defaultGithubClient()` avec un
jeton factice :

```
ECHEC construction client GitHub -> ERR_REQUIRE_ESM
```

### Pourquoi les 56 tests ne l'ont pas vu

Les tests injectent systématiquement un client GitHub simulé : le paramètre
`github` est fourni dans les 7 cas d'écriture. `defaultGithubClient()` n'est
**jamais** appelé, et `@octokit/rest` n'est jamais chargé pendant la suite.
Vérifié : aucune occurrence de `require('@octokit/rest')`, `defaultGithubClient`
ou `defaultDriveClient` dans le fichier de tests. Le mock, qui est une bonne
pratique partout ailleurs, masque ici précisément le seul chemin non testable
sans réseau.

### Pourquoi c'est grave malgré son étroitesse

Le défaut est **silencieux jusqu'au dernier geste**. Vérifié en démarrant le
serveur sur le runtime cible simulé :

- le serveur démarre normalement (`Serveur démarré`) — le module est chargé
  paresseusement, donc l'erreur n'apparaît pas au boot ;
- `GET /api/pilote/status` répond **200** et affiche tous les prérequis au vert
  une fois Render configuré ;
- `POST` en `dry_run: true` ne touche pas GitHub et réussirait aussi.

Autrement dit, les étapes 1, 2 et 3 du plan d'activation du Pilote passeraient
toutes, et seule l'étape 4 — l'écriture réelle — échouerait, en `500
UNEXPECTED_ERROR`. C'est le pire endroit pour le découvrir : après merge, après
déploiement, avec un message d'erreur qui ne désigne ni Drive, ni GitHub, ni la
configuration, et qui ferait naturellement soupçonner les credentials ou les
droits — exactement le contresens de diagnostic que DEV-003-R et DEV-004
cherchaient déjà à éviter.

`googleapis@144.0.0` n'est **pas** concerné : paquet CommonJS, chargement
vérifié sur le runtime cible simulé — OK.

**Aucun correctif proposé, ce n'est pas mon rôle** : le constat devient une
demande vers l'ingénieur-développeur. Deux directions existent, à lui d'arbitrer
techniquement ; ce qui doit être exigé quelle que soit la solution, c'est **une
vérification qui exerce réellement le chemin de chargement** sur le runtime
cible, sinon le même angle mort se reformera.

---

## 4. Contrôles demandés — résultats

### 4.1 Diff complet (point 1) — conforme

Additif intégralement. Créations : `services/pilote-drive-proxy.js` (419),
`routes/pilote-drive.routes.js` (109), `tests/pilote-drive-proxy.test.js` (572),
`docs/VOIE_B_DEV-006.md` (97). Modifications : `server.js` (+4),
`package.json` (+2), `package-lock.json` (+414). Aucune ligne existante
modifiée ou supprimée hors de ces ajouts.

### 4.2 Montage et non-régression (point 2) — conforme

`app.use('/api/pilote', require('./routes/pilote-drive.routes'))` inséré après
`authMiddleware` et le rate limit, après tous les routeurs existants, avant le
cache. Aucun préfixe existant n'est recouvert : `/api/pilote` est un espace
neuf. Vérifié en exécution : `/health` → 200, `/api/facebook/recommendations`
→ 200, comportement des routes existantes identique à `main` (les 500 observés
sur `/api/facebook/campaigns` viennent de l'absence de jeton Meta en local, pas
de la branche).

L'écart de spécification signalé par DEV (`index.js` demandé par DIR-008, qui
n'existe pas ; montage fait dans `server.js`) est **exact** : `package.json`
déclare `main: server.js` et `start: node server.js`, et il n'y a pas
d'`index.js` dans le dépôt. Le montage est au bon endroit ; c'est la
spécification qui est à corriger.

### 4.3 Tests rejoués (point 3) — 56/56

`npm test` exécuté après `npm install` : **56 tests, 56 réussis, 0 échec**, en
0,9 s. Google Drive et GitHub entièrement simulés, aucun appel réseau, aucun
credential réel. Le chiffre annoncé par DEV est exact. Sa **portée** ne l'est
pas entièrement : la suite ne couvre pas la construction des clients réels
(§3).

### 4.4 Protection de la route d'écriture (point 4) — conforme, vérifié en exécution

| Sonde | Résultat |
|---|---|
| Sans clé API Dashboard | **401** `Authentification requise` |
| Clé API, `PILOTE_PUSH_SECRET` non posé | **503** `AUTH_NOT_CONFIGURED` — la route échoue **fermée**, POST compris, avant tout traitement |
| Clé API + mauvais `x-pilote-secret` | **401** `UNAUTHORIZED` |
| Clé API + bon secret | **200** |

Deux secrets distincts sont nécessaires : l'API key Dashboard héritée du montage
sous `/api/`, plus l'en-tête dédié. La comparaison passe par un SHA-256 puis
`timingSafeEqual`, donc à temps constant et sans fuite par la longueur.

Aucune fuite de credentials : recherche des deux secrets de test dans le corps
des réponses — **0 occurrence**. Toute erreur transite par `redact()`, qui
neutralise les formes `ghp_`/`gho_`/`ghs_`/`ghu_`/`ghr_`, `github_pat_`, les
blocs `PRIVATE KEY` PEM, les jetons `ya29.`, et les champs `access_token`,
`private_key`, `client_secret`, `authorization`.

### 4.5 Drive en lecture seule et borné au dossier (point 5) — conforme

Portée unique `https://www.googleapis.com/auth/drive.readonly` : aucune écriture
Drive n'est techniquement possible. Recherche exhaustive dans le module :
uniquement `drive.files.get` et `drive.files.export` — **aucun**
`files.create/update/delete/copy`.

Le bornage est réel : `assertInAllowedFolder()` exige que
`PILOTE_DRIVE_FOLDER_ID` figure dans les `parents` **directs** du document,
sinon `403 DOCUMENT_OUT_OF_SCOPE` — y compris pour un document parfaitement
lisible par le compte de service. Sans folder configuré, `503`. Le contrôle
s'exécute **avant** toute lecture de contenu, et `document_id` est validé par
motif `^[A-Za-z0-9_-]{10,200}$` avant tout appel réseau : `../../etc/passwd`
→ `400 DOCUMENT_ID_INVALID`, vérifié.

### 4.6 Destination GitHub fixe (point 6) — conforme, propriété structurelle

`GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH` et la table `TARGETS` sont des
constantes gelées du module. Le client ne transmet au mieux qu'une **clé**
d'allowlist. Sondes live :

```
target "../../../etc/passwd" → 400 TARGET_NOT_ALLOWED  (allowed: ["meta-ads"])
target "auditeur"            → 400 TARGET_NOT_ALLOWED
target "projets/x/y.md"      → 400 TARGET_NOT_ALLOWED
```

Champs pièges `repo`, `path` et `branch` envoyés dans le corps : **ignorés**, le
traitement se poursuit vers la cible fixe (arrêté ensuite par l'absence de
Secret File, comme attendu en local). Une seule référence `seoettia-collab` dans
tout le module : la constante `GITHUB_OWNER`. Aucun autre dépôt n'est
atteignable.

C'est la bonne façon de le faire : la sécurité tient à la structure, pas à un
contrôle qu'on pourrait oublier d'appeler.

### 4.7 Conflits SHA et protection du rapport actif (point 7) — conforme

Le SHA courant est toujours relu avant écriture ; quand le fichier existe,
jamais d'écriture sans SHA. Sur `409`/`422`, relecture de l'état courant et
réessai borné à **3** tentatives, puis échec explicite — pas de forçage. Si le
fichier a disparu entre-temps, le réessai crée proprement. Contenu identique →
aucun commit (`unchanged: true`).

`assertNotDestroyingActiveReport()` refuse en `409 ACTIVE_REPORT_PROTECTED`
l'écrasement d'une cible contenant une ligne `MESSAGE-ID` par un contenu portant
le marqueur `TEST`, sauf `confirm_overwrite: true` explicite. Actif par défaut :
le test d'acceptation ne peut pas détruire META-007-R par inadvertance.

*Deux remarques non bloquantes.* Le marqueur est `\bTEST\b` : un rapport META
parfaitement légitime qui citerait `META-DRIVE-WRITE-TEST-001` serait refusé —
gênant, mais dans le bon sens. À l'inverse, un contenu non marqué `TEST` écrase
la boîte sans garde-fou : c'est le comportement voulu d'une boîte de messages,
et l'historique Git reste le filet de sécurité.

### 4.8 Route de statut (point 8) — conforme

`GET /status` est lui aussi derrière les deux secrets, et ne renvoie que des
**booléens** (`exists`, `readable`, `drive_folder_configured`,
`github_token_configured`), la cible attendue et la portée Drive. Réponse réelle
capturée : aucune valeur de secret, aucun contenu de Secret File, aucune
occurrence des secrets de test. La seule chaîne sensible en apparence est le
**chemin** `/etc/secrets/service-account.json` — un chemin, pas une valeur, et
il est déjà public dans la gouvernance.

### 4.9 Périmètre (point 9) — conforme

- **Zéro écriture Meta Ads** : aucune occurrence de `graph.facebook`, aucun
  appel Graph dans le diff hors tests.
- **Zéro CAPI** : aucune occurrence.
- **Zéro frontend** : aucun fichier `.html`/`.css`/frontend touché ; aucune
  branche côté dépôt frontend.
- **Zéro SaaS** : `saas` inchangée, `8152f038…`.
- **Zéro autre dépôt** : une seule constante d'owner, un seul repo, un seul
  chemin cible.
- **Zéro shell** : aucun `child_process`, `exec` ni `spawn`. Drive et GitHub
  sont atteints par leurs API, jamais par une commande alimentée par du contenu
  externe.

### 4.10 Dépendances ajoutées (point 10) — un bloqueur, un risque

**`@octokit/rest@^21.0.2`** — bloqueur, traité au §3.

**`googleapis@^144.0.0`** — fonctionnellement correct (CommonJS, compatible Node
20, chargement vérifié), mais lourd : **116 Mo installés**, contre 17 Mo pour
`@octokit`, et **36 paquets ajoutés** au verrou. C'est le client agrégé de
*toutes* les API Google alors que le besoin se limite à Drive v3. Sur une
instance Render modeste, cela pèse sur la durée de build, l'empreinte disque et
le démarrage à froid. Non bloquant, mais à peser : un client Drive dédié
couvrirait le même besoin pour une fraction du poids. Décision d'ingénierie, pas
d'audit.

Aucune des deux dépendances n'est présente sur `main` : la surface est
entièrement nouvelle et n'affecte aucun code existant.

---

## 5. Ce qui reste vrai indépendamment du bloqueur

La conception est solide et mérite d'être dite telle quelle : destination
constante plutôt que validée, source bornée au dossier, échec fermé en l'absence
de secret, double authentification, rédaction systématique des erreurs, portée
Drive minimale, protection du rapport actif active par défaut, réessais SHA
bornés, et absence totale de shell. Les exigences de sécurité sont tenues par
structure, ce qui est le bon niveau. Le bloqueur ne remet en cause aucune de ces
propriétés — il porte sur le choix de version d'une bibliothèque, et sur un
angle mort de la couverture de tests.

Deux points de gouvernance, hors périmètre d'audit mais à ne pas perdre :

1. `PILOTE_PUSH_SECRET` n'est toujours pas posé sur Render. Le comportement en
   son absence est correct (503, fail closed), mais un déploiement sans cette
   variable donnerait l'apparence d'un échec de code. Le Pilote l'a déjà
   demandé à la Direction — cela reste vrai.
2. Le test d'acceptation `META-DRIVE-WRITE-TEST-001` ne peut pas être exécuté
   avant merge, faute de préproduction. Le choix de DEV de respecter
   l'interdiction de merge plutôt que de forcer le test est le bon ; ce
   n'est pas un manquement.

---

## 6. Conditions de réexamen

La branche redevient auditable dès que le chargement du client GitHub est
exercé **sur le runtime cible** — pas simulé par un mock — et que la couverture
inclut ce chemin. Un `GET /status` vert ne prouve rien sur ce point : il faudra
une vérification qui construit réellement le client.

Rien d'autre n'est demandé : les neuf autres points de contrôle sont conformes
et n'auront pas à être réaudités s'ils ne bougent pas.

---

## 7. Confirmations de sécurité et de périmètre

- **Zéro merge, zéro déploiement.** Backend `main` reste
  `6b1a3a1ab4f057ea5330c5e7fc2b2276168776c2`, branche auditée inchangée
  (`53dca34…`), `git status` vierge.
- **Zéro secret manipulé.** Aucun credential Google, aucun jeton GitHub, aucun
  Secret File lu ou approché. Les valeurs employées dans mes sondes sont
  factices et locales ; aucune n'a été écrite nulle part.
- **Zéro écriture réelle.** Aucune écriture Drive, aucune écriture GitHub par la
  route : les sondes s'arrêtent toutes avant, faute de credentials, et aucun
  appel réseau sortant n'a été émis vers Google, GitHub ou Meta.
- **Zéro écriture Meta Ads, zéro CAPI, zéro frontend, zéro SaaS, zéro autre
  dépôt.**
- Lecture seule intégrale : aucun fichier créé, modifié ou supprimé dans les
  dépôts de code. La seule écriture de cette mission est le présent rapport.

---

— auditeur · facebook-ads
