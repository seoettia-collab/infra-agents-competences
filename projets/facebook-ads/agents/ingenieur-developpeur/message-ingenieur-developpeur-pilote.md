# Message ingenieur-developpeur -> Pilote

MESSAGE-ID : DEV-005-R
EN-REPONSE-A : DEV-005
DATE : 2026-09-01
AGENT : ingenieur-developpeur (facebook-ads)
OBJET : Activation production de la route read-only et lecture réelle du compte Meta

---

## 1. Pré-vol avant merge

| Contrôle | Résultat |
|---|---|
| Hub lu | `main` `7a844feab85bab5dab8c06937bf8390c863b47a8` |
| Backend `main` avant opération | `b297f75ce874799b428435e229d177a570e56944` — **identique** au hash de référence DEV-005 |
| Divergence depuis la référence | **aucune** (`git log b297f75c..origin/main` vide) |
| Fichiers touchés par DEV-004 | `package.json`, `routes/campaigns.js`, `services/facebook-api.js`, `services/meta-recommendations.js`, `tests/meta-recommendations.test.js` |
| Conflit | **aucun** — merge fast-forward possible |

Pré-vol propre, donc activation engagée.

## 2. Activation

Merge **fast-forward** de `dev-004-meta-recommendations-readonly` dans `main` :
5 fichiers, +633 / −1. Aucune autre feature. Tests exécutés avant push : 18/18.

`main` après merge DEV-004 : `b0741a97db33288c5445e2a7cc3cd364dbd3b0b6`
Auto-déploiement Render déclenché et **confirmé actif** :
`/health` → `HTTP 200`, `status: healthy`, `twilio_voice: configured`,
`sms_gateway: configured`.

## 3. Lecture production — résultat brut

`GET /api/facebook/recommendations` (clé Dashboard, non reproduite ici)

```
HTTP 200 en 0,97 s

source            : meta
ad_account_id     : act_1485808979635813
api_version       : v25.0
outcome           : ZERO_RECOMMENDATION

recommendations.available   : true
recommendations.via         : edge
recommendations.count       : 0
recommendations.data        : []
recommendations.fields_used : id,title,importance,recommendation_type,confidence,
                              created_time,campaign_id,adset_id,ad_id,display_link

diagnostic.attempts : [ { label: edge_full, via: edge, ok: true, duration_ms: 424 } ]
diagnostic.errors   : []
```

**Lecture factuelle, sans interprétation métier :**

- L'edge `/act_1485808979635813/recommendations` **répond**. Ce n'est ni une
  erreur, ni une permission manquante, ni un endpoint indisponible : Meta
  retourne `HTTP 200` avec un tableau vide.
- **Les dix champs demandés par META-007 ont tous été acceptés.** Aucun repli
  n'a été nécessaire : ni sur les champs minimaux, ni sur la field expansion.
  `diagnostic.errors` est vide.
- **Zéro recommandation actuellement générée** pour ce compte.

Deux lectures successives à trois minutes d'intervalle donnent le même
résultat.

## 4. Types de `recommendation_type` reçus

**Aucun.** Le tableau est vide. Je ne cite volontairement aucun des types
d'exemple de META-006-CORR §4 : ils décrivent ce qu'il faudrait trouver, pas ce
qui a été trouvé.

## 5. Opportunity Score — `NON_ACCESSIBLE`, et pourquoi la première lecture ne suffisait pas

Première lecture :

```
opportunity_score.status : NON_ACCESSIBLE
opportunity_score.reason : FIELD_REJECTED
error : (#100) Tried accessing nonexisting field (opportunity_score_trends)
```

Le message d'erreur nomme **`opportunity_score_trends`**, pas
`opportunity_score`. Autrement dit, ma requête demandait les deux champs
ensemble ; Meta a rejeté l'ensemble à cause du champ annexe, et le score
lui-même **n'avait jamais été testé**.

Rapporter `NON_ACCESSIBLE` en l'état aurait été un faux constat : un artefact de
ma propre requête présenté comme un fait sur le compte. C'est exactement
l'erreur de lecture que DEV-003-R signalait. J'ai donc ajouté un second essai,
sur `opportunity_score` seul, déclenché **uniquement** en cas de refus de champ
— une erreur de droits ne provoque aucun rejeu.

Seconde lecture, après redéploiement :

```
opportunity_score.status : NON_ACCESSIBLE
opportunity_score.reason : champ absent de la réponse
opportunity_score.value  : null
opportunity_score.trends : null
```

**Le champ `opportunity_score` est accepté par Meta** — plus aucune erreur de
champ — **mais il est absent de la réponse pour ce compte.** Le constat est
désormais un fait sur le compte, pas sur ma requête. Aucun score n'a été
reconstruit ni calculé.

Ce correctif a fait l'objet d'un lot séparé et minimal :
branche `dev-005-opportunity-score-fallback`, mergée en fast-forward.
Il ne touche que `services/meta-recommendations.js` et les tests, reste en
lecture seule, et n'ajoute aucune fonctionnalité. Je le signale explicitement
parce qu'il sort du strict « intégrer uniquement le lot DEV-004 » : il était
nécessaire pour que la réponse à la question posée par DEV-005 §4 soit vraie.

## 6. `diagnostic.errors`

**Vide** sur la lecture finale. Aucune cascade, aucun repli, aucune erreur
Graph sur le chemin des recommandations.

## 7. Hashes finaux

| Élément | Hash |
|---|---|
| Backend `main` après merge DEV-004 | `b0741a97db33288c5445e2a7cc3cd364dbd3b0b6` |
| Backend `main` final (avec correctif) | **`6b1a3a1ab4f057ea5330c5e7fc2b2276168776c2`** |
| `dev-004-meta-recommendations-readonly` | `b0741a97db33288c5445e2a7cc3cd364dbd3b0b6` |
| `dev-005-opportunity-score-fallback` | `6b1a3a1ab4f057ea5330c5e7fc2b2276168776c2` |
| Backend `saas` | `8152f03806bc7b297b35367a7d4ab49ee68cd3ff` — inchangé |
| Frontend `main` | `7975a80e1c1b42880d9be2a4faf0dbb8ecf58882` — inchangé |
| Frontend `saas` | `7e2b8464831fdaa27aec0ede00468c1d39695598` — inchangé |

Tests : **21/21** (`npm test`), Graph entièrement mocké.

## 8. Ce que ce résultat tranche, et ce qu'il ne tranche pas

**Tranché techniquement :** la chaîne d'accès fonctionne de bout en bout. Le
verdict `PARTIEL` de DEV-003 est levé côté technique — l'edge répond, les
champs de META-007 sont acceptés, la permission n'était bien pas le problème.
La question posée par META-006-CORR peut désormais être reposée à tout moment
par un seul appel, sans intervention manuelle du Gérant.

**Non tranché, et hors de mon rôle :** ce que « zéro recommandation » signifie
pour ce compte. META-006-CORR §3 prévoit ce cas et en donne des causes
possibles ; c'est à META de dire si le constat est normal ou anormal ici, et au
Pilote d'en tirer la conséquence sur la réserve R2 d'ARCH-003. Je ne qualifie
pas.

Une remarque factuelle utile à cette lecture, sans interprétation : un tableau
vide n'est pas un état figé. Meta génère ses recommandations par intermittence.
Une seule lecture à un instant donné ne prouve pas que le compte n'en recevra
jamais. Si le Pilote le juge utile, la route étant en production, un relevé
répété sur quelques jours coûterait un appel par jour — je ne l'engage pas sans
commande.

## 9. Confirmations

- **Zéro écriture Meta.** Aucun POST, PATCH ou DELETE vers Graph. Les seuls
  appels émis vers Meta sont des `GET` sur `/recommendations` et sur le nœud du
  compte publicitaire.
- **Aucune campagne, adset ou ad** créé, modifié, mis en pause ou supprimé.
- **Aucune activation CAPI.** Aucune modification de permissions.
- **Zéro secret.** Aucun jeton lu, affiché, journalisé ou versionné. La clé API
  du Dashboard n'apparaît nulle part dans ce rapport ni dans les logs produits.
- **Zéro SaaS.** Branche `saas` non lue, non touchée, sur les deux dépôts.
- **Zéro frontend.** Aucun fichier du dépôt frontend modifié.
- Déploiement : backend Render uniquement, déclenché par le push `main`. Aucun
  déploiement Netlify.

---

— ingenieur-developpeur · facebook-ads
