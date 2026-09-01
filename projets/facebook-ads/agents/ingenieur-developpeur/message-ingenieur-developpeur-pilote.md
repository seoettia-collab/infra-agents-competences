# Message ingenieur-developpeur -> Pilote

MESSAGE-ID : DEV-006-R2
EN-REPONSE-A : DEV-006-REPRISE
DATE : 2026-09-01
AGENT : ingenieur-developpeur (facebook-ads)
OBJET : Voie B implémentée — Drive → backend → GitHub

---

## 1. Pré-vol

| Contrôle | Constat |
|---|---|
| Hub lu | `main` `ae0b968fb0d3ed66a7362c313edd955fcdb9cde6` |
| Phase 0 | **LEVÉE** par DIR-010, prise pour acquise. Aucune sonde, aucune demande de confirmation Render supplémentaire. |
| Backend `main` | `6b1a3a1ab4f057ea5330c5e7fc2b2276168776c2` |
| Divergence depuis DEV-005 | **aucune** — 0 commit |
| Point d'entrée réel | **`server.js`** confirmé (`package.json` : `main: server.js`, `start: node server.js`). `index.js` n'existe pas. |
| Frontend / `saas` | non lus, non touchés |

## 2. Livraison

- Branche : **`dev-006-meta-drive-github-proxy`**
- Commit : **`53dca34ca6abc41820d5f6356585210931c06261`** — poussé
- `main` inchangée : `6b1a3a1ab4f057ea5330c5e7fc2b2276168776c2`
- Aucun déploiement.

### Fichiers

**Créés** — `services/pilote-drive-proxy.js` (logique),
`routes/pilote-drive.routes.js` (route + auth),
`tests/pilote-drive-proxy.test.js` (26 tests),
`docs/VOIE_B_DEV-006.md`.

**Modifiés** — `server.js` (montage sous `/api/pilote`),
`package.json` + `package-lock.json` (`googleapis`, `@octokit/rest`).

### Endpoints

```
POST /api/pilote/push-meta-response   Drive → GitHub
GET  /api/pilote/status               état des prérequis, booléens seuls
```

## 3. Sécurité — ce qui est tenu par construction

J'ai cherché à rendre les exigences de §4 vraies **par structure**, pas par
validation d'entrée : un contrôle qu'on peut oublier d'appeler n'est pas un
contrôle.

**La destination n'est pas un paramètre.** Dépôt, chemin et branche sont des
constantes du module. Le client ne peut transmettre qu'une *clé* d'allowlist
(`meta-ads`). Un `path`, un `repo` ou une `branch` envoyés dans le corps sont
purement ignorés — un test envoie ces trois champs pièges et vérifie que
l'écriture part quand même sur la cible fixe.

**La source est bornée.** Le document doit avoir `PILOTE_DRIVE_FOLDER_ID` parmi
ses parents Drive. Un ID arbitraire est refusé (403) **même s'il est lisible
par le compte de service** — sans ce contrôle, la route lirait n'importe quel
document partagé avec lui.

**La route échoue fermée.** Sans `PILOTE_PUSH_SECRET`, elle répond 503 et ne
traite rien. Le secret est comparé en temps constant, sur empreintes, donc sans
fuite par la longueur.

**Défense en profondeur.** Montée sous `/api/`, elle hérite de l'API key
Dashboard et du rate limit déjà en place, **et** ajoute son en-tête dédié :
deux secrets distincts sont nécessaires pour l'atteindre.

**Aucun secret ne sort.** Toute erreur passe par `redact()` avant log ou
réponse (formes `ghp_`, `github_pat_`, clés privées PEM, jetons `ya29.`,
champs `private_key` / `access_token`). `/status` ne renvoie que des booléens
de présence et un chemin, jamais une valeur.

**Portée Drive en lecture seule** (`drive.readonly`) : aucune écriture Drive
n'est techniquement possible.

**Un seul dépôt.** Un test lit le code source du module et vérifie qu'aucune
référence à un autre dépôt `seoettia-collab/*` n'y figure, et qu'aucun motif
`child_process`, `exec`, `spawn`, `graph.facebook.com` ou `CAPI` n'est présent.

## 4. Garde-fous fonctionnels

- **Conflit de SHA** : relecture du SHA courant puis réessai, borné à 3. Jamais
  d'écrasement sans SHA quand le fichier existe.
- **Contenu identique** : aucun commit inutile (`unchanged: true`).
- **Document vide** : refus, plutôt qu'écraser la cible par du vide.
- **Type non pris en charge** : refus explicite plutôt que supposition. Google
  Doc → export texte ; `text/plain` et `text/markdown` → lecture directe.
- **`document_id` malformé** : rejeté avant tout appel réseau.
- **Rapport actif protégé** (exigence §5) : si la cible contient une ligne
  `MESSAGE-ID` et que le contenu entrant porte le marqueur `TEST`, l'écriture
  est refusée en 409 `ACTIVE_REPORT_PROTECTED`, sauf `confirm_overwrite: true`
  explicite. La boîte `message-meta-ads-pilote.md` porte aujourd'hui META-007-R :
  un test qui l'écraserait détruirait un message de gouvernance validé.

## 5. Tests

`npm test` — **56 tests, 56 réussis, 0 échec**, dont **26 nouveaux**. Google
Drive et GitHub sont entièrement mockés : aucun réseau, aucun credential,
aucune écriture réelle.

Couverture des dix points de §6 :

| Exigence §6 | Test |
|---|---|
| auth refusée sans secret | 401 sans en-tête, 401 avec mauvais secret, POST bloqué avant tout traitement |
| Secret File absent/illisible → erreur propre | 503 `CREDENTIALS_FILE_MISSING` et `CREDENTIALS_FILE_UNREADABLE`, distincts ; **aucun appel Drive ni GitHub émis** |
| lecture Drive OK | Google Doc exporté ; fichier texte lu directement |
| document introuvable | 404 `DOCUMENT_NOT_FOUND` ; 403 `DRIVE_FORBIDDEN` si partage manquant |
| écriture GitHub OK | commit préfixé `[proxy-push][meta-drive]`, SHA courant transmis ; création sans SHA si le fichier n'existe pas |
| conflit SHA géré | relecture + réussite au 2ᵉ essai ; échec explicite après 3 essais, exactement 3 tentatives |
| destination hors allowlist impossible | 4 chemins hostiles rejetés ; champs pièges ignorés ; constantes vérifiées |
| aucune fuite token/credentials | rien dans la réponse ; token masqué dans une erreur GitHub ; `/status` ne divulgue aucune valeur |
| aucune écriture Meta Ads | scan du code source : aucun motif Graph/CAPI |
| aucun frontend/SaaS | aucun fichier concerné modifié |

Complément : `dry_run`, document vide, MIME non supporté, `document_id`
malformé, contenu identique, fail-closed sans `PILOTE_PUSH_SECRET`, portée
Drive en lecture seule.

**Vérification de montage réel** : serveur démarré localement, route
interrogée. Sans en-tête → `401`. Avec en-tête → `200`, réponse conforme,
`credentials_file.exists: false` (attendu : le Secret File n'existe que sur
Render), et **aucune occurrence du secret ni de `ghp_`** dans le corps.

## 6. Test d'acceptation `META-DRIVE-WRITE-TEST-001` — non exécuté

Il ne peut pas l'être en l'état, et je ne l'ai pas contourné.

Le flux exige trois éléments qui n'existent que sur Render : le Secret File
`/etc/secrets/service-account.json`, le `GITHUB_TOKEN` dédié `voie-b-meta`, et
`PILOTE_DRIVE_FOLDER_ID`. Aucun n'est présent dans mon environnement, et je ne
dois pas les y faire venir. Or ce backend n'a **pas de préproduction** : seul
un push sur `main` déclenche un déploiement. Exécuter le test d'acceptation
imposerait donc le merge que §7 réserve à la revue du Pilote.

J'ai fait le choix de respecter §7 plutôt que §5. Les deux ne peuvent pas être
tenus simultanément ; je le signale au lieu de trancher seul.

**Ce qui reste à faire, une fois la revue faite et le merge autorisé** — dans
cet ordre, chaque étape validant la précédente :

1. **Poser `PILOTE_PUSH_SECRET` sur Render** (voir §7 ci-dessous).
2. `GET /api/pilote/status` → confirme d'un coup les quatre prérequis :
   Secret File présent et lisible, dossier Drive configuré, token GitHub
   configuré, cible attendue. C'est aussi la vérification de Phase 0 qui
   manquait à DEV-006 initial, désormais disponible en libre-service et sans
   divulguer aucune valeur.
3. `POST` avec `dry_run: true` → prouve la lecture Drive **sans rien écrire**
   dans le dépôt de gouvernance.
4. `POST` réel → écriture et commit.

Si le document test n'est pas un rapport META exploitable, l'étape 4 sera
refusée d'elle-même par le garde-fou `ACTIVE_REPORT_PROTECTED` : la protection
prévue par §5 est active par défaut, elle n'a pas à être pensée au moment du
test.

## 7. Point bloquant à arbitrer — variable manquante

`PILOTE_PUSH_SECRET` est une **variable nouvelle**, absente de DIR-008 comme de
DIR-010. Elle n'existe donc pas encore sur Render.

Conséquence : **en l'état, la route répondrait 503 même après déploiement.**
C'est délibéré — DEV-006 §4 exige un secret serveur dédié, et j'ai choisi de
fermer la route plutôt que de l'ouvrir en l'absence de configuration. Mais cela
veut dire qu'un déploiement sans cette variable donnerait l'apparence d'un
échec alors que le code est correct.

À poser avant toute mise en service : une valeur aléatoire longue, connue du
seul appelant autorisé. Je ne la génère ni ne la propose ici : un secret ne se
transmet pas par un fichier de gouvernance versionné.

## 8. Écart signalé par rapport à la spécification

DEV-006-REPRISE §3.2 et DIR-008 demandent un montage « dans `index.js` ». Ce
fichier n'existe pas dans ce dépôt. Le montage est fait dans **`server.js`**,
seul point d'entrée réel, où sont déjà déclarés tous les routeurs. J'avais déjà
signalé cet écart en DEV-006-R ; je le répète car la spécification n'a pas été
corrigée, et la confusion pourrait réapparaître au moment de la revue.

## 9. Confirmations

- **Zéro merge, zéro déploiement.** `main` reste `6b1a3a1ab4f057ea5330c5e7fc2b2276168776c2`.
- **Zéro secret.** Aucun token, aucun credential Google, aucun contenu de
  Secret File lu, affiché, journalisé ou versionné. Les valeurs employées dans
  les tests sont factices et explicitement nommées comme telles.
- **Zéro écriture Meta Ads.** Aucun appel Graph dans cette mission. Aucune
  campagne, adset ou ad touché.
- **Zéro CAPI.**
- **Zéro SaaS.** Branche `saas` non lue, non touchée : `8152f038…` inchangé.
- **Zéro frontend.** Aucun fichier du dépôt frontend modifié.
- **Zéro écriture réelle dans le dépôt de gouvernance par le proxy.** La seule
  écriture de cette mission est ce rapport, poussé par moi et non par la route.
- Aucune commande shell ni git alimentée par du contenu externe : Drive et
  GitHub sont atteints par leurs API.
- **Rollback** : retrait de la ligne de montage dans `server.js`, ou `git revert`
  du commit de merge. Aucune table, aucun schéma, aucun état persistant.

---

— ingenieur-developpeur · facebook-ads
