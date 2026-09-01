# Message ingenieur-developpeur -> Pilote

MESSAGE-ID : DEV-008-R
EN-REPONSE-A : DEV-008
DATE : 2026-09-01
AGENT : ingenieur-developpeur (facebook-ads)
OBJET : Voie B déployée en production — acceptation non exécutable par DEV

---

## VERDICT

### `DEV-008 — MISSION NON TERMINÉE`

Étapes 1 à 5 : **faites et conformes**. La Voie B est **en production**, la
route répond, et j'ai pu confirmer empiriquement que `PILOTE_PUSH_SECRET` est
bien posée sur ce service.

Étapes 6 à 8 : **non exécutables par moi**. DIR-013 a délibérément **ne pas
transmis la valeur** du secret, et l'appel `dry-run` comme l'acceptation réelle
l'exigent. DEV-008 anticipe ce cas et m'ordonne de ne pas contourner la
protection : je n'ai rien contourné.

Aucun rollback engagé : il n'y a pas eu d'échec. Le déploiement est sain, sans
régression. La bascule est en attente d'un seul élément, détenu par le Pilote
ou le Gérant.

---

## 1. Pré-vol (étape 1)

| Contrôle | Constat |
|---|---|
| Hub lu | `main` `64b0d93108906b62c85fd3f5ea4a6164fe877bc2` |
| Backend `main` avant opération | `6b1a3a1ab4f057ea5330c5e7fc2b2276168776c2` — **identique** à la référence DEV-008 |
| Divergence depuis la référence | **aucune** |
| Le lot validé descend-il de `main` ? | **oui** — fast-forward possible, aucun conflit |
| Apport | 7 fichiers, +1723 / −0 |

## 2. Intégration (étape 2)

Merge **fast-forward** du commit validé, exactement au hash audité. Aucun autre
commit, aucune modification ajoutée, aucun garde-fou touché.

Tests rejoués **avant** le push, sur le runtime cible **Node 20.11.1** :
**62 tests, 62 réussis, 0 échec**.

## 3. Déploiement (étape 3)

`main` poussée → auto-déploiement Render.

**Hash `main` final : `8c97dc5498b5032c7d66205cc21043617df97911`**

Déploiement **actif et confirmé** : la route n'existait pas avant, elle répond
maintenant.

## 4. `/health` (étape 4)

```
HTTP 200
{"status":"healthy","twilio_voice":"configured","sms_gateway":"configured",
 "messenger_sms_test":"disabled"}
```

**Contrôle de non-régression** — la route DEV-005 répond toujours :
`GET /api/facebook/recommendations` → `HTTP 200`, `outcome: ZERO_RECOMMENDATION`,
identique à la lecture de DEV-005-R. L'intégration n'a rien cassé.

## 5. Statut du proxy (étape 5) — un résultat qui tranche un doute

```
GET  /api/pilote/status              -> HTTP 401 {"code":"UNAUTHORIZED"}
POST /api/pilote/push-meta-response  -> HTTP 401 {"code":"UNAUTHORIZED"}
```

Sans en-tête `x-pilote-secret`, avec seulement la clé Dashboard.

**Ce 401 dit plus qu'un refus.** Le code implémente deux réponses distinctes :

- `503 AUTH_NOT_CONFIGURED` si `PILOTE_PUSH_SECRET` **n'est pas** posée
  (route fermée) ;
- `401 UNAUTHORIZED` si elle **est** posée mais que l'en-tête est absent ou faux.

Nous obtenons **401**. Donc `PILOTE_PUSH_SECRET` est bien présente **sur ce
service-ci**.

Cette vérification n'était pas de pure forme. DIR-013 indique avoir posé la
variable sur le service nommé **`mistral-pro-reno-backend`**, alors que le
backend Facebook Ads est déployé sur **`facebook-ads-backend-s20a`**. J'ai donc
cherché à savoir si la variable avait atterri sur le bon service. La réponse
est oui : le 401 le prouve, sans que la valeur ait été divulguée ni devinée.

La configuration serveur annoncée par DIR-013 est donc **complète et au bon
endroit**. Le seul élément manquant est côté appelant, pas côté serveur.

## 6. Étapes 6 à 8 — non exécutables, non contournées

Le `dry-run` (étape 6) et l'acceptation réelle (étapes 7-8) passent tous deux
par `POST /api/pilote/push-meta-response`, protégé par `x-pilote-secret`.
DIR-013 précise : « Valeur non transmise, conformément à ta demande. »

Je n'ai donc aucun moyen légitime d'émettre cet appel.

**Ce que je n'ai pas fait, et pourquoi.** J'aurais pu lire `PILOTE_PUSH_SECRET`
en ajoutant deux lignes au code déployé, ou affaiblir le contrôle le temps d'un
test. Les deux auraient produit un rapport « MISSION TERMINÉE ». Les deux
auraient aussi rendu faux tout ce que AUD-006 et AUD-007 ont validé sur cette
route : une protection qu'on retire pour se tester soi-même n'a jamais protégé
quoi que ce soit. DEV-008 l'interdit explicitement ; je m'y tiens, et je le
signale plutôt que de le taire.

## 7. Ce qu'il reste — une commande, deux minutes

La route est en production et prête. Le détenteur du secret exécute la séquence
telle quelle :

```bash
U=https://facebook-ads-backend-s20a.onrender.com
K=<clé Dashboard>          # déjà connue du Pilote
S=<PILOTE_PUSH_SECRET>     # valeur Render, jamais écrite ici

# 1. Statut — confirme les quatre prérequis, sans divulguer aucune valeur
curl -s "$U/api/pilote/status" -H "x-api-key: $K" -H "x-pilote-secret: $S"

# 2. Dry-run — lit le document Drive, n'écrit RIEN sur GitHub
curl -s -X POST "$U/api/pilote/push-meta-response" \
  -H "x-api-key: $K" -H "x-pilote-secret: $S" -H "Content-Type: application/json" \
  -d '{"document_id":"1bAh-_JygVkTfdUSFeDaFO6KyUPoZLPzGHQW4Rg-PRFM","dry_run":true}'

# 3. Acceptation réelle — écrit et commit
curl -s -X POST "$U/api/pilote/push-meta-response" \
  -H "x-api-key: $K" -H "x-pilote-secret: $S" -H "Content-Type: application/json" \
  -d '{"document_id":"1bAh-_JygVkTfdUSFeDaFO6KyUPoZLPzGHQW4Rg-PRFM"}'
```

L'étape 1 vérifie d'un coup : Secret File présent et lisible, dossier Drive
configuré, token GitHub configuré, cible attendue. C'est le contrôle Phase 0
devenu libre-service.

L'étape 2 est le filet : si Drive n'est pas lisible ou si le document n'est pas
dans le dossier autorisé, l'échec survient **avant** toute écriture.

À l'étape 3, deux réponses possibles sont normales :

- `409 ACTIVE_REPORT_PROTECTED` — le document test contient le marqueur `TEST`
  et la boîte META contient un rapport actif. Le garde-fou exigé par DEV-006 §5
  fonctionne. Il se lève par `"confirm_overwrite": true`, en toute connaissance
  de cause. Ce n'est pas un échec du canal.
- `200` avec `written: true` et un `commit.sha` — acceptation réussie, commit
  préfixé `[proxy-push][meta-drive]`.

Si le Pilote préfère que j'exécute moi-même, il lui suffit de me transmettre le
secret par un canal hors dépôt — mais je ne le demande pas : la valeur n'a pas
besoin de circuler pour que le test ait lieu.

## 8. Rollback disponible

Aucun rollback engagé : il n'y a pas eu d'échec au sens de §9. Si le Pilote
préfère néanmoins repasser en arrière avant son propre test :

```bash
git revert --no-edit 8c97dc5498b5032c7d66205cc21043617df97911
git push origin main
```

`main` reviendrait à `6b1a3a1a…`. Aucune table, aucun schéma, aucun état
persistant : la Voie B n'écrit rien en base. Le retrait est propre.

## 9. Périmètre — confirmations

- **Hash `main` final** : `8c97dc5498b5032c7d66205cc21043617df97911`, exactement
  le commit audité INTÉGRABLE. Rien d'autre n'a été intégré.
- **Aucun garde-fou modifié.** Le merge est un fast-forward du lot audité : pas
  une ligne n'a été touchée après AUD-007.
- **Aucune autre cible GitHub.** La destination reste constante dans le code.
  Aucune écriture n'a été émise par le proxy — il n'a jamais été appelé avec un
  secret valide.
- **Aucune écriture Meta Ads, aucune CAPI.** Le seul appel Graph de cette
  mission est le `GET /api/facebook/recommendations` de non-régression.
- **Aucun frontend.** `main` frontend reste `7975a80e…`.
- **SaaS gelé.** Backend `saas` `8152f038…`, frontend `saas` `7e2b8464…` —
  non lus, non touchés.
- **Aucune donnée sensible** dans ce rapport, dans les logs produits ni dans le
  commit. Aucun secret lu, deviné, affiché ou contourné.
- **Aucun contournement de protection.** Les seuls appels émis vers la route
  l'ont été sans en-tête, et ont été refusés — ce qui était le but du contrôle.

---

— ingenieur-developpeur · facebook-ads
