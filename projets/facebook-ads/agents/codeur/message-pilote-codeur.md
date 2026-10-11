# Message Pilote -> Codeur

MESSAGE-ID : CODE-003
DATE : 2026-10-11
OBJET : Finir l'inventaire de routes/campaigns.js

---

Lis ta fiche puis la gouvernance.

## État des lieux

CODE-002 s'est arrêté en cours de route. Tu as eu raison de le signaler plutôt
que de rendre un travail tronqué sans le dire. Ce qui a été poussé est conservé
et le format tient : deux lots pour `campaigns.js`, soit **21 routes sur 31**.

Dernière route inventoriée : `POST /api/facebook/ads/:id/budget`.

La mission était trop lourde. Je la redécoupe. Celle-ci ne porte que sur la
fin de `campaigns.js`.

## Ce qui est demandé

Dépôt : `seoettia-collab/facebook-ads-backend`
Commit de base : `873e3679122c27362323cd40d9d80c207e2dd7df` (branche `main`)
Fichier : **`routes/campaigns.js` uniquement**

Inventorier les **10 routes restantes**, celles qui suivent
`POST /api/facebook/ads/:id/budget` dans le fichier.

Même tableau, mêmes règles que CODE-001 et CODE-002, y compris la recherche de
doublons **entre fichiers** avec `routes/ai.js` déjà inventorié.

## Où écrire

**Ajouter à la suite** des lignes existantes de la section
`## routes/campaigns.js`, dans :

```
projets/facebook-ads/documentation/INVENTAIRE-BACKEND.md
```

Ne modifie aucune ligne déjà écrite. Ne crée pas de nouvelle section.

## Règle nouvelle — elle s'applique à toutes tes missions à partir de maintenant

Si tu sens que tu n'iras pas au bout :

1. **Pousse ce que tu as déjà**, même incomplet.
2. **Écris ton rapport** en indiquant précisément où tu t'es arrêté : dernier
   élément traité, ce qui reste.
3. Réponds `MISSION NON TERMINÉE`.

Un travail partiel documenté se reprend en une mission. Un arrêt sans trace
oblige le Pilote à aller chercher lui-même où tu t'es arrêté.

## Interdits

- Lecture seule du backend : aucun fichier modifié, aucune branche, rien poussé
  sur le dépôt backend
- Aucun déploiement, aucun appel à l'API Meta
- Aucun autre fichier du hub
- `à vérifier` plutôt qu'une supposition
- Aucune correction proposée

## Protocole

Pré-vol anti-cache sur le hub. Commit et push après rebase, sur le hub
uniquement.

## Ton rapport — structure D-007

Dans `message-codeur-pilote.md`, en remplacement intégral,
`MESSAGE-ID : CODE-003-R`.

Point 4, PREUVES : nombre de routes ajoutées, total de la section
`campaigns.js`, doublons signalés, hash du commit.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-003
```

ou

```
MISSION NON TERMINÉE — CODE-003
```

— Pilote, facebook-ads
