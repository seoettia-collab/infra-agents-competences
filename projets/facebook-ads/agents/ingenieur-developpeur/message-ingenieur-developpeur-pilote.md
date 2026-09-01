# Message ingenieur-developpeur -> Pilote

MESSAGE-ID : DEV-010-R
EN-REPONSE-A : DEV-010
DATE : 2026-09-01
AGENT : ingenieur-developpeur (facebook-ads)
OBJET : Sonde L0 déployée en production — prête pour T1

---

## VERDICT

Les huit points de la mission sont traités. La sonde est **en production et
conforme**. Aucune régression. Le vrai T1 depuis META n'a **pas** été lancé,
conformément au point 8 : il vous appartient.

---

## 1. Pré-vol (point 1)

| Contrôle | Constat |
|---|---|
| Hub lu | `main` `74ffc3e538eb4dfe4ad5494d7185e3ea52b94353` |
| Backend `main` avant intégration | `8c97dc5498b5032c7d66205cc21043617df97911` — **identique** à la référence |
| Divergence depuis la référence | **aucune** |
| Fast-forward vers le commit audité | possible, **aucun conflit** |
| Apport | 3 fichiers, +640 / −0 |

## 2. Intégration (point 2)

Merge **fast-forward** vers le commit audité, sans modification d'aucune sorte.
Vérification explicite après merge : `HEAD` est **exactement**
`a85cafeb14f40c9050f223ba6208110c780ac273`.

Les réserves R1 à R4 d'AUD-008 n'ont **pas** été traitées, comme demandé. Le
déploiement porte le commit audité, ni plus ni moins.

Tests rejoués **avant** le push, runtime cible Node 20.11.1 :
**87 tests, 87 réussis, 0 échec**.

## 3. Déploiement (point 3)

`main` poussée → auto-déploiement Render, **actif et confirmé** : la route
`/probe/l0/…` n'existait pas avant, elle répond maintenant.

**Hash `main` final : `a85cafeb14f40c9050f223ba6208110c780ac273`**

## 4. `/health` (point 4)

```
HTTP 200
{"status":"healthy","twilio_voice":"configured","sms_gateway":"configured",
 "messenger_sms_test":"disabled"}
```

## 5. Non-régression (point 5)

```
GET /api/facebook/recommendations   -> HTTP 200
outcome: ZERO_RECOMMENDATION | count: 0 | via: edge | score: NON_ACCESSIBLE
```

Résultat **identique** à celui de DEV-005-R : aucune régression.

**Contrôle complémentaire, Voie B** — non demandé mais utile puisque la sonde
touche `server.js`, où la Voie B est montée :

```
GET /api/pilote/status  ->  HTTP 401 {"code":"UNAUTHORIZED"}
```

Toujours 401 et non 503 : la Voie B reste montée, protégée, et
`PILOTE_PUSH_SECRET` est toujours en place sur le service.

## 6. Navigation nue vers la sonde (point 6)

Requête émise **sans aucun en-tête** — ni `x-api-key`, ni rien d'autre. C'est
la condition même de T1.

```
GET https://facebook-ads-backend-s20a.onrender.com/probe/l0/T1-DEPLOY-CHECK
HTTP 200

PROBE-L0 OK
CONTROL_CODE: 8DA1CC566D06
PROBE_ID: T1-DEPLOY-CHECK
SEQ: -
OCCURRENCE: 1
PAYLOAD_CHARS: 0
PAYLOAD_BYTES: 0
PAYLOAD_SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
URL_CHARS: 25
RECEIVED_AT: 2026-09-01T10:28:53.110Z

Restituer exactement : 8DA1CC566D06
```

`CONTROL_CODE` présent, réponse en texte brut, lisible sans parsing.

**Vérification du code, hors serveur.** `sha256("T1-DEPLOY-CHECK|")` donne
`8DA1CC566D06` sur ses douze premiers caractères. Le code n'est donc pas une
valeur opaque : vous pouvez le recalculer vous-même à partir de l'URL envoyée,
et comparer sans dépendre du serveur. C'est ce qui rendra T6 vérifiable des
deux côtés.

**Validation stricte toujours active en production** :

```
GET /probe/l0/abc   ->  HTTP 400   (probe_id trop court)
```

## 7. Inspection authentifiée (point 7)

```
GET /api/probe/l0/recent?probe_id=T1-DEPLOY-CHECK   ->  HTTP 200
occurrences_for_probe : 1
hit : { probe_id: "T1-DEPLOY-CHECK", occurrence: 1, payload_chars: 0,
        url_chars: 25, control_code: "8DA1CC566D06",
        received_at: "2026-09-01T10:28:53.110Z" }
payload conservé : non
```

**Au moins un hit est visible : confirmé.** Le tampon fonctionne en production,
et il ne contient aucun payload — seulement des métadonnées.

```
GET /api/probe/l0/recent  sans x-api-key  ->  HTTP 401
```

La séparation tient : la sonde est publique, son inspection ne l'est pas.

## 8. T1 réel — non exécuté (point 8)

Aucune sollicitation de META. Le déploiement est confirmé ; l'étape vous
revient.

**Avant de lancer T1, videz le tampon.** Il contient actuellement deux entrées
laissées par mes contrôles — `DEPLOY-WAIT-CHECK`, produite par ma boucle
d'attente du déploiement, et `T1-DEPLOY-CHECK`. Elles ne gênent pas un T1 sur
un `probe_id` distinct, mais autant partir propre :

```bash
U=https://facebook-ads-backend-s20a.onrender.com
curl -s -X POST "$U/api/probe/l0/reset" -H "x-api-key: <clé Dashboard>"
```

Puis, dans la mission META :

> Ouvre cette page et restitue la ligne `CONTROL_CODE` :
> `https://facebook-ads-backend-s20a.onrender.com/probe/l0/T1-<horodatage>`

Et relevez :

```bash
curl -s "$U/api/probe/l0/recent?probe_id=T1-<horodatage>" -H "x-api-key: <clé>"
```

`occurrences_for_probe` ≥ 1 → le GET arrive réellement. `0` → T1 échoue, et
ARCH-004 prescrit l'arrêt sans contournement.

La procédure complète T2 à T6 figure dans DEV-009-R §6 et reste valable telle
quelle.

## 9. Périmètre — confirmations

- **Hash `main` final** : `a85cafeb14f40c9050f223ba6208110c780ac273`, exactement
  le commit audité. Vérifié par comparaison après merge.
- **Aucun changement supplémentaire.** Fast-forward pur ; pas une ligne écrite
  dans ce lot. Réserves R1 à R4 non traitées, comme prescrit.
- **Aucune écriture Meta Ads, aucune CAPI.** Le seul appel Graph est celui de
  non-régression, en lecture.
- **Aucune écriture Drive ni GitHub par la sonde.** Elle n'en a pas le code : le
  module ne référence ni Octokit, ni googleapis, ni base de données.
- **Aucun frontend.** `main` frontend reste `7975a80e…`.
- **SaaS gelé.** Backend `saas` `8152f038…`, frontend `saas` `7e2b8464…` — non
  lus, non touchés.
- **Aucun secret** dans ce rapport, dans les URL appelées ni dans les logs
  produits. La sonde ne lit aucune variable d'environnement.
- **Rollback en un revert** si nécessaire : `git revert a85cafeb…` puis push.
  `main` reviendrait à `8c97dc5e…`. Aucun état persistant à nettoyer — le tampon
  de la sonde est en RAM et disparaît de lui-même.

---

— ingenieur-developpeur · facebook-ads
