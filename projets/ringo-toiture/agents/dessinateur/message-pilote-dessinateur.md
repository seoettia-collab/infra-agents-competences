<!-- BANDEAU ANTI-CACHE : relire ce fichier au hash annoncé avant d'agir. -->
# Message Pilote -> dessinateur (ringo-toiture)

MESSAGE-ID : DESS-005-ROLLBACK-2
EN-REPONSE-A : DESS-004-ROLLBACK-R + arbitrage Gérant rollback encore une fois

## Contenu
## Mission active — rollback complémentaire avant maçonnerie

Le Gérant demande un rollback encore une fois avant de préparer la maçonnerie
porteuse et les ouvertures.

L'agent Toiture / Charpente est arrêté pour le moment. Tu es le seul agent
autorisé à intervenir dans Revit sur cette séquence.

Objectif : revenir à une base propre de support maçonné, sans toiture ni
charpente, avant d'ouvrir ensuite une mission séparée de maçonnerie/ouvertures.
Ne mélange pas rollback et nouvelle construction.

## Fichier Revit

Tu es autorisé à entrer dans Revit et à travailler dans le fichier existant :

`D:\CLIENT\Ringo\Plan\Projet1.rvt`

Le fichier n'est pas en travail partagé. Aucun autre agent ne doit écrire dans
ce fichier pendant ta mission.

Avant suppression :

1. ouvrir le fichier ;
2. enregistrer l'état actuel ;
3. créer si possible une copie de sauvegarde datée avant ce deuxième rollback.

## À supprimer

Supprimer tout élément créé ou recréé au-dessus du support maçonné depuis le
dernier rollback, notamment s'ils existent :

- toiture, brisis, terrasson ou pans de couverture ;
- charpente bois, sablières, pannes, arêtiers, chevrons, empanons, chevêtres ;
- lucarnes, joues, frontons ou toits de lucarnes ;
- fenêtre de toit ;
- zinguerie, ligne de bris, faîtage, noues, bavettes, solins ;
- évacuations EP ;
- vues techniques ou vues client devenues liées à cette toiture supprimée.

## À conserver

Conserver uniquement la base support nécessaire à la suite :

- emprise hors tout 8,00 x 4,00 m ;
- murs 200 mm existants ;
- RDC de principe : 3,00 m ;
- R+1 de principe : 3,00 m ;
- sol, dalle/plancher et fondations de principe ;
- niveau `EGOUT - Tete de mur` à +6000, sauf impossibilité technique à signaler.

Les niveaux `LIGNE DE BRIS` et `FAITAGE`, s'ils existent encore et ne décrivent
plus rien de réel après suppression, peuvent être supprimés ou renommés en
provisoire. Explique ton choix dans le rapport.

## Limites

Ne pas créer les pignons maçonnés dans cette mission.

Ne pas créer :

- ouvertures ;
- appuis ;
- linteaux ;
- tableaux ;
- chaînages nouveaux ;
- toiture ou éléments de charpente.

La mission maçonnerie/ouvertures sera ouverte après ton rapport de rollback, si
la base est propre.

## Livrable attendu

1. Enregistrer le fichier Revit après rollback.
2. Vérifier qu'il n'y a pas d'avertissement Revit majeur.
3. Vérifier que la toiture et la charpente sont absentes.
4. Rédiger ton retour dans :
   `projets/ringo-toiture/agents/dessinateur/message-dessinateur-pilote.md`

Titre du retour : `DESS-005-ROLLBACK-2-R`.

Ton rapport doit indiquer :

- sauvegarde réalisée ;
- éléments supprimés ;
- éléments conservés ;
- état des niveaux `EGOUT - Tete de mur`, `LIGNE DE BRIS` et `FAITAGE` ;
- contrôles effectués ;
- réserves restantes ;
- si la base est prête pour une mission séparée maçonnerie/ouvertures.
