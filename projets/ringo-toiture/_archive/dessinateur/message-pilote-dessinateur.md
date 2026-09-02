<!-- BANDEAU ANTI-CACHE : relire ce fichier au hash annoncé avant d'agir. -->
# Message Pilote -> dessinateur (ringo-toiture)

MESSAGE-ID : DESS-008-PIGNONS-INCLINES
EN-REPONSE-A : DESS-007-PIGNONS-OEIL-DE-BOEUF-R + arbitrage Gérant inclinaison pignon

## Contenu
## Mission active — reprendre l'inclinaison des pignons maçonnés

DESS-007 est reçu au commit `e4185c0`.

Le Gérant valide les pignons maçonnés avec oeil-de-boeuf, mais ajoute un point
à corriger : les pignons de côté doivent tenir compte d'une inclinaison. Ils ne
doivent pas être lus comme de simples rectangles droits si la future toiture
impose une arase ou une silhouette rampante.

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
3. créer si possible une copie de sauvegarde datée avant reprise des pignons.

## Références Gérant

Le Gérant a transmis deux références visuelles complémentaires :

- détail chantier montrant le pignon de côté avec inclinaison ;
- coupe technique montrant une toiture mansardée où la maçonnerie latérale et
  la charpente suivent un profil incliné.

Ces images servent de références de principe. Ne pas copier leurs cotes, NGF,
pentes, nombre de niveaux ou proportions exactes.

## Base reçue

État DESS-007 à reprendre :

- deux pignons maçonnés ;
- un oeil-de-boeuf par pignon, diamètre provisoire 800 mm ;
- encadrements et renforts de principe ;
- arase pignon actuelle à +7600, provisoire ;
- toiture et charpente absentes ;
- futur parti déjà arbitré : toiture mansardée avec pignons maçonnés, sans
  croupe, partie haute en zinc, pourtour / brisis en ardoise, quatre Velux à
  traiter plus tard par Charpente.

## Travaux à réaliser

Reprendre la géométrie de principe des pignons :

- vérifier si les pignons actuels sont de simples murs droits jusqu'à +7600 ;
- créer ou ajuster une forme de pignon maçonné avec arase/silhouette inclinée
  compatible avec la future toiture mansardée ;
- conserver les deux oeils-de-boeuf centrés si possible ;
- adapter encadrements, renforts et arases pour rester cohérents avec cette
  inclinaison ;
- garder le niveau `EGOUT - Tete de mur` à +6000 ;
- conserver la lecture constructive : maçonnerie porteuse, ouverture,
  encadrement, arase de reprise et interface future charpente ;
- annoter clairement tout ce qui dépend encore de la future géométrie de
  toiture comme PROVISOIRE.

La pente exacte de toiture n'est pas encore figée. Si tu ne peux pas modéliser
une inclinaison définitive sans prendre une décision de Charpente, crée une
inclinaison de principe et remonte précisément ce qui doit être validé par
Charpente.

## Limites métier

Ne pas reconstruire la toiture dans cette mission.

Sont hors périmètre :

- charpente bois ;
- sablières, pannes, arêtiers, chevrons, empanons, chevêtres bois ;
- brisis et terrasson ;
- couverture zinc ou ardoise ;
- lucarnes rampantes ;
- quatre Velux ;
- zinguerie ;
- évacuation EP.

## Vues attendues

Créer ou mettre à jour :

1. `MPR ETAT 02 - PIGNONS MACONNES`
2. `MPR ETAT 03 - OUVERTURES OEILS DE BOEUF`
3. `MPR ETAT 04 - INTERFACE CHARPENTE`
4. `MPR COUPE - MACONNERIE ET PIGNONS`

Les vues doivent rendre visible l'inclinaison ou la silhouette rampante des
pignons.

## Livrable attendu

1. Enregistrer le fichier Revit modifié.
2. Vérifier qu'il n'y a pas d'avertissement Revit majeur.
3. Vérifier que la toiture et la charpente restent absentes.
4. Rédiger ton retour dans :
   `projets/ringo-toiture/agents/dessinateur/message-dessinateur-pilote.md`

Titre du retour : `DESS-008-PIGNONS-INCLINES-R`.

Ton rapport doit indiquer :

- sauvegarde réalisée ;
- correction faite sur l'inclinaison ou la silhouette des pignons ;
- impact sur les oeils-de-boeuf ;
- impact sur encadrements, renforts et arases ;
- niveaux conservés ou ajustés ;
- vues créées ou mises à jour ;
- points précis à transmettre à l'agent Charpente ;
- réserves restantes.
