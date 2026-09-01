<!-- BANDEAU ANTI-CACHE : relire ce fichier au hash annoncé avant d'agir. -->
# Message Pilote -> toiture-charpente (ringo-toiture)

MESSAGE-ID : TOIT-003-ROLLBACK
EN-REPONSE-A : TOIT-003 + capture Gérant 2026-09-01

## Contenu
## Mission active prioritaire — rollback toiture avant reprise

Le Gérant demande un rollback avant toute reprise de toiture. La toiture visible
dans la capture transmise est considérée trop confuse / montée sur une logique
défavorable pour être corrigée efficacement.

Tu es l'agent spécial toiture/charpente. Tu dessines dans Revit et tu prends les
décisions techniques dans ton périmètre toiture/charpente/couverture. Pour cette
séquence, ta mission n'est pas de reconstruire : c'est d'enlever proprement la
toiture existante afin de préparer une base saine.

La règle projet reste : une seule mission active à la fois. Tu es le seul agent
actif sur cette séquence. Ne modifie pas les boîtes des autres agents.

Le fichier `Projet1.rvt` n'est pas en travail partagé. Aucun autre agent ne doit
écrire dans le fichier pendant ta mission.

## Interface intangible avec le volume support

Conserver l'interface livrée par le volume support :

- emprise 4,00 x 8,00 m ;
- axes et murs du volume support ;
- niveau `EGOUT - Tete de mur` à +6000.

Ne pas déplacer ce niveau. Toute la future toiture devra repartir au-dessus de
ce niveau, après validation d'une mission suivante.

## Fichier Revit

Tu es autorisé à entrer dans Revit et à travailler dans le fichier existant :

`D:\CLIENT\Ringo\Plan\Projet1.rvt`

Avant suppression, créer une sauvegarde ou une copie datée du fichier si Revit
le permet. Ne crée pas un second projet de travail ; la copie sert seulement de
sécurité avant rollback.

## Sources

- Rapport Dessinateur `DESS-002-R`, commit `c1dc757`.
- Contrôle Toiture-charpente `TOIT-002-R`, proxy-push Pilote au commit
  `81da63d`.
- Arbitrages Gérant du 2026-09-01 :
  - débord de toit : non ;
  - poteaux 200 mm : hors champ ;
  - lucarne sur pignon de 4,00 m : garder.
- Capture Gérant montrant l'état actuel : toiture/couverture/lucarnes déjà
  présentes, mais à supprimer avant nouvelle conception.

## Mission

Nettoyer le modèle pour revenir à une base support sans toiture.

## Éléments à supprimer / retirer du modèle

Supprimer tous les éléments liés à la toiture créée précédemment :

- pans de toiture : brisis, terrasson, croupes, toits de lucarnes ;
- couverture / matériaux de toiture posés sur ces pans ;
- lucarnes complètes : joues, frontons, châssis, toits rampants, habillages ;
- fenêtre de toit / MK04 et son chevêtre ;
- charpente de toiture : sablières, pannes, chevrons, arêtiers, empanons,
  linteaux, chevêtres liés à la toiture ;
- zinguerie toiture : ligne de bris, faîtage, arêtiers, bavettes, solins, noues,
  raccords de lucarnes ;
- descentes EP et pièces EP posées pour cette toiture ;
- annotations, vues ou éléments techniques devenus faux parce qu'ils décrivent
  cette toiture supprimée.

## Éléments à conserver

Conserver le support hors toiture :

- niveaux ;
- murs/maçonnerie du volume 4,00 x 8,00 m ;
- sols, dalle/fondations de principe ;
- coupes/vues utiles au volume support, si elles ne dépendent pas de la toiture
  supprimée.

Ne pas ajouter de poteaux 200 mm. Ils sont hors champ selon arbitrage Gérant.
Ne pas ajouter de débord de toit.
Ne pas reconstruire de lucarne ni de toiture dans cette mission.

Arbitrage Pilote après retour Dessinateur : les 121 pièces de bois existantes
ne sont pas à reprendre en l'état. Elles doivent être supprimées avec l'ancienne
toiture. La future charpente sera reconstruite par l'agent Toiture / Charpente
dans une mission distincte.

Les 7 trémies restent un sujet charpente/toiture : elles ne sont pas confiées au
Dessinateur / Structure. Pour cette mission rollback, supprimer les ouvertures
et chevêtres existants avec l'ancienne toiture ; les nouvelles trémies seront
créées lors de la reconstruction.

## Arrêt obligatoire

Après suppression, s'arrêter. Ne pas reconstruire la nouvelle toiture avant une
mission suivante du Pilote.

## Livrable attendu

1. Enregistrer le fichier Revit après rollback.
2. Vérifier qu'il n'y a pas d'avertissement Revit majeur.
3. Vérifier que le modèle ne contient plus d'éléments toiture/charpente/
   couverture/lucarnes/zinguerie/EP liés à l'ancienne toiture.
4. Confirmer que le volume support maçonné est conservé.
5. Rédiger ton retour dans :
   `projets/ringo-toiture/agents/toiture-charpente/message-toiture-charpente-pilote.md`

Titre du retour : `TOIT-003-ROLLBACK-R`.

Ton rapport doit indiquer clairement :

- si une sauvegarde/copie a été faite avant suppression ;
- ce qui a été supprimé ;
- ce qui a été conservé ;
- confirmation que toute l'ancienne toiture est retirée ;
- confirmation qu'aucune nouvelle toiture n'a été reconstruite ;
- les réserves restantes, s'il y en a.
