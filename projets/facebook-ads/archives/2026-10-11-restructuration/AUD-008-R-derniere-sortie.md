# Message auditeur -> Pilote

MESSAGE-ID : AUD-008-R
EN-REPONSE-A : AUD-008
DATE : 2026-09-01
AGENT : auditeur (facebook-ads)
OBJET : Audit de la sonde de capacité L0 avant déploiement T1

---

## 1. Sources et hashes réellement lus

| Source | Référence |
|---|---|
| Hub `infra-agents-competences` | `main` `5af27c6fc06d7874f192ebacb202ebdd8e0e4f84` |
| Socle | `standards-communs/organisation-agents.md`, `gouvernance-projet.md`, `fiche-auditeur.md` |
| AUD-008 | boîte auditeur, même commit |
| DEV-009-R | boîte développeur, même commit |
| ARCH-004-R | boîte architecte — §6 (périmètre L0) et §7 (GO conditionnel) |
| Backend `main` | `8c97dc5498b5032c7d66205cc21043617df97911` |
| **Commit audité** | `a85cafeb14f40c9050f223ba6208110c780ac273` |
| Backend `saas` | `8152f03806bc7b297b35367a7d4ab49ee68cd3ff` — non lue, non touchée |
| Frontend `main` | `7975a80e1c1b42880d9be2a4faf0dbb8ecf58882` — non touché |

**Méthode.** Lecture intégrale du diff, puis vérification par exécution sur le
**runtime de production réel** (binaire officiel **Node v20.11.1**) : suite de
tests rejouée, serveur complet démarré, sondes HTTP nominales et hostiles,
inspection des journaux produits et du contenu réel du tampon. Les résultats
ci-dessous sont des sorties d'exécution.

---

## 2. Verdict

# INTÉGRABLE POUR TEST T1.

**Aucun bloqueur.** La sonde fait ce qu'ARCH-004 §6 décrit pour L0 — un
instrument de mesure sans effet métier — et rien de plus. Elle n'ouvre aucune
surface d'écriture, ne conserve aucun contenu, et se retire en supprimant deux
lignes.

Quatre réserves mineures au §9, dont aucune n'empêche T1 : trois sont des
imprécisions à corriger sans urgence, la quatrième est un point à connaître
**avant C1**, pas avant T1.

---

## 3. Contrôle 1 — diff exact `main` → `a85cafeb…`

**3 fichiers, +640 / −0.** Aucune ligne existante modifiée ou supprimée.

| Fichier | Portée |
|---|---|
| `routes/probe-l0.routes.js` | créé (291 l.) |
| `tests/probe-l0.test.js` | créé (340 l.) |
| `server.js` | +9 : deux montages et un commentaire |

Vérifié explicitement : **aucun autre fichier** n'est touché — ni
`package.json`, ni `package-lock.json`, ni un middleware existant, ni le code
de la Voie B. Aucune dépendance ajoutée. Le middleware de rate limit partagé
n'est **pas** modifié, ce qui est important : il sert des routes déjà validées.

Les deux montages :

```js
app.use('/api/probe', probeL0.inspectRouter);   // authentifié
app.use('/probe',     probeL0.router);          // public
```

Insérés après tous les routeurs existants, avant le cache. `/probe` est un
préfixe neuf : il ne recouvre aucune route en place.

**Le choix de monter la route publique hors de `/api/` est justifié et je le
valide.** T1 mesure une navigation nue, sans en-tête ; la placer sous `/api/`
aurait garanti un échec dû à notre propre configuration, et non à une
incapacité de META — c'est-à-dire un faux négatif sur la question même que le
test doit trancher. La contrepartie est correctement payée : rate limit dédié,
validation stricte, et aucune donnée renvoyée qui ne soit dérivée de la requête
elle-même.

---

## 4. Contrôle 2 — surface d'écriture

**Aucune.** Vérifié en exécution sur le serveur complet :

```
POST   /probe/l0/T1-AUDIT  -> 404
PUT    /probe/l0/T1-AUDIT  -> 404
PATCH  /probe/l0/T1-AUDIT  -> 404
DELETE /probe/l0/T1-AUDIT  -> 404
```

La route publique n'existe qu'en GET. Recherche exhaustive dans le module :
aucun `sqlite`, `database`, `fs.`, `writeFile`, `graph.facebook`, `capi`,
`octokit`, `googleapis`, `drive`, ni **aucun accès à `process.env`** — le module
ne lit donc littéralement aucune variable d'environnement. La seule occurrence
de ces mots est un commentaire qui les énumère pour dire qu'ils sont absents.

Traversée de chemin : `/probe/l0/../../etc/passwd` → **404** (aucune route ne
correspond), jamais un accès disque.

La seule persistance est le tampon RAM, traité au §6.

---

## 5. Contrôle 3 — validations, plafond, doublons, rate limit, cache

Toutes vérifiées en exécution sur le serveur complet :

| Contrôle | Sonde | Résultat |
|---|---|---|
| `probe_id` trop court | `/probe/l0/ab` | **400** |
| `probe_id` trop long (70 c.) | 70 × `a` | **400** |
| `probe_id` avec chemin | `../../etc/passwd` | **404** |
| Plafond exact accepté | `p` = 8192 caractères | **200** |
| Au-delà du plafond | `p` = 8193 caractères | **413**, refus explicite — **pas de troncature** |
| `p` fourni deux fois | `?p=a&p=b` | **400** (pas de tableau traité en silence) |
| `seq` hors bornes | `seq=0`, `seq=1000` | **400** |
| `n` hors bornes | `n=0` | **400** |
| `seq` non numérique | `seq=abc` | **400** |
| Rate limit | 33 requêtes consécutives | **429 dès la 31ᵉ** — seuil de 30/min appliqué |
| Cache | en-têtes de réponse | `Cache-Control: no-store, no-cache, must-revalidate` + `Pragma: no-cache` |

Le refus en 413 plutôt qu'une troncature est le bon choix, et il est structurant
pour la campagne : une troncature silencieuse ferait passer T3 pour un succès
alors que le transport aurait perdu du contenu. La question posée par T2 —
« jusqu'où la charge passe-t-elle ? » — n'aurait plus de réponse fiable.

**T6 vérifié de bout en bout** : le code de contrôle est reproductible hors
serveur. `sha256("T1-AUDIT-001|")`, douze premiers caractères en majuscules,
calculé indépendamment → `CBFF532A8C19`, identique à celui servi par la route.
Le Pilote peut donc contrôler la restitution de META sans accès au serveur.

---

## 6. Contrôle 4 — le payload est-il conservé ou journalisé ?

**Non, ni l'un ni l'autre.** Vérifié avec une charge témoin identifiable
(`RAPPORTCONFIDENTIELXYZ789`, accents et retour ligne encodés) :

```
occurrences du payload en clair dans les logs : 0
occurrences du payload dans le tampon         : 0
```

Ligne de journal réellement émise — métadonnées seules :

```
[PROBE-L0] HIT probe=T3-AUDIT seq=-/- occurrence=1 chars=36 bytes=38
           url_chars=73 sha=fe5b6e3af1971c71 code=E3FBE8971CF7 ua="curl/8.5.0"
```

Entrée réellement stockée dans le tampon, relevée par l'inspection : `probe_id`,
`seq`, `total`, `received_at`, `payload_chars`, `payload_bytes`,
`payload_sha256`, `control_code`, `url_chars`, `user_agent` tronqué,
`occurrence`. **Aucun champ ne porte le contenu.**

Point qui méritait une vérification propre : le **logger global** de `server.js`
journalise `req.path` et **non** `req.originalUrl` — la chaîne de requête, donc
le payload, n'y apparaît pas. Confirmé : `[…] GET /probe/l0/T3-AUDIT`, sans le
`?p=`. Le `securityLogger`, lui, journalise `originalUrl` mais n'est monté que
sur `/api/` : il ne voit jamais la route publique.

**Bornes du tampon.** Global : 500 entrées, vérifié — après 700 insertions, la
taille redescend et reste à 500. Reset : `POST /api/probe/l0/reset` vide
effectivement le tampon (`cleared: 2`, puis `size: 0`). La carte des compteurs
par `probe_id` est purgée en FIFO au-delà de 500 clés. Empreinte mémoire
maximale de l'ordre de quelques centaines de kilo-octets, et tout disparaît au
redéploiement.

*Une imprécision, sans conséquence de sécurité* : voir réserve R1.

---

## 7. Contrôle 5 — les routes d'inspection sont-elles réellement protégées ?

Oui, vérifié sur le serveur complet :

```
GET  /api/probe/l0/recent   sans clé  -> 401
POST /api/probe/l0/reset    sans clé  -> 401
GET  /api/probe/l0/recent   avec clé  -> 200
```

Elles sont montées sous `/api/`, donc après `securityLogger`,
`rateLimiters.general` et `authMiddleware`. La séparation est la bonne :
l'instrument de mesure est ouvert parce que le test l'exige, la **lecture des
mesures** ne l'est pas.

---

## 8. Contrôle 6 — tests rejoués sous Node 20.11.1

| Runtime | Résultat |
|---|---|
| **Node 20.11.1** (binaire officiel, runtime de production) | **87 / 87 réussis, 0 échec** |

Le chiffre annoncé par DEV-009-R est exact. Les **62 tests** des lots précédents
(Voie B, recommandations Meta) passent inchangés — aucune régression. Les **25
nouveaux** couvrent T1 à T6 ainsi que les protections et l'absence d'effet de
bord.

Au-delà de la suite, j'ai rejoué **T1, T3 et T6 contre le serveur complet
réellement démarré**, et non seulement contre le routeur isolé :

```
GET /probe/l0/T1-AUDIT-001                    -> 200, CONTROL_CODE: CBFF532A8C19
   (aucun en-tête, aucune clé — navigation nue)
code recalculé hors serveur                   -> CBFF532A8C19  (identique)
GET /probe/l0/T3-AUDIT?p=<accents, %0A, …>    -> empreinte conforme
routes existantes /health, /api/facebook/recommendations -> 200, 200
```

---

## 9. Réserves — aucune bloquante

**R1 — `HITS_PER_PROBE_MAX` est déclarée, publiée, mais jamais appliquée.**
La constante vaut 50 et l'inspection la renvoie au Pilote
(`buffer.per_probe_max: 50`), or **aucune ligne de code ne l'applique** : le
nombre d'entrées pour un même `probe_id` n'est borné que par le plafond global
de 500 et par le rate limit. Aucun risque mémoire — les deux bornes réelles
tiennent, vérifiées — mais une réponse d'API qui affirme une limite inexistante
est une information fausse donnée au lecteur des mesures. À corriger dans un
sens ou dans l'autre : appliquer la borne, ou cesser de l'annoncer.

**R2 — le rate limit est global, pas par client, et ce n'est pas visible.**
`trust proxy` n'est pas activé sur l'application. Derrière le proxy de Render,
`req.ip` vaut donc l'adresse du proxy pour **tous** les appelants : le seuil de
30 requêtes/minute est partagé par l'ensemble du trafic de cette route, et non
appliqué par client. Deux conséquences opposées à connaître :

- côté protection, c'est **plus** strict qu'annoncé — la route ne peut pas
  devenir un amplificateur ;
- côté test, un tiers qui sollicite l'URL peut épuiser le quota et faire
  **échouer T1 pour une raison qui n'a rien à voir avec META**. Un `429` doit
  donc être lu comme un incident de mesure, pas comme un verdict.

Ce trait est **préexistant et partagé** avec les limiteurs déjà en place (même
expression de clé) : ce n'est pas une régression de ce lot. Recommandation
pratique pour la campagne : si `count` vaut 0 en T1, vérifier d'abord l'absence
de `429` dans les journaux avant de conclure à un échec de META.

**R3 — le payload voyage dans l'URL : c'est vrai pour T1 à T6, ce sera à
arbitrer pour C1.** Nous ne le journalisons pas — vérifié, zéro occurrence —
mais une URL est visible des journaux d'accès de la plateforme et de tout
intermédiaire, ce qui échappe à notre code. Sans importance avec des charges de
test. À poser explicitement **avant C1**, où `p` transporterait un rapport
réel. Ce n'est pas un défaut de ce lot : c'est une propriété du canal choisi par
ARCH-004, qu'il vaut mieux acter maintenant que découvrir plus tard.

**R4 — coercition numérique tolérante sur `seq` et `n`.** `seq=1e2` est accepté
et interprété comme `100` ; `seq=2.0` et `seq=+3` passent également ; et aucune
cohérence n'est exigée entre `seq` et `n` (`seq=100&n=5` est accepté). Sans
conséquence : ces valeurs ne servent qu'à ordonner un comptage, et les bornes
1–999 tiennent. À resserrer si T4 devait produire des séquences longues.

---

## 10. Contrôles 7, 8, 9 — périmètre, secrets, retrait

**Périmètre — vérifié par lecture exhaustive du module et du diff :**

- **Zéro écriture GitHub** — aucun client, aucun appel.
- **Zéro Drive** — aucune référence.
- **Zéro Meta Ads, zéro CAPI** — aucun appel Graph.
- **Zéro base de données** — aucun accès SQLite, aucun schéma, aucune migration.
- **Zéro disque** — aucun `fs`, aucune écriture ; répertoire de données resté
  vide après la campagne de sondes.
- **Zéro frontend** — aucun fichier du dépôt frontend touché.
- **SaaS gelé** — `saas` non lue, non touchée, `8152f038…` inchangé.

**Secrets — aucun introduit, aucun exposé.** Le module **ne lit aucune variable
d'environnement** : il n'y a donc rien à fuir. Le code de contrôle est dérivé de
la requête elle-même (`sha256("probe_id|payload")`), sans valeur pour un tiers
et recalculable par le Pilote. Aucune valeur sensible dans les URL, les
réponses, les journaux ou le tampon. Aucun secret permanent n'est créé — ce que
demandait ARCH-004 §5.

*Vérifié au passage* : l'injection de fausses lignes de journal via l'en-tête
`User-Agent` — seul champ contrôlé par le client qui soit journalisé — n'est pas
réalisable : une requête brute contenant un saut de ligne dans un en-tête est
rejetée en **400 Bad Request** par l'analyseur HTTP de Node avant d'atteindre la
route.

**Retrait — trivial, sans état à nettoyer.** Supprimer les deux lignes de
montage dans `server.js`, ou `git revert` du commit de merge. Aucune table,
aucun schéma, aucun fichier, aucune variable d'environnement, aucune dépendance.
Le tampon vit en RAM et disparaît au redéploiement ; `POST
/api/probe/l0/reset` permet en outre de repartir propre sans redéployer. Le
retrait est plus simple que celui de la Voie B, qui exigeait au moins de
raisonner sur des dépendances.

---

## 11. Ce que ce lot ne dit pas — et qu'il ne faut pas lui faire dire

La sonde est un **instrument**, pas une réponse. Elle établit que *notre* côté
du canal fonctionne : la route reçoit, valide, mesure et restitue correctement.
Elle ne dit rien de la question posée par ARCH-004 — **META émet-il réellement
un GET ?** — qui ne se tranchera qu'après déploiement, par T1.

Deux conséquences pour la lecture des résultats :

1. Un `count: 0` en T1 ne prouve rien tant que `429` et erreur de déploiement
   n'ont pas été écartés (R2). Le verdict binaire d'ARCH-004 mérite ce
   double contrôle avant d'engager le repli C4.
2. Un T1 réussi ne présume pas de T2 et T3 : ce sont la longueur exploitable et
   la **fidélité** qui conditionnent C1, et c'est T3 qui a le dernier mot —
   aucune écriture GitHub ne serait acceptable sur un transport infidèle.

Rien de tout cela n'est un défaut du lot. C'est le rappel que le GO
conditionnel d'ARCH-004 reste conditionnel.

---

## 12. Confirmations de sécurité et de périmètre

- **Zéro merge, zéro déploiement.** Backend `main` reste
  `8c97dc5498b5032c7d66205cc21043617df97911` ; branche auditée inchangée
  (`a85cafeb…`) ; `git status` vierge sur les deux dépôts.
- **Zéro appel sortant.** Aucune requête vers Meta, GitHub, Google ou Render
  n'a été émise. Toutes mes sondes sont locales, sur ports isolés.
- **Zéro secret manipulé.** Aucun credential lu, écrit ou journalisé ; les clés
  employées dans mes sondes sont factices et locales.
- **Zéro écriture Meta Ads, zéro CAPI, zéro GitHub, zéro Drive, zéro base,
  zéro disque, zéro frontend, SaaS gelé.**
- Lecture seule intégrale : aucun fichier créé, modifié ou supprimé dans les
  dépôts de code. La seule écriture de cette mission est le présent rapport.

---

— auditeur · facebook-ads
