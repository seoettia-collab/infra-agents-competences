# Message ingenieur-developpeur -> Pilote

MESSAGE-ID : DEV-009-R
EN-REPONSE-A : DEV-009
DATE : 2026-09-01
AGENT : ingenieur-developpeur (facebook-ads)
OBJET : Sonde de capacité L0 — prête pour T1 à T6

---

## 1. Branche et hash

| Élément | Référence |
|---|---|
| Hub lu | `main` `12a1e30fcc61b8622a2131c8cd2e0e5ae7a2ffb6` |
| Branche | **`dev-009-meta-capability-probe`** |
| Commit | **`a85cafeb14f40c9050f223ba6208110c780ac273`** — poussé |
| Base | `main` `8c97dc5498b5032c7d66205cc21043617df97911`, sans divergence |
| `main` après le lot | **inchangée** — aucun merge, aucun déploiement |

**Fichiers** — créés : `routes/probe-l0.routes.js`, `tests/probe-l0.test.js`.
Modifié : `server.js` (deux lignes de montage). Rien d'autre.

## 2. Routes exactes

```
GET  /probe/l0/:probe_id            PUBLIQUE, sans authentification
GET  /api/probe/l0/recent           inspection, authentifiée
POST /api/probe/l0/reset            remise à zéro du tampon, authentifiée
```

La route de test est montée **hors de `/api/`**, délibérément. Tout ce qui vit
sous `/api/` est soumis au middleware d'API key ; or T1 teste précisément une
**navigation nue**, sans en-tête. La placer sous `/api/` aurait garanti un
échec de T1 dû à notre propre configuration, et non à une incapacité de META.

L'inspection, elle, reste sous `/api/` et donc authentifiée : elle sert au
Pilote, pas à l'agent testé.

**Paramètres acceptés** (tous optionnels sauf `probe_id`) :

| Paramètre | Rôle | Borne |
|---|---|---|
| `probe_id` (chemin) | identifiant du test | `[A-Za-z0-9_-]{4,64}` |
| `p` | charge à transporter (T2, T3) | 8192 caractères après décodage |
| `seq` | numéro dans une séquence (T4) | entier 1–999 |
| `n` | taille annoncée de la séquence (T4) | entier 1–999 |
| `format=json` | réponse JSON pour l'outillage | — |

**Réponse par défaut : texte brut.** META ouvre des pages, il ne consomme pas
une API. Le code de contrôle doit être lisible sans parsing.

```
PROBE-L0 OK
CONTROL_CODE: 094E763DFAE5
PROBE_ID: T1-LOCAL-001
SEQ: -
OCCURRENCE: 1
PAYLOAD_CHARS: 0
PAYLOAD_BYTES: 0
PAYLOAD_SHA256: e3b0c442...
URL_CHARS: 22
RECEIVED_AT: 2026-09-01T09:59:41.751Z

Restituer exactement : 094E763DFAE5
```

Ce que chaque champ sert à mesurer : `CONTROL_CODE` → T6 ; `PAYLOAD_SHA256` →
T3 ; `URL_CHARS` → T2 ; `SEQ` → T4 ; `OCCURRENCE` → T5.

## 3. Protections

- **Validation stricte avant tout traitement.** `probe_id` hors format → 400.
  `seq`/`n` non entiers ou hors bornes → 400. `p` fourni en double → 400, plutôt
  qu'un tableau traité en silence.
- **Payload borné à 8192 caractères, avec refus explicite en 413.** Le choix de
  refuser plutôt que tronquer est délibéré : une troncature silencieuse ferait
  passer T3 pour un succès alors que le transport aurait perdu du contenu.
- **Rate limit dédié** : 30 requêtes par minute et par IP, séparé des limiteurs
  existants. Confortable pour T4 (cinq navigations), trop serré pour qu'une
  route publique devienne un amplificateur.
- **`Cache-Control: no-store`.** Sans cela, un cache intermédiaire pourrait
  répondre à la place du serveur et T5 compterait des arrivées fantômes — ou
  n'en compterait aucune.
- **Aucun secret dans l'URL**, conformément à la consigne : un `probe_id` non
  sensible suffit. Le code de contrôle est dérivé de la requête elle-même, donc
  recalculable par le Pilote qui connaît l'URL envoyée, et sans valeur pour un
  tiers.
- **Journal : métadonnées seules.** Le payload n'est jamais écrit en clair — il
  peut contenir un rapport, et un log n'est pas un lieu de stockage. Seuls la
  longueur, le nombre d'octets et l'empreinte sont journalisés.

## 4. Effet de bord — ce qu'il y a, exactement

La sonde n'écrit **aucune base, aucun fichier**, ne touche **ni Meta Ads, ni
GitHub, ni Drive**, et **ne lit aucun secret** — un test vérifie l'absence des
motifs correspondants dans le code source du module.

Sa seule mémoire est un **tampon en RAM**, que je signale plutôt que de le
présenter comme « sans effet » : sans lui, T4 et T5 seraient invérifiables
autrement qu'en lisant les logs Render, auxquels le Pilote n'a pas forcément
accès. Il est borné à 500 entrées, **ne contient aucun payload** (seulement
longueur et empreinte), et disparaît à chaque redéploiement. `POST
/api/probe/l0/reset` le vide entre deux tests.

## 5. Tests

**87 tests, 87 réussis, 0 échec**, sur le runtime cible **Node 20.11.1** — dont
**25 nouveaux** pour la sonde. Les 62 tests des lots précédents passent
inchangés.

| Test préparé | Vérification |
|---|---|
| **T1** | 200 sur navigation nue sans en-tête ; code de contrôle présent et restituable ; aucune authentification requise |
| **T2** | charges 100 / 1 000 / 3 000 / 6 000 / 8 192 acceptées ; 413 au-delà ; longueur d'URL réellement reçue rapportée |
| **T3** | empreinte identique sur accents, tabulations, retours ligne, `% & = ? # + / \`, balises et émojis ; un caractère modifié change l'empreinte ; code reproductible hors serveur |
| **T4** | cinq navigations comptées dans l'ordre, `occurrence` incrémentée, `seq`/`n` hors bornes refusés |
| **T5** | rejeu de la même URL compté séparément, code de contrôle stable, `no-store` vérifié |
| **T6** | code lisible en texte brut sans JSON ; `format=json` disponible pour l'outillage |
| Protections | `probe_id` hors format refusé, bornes du format vérifiées, `p` dupliqué refusé, rate limit actif au-delà du seuil |
| Effet de bord | aucun payload conservé en mémoire, tampon borné, remise à zéro fonctionnelle, aucun motif base/fichier/Meta/GitHub/Drive dans le module |

**Test local réel du serveur complet** (`node server.js`, Node 20.11.1) :

```
GET /probe/l0/T1-LOCAL-001            -> HTTP 200, CONTROL_CODE: 094E763DFAE5
GET /probe/l0/T3-LOCAL?p=<accents…>   -> empreinte reçue == empreinte attendue
GET /api/probe/l0/recent  sans clé    -> HTTP 401
GET /api/probe/l0/recent  avec clé    -> HTTP 200
Journal : [PROBE-L0] HIT probe=… chars=42 bytes=48 url_chars=139 sha=… code=…
Occurrences du payload en clair dans les logs : 0
```

**Note technique.** J'ai écrit un limiteur local plutôt que de réutiliser
`createRateLimit` partagé : ce dernier installe un `setInterval` non `unref()`
qui maintient le processus en vie. Sans conséquence pour un serveur, mais il
fait pendre indéfiniment le lanceur de tests. Le limiteur local purge sa fenêtre
à la volée, sans minuterie. Le middleware partagé n'a **pas** été modifié : il
est utilisé par d'autres routes déjà validées.

## 6. Procédure T1 à T6, après activation

**Préalable : merge et déploiement, qui vous appartiennent.** Aucun n'a été fait.
Une fois `main` déployée, la sonde répond sur
`https://facebook-ads-backend-s20a.onrender.com/probe/l0/...`.

**Avant chaque campagne de test**, repartir propre :

```bash
curl -s -X POST "$U/api/probe/l0/reset" -H "x-api-key: <clé Dashboard>"
```

**T1 — le GET arrive-t-il ?** Placer dans la mission META :

> Ouvre cette page et restitue la ligne `CONTROL_CODE` :
> `https://facebook-ads-backend-s20a.onrender.com/probe/l0/T1-<horodatage>`

Puis relever :

```bash
curl -s "$U/api/probe/l0/recent?probe_id=T1-<horodatage>" -H "x-api-key: <clé>"
```

Verdict binaire : `count` vaut 1 ou plus → le GET arrive, C1 reste ouvert.
`count` vaut 0 → **T1 échoue** et, conformément à ARCH-004, on s'arrête là ; ni
astuce ni contournement.

**T2 — longueur exploitable.** Trois URL de charge croissante, `probe_id`
distinct pour chacune :

```
/probe/l0/T2-1000?p=<~1000 caractères encodés>
/probe/l0/T2-3000?p=<~3000>
/probe/l0/T2-6000?p=<~6000>
```

Comparer `PAYLOAD_CHARS` reçu à la longueur envoyée. Un écart signe une
troncature en amont ; un 413 signe notre propre borne, à relever si besoin.

**T3 — fidélité.** Envoyer une charge connue contenant accents, guillemets,
retours ligne encodés et caractères réservés. Comparer `PAYLOAD_SHA256` à
l'empreinte calculée localement sur la chaîne envoyée. Toute différence
invalide C1 : aucune écriture GitHub ne serait acceptable sur un transport
infidèle.

**T4 — séquence.** Demander cinq ouvertures en un seul tour :

```
/probe/l0/T4-<h>?seq=1&n=5 … /probe/l0/T4-<h>?seq=5&n=5
```

Relever `occurrences_for_probe` et l'ordre des `seq` dans `recent`.

**T5 — rejeu.** Demander **une seule** ouverture, puis lire `recent`. Si
`count` vaut 2, META ou son navigateur préchargent : l'idempotence devra en
tenir compte au lot suivant.

**T6 — lecture de la réponse.** Demander à META de restituer le
`CONTROL_CODE`. Le comparer à celui du journal. Le code étant dérivé de l'URL,
le Pilote peut aussi le recalculer sans le serveur : `sha256("<probe_id>|<p>")`,
douze premiers caractères, en majuscules.

**Séparer les `probe_id` entre tests.** Un identifiant réutilisé mélangerait
les comptages de T4 et T5.

## 7. Périmètre — confirmations

- **Zéro écriture GitHub.** Aucun appel, aucun client GitHub instancié dans ce
  lot.
- **Zéro écriture Meta.** Aucun appel Graph, aucune campagne, aucune CAPI.
- **Zéro base de données.** Aucun accès SQLite, aucun schéma, aucune migration.
- **Zéro fichier écrit.** Aucun accès disque en écriture.
- **Zéro secret.** Aucune variable d'environnement lue par le module, aucun
  secret dans le code, les logs, l'URL ou ce rapport.
- **Zéro frontend.** Aucun fichier du dépôt frontend touché.
- **SaaS gelé.** Branche `saas` non lue, non touchée : `8152f038…` inchangé.
- **Zéro merge, zéro déploiement.** `main` reste
  `8c97dc5498b5032c7d66205cc21043617df97911`.
- **Hors périmètre, non implémentés comme demandé** : C1, jeton one-shot,
  tampon de fragments persistant, finalisation, écriture GitHub.
- **Retrait en un revert** : `git revert` du commit de merge, ou suppression des
  deux lignes de montage dans `server.js`. Aucun état persistant à nettoyer.

**Réserve.** Tant que le lot n'est pas déployé, T1 n'est pas exécutable : la
question de fond — META émet-il un GET réel ? — reste ouverte. Ce lot fournit
l'instrument, pas la réponse.

---

— ingenieur-developpeur · facebook-ads
