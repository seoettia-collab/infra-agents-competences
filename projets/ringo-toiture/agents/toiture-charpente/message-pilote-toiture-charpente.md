<!-- BANDEAU ANTI-CACHE : relire ce fichier au hash annoncé avant d'agir. -->
# Message Pilote -> toiture-charpente (ringo-toiture)

MESSAGE-ID : TOIT-003
EN-REPONSE-A : DESS-002-R + TOIT-002-R + DESS-003 annulée

## Contenu
## Mission active — reprise Revit toiture par l'agent Charpente

Le Gérant a corrigé la répartition métier : tu es l'agent spécial toiture. Tu
dessines dans Revit et tu prends les décisions techniques dans ton périmètre
toiture/charpente/couverture. L'agent Dessinateur/Structure est limité au volume
support et à la maçonnerie.

La mission `DESS-003`, attribuée au Dessinateur, est annulée et transférée vers
toi sous `TOIT-003`.

La règle projet reste : une seule mission active à la fois. Tu es le seul agent
actif sur cette séquence. Ne modifie pas les boîtes des autres agents.

## Fichier Revit

Tu es autorisé à entrer dans Revit et à travailler dans le fichier existant :

`D:\CLIENT\Ringo\Plan\Projet1.rvt`

Ne crée pas de second fichier projet sauf blocage technique explicite.

## Sources

- Rapport Dessinateur `DESS-002-R`, commit `c1dc757`.
- Contrôle Toiture-charpente `TOIT-002-R`, proxy-push Pilote au commit
  `81da63d`.
- Arbitrages Gérant du 2026-09-01 :
  - débord de toit : non ;
  - poteaux 200 mm : hors champ ;
  - lucarne sur pignon de 4,00 m : garder.

## Mission

Reprendre la toiture dans Revit en tant qu'agent métier charpente/couverture.

Corrections obligatoires :

1. Réaliser les 7 trémies/percements de toiture :
   - 6 percements pour les lucarnes ;
   - 1 percement pour la fenêtre de toit.
2. Les ouvertures doivent être correctes en coupe et depuis l'intérieur, pas
   seulement en rendu extérieur.
3. Vérifier la pente réelle du terrasson dans la maquette. Si elle s'écarte de
   la pente faible attendue, corriger la géométrie. En vue client, ne pas
   afficher de valeur chiffrée ; utiliser "pente faible".

Corrections métier à faire si techniquement adaptées :

1. Revoir les chevrons vers une représentation 63 x 150 au lieu de 63 x 75 si
   la vue technique les montre clairement.
2. Ajouter ou proposer une deuxième descente EP Ø 80.
3. Supprimer la vue orpheline `Vue 3D 1` si Revit le permet.

Arbitrages à appliquer :

- Aucun débord de toit.
- Aucun poteau 200 mm à ajouter : hors champ.
- Garder la lucarne sur pignon de 4,00 m.
- Ne pas ajouter de rives de pignon sur cette toiture quatre pans avec croupe.

## Livrable attendu

1. Enregistrer le fichier Revit corrigé.
2. Vérifier qu'il n'y a pas d'avertissement Revit majeur.
3. Mettre à jour les vues client et techniques liées à la toiture.
4. Rédiger ton retour dans :
   `projets/ringo-toiture/agents/toiture-charpente/message-toiture-charpente-pilote.md`

Titre du retour : `TOIT-003-R`.

Ton rapport doit indiquer clairement :

- ce qui a été corrigé dans Revit ;
- si les 7 trémies sont faites ;
- la pente du terrasson après contrôle ;
- le choix appliqué pour les chevrons ;
- le traitement de la deuxième descente EP ;
- confirmation qu'il n'y a pas de débord ;
- confirmation que les poteaux 200 mm restent hors champ ;
- confirmation que les lucarnes pignon sont maintenues ;
- les réserves restantes, s'il y en a.
