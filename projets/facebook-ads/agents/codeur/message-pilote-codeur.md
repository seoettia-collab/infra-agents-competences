# Message Pilote -> Codeur

MESSAGE-ID : CODE-001
DATE : 2026-10-11
OBJET : Inventaire des routes IA du backend — lecture seule

---

Lis ta fiche puis la gouvernance.

## Pourquoi cette mission

Le Gérant soupçonne des redondances dans le dashboard. Avant de diagnostiquer
quoi que ce soit, il faut une carte : on ne cherche pas des doublons dans un
code qu'on n'a pas inventorié.

`ARCHITECTURE.md` et `FICHE_TECHNIQUE.md` sont des gabarits vides. Ton travail
les remplira, fichier par fichier. Celle-ci est la première des trois.

## Ce qui est demandé

Dépôt : `seoettia-collab/facebook-ads-backend`
Commit de base : `873e3679122c27362323cd40d9d80c207e2dd7df` (branche `main`)
Fichier à lire : **`routes/ai.js` uniquement** — 42 routes.

Pour **chaque** route, une ligne de tableau :

| Méthode + chemin | Ce qu'elle fait (une ligne) | Entrées principales | Service appelé | Doublon apparent avec |
|---|---|---|---|---|

Règles de remplissage :

- **Ce qu'elle fait** : en français, une ligne, du point de vue de l'usage.
  Pas « appelle `analyzeWithClaude` » mais « analyse les performances et
  renvoie un score ».
- **Doublon apparent** : uniquement quand deux routes font visiblement la même
  chose ou presque. Écris le chemin de l'autre route. Si tu n'en vois pas,
  écris `—`. **Ne force pas** : un doublon inventé coûte plus cher qu'un
  doublon manqué.
- Si une route est manifestement morte (jamais atteignable, code commenté),
  signale-le dans la colonne « Ce qu'elle fait ».

## Où écrire le résultat

Crée le fichier, dans le dépôt `infra-agents-competences`, branche `main` :

```
projets/facebook-ads/documentation/INVENTAIRE-BACKEND.md
```

Structure du fichier :

```
# INVENTAIRE BACKEND — facebook-ads

Carte des routes du backend. Établi par lecture du code, pas de la doc.
Commit de base : 873e367 — branche main.

## routes/ai.js

<ton tableau>
```

Les deux autres fichiers de routes feront l'objet de missions séparées et
seront ajoutés à la suite. Laisse la place.

## Interdits

- **Lecture seule du backend.** Tu ne modifies aucun fichier du dépôt backend,
  tu ne crées aucune branche, tu ne pousses rien dessus.
- Aucun déploiement, aucun appel à l'API Meta.
- Ne touche à aucun autre fichier du hub que celui nommé ci-dessus.
- N'invente aucune route : si tu n'es pas sûr de ce que fait une route,
  écris `à vérifier` plutôt qu'une supposition.
- Ne propose aucune correction. Tu inventories, tu ne répares pas.

## Protocole

Pré-vol anti-cache sur le hub. Commit et push après rebase, sur le hub
uniquement.

## Ton rapport — structure D-007

Dans `message-codeur-pilote.md`, en remplacement intégral,
`MESSAGE-ID : CODE-001-R`.

Au point 4, PREUVES : nombre de routes inventoriées, nombre de doublons
apparents signalés, hash du commit.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-001
```

ou

```
MISSION NON TERMINÉE — CODE-001
```

— Pilote, facebook-ads
