# Message Pilote -> Codeur

MESSAGE-ID : CODE-005
DATE : 2026-10-11
OBJET : Inventaire backend — communications et Messenger

---

**Relis ta fiche. Elle a changé.** La règle n°1 est maintenant en tête : le
format du rapport ne se remplace pas. Tes deux derniers rapports étaient en
tableau de verdict au lieu de la structure D-007. Le fond était bon, la forme
non. Un rapport dans un autre format sera refusé, même si le travail est juste.

Puis lis la gouvernance.

## État de l'inventaire

84 routes inventoriées : `ai.js` (42), `campaigns.js` (31), `insights.js` (6),
`geographic.js` (3), `ads-decline.js` (2). Il en reste 71.

## Ce qui est demandé

Dépôt : `seoettia-collab/facebook-ads-backend`
Commit de base : `873e3679122c27362323cd40d9d80c207e2dd7df` (branche `main`)

Fichiers à lire, **ceux-ci uniquement** — 32 routes :

| Fichier | Routes |
|---|---|
| `routes/comms.js` | 20 |
| `routes/messenger.js` | 12 |

Même tableau, mêmes règles que les missions précédentes.

Attention particulière : `routes/ai.js` contient déjà des routes de rédaction
de réponses Messenger et de relances lead (`suggest-reply`,
`messenger-reply-custom`, `lead-reply-custom`, `suggest-lead-followup`,
`sms-generate`). Le recoupement avec `comms.js` et `messenger.js` est très
probable. Cherche-le.

## Où écrire

**Ajouter à la suite** du fichier existant, une section par fichier :

```
projets/facebook-ads/documentation/INVENTAIRE-BACKEND.md

## routes/comms.js
## routes/messenger.js
```

Ne modifie aucune ligne déjà écrite.

## Rappel de la règle d'arrêt

Si tu n'iras pas au bout : pousse ce que tu as, écris où tu t'es arrêté,
réponds `MISSION NON TERMINÉE`. Jamais d'arrêt sans trace.

## Interdits

- Lecture seule du backend : aucun fichier modifié, aucune branche, rien poussé
  sur le dépôt backend
- Aucun déploiement, aucun appel à l'API Meta, aucun envoi de SMS ni de message
- Aucun autre fichier du hub
- Aucun numéro de téléphone, aucune donnée de lead réel dans l'inventaire
- `à vérifier` plutôt qu'une supposition
- Aucune correction proposée

## Protocole

Pré-vol anti-cache sur le hub. Commit et push après rebase, sur le hub
uniquement.

## Ton rapport

Structure D-007, telle qu'elle figure en tête de ta fiche.
`MESSAGE-ID : CODE-005-R`.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-005
```

ou

```
MISSION NON TERMINÉE — CODE-005
```

— Pilote, facebook-ads
