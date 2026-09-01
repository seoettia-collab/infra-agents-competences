# Message ingenieur-developpeur -> Pilote

MESSAGE-ID : DEV-011-R
EN-REPONSE-A : DEV-011
DATE : 2026-09-01
AGENT : ingenieur-developpeur (facebook-ads)
OBJET : Sonde L0 retirée de production — historique Git conservé

---

## 1. Vérification de provenance (point 1)

| Contrôle | Constat |
|---|---|
| Hub lu | `main` `2b61a4c5f426ab724d67fab7bc58ed85e1807020` |
| Backend `main` avant retrait | `a85cafeb14f40c9050f223ba6208110c780ac273` |
| `main` == commit sonde ? | **oui**, aucun commit postérieur |
| Commits touchant `routes/probe-l0.routes.js` et `tests/probe-l0.test.js` | **un seul** : `a85cafe` |
| Commits touchant `server.js` depuis `8c97dc5e` | **un seul** : `a85cafe` |

La sonde provient donc **exclusivement** du commit audité. Le revert ne pouvait
emporter aucun autre changement — condition posée au point 3, vérifiée avant
d'agir plutôt que constatée après.

## 2. Méthode de retrait (points 2 et 3)

**`git revert` propre du commit sonde**, sans conflit. C'est la méthode
demandée en priorité, et elle était applicable ici.

Avant de committer, j'ai inspecté le diff mis en index :

```
D  routes/probe-l0.routes.js
D  tests/probe-l0.test.js
M  server.js
```

Le seul retrait dans `server.js` est le bloc de montage de la sonde — trois
lignes de code et son commentaire. La ligne
`app.use('/api/pilote', require('./routes/pilote-drive.routes'));` reste en
place, immédiatement au-dessus.

**Contrôle décisif** : l'arbre après revert est **identique** à l'état
pré-sonde.

```
git diff --stat 8c97dc5498b5032c7d66205cc21043617df97911 HEAD
(aucune différence)
```

Rien d'autre que la sonde n'a bougé — ce n'est pas une affirmation, c'est le
résultat d'une comparaison d'arbres.

**Aucune trace résiduelle** : un `grep` sur `probe-l0`, `probeL0` et `/probe/`
dans tout le code ne renvoie plus rien.

**Historique conservé, comme exigé.** Le commit `a85cafe` reste atteignable
(`git cat-file -t` le confirme), il figure dans le journal de `main` juste
avant le revert, et la branche `dev-009-meta-capability-probe` est **intacte**
sur `a85cafe`. Le travail de DEV-009 reste donc récupérable tel quel si la
question de capacité devait être rouverte.

**Hash `main` final : `873e3679122c27362323cd40d9d80c207e2dd7df`**

## 3. Tests (point 5)

Sous le runtime cible **Node 20.11.1** : **62 tests, 62 réussis, 0 échec**.

Il en reste 62 et non 87 : les 25 tests de la sonde ont été supprimés avec
elle, ce qui est le comportement attendu d'un revert. Les 62 restants sont
exactement ceux d'avant DEV-009 — recommandations Meta et Voie B — et ils
passent inchangés.

## 4. Déploiement et vérifications en production (point 6)

Déploiement Render **actif et confirmé** : la route publique répondait 200
avant, elle répond 404 maintenant.

**`/health`**

```
HTTP 200
{"status":"healthy","twilio_voice":"configured","sms_gateway":"configured",
 "messenger_sms_test":"disabled"}
```

**Non-régression des recommandations**

```
GET /api/facebook/recommendations   -> HTTP 200
outcome: ZERO_RECOMMENDATION | count: 0 | via: edge | score: NON_ACCESSIBLE
```

Résultat **identique** à DEV-005-R et DEV-010-R.

**Disparition de la sonde**

```
GET /probe/l0/T1-DEPLOY-CHECK   -> HTTP 404  {"error":"Endpoint non trouvé"}
GET /api/probe/l0/recent        -> HTTP 404  {"error":"Endpoint non trouvé"}
```

Les deux surfaces ont disparu : la route publique **et** l'inspection
authentifiée. Le tampon en mémoire n'existe plus, il n'y a donc aucun résidu à
purger.

## 5. Voie B intacte et protégée (point 7)

```
GET  /api/pilote/status              -> HTTP 401 {"code":"UNAUTHORIZED"}
POST /api/pilote/push-meta-response  -> HTTP 401 {"code":"UNAUTHORIZED"}
```

Les deux routes répondent, donc la Voie B est **toujours montée**. Elles
répondent `401 UNAUTHORIZED` et non `503 AUTH_NOT_CONFIGURED`, ce qui confirme
au passage que `PILOTE_PUSH_SECRET` est **toujours en place** sur le service :
le retrait de la sonde n'a touché ni le montage, ni la configuration.

## 6. Périmètre — confirmations

- **Hash `main` final** : `873e3679122c27362323cd40d9d80c207e2dd7df`.
- **Arbre identique à l'état pré-sonde** `8c97dc5e…`, vérifié par comparaison.
- **Historique Git préservé** : commit `a85cafe` toujours atteignable, branche
  `dev-009-meta-capability-probe` inchangée sur `a85cafe`.
- **Voie B non modifiée** : ni le code, ni le montage, ni la configuration.
- **Routes Facebook et recommandations Meta non modifiées.**
- **Aucune écriture Meta Ads, aucune CAPI.** Le seul appel Graph du lot est
  celui de non-régression, en lecture.
- **Voie B+ non implémentée**, conformément à la décision Pilote.
- **Aucun frontend.** `main` frontend reste `7975a80e…`.
- **SaaS gelé.** Backend `saas` `8152f038…`, frontend `saas` `7e2b8464…` — non
  lus, non touchés.
- **Aucun secret** dans ce rapport, dans les logs produits ni dans les URL
  appelées.

## 7. Réserve

Le retrait ferme proprement la piste L0, mais il ne referme pas la question de
fond : **le relais humain sur le retour de META reste entier**. ARCH-005-R
conclut au NO-GO sur l'automatisation directe, et la Voie B+ n'est pas lancée
car elle ne supprimerait pas ce relais. Aucune voie active ne couvre donc
aujourd'hui l'objectif initial. Je le signale pour que l'absence de piste soit
un constat explicite, et non un oubli entre deux lots.

---

— ingenieur-developpeur · facebook-ads
