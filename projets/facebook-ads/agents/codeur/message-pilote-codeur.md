# Message Pilote -> Codeur

MESSAGE-ID : CODE-004
DATE : 2026-10-11
OBJET : Fin de l'inventaire backend — insights, géographie, refus de pubs

---

Lis ta fiche puis la gouvernance.

## Remarque sur ton dernier rapport

Le fond de CODE-003 est bon : 31/31 sur `campaigns.js`, 8 recoupements
identifiés, rien de cassé.

En revanche tu as rendu ton rapport sous forme de tableau de verdict. Ce n'est
pas le format. La structure D-007 est obligatoire et ne se remplace pas :
en-tête de cinq lignes, puis sept points numérotés. Elle existe pour qu'un
autre poste sache où chercher sans trier. Reviens-y à partir de cette mission.

## Ce qui est demandé

Dépôt : `seoettia-collab/facebook-ads-backend`
Commit de base : `873e3679122c27362323cd40d9d80c207e2dd7df` (branche `main`)

Fichiers à lire, **ceux-ci uniquement** — 11 routes au total :

| Fichier | Routes |
|---|---|
| `routes/insights.js` | 6 |
| `routes/geographic.js` | 3 |
| `routes/ads-decline.js` | 2 |

Même tableau, mêmes règles que les missions précédentes, y compris la
recherche de doublons entre fichiers avec `routes/ai.js` et
`routes/campaigns.js` déjà inventoriés.

Attention particulière : `insights.js` recoupe probablement les routes de
statistiques de `campaigns.js`. Regarde-y de près.

## Où écrire

**Ajouter à la suite** du fichier existant, une section par fichier :

```
projets/facebook-ads/documentation/INVENTAIRE-BACKEND.md

## routes/insights.js
## routes/geographic.js
## routes/ads-decline.js
```

Ne modifie aucune ligne déjà écrite.

## Rappel de la règle d'arrêt

Si tu n'iras pas au bout : pousse ce que tu as, écris où tu t'es arrêté,
réponds `MISSION NON TERMINÉE`. Jamais d'arrêt sans trace.

## Interdits

- Lecture seule du backend : aucun fichier modifié, aucune branche, rien poussé
  sur le dépôt backend
- Aucun déploiement, aucun appel à l'API Meta
- Aucun autre fichier du hub
- `à vérifier` plutôt qu'une supposition
- Aucune correction proposée — tu inventories, tu ne répares pas

## Protocole

Pré-vol anti-cache sur le hub. Commit et push après rebase, sur le hub
uniquement.

## Ton rapport — structure D-007 obligatoire

Dans `message-codeur-pilote.md`, en remplacement intégral :

```
MESSAGE-ID : CODE-004-R
EN-REPONSE-A : CODE-004
DATE : 2026-10-11
POSTE : codeur
OBJET : <une ligne>

1. PRÉ-VOL — HEAD du hub lu, commit de base backend
2. FAIT — routes inventoriées par fichier
3. NON FAIT — néant si rien
4. PREUVES — total de routes dans l'inventaire, doublons signalés, hash du commit
5. IMPACT PRODUCTION — oui / non
6. RÉSERVES — néant si rien
7. ROLLBACK — commande exacte
```

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-004
```

ou

```
MISSION NON TERMINÉE — CODE-004
```

— Pilote, facebook-ads
