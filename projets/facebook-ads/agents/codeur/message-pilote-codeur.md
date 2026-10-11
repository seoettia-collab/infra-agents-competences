# Message Pilote -> Codeur

MESSAGE-ID : CODE-002
DATE : 2026-10-11
OBJET : Inventaire backend, suite — campagnes, insights, géographie, refus de pubs

---

Lis ta fiche puis la gouvernance.

CODE-001 est validé : format retenu, 42 routes, quatre doublons apparents
crédibles. Même moule ici. Ta remarque sur `/api/ai/history` était juste,
l'inventaire fait foi.

## Ce qui est demandé

Dépôt : `seoettia-collab/facebook-ads-backend`
Commit de base : `873e3679122c27362323cd40d9d80c207e2dd7df` (branche `main`)

Fichiers à lire, **ceux-ci uniquement** — 42 routes au total :

| Fichier | Routes |
|---|---|
| `routes/campaigns.js` | 31 |
| `routes/insights.js` | 6 |
| `routes/geographic.js` | 3 |
| `routes/ads-decline.js` | 2 |

Même tableau que CODE-001, mêmes règles de remplissage.

## Point d'attention particulier à cette mission

CODE-001 a révélé que `routes/ai.js` contient des routes de gestion de
campagnes (`/api/ai/publish/campaigns`, `/api/ai/publish/delete-campaign`,
etc.). Il est donc probable que certaines routes de `campaigns.js` fassent
la même chose.

**Cherche aussi les doublons entre fichiers**, pas seulement à l'intérieur de
chacun. Quand une route de `campaigns.js` recoupe une route déjà inventoriée
dans `routes/ai.js`, inscris-la dans la colonne « Doublon apparent avec ».
L'inventaire de `ai.js` est déjà dans le fichier, tu peux le relire.

La règle de CODE-001 reste : ne force pas. Un doublon inventé coûte plus cher
qu'un doublon manqué.

## Où écrire le résultat

**Ajouter à la suite** du fichier existant :

```
projets/facebook-ads/documentation/INVENTAIRE-BACKEND.md
```

Une section par fichier de routes, sur le modèle de `## routes/ai.js` :

```
## routes/campaigns.js
## routes/insights.js
## routes/geographic.js
## routes/ads-decline.js
```

Ne modifie pas la section `routes/ai.js` déjà écrite.

## Interdits

- **Lecture seule du backend.** Aucun fichier modifié, aucune branche créée,
  rien de poussé sur le dépôt backend.
- Aucun déploiement, aucun appel à l'API Meta.
- Aucun autre fichier du hub que celui nommé ci-dessus.
- N'invente aucune route : `à vérifier` plutôt qu'une supposition.
- Ne propose aucune correction. Tu inventories, tu ne répares pas.

## Protocole

Pré-vol anti-cache sur le hub. Commit et push après rebase, sur le hub
uniquement.

## Ton rapport — structure D-007

Dans `message-codeur-pilote.md`, en remplacement intégral,
`MESSAGE-ID : CODE-002-R`.

Au point 4, PREUVES : nombre de routes inventoriées par fichier, nombre de
doublons apparents **dont ceux entre fichiers**, hash du commit.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-002
```

ou

```
MISSION NON TERMINÉE — CODE-002
```

— Pilote, facebook-ads
