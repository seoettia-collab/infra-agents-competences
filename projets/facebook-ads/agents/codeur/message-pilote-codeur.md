# Message Pilote -> Codeur

MESSAGE-ID : CODE-007
DATE : 2026-10-11
OBJET : Inventaire frontend — quels appels backend sont réellement utilisés (1/3)

---

Lis ta fiche puis la gouvernance. **Le format de rapport a changé** : règle
définitive du Gérant, D-013, en tête de ta fiche. Applique-la.

## Où on en est

L'inventaire backend est terminé : **155 routes**, 14 fichiers,
`documentation/INVENTAIRE-BACKEND.md`.

Il manque la question décisive : **lesquelles de ces 155 routes sont
réellement appelées par le dashboard ?** Une route en double dont aucune n'est
utilisée ne se corrige pas, elle se supprime. Sans cette information, on ne
peut rien trancher.

## Ce qui est demandé

Dépôt : `seoettia-collab/facebook-ads-frontend`
Commit de base : `7975a80e1c1b42880d9be2a4faf0dbb8ecf58882` (branche `main`)
Fichier à lire : **`js/conversions.js` uniquement** — environ 69 appels.

Pour **chaque appel réseau** vers le backend, une ligne :

| Chemin appelé | Méthode | Ce qui le déclenche | Route présente dans l'inventaire backend ? | Remarque |
|---|---|---|---|---|

Règles de remplissage :

- **Chemin appelé** : tel qu'il apparaît dans le code, variables résolues si
  c'est évident. Sinon écris le motif, par exemple `/api/leads/:id/statut`.
- **Ce qui le déclenche** : clic sur un bouton, chargement de l'écran,
  rafraîchissement automatique, action en masse. Une ligne.
- **Route présente dans l'inventaire backend ?** : `oui`, `non`, ou
  `à vérifier`. Compare avec `documentation/INVENTAIRE-BACKEND.md`, que tu as
  écrit toi-même. **Un `non` est une information précieuse** : appel vers une
  route qui n'existe pas, donc fonction cassée.
- **Remarque** : seulement si quelque chose mérite d'être signalé — appel
  dupliqué dans le même fichier, appel en boucle, appel jamais atteignable.

## Où écrire

Crée le fichier dans le hub :

```
projets/facebook-ads/documentation/INVENTAIRE-FRONTEND.md
```

Structure :

```
# INVENTAIRE FRONTEND — facebook-ads

Appels backend réellement présents dans le code du dashboard.
Commit de base : 7975a80 — branche main.

## js/conversions.js

<ton tableau>
```

Les autres fichiers feront l'objet de missions séparées, ajoutées à la suite.

## Rappel de la règle d'arrêt

69 appels, c'est lourd. Si tu n'iras pas au bout : pousse ce que tu as, écris
où tu t'es arrêté, réponds `MISSION NON TERMINÉE`. C'est une bonne réponse.

## Interdits

- Lecture seule du frontend : aucun fichier modifié, aucune branche, rien
  poussé sur le dépôt frontend
- Aucun déploiement
- Aucun autre fichier du hub
- **Aucune clé, aucun identifiant** recopié dans l'inventaire, même s'il
  figure en clair dans le code
- `à vérifier` plutôt qu'une supposition
- Aucune correction proposée — tu inventories, tu ne répares pas

## Protocole

Pré-vol anti-cache sur le hub. Commit et push après rebase, sur le hub
uniquement.

## Ton rapport

Format D-013, référence `CODE-007`, dans `message-codeur-pilote.md`,
en remplacement intégral.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-007
```

ou

```
MISSION NON TERMINÉE — CODE-007
```

— Pilote, facebook-ads
