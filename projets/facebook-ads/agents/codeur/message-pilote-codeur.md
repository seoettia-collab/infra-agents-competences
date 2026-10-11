# Message Pilote -> Codeur

MESSAGE-ID : CODE-006
DATE : 2026-10-11
OBJET : Fin de l'inventaire backend — leads, historique, vidéo, contexte, webhook, images, proxy

---

Lis ta fiche puis la gouvernance.

## État de l'inventaire

116 routes sur 155. Cette mission termine le backend.

Fait : `ai.js` (42), `campaigns.js` (31), `comms.js` (20), `messenger.js` (12),
`insights.js` (6), `geographic.js` (3), `ads-decline.js` (2).

## Ce qui est demandé

Dépôt : `seoettia-collab/facebook-ads-backend`
Commit de base : `873e3679122c27362323cd40d9d80c207e2dd7df` (branche `main`)

Fichiers à lire, **ceux-ci uniquement** — 39 routes :

| Fichier | Routes |
|---|---|
| `routes/leads.js` | 10 |
| `routes/history.js` | 9 |
| `routes/video.js` | 6 |
| `routes/context.js` | 5 |
| `routes/webhook.js` | 4 |
| `routes/image-upload.js` | 3 |
| `routes/pilote-drive.routes.js` | 2 |

Même tableau, mêmes règles que les missions précédentes.

Deux points d'attention :

- `routes/history.js` recoupe probablement les routes d'historique déjà
  inventoriées dans `ai.js` et `comms.js`. Regarde-y de près.
- `routes/leads.js` est le fichier le plus important pour la suite : le Gérant
  envisage de vider les anciens leads. Décris précisément ce que fait chaque
  route, en particulier toute route qui supprime, archive ou modifie en masse.

## Où écrire

**Ajouter à la suite** du fichier existant, une section par fichier :

```
projets/facebook-ads/documentation/INVENTAIRE-BACKEND.md

## routes/leads.js
## routes/history.js
## routes/video.js
## routes/context.js
## routes/webhook.js
## routes/image-upload.js
## routes/pilote-drive.routes.js
```

Ne modifie aucune ligne déjà écrite.

## Rappel de la règle d'arrêt

39 routes, c'est la charge qui t'avait arrêté en CODE-002. Si tu sens que tu
n'iras pas au bout : pousse ce que tu as, écris où tu t'es arrêté, réponds
`MISSION NON TERMINÉE`. C'est une bonne réponse, pas un échec.

## Interdits

- Lecture seule du backend : aucun fichier modifié, aucune branche, rien poussé
  sur le dépôt backend
- Aucun déploiement, aucun appel à l'API Meta, aucun envoi de message
- **Aucune donnée de lead réel** dans l'inventaire : pas de nom, pas de
  téléphone, pas d'adresse
- Aucun autre fichier du hub
- `à vérifier` plutôt qu'une supposition
- Aucune correction proposée, aucune suppression de données

## Protocole

Pré-vol anti-cache sur le hub. Commit et push après rebase, sur le hub
uniquement.

## Ton rapport

`MESSAGE-ID : CODE-006-R`, dans `message-codeur-pilote.md`, en remplacement
intégral. Indique le total final de routes inventoriées.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-006
```

ou

```
MISSION NON TERMINÉE — CODE-006
```

— Pilote, facebook-ads
