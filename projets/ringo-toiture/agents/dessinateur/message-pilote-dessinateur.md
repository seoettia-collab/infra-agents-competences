<!-- BANDEAU ANTI-CACHE : relire ce fichier au hash annoncé avant d'agir. -->
# Message Pilote -> dessinateur (ringo-toiture)

MESSAGE-ID : DESS-007-PIGNONS-OEIL-DE-BOEUF
EN-REPONSE-A : DESS-006-MACONNERIE-OUVERTURES-R + arbitrage Gérant option A

## Contenu
## Mission active — pignons maçonnés et oeils-de-boeuf

Le Gérant tranche la réserve de conception DESS-006.

Arbitrage validé :

- conserver les deux pignons maçonnés ;
- abandonner la toiture quatre pans avec croupe pour cette version de travail ;
- partir ensuite sur une toiture mansardée avec pignons maçonnés aux deux
  extrémités ;
- placer un oeil-de-boeuf sur chacun des deux pignons.

Tu es le seul agent autorisé à écrire dans Revit pendant cette mission. L'agent
Toiture / Charpente reste arrêté.

## Fichier Revit

Tu es autorisé à entrer dans Revit et à travailler dans le fichier existant :

`D:\CLIENT\Ringo\Plan\Projet1.rvt`

Le fichier n'est pas en travail partagé. Aucun autre agent ne doit écrire dans
ce fichier pendant ta mission.

Avant modification :

1. ouvrir le fichier ;
2. enregistrer l'état actuel ;
3. créer si possible une copie de sauvegarde datée avant modification des
   pignons.

## Base reçue

État DESS-006 à reprendre :

- chaînage d'arase R+1 à +6000 ;
- deux pignons maçonnés provisoires à +7600 ;
- une baie rectangulaire par pignon, 900 x 900 ;
- appuis, linteaux, tableaux et arases de principe ;
- toiture et charpente absentes ;
- 0 avertissement Revit au retour DESS-006.

## Travaux à réaliser

Adapter les deux pignons selon l'arbitrage Gérant :

- remplacer ou reprendre les deux baies rectangulaires de pignon pour obtenir
  un oeil-de-boeuf sur chaque pignon ;
- centrer chaque oeil-de-boeuf sur son pignon, sauf impossibilité technique à
  signaler ;
- représenter un encadrement cohérent autour de chaque ouverture : maçonnerie,
  béton ou pierre de principe selon les familles disponibles ;
- supprimer ou adapter les anciens appuis, linteaux et tableaux rectangulaires
  qui ne correspondent plus à l'oeil-de-boeuf ;
- conserver une lecture constructive : ouverture, encadrement, appuis latéraux
  ou renforts, arase de pignon et interface future charpente ;
- garder le niveau `EGOUT - Tete de mur` à +6000 ;
- maintenir l'arase de pignon à +7600 comme repère provisoire, sauf correction
  nécessaire à expliquer.

Dimensions : faute de cote relevée, choisir un diamètre ou format ovale
proportionné au pignon 4,00 m, clairement annoté comme provisoire. Ne pas
présenter cette dimension comme définitive.

## Limites métier

Ne pas reconstruire la toiture dans cette mission.

Sont hors périmètre :

- charpente bois ;
- sablières, pannes, arêtiers, chevrons, empanons, chevêtres bois ;
- brisis et terrasson ;
- couverture ardoise ;
- lucarnes rampantes ;
- fenêtre de toit ;
- zinguerie ;
- évacuation EP.

Si la forme exacte de l'oeil-de-boeuf est difficile à modéliser proprement dans
Revit, privilégier une représentation lisible et stable : ouverture ronde ou
ovale de principe, encadrement identifiable, annotation claire. Signaler la
limite dans le rapport au lieu de bloquer.

## Vues attendues

Créer ou mettre à jour :

1. `MPR ETAT 02 - PIGNONS MACONNES`
2. `MPR ETAT 03 - OUVERTURES OEILS DE BOEUF`
3. `MPR ETAT 04 - INTERFACE CHARPENTE`
4. `MPR COUPE - MACONNERIE ET PIGNONS`

Les vues doivent montrer clairement que les deux pignons maçonnés sont retenus
et que chaque pignon reçoit un oeil-de-boeuf.

## Livrable attendu

1. Enregistrer le fichier Revit modifié.
2. Vérifier qu'il n'y a pas d'avertissement Revit majeur.
3. Vérifier que la toiture et la charpente restent absentes.
4. Rédiger ton retour dans :
   `projets/ringo-toiture/agents/dessinateur/message-dessinateur-pilote.md`

Titre du retour : `DESS-007-PIGNONS-OEIL-DE-BOEUF-R`.

Ton rapport doit indiquer :

- sauvegarde réalisée ;
- traitement des anciennes baies rectangulaires ;
- dimensions provisoires des deux oeils-de-boeuf ;
- encadrements, renforts, arases et supports conservés ou modifiés ;
- niveaux conservés ou ajustés ;
- vues créées ou mises à jour ;
- points précis à transmettre à l'agent Charpente ;
- réserves restantes.
