<!-- BANDEAU ANTI-CACHE : relire ce fichier au hash annoncé avant d'agir. -->
# Message Pilote -> dessinateur (ringo-toiture)

MESSAGE-ID : DESS-006-MACONNERIE-OUVERTURES
EN-REPONSE-A : DESS-005-ROLLBACK-2-R + arbitrage Gérant pignons maçonnés

## Contenu
## Mission active — maçonnerie porteuse, pignons et ouvertures

Le rollback complémentaire est terminé et accepté comme base de reprise :
volume maçonné 8,00 x 4,00 m, RDC 3,00 m, R+1 3,00 m, niveau
`EGOUT - Tete de mur` à +6000, aucune toiture ni charpente au-dessus.

Tu continues maintenant dans Revit sur le périmètre Structure / Maçonnerie. Tu
es le seul agent autorisé à écrire dans `Projet1.rvt` pendant cette mission.
L'agent Toiture / Charpente reste arrêté.

## Fichier Revit

Tu es autorisé à entrer dans Revit et à travailler dans le fichier existant :

`D:\CLIENT\Ringo\Plan\Projet1.rvt`

Le fichier n'est pas en travail partagé. Aucun autre agent ne doit écrire dans
ce fichier pendant ta mission.

Avant modification :

1. ouvrir le fichier ;
2. enregistrer l'état actuel ;
3. créer si possible une copie de sauvegarde datée avant la reprise
   maçonnerie/ouvertures.

## Références à utiliser

Le Gérant va te transmettre dans ta conversation l'image de référence
"maçonnerie ouverture".

Lecture attendue de cette image :

- murs maçonnés en blocs ;
- deux pignons maçonnés solides ;
- ouvertures intégrées dans la maçonnerie ;
- appuis de baie ;
- linteaux ;
- tableaux ;
- arases et supports prêts à recevoir ensuite la charpente.

Cette image est une référence de principe, pas un relevé exact. Ne copie pas
son architecture si elle contredit le volume Ringo 8,00 x 4,00 m.

## Travaux à réaliser

Préparer la structure maçonnée derrière la future toiture :

- créer ou ajuster les deux pignons maçonnés sur les faces de 4,00 m ;
- intégrer les ouvertures nécessaires dans la maçonnerie des pignons selon une
  logique constructive claire ;
- représenter les appuis, linteaux et tableaux de façon lisible ;
- prévoir les arases, chaînages ou supports maçonnés nécessaires à la reprise
  future des sablières et de la charpente ;
- garder le niveau `EGOUT - Tete de mur` à +6000 comme interface de référence,
  sauf impossibilité technique à signaler ;
- créer les repères utiles pour que l'agent Charpente puisse reprendre sans
  deviner la base porteuse.

## Limites métier

Ne pas reconstruire la toiture dans cette mission.

Sont hors périmètre :

- charpente bois ;
- sablières, pannes, arêtiers, chevrons, empanons, chevêtres bois ;
- brisis et terrasson ;
- couverture ardoise ;
- lucarnes rampantes complètes ;
- fenêtre de toit ;
- zinguerie ;
- évacuation EP.

Si une dimension de maçonnerie dépend de la future géométrie de toiture, crée
une réserve ou un repère provisoire et indique-le dans ton rapport. Ne transforme
pas une hypothèse toiture en cote définitive.

## Vues attendues

Créer ou mettre à jour des vues par état :

1. `MPR ETAT 01 - SUPPORT NU`
2. `MPR ETAT 02 - PIGNONS MACONNES`
3. `MPR ETAT 03 - OUVERTURES APPUIS LINTEAUX`
4. `MPR ETAT 04 - INTERFACE CHARPENTE`
5. `MPR COUPE - MACONNERIE ET PIGNONS`

Ces vues doivent permettre de comprendre la base maçonnée avant intervention
Charpente.

## Livrable attendu

1. Enregistrer le fichier Revit modifié.
2. Vérifier qu'il n'y a pas d'avertissement Revit majeur.
3. Vérifier que la toiture et la charpente restent absentes.
4. Rédiger ton retour dans :
   `projets/ringo-toiture/agents/dessinateur/message-dessinateur-pilote.md`

Titre du retour : `DESS-006-MACONNERIE-OUVERTURES-R`.

Ton rapport doit indiquer :

- sauvegarde réalisée ;
- pignons maçonnés créés ou modifiés ;
- ouvertures créées ou ajustées ;
- appuis, linteaux, tableaux, arases ou supports créés ;
- niveaux conservés, créés, supprimés ou renommés ;
- vues créées ou mises à jour ;
- points précis à transmettre à l'agent Charpente ;
- réserves restantes.
