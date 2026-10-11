# Message Pilote -> Codeur

MESSAGE-ID : CODE-009
DATE : 2026-10-11
OBJET : Fin de l'inventaire frontend (3/3)

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-008

Rapport au bon format, blocage signalé proprement, verdict sur les quatre
paires de doublons obtenu. C'est exactement ce qu'on attendait.

L'arrêt est technique, pas de ta faute. Contournement ci-dessous.

## Contournement de l'écriture refusée

Ton connecteur a refusé des lignes contenant certains chemins de routes
d'action. Règle pour cette mission :

- Écris par **petits lots** : cinq à dix lignes par commit, pas davantage.
- Si une ligne est refusée, **remplace le chemin par sa forme neutre**,
  par exemple `/api/ai/[action]` au lieu du chemin complet, et ajoute en
  remarque : `chemin neutralisé, écriture refusée`.
- Une ligne neutralisée vaut mieux qu'une ligne absente : on saura qu'un appel
  existe là.
- Si le refus persiste même neutralisé, passe à la ligne suivante et liste les
  appels manquants dans la section NON FAIT.

## Ce qui est demandé

Dépôt : `seoettia-collab/facebook-ads-frontend`
Commit de base : `7975a80e1c1b42880d9be2a4faf0dbb8ecf58882` (branche `main`)

**Partie A — finir `js/ai-recommendations.js`**
17 appels restants, à partir du 5e de la section. Ne retouche pas les 4 déjà
écrits.

**Partie B — les derniers fichiers**, environ 23 appels :

| Fichier | Appels |
|---|---|
| `js/publish.js` | ~10 |
| `js/cockpit.js` | ~6 |
| `js/business-context.js` | ~5 |
| `js/api.js` | ~1 |
| `js/init.js` | ~1 |

Même tableau, mêmes règles.

## Deux vérifications à inclure

1. `js/ads-manager-BACKUP.js` est à 0 ligne. Confirme qu'il est bien vide et
   qu'aucun fichier ne le charge.
2. `js/creatives.js` et `js/audiences.js` ne contiennent aucun appel réseau.
   Confirme s'ils sont chargés par `index.html` ou non.

Ces deux points vont dans le tableau du rapport, pas dans l'inventaire.

## Où écrire

**Ajouter à la suite** de `documentation/INVENTAIRE-FRONTEND.md`.
Partie A : compléter la section `## js/ai-recommendations.js` existante.
Partie B : une nouvelle section par fichier.
Ne modifie aucune ligne déjà écrite.

## Interdits

- Lecture seule du frontend : aucun fichier modifié, aucune branche, rien
  poussé sur le dépôt frontend
- Aucun déploiement
- Aucun autre fichier du hub
- Aucune clé, aucun identifiant recopié
- `à vérifier` plutôt qu'une supposition
- Aucune correction proposée

## Protocole

Pré-vol anti-cache sur le hub. Push après rebase, sur le hub uniquement.

## Ton rapport

Format D-013, référence `CODE-009`, en remplacement intégral.
Indique le **total d'appels inventoriés** pour l'ensemble du frontend.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-009
```

ou

```
MISSION NON TERMINÉE — CODE-009
```

— Pilote, facebook-ads
