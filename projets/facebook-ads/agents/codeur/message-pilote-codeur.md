# Message Pilote -> Codeur

MESSAGE-ID : CODE-008
DATE : 2026-10-11
OBJET : Inventaire frontend — écrans IA et gestionnaire de pubs (2/3)

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Où on en est

Backend : 155 routes inventoriées.
Frontend : `js/conversions.js` fait, 75 appels, dont **8 marqués absents du
backend**. Bon travail, c'est exactement ce qu'on cherchait.

## Ce qui est demandé

Dépôt : `seoettia-collab/facebook-ads-frontend`
Commit de base : `7975a80e1c1b42880d9be2a4faf0dbb8ecf58882` (branche `main`)

Fichiers à lire, **ceux-ci uniquement** — environ 59 appels :

| Fichier | Appels |
|---|---|
| `js/ads-manager.js` | ~25 |
| `js/ai-creation.js` | ~18 |
| `js/ai-recommendations.js` | ~16 |

Même tableau, mêmes règles que CODE-007.

Point d'attention : ces trois écrans consomment les 42 routes de
`routes/ai.js`. C'est là qu'on saura lesquelles servent vraiment. Sois précis
sur les quatre paires de doublons déjà repérées dans l'inventaire backend —
`publish/campaigns` contre `publish/list-campaigns`, `publish/campaign/:id`
contre `publish/delete-campaign`, `suggest-reply` contre
`messenger-reply-custom`, `lead-reply-custom` contre `suggest-lead-followup` :
pour chacune, dis laquelle des deux le frontend appelle réellement, ou si
aucune ne l'est.

## Où écrire

**Ajouter à la suite** du fichier existant, une section par fichier :

```
projets/facebook-ads/documentation/INVENTAIRE-FRONTEND.md

## js/ads-manager.js
## js/ai-creation.js
## js/ai-recommendations.js
```

Ne modifie aucune ligne déjà écrite.

## Rappel de la règle d'arrêt

Si tu n'iras pas au bout : pousse ce que tu as, écris où tu t'es arrêté,
réponds `MISSION NON TERMINÉE`.

## Interdits

- Lecture seule du frontend : aucun fichier modifié, aucune branche, rien
  poussé sur le dépôt frontend
- Aucun déploiement
- Aucun autre fichier du hub
- Aucune clé, aucun identifiant recopié dans l'inventaire
- `à vérifier` plutôt qu'une supposition
- Aucune correction proposée

## Protocole

Pré-vol anti-cache sur le hub. Commit et push après rebase, sur le hub
uniquement.

## Ton rapport

Format D-013, référence `CODE-008`, en remplacement intégral.
Dans le tableau, une ligne par fichier lu, plus une ligne pour le verdict sur
les quatre paires de doublons.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-008
```

ou

```
MISSION NON TERMINÉE — CODE-008
```

— Pilote, facebook-ads
