# Message ingenieur-developpeur -> Pilote

MESSAGE-ID : DEV-007-R
EN-REPONSE-A : DEV-007
DATE : 2026-09-01
AGENT : ingenieur-developpeur (facebook-ads)
OBJET : Correctif de compatibilité runtime — `ERR_REQUIRE_ESM` éliminé

---

## 1. Cause racine — reproduite, pas déduite

`@octokit/rest` v21 est publié en **ESM pur** : son `package.json` déclare
`"type": "module"`. Le runtime du service est **Node 20.11.1**, ce que confirme
le champ `engines` du dépôt (`"node": "20.x"`). Sous Node 20, un `require()`
sur un module ESM lève `ERR_REQUIRE_ESM`.

Reproduction sous le runtime exact, avec le binaire officiel `v20.11.1` :

```
$ node -v
v20.11.1
$ node -e "require('@octokit/rest')"
ERR_REQUIRE_ESM
require() of ES Module .../node_modules/@octokit/rest/dist-src/index.js not supported.
```

Et sur le chemin réel, `defaultGithubClient()` :

```
construction client GitHub : ERR_REQUIRE_ESM
```

**Pourquoi le défaut a échappé à DEV-006.** Deux masques se sont additionnés :

1. Mon environnement de développement tourne sous **Node 22**, qui autorise
   `require(esm)` par défaut. Le code passait donc localement alors qu'il
   aurait échoué en production.
2. Les tests DEV-006 n'utilisaient que des **clients injectés**. Le chemin
   `defaultGithubClient()` n'était jamais exécuté, donc jamais chargé.

Aggravant, l'ordre des opérations plaçait la construction du client GitHub
**après** la lecture Drive. En production, l'échec ne serait apparu qu'une fois
le document déjà lu : tardivement, et sur un flux réputé fonctionnel.
`googleapis` n'est pas concerné — il reste en CommonJS et se charge sans
incident sous Node 20 (vérifié).

## 2. Correctif retenu

Chargement du client GitHub par **`import()` dynamique**, valide depuis du
CommonJS sur Node 20 comme sur Node 22, avec mise en cache du constructeur
après le premier chargement.

```js
const mod = await import('@octokit/rest');
const Octokit = mod.Octokit || (mod.default && mod.default.Octokit);
```

`defaultGithubClient()` devient `async` et est attendu par `pushMetaResponse()`.

**Alternative écartée : rétrograder vers `@octokit/rest` v20** (dernière
version CommonJS). C'était le correctif le plus court, mais il fige la
dépendance sur une version qui ne recevra plus de correctifs de sécurité, et il
faudrait le refaire au prochain paquet passé en ESM. L'import dynamique traite
la cause — l'hypothèse « tout est CommonJS » — plutôt que ce symptôme précis.
Il reste par ailleurs valide si le paquet redevient dual un jour.

Le fallback `mod.default.Octokit` couvre les deux formes d'empaquetage
possibles plutôt que de parier sur l'export nommé.

## 3. Vérification qui exerce la construction réelle

C'est l'exigence §4, et c'est ce qui manquait. Trois tests nouveaux touchent le
vrai code, sans doublure :

- **`loadOctokit()`** charge effectivement le module et renvoie un
  constructeur — le test échouerait sur `ERR_REQUIRE_ESM` avant le correctif.
- **`defaultGithubClient()`** construit un vrai client par le chemin de
  production, et le test vérifie la présence des deux méthodes réellement
  employées par la Voie B : `repos.getContent` et
  `repos.createOrUpdateFileContents`. Aucun appel réseau : le constructeur
  Octokit n'en émet pas.
- **`googleapis`** est chargé pour de bon et `google.drive` / `google.auth.GoogleAuth`
  sont vérifiés.

Deux tests de non-régression complètent : mise en cache du constructeur, et un
test qui **lit le code source** pour interdire le retour d'un
`require('@octokit/rest')` statique tout en exigeant la présence de
`await import('@octokit/rest')`. Le défaut ne peut pas revenir en silence.

## 4. Branche et hash

- Branche : **`dev-006-meta-drive-github-proxy`** (poursuivie, comme demandé)
- Base auditée : `53dca34ca6abc41820d5f6356585210931c06261`
- **Nouveau hash : `8c97dc5498b5032c7d66205cc21043617df97911`** — poussé
- `main` inchangée : `6b1a3a1ab4f057ea5330c5e7fc2b2276168776c2`

**Fichiers modifiés :** `services/pilote-drive-proxy.js` (+39/−3),
`tests/pilote-drive-proxy.test.js` (+59), `docs/VOIE_B_DEV-006.md` (section
runtime). Aucun autre fichier. Aucune dépendance ajoutée ni retirée.

## 5. Résultats des tests

| Runtime | Résultat |
|---|---|
| **Node 20.11.1** (runtime cible) | **62 tests, 62 réussis, 0 échec** |
| Node 22.22.2 (sandbox) | **62 tests, 62 réussis, 0 échec** |

Les 56 tests validés par AUD-006 passent à l'identique : aucun n'a été modifié
ni supprimé. Les 6 nouveaux portent uniquement sur la construction réelle des
clients et sur la non-régression du chargement.

## 6. Preuve de compatibilité Node 20.11.1

Binaire officiel `node-v20.11.1-linux-x64` téléchargé depuis nodejs.org, et non
une approximation.

**a. Construction du client par le chemin de production**

```
$ node -v
v20.11.1
$ GITHUB_TOKEN=<factice> node -e "require('./services/pilote-drive-proxy').defaultGithubClient()..."
OK — client construit. repos.createOrUpdateFileContents = function
```

**b. Démarrage réel du service et route interrogée**

Modules natifs recompilés pour l'ABI de Node 20 (`npm rebuild better-sqlite3`)
afin que le démarrage soit fidèle et non biaisé par mon sandbox.

```
$ node server.js            (Node 20.11.1)
GET /api/pilote/status  ->  HTTP 200
{"success":true,"credentials_file":{"path":"/etc/secrets/service-account.json",...},
 "target":{"repo":"seoettia-collab/infra-agents-competences","branch":"main",
 "allowed_targets":["meta-ads"]},"drive_scope":".../drive.readonly"}

ERR_REQUIRE_ESM dans les logs : 0
```

`credentials_file.exists: false` est attendu en local : le Secret File n'existe
que sur Render.

**c. Suite complète** rejouée sous Node 20.11.1 après recompilation : 62/62.

## 7. Périmètre inchangé

Le correctif ne touche que le **chargement** du client GitHub. Tout ce qu'AUD-006
a validé est intact :

- destination GitHub toujours **constante** dans le module ; dépôt, chemin et
  branche non paramétrables ;
- source Drive toujours bornée à `PILOTE_DRIVE_FOLDER_ID` ;
- route toujours **fail closed** sans `PILOTE_PUSH_SECRET` ;
- portée Drive toujours `drive.readonly` ;
- `redact()` toujours appliqué à toute erreur ;
- gestion du conflit de SHA, protection du rapport actif, refus du document
  vide, refus du MIME non supporté : inchangés ;
- aucune modification de `routes/pilote-drive.routes.js`, de `server.js`, ni du
  `package.json`.

## 8. Confirmations

- **Zéro merge, zéro déploiement.** `main` reste `6b1a3a1ab4f057ea5330c5e7fc2b2276168776c2`.
- **Zéro frontend.** Aucun fichier du dépôt frontend touché.
- **Zéro SaaS.** Branche `saas` non lue, non touchée : `8152f038…` inchangé.
- **Zéro écriture Meta Ads, zéro CAPI.** Aucun appel Graph dans cette mission.
- **Zéro secret.** Les jetons utilisés dans les tests sont factices et nommés
  comme tels ; aucun credential réel n'a été lu, écrit ou journalisé.
- **Zéro écriture réelle par le proxy.** Aucun appel à GitHub ni à Drive n'a été
  émis : seule la *construction* des clients a été exercée.
- Branche prête pour ré-audit indépendant.

**Reste ouvert, inchangé depuis DEV-006-R2 :** `PILOTE_PUSH_SECRET` n'est
toujours pas posée sur Render. Sans elle, la route répondra 503 même après
déploiement. Et le test d'acceptation `META-DRIVE-WRITE-TEST-001` reste non
exécuté, faute d'environnement de préproduction — il suppose le merge que le
Pilote réserve à la revue.

---

— ingenieur-developpeur · facebook-ads
