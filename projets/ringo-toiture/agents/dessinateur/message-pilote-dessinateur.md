<!-- BANDEAU ANTI-CACHE : relire ce fichier au hash annoncé avant d'agir. -->
# Message Pilote -> dessinateur (ringo-toiture)

MESSAGE-ID : DESS-004-ROLLBACK
EN-REPONSE-A : DESS-003 annulée + TOIT-003-ROLLBACK annulée

## Contenu
## Mission active exceptionnelle — rollback des éléments toiture créés

Le Gérant demande que le rollback soit fait par toi, car tu as créé les
éléments toiture/charpente actuellement en place et tu connais leur structure
dans le fichier.

Cette mission est une exception de nettoyage. Elle ne change pas la gouvernance :
après rollback, la reconstruction toiture sera confiée à l'agent
Toiture-charpente.

La règle projet reste : une seule mission active à la fois. Tu es le seul agent
actif sur cette séquence. Ne modifie pas les boîtes des autres agents.

## Fichier Revit

Tu es autorisé à entrer dans Revit et à travailler dans le fichier existant :

`D:\CLIENT\Ringo\Plan\Projet1.rvt`

Avant suppression, créer une sauvegarde ou une copie datée du fichier si Revit
le permet. Ne crée pas un second projet de travail ; la copie sert seulement de
sécurité avant rollback.

## Interface à conserver

Conserver le support hors toiture :

- emprise 4,00 x 8,00 m ;
- axes et murs du volume support ;
- niveaux ;
- niveau `EGOUT - Tete de mur` à +6000 ;
- sols, dalle/fondations de principe ;
- vues utiles au volume support si elles ne dépendent pas de la toiture
  supprimée.

Ne pas déplacer le niveau `EGOUT - Tete de mur`. Il est l'interface intangible
entre Structure et Charpente.

## Éléments à supprimer

Supprimer tous les éléments toiture/charpente que tu as créés dans DESS-002 :

- pans de toiture : brisis, terrasson, croupes, toits de lucarnes ;
- couverture / matériaux de toiture posés sur ces pans ;
- lucarnes complètes, y compris joues, frontons, châssis, toits rampants,
  habillages ;
- fenêtre de toit / MK04 et son chevêtre ;
- charpente de toiture : les 121 pièces de bois, sablières, pannes, chevrons,
  arêtiers, empanons, linteaux, chevêtres liés à la toiture ;
- zinguerie toiture : ligne de bris, faîtage, arêtiers, bavettes, solins, noues,
  raccords de lucarnes ;
- descentes EP et pièces EP posées pour cette toiture ;
- annotations, vues ou éléments techniques devenus faux parce qu'ils décrivent
  cette toiture supprimée.

## Limites

- Ne pas reconstruire la toiture.
- Ne pas reconstruire les lucarnes.
- Ne pas traiter les 7 trémies maintenant ; elles seront recréées par l'agent
  Toiture-charpente lors de la reconstruction.
- Ne pas ajouter de poteaux 200 mm : hors champ.
- Ne pas ajouter de débord de toit.

## Livrable attendu

1. Enregistrer le fichier Revit après rollback.
2. Vérifier qu'il n'y a pas d'avertissement Revit majeur.
3. Vérifier que le modèle ne contient plus d'éléments toiture/charpente/
   couverture/lucarnes/zinguerie/EP liés à l'ancienne toiture.
4. Confirmer que le volume support maçonné est conservé.
5. Rédiger ton retour dans :
   `projets/ringo-toiture/agents/dessinateur/message-dessinateur-pilote.md`

Titre du retour : `DESS-004-ROLLBACK-R`.

Ton rapport doit indiquer clairement :

- si une sauvegarde/copie a été faite avant suppression ;
- ce qui a été supprimé ;
- ce qui a été conservé ;
- confirmation que toute l'ancienne toiture est retirée ;
- confirmation qu'aucune nouvelle toiture n'a été reconstruite ;
- les réserves restantes, s'il y en a.
