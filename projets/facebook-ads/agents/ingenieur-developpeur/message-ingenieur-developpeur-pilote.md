# Message ingenieur-developpeur -> Pilote

MESSAGE-ID : DEV-006-R
EN-REPONSE-A : DEV-006
DATE : 2026-09-01
AGENT : ingenieur-developpeur (facebook-ads)
OBJET : Voie B — Phase 0 non vérifiable depuis mon environnement

---

## VERDICT

### `DEV-006 — MISSION NON TERMINÉE`

**Aucun code écrit.** Phase 0 n'a pas pu être exécutée, et DEV-006 §1 comme
DIR-008 interdisent de coder avant confirmation.

Je ne rapporte **pas** le Secret File comme absent. Je rapporte qu'il est
**non vérifiable depuis ma position** — ce qui n'est pas la même chose, et la
distinction compte : conclure « absent » enverrait remonter un fichier qui est
peut-être déjà en place.

---

## 1. Phase 0 — statut : `NON VÉRIFIABLE`

Cible : `/etc/secrets/service-account.json` sur Render.

Un Secret File Render n'est observable que de trois façons. Aucune ne m'est
ouverte :

| Moyen | Disponible ? | Constat |
|---|---|---|
| Dashboard Render (Environment → Secret Files) | **Non** | Aucun accès console Render dans mon environnement |
| API Render (`/v1/services/.../env-vars`, Secret Files) | **Non** | Aucune clé API Render dans mes accès ; la compétence `deploiement-mistral` ne fournit que les URL publiques et le workflow de push |
| Shell sur l'instance Render | **Non** | Pas de SSH ; le service n'expose que HTTP |

Reste une quatrième voie théorique : **déployer une sonde** de présence de
fichier et l'interroger. Je ne l'ai pas prise, pour trois raisons cumulatives :

1. DEV-006 §1 : « **AUCUN CODE AVANT CONFIRMATION** ». Une sonde est du code.
2. DEV-006 §7 : aucun merge `main`, aucun déploiement permanent sans nouvel
   arbitrage. Or sur ce backend, **seul un push sur `main` déclenche un
   déploiement** : il n'existe pas d'environnement de préproduction. Déployer
   la sonde imposerait donc d'enfreindre §7 pour satisfaire §1.
3. C'est précisément l'inversion que Phase 0 existe pour empêcher : construire
   d'abord, vérifier ensuite.

**Contrôles complémentaires effectués (lecture seule, sans coder) :** j'ai
vérifié qu'aucune route existante du backend n'expose la présence d'un fichier
de secrets ou l'état des variables `GOOGLE_APPLICATION_CREDENTIALS`,
`GITHUB_TOKEN`, `PILOTE_DRIVE_FOLDER_ID`. `/health` ne renvoie que Twilio et la
passerelle SMS. Les routes `/debug/*` existantes ne touchent ni au système de
fichiers, ni à Google, ni à GitHub. Il n'y a donc, aujourd'hui, **aucun moyen
d'observer Phase 0 à distance**.

Aucun contenu de fichier service account n'a été lu, affiché ou recherché.

## 2. Ce qui débloque, et en combien de temps

**Un seul geste, par qui a la console Render** (Gérant ou Pilote) :

> Render → service `facebook-ads-backend` → **Environment** → section
> **Secret Files**. Vérifier qu'une entrée nommée `service-account.json` existe,
> et que son chemin monté est bien `/etc/secrets/service-account.json`.

Trois issues possibles, et ce qu'elles impliquent :

- **Entrée présente au bon chemin** → me le confirmer suffit ; Phase 0 est
  validée et j'implémente immédiatement (voir §4).
- **Entrée absente** → il faut téléverser le JSON du service account en Secret
  File. DIR-008 §2 annonce la variable `GOOGLE_APPLICATION_CREDENTIALS` comme
  posée, mais **une variable d'environnement n'est qu'un chemin** : elle peut
  parfaitement pointer vers un fichier qui n'a jamais été monté. C'est
  exactement le piège que DIR-008 §1 anticipait en exigeant cette confirmation.
- **Entrée présente à un autre chemin** → me donner le chemin réel ; je m'y
  aligne, sans supposer.

**Variante si le Pilote préfère que je vérifie moi-même :** m'autoriser
explicitement, par une directive, un déploiement contrôlé d'une sonde
strictement en lecture — un `GET` protégé par en-tête secret, renvoyant
uniquement trois booléens (`file_exists`, `file_readable`, et la présence — pas
la valeur — des trois variables). Elle ne lit aucun contenu, ne journalise aucun
secret, et se retire par un `git revert` d'un seul commit. Je ne l'engage pas
sans cette autorisation, DEV-006 §7 et DIR-008 étant explicites.

## 3. Pré-vol code (partie exécutable sans coder)

Fait, car indépendant de Phase 0 :

| Élément | Constat |
|---|---|
| Backend `main` (distant) | `6b1a3a1ab4f057ea5330c5e7fc2b2276168776c2` |
| Service en production | `/health` → `HTTP 200`, `status: healthy` |
| Modifications depuis DEV-005 | **aucune** — `main` est exactement le hash livré en DEV-005-R |
| Dépendances `googleapis` / `@octokit/rest` | **absentes** du `package.json` — à ajouter |
| Intégration Google ou GitHub existante | **aucune** — aucune occurrence dans le code |
| Frontend / `saas` | non touchés, non lus |

**Point factuel à corriger dans la spécification.** DEV-006 §3.2 et DIR-008
mentionnent un montage « dans `index.js` ». Ce fichier **n'existe pas** :
`package.json` déclare `main: server.js` et `start: node server.js`. Le point
d'entrée réel est **`server.js`**, où sont déjà montés tous les routeurs
(`app.use('/api/...', ...)`). C'est là que je monterai
`pilote-drive.routes.js`. Je le signale plutôt que de le corriger en silence :
la spécification a été écrite sur une hypothèse de structure, et je préfère que
l'écart soit tracé.

## 4. Ce qui est prêt à partir dès la confirmation

Rien n'est codé, mais la conception est arrêtée. Dès Phase 0 validée, sur la
branche `dev-006-meta-drive-github-proxy` :

- `routes/pilote-drive.routes.js`, monté dans `server.js` ;
- lecture Drive du document via `googleapis` et le service account, dossier
  restreint à `PILOTE_DRIVE_FOLDER_ID` ;
- écriture GitHub via `@octokit/rest` avec `GITHUB_TOKEN`, sur une
  **destination fixe en dur** — dépôt `seoettia-collab/infra-agents-competences`,
  chemin `projets/facebook-ads/agents/meta-ads/message-meta-ads-pilote.md`.
  Aucun chemin, dépôt ni branche accepté depuis le client : la cible n'est pas
  un paramètre, elle est une constante. C'est la seule façon de rendre §4
  vraie par construction plutôt que par validation ;
- commit préfixé `[proxy-push][meta-drive]` ;
- route protégée par en-tête secret dédié, comparé en temps constant ;
- gestion du conflit SHA GitHub : relecture du SHA courant et réessai borné,
  jamais d'écrasement aveugle ;
- refus de démarrage explicite si le Secret File est absent au moment de
  l'appel — le blocage propre exigé par §6, vérifié aussi à chaud et pas
  seulement au boot ;
- aucun secret en réponse ni en log ; aucun appel Meta Ads ; aucune commande
  shell ni git avec du contenu venant de l'extérieur.

Test d'acceptation prévu avec `META-DRIVE-WRITE-TEST-001`
(`1bAh-_JygVkTfdUSFeDaFO6KyUPoZLPzGHQW4Rg-PRFM`). Conformément à §5, si ce
document ne contient pas un rapport META final exploitable, j'écrirai un
payload explicitement marqué `TEST` — et **jamais par-dessus le rapport META
actif sans contrôle** : la boîte `message-meta-ads-pilote.md` porte
aujourd'hui META-007-R, et l'écraser par un test détruirait un message de
gouvernance validé. Je proposerai dans ce cas de rejouer le test sur une
branche du hub plutôt que sur `main`.

Couverture de tests prévue : les dix cas de §6.

## 5. Confirmations

- **Aucun code écrit, aucune branche créée, aucun commit backend.** `main`
  reste `6b1a3a1ab4f057ea5330c5e7fc2b2276168776c2`.
- **Aucun déploiement.**
- **Zéro secret.** Aucun contenu de service account, de `GITHUB_TOKEN` ou de
  credentials Google n'a été lu, affiché, journalisé ou versionné. Aucune
  tentative d'accès détourné au système de fichiers de l'instance.
- **Zéro écriture Meta Ads.** Aucun appel Graph dans cette mission.
- **Zéro CAPI.**
- **Zéro SaaS.** Branche `saas` non lue, non touchée : `8152f038…` inchangé.
- **Zéro frontend.** Aucun fichier du dépôt frontend touché.
- Seul fichier écrit par cette mission : le présent rapport.

---

— ingenieur-developpeur · facebook-ads
