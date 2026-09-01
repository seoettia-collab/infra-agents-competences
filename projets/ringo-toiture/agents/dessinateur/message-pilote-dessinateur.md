<!-- BANDEAU ANTI-CACHE : relire ce fichier au hash annoncé avant d'agir. -->
# Message Pilote -> dessinateur (ringo-toiture)

MESSAGE-ID : DESS-003
EN-REPONSE-A : DESS-002-R + TOIT-002-R + arbitrages Gérant

## Contenu
## Mission active — reprise maquette après contrôle toiture-charpente

DESS-002 est livrée avec réserves au commit `c1dc757`. Le contrôle spécialisé
Toiture-charpente `TOIT-002-R` conclut : maquette acceptable avec corrections.

Tu es autorisé à reprendre le fichier Revit existant :

`D:\CLIENT\Ringo\Plan\Projet1.rvt`

La règle projet reste : une seule mission active à la fois. Tu es le seul agent
actif sur cette séquence. Ne modifie pas les boîtes des autres agents.

## Arbitrages Gérant à appliquer

1. Débord de toit : non. Ne pas ajouter de débord.
2. Poteaux 200 mm : hors champ. Ne pas les modéliser.
3. Lucarne sur pignon de 4,00 m : garder. Maintenir les lucarnes pignon prévues.

## Corrections obligatoires

1. Reprendre manuellement les 7 trémies/percements de toiture :
   - 6 percements pour les lucarnes ;
   - 1 percement pour la fenêtre de toit.
2. Les ouvertures doivent être correctes en coupe et depuis l'intérieur, pas
   seulement en rendu extérieur.
3. Vérifier la pente réelle du terrasson dans la maquette. Si elle s'écarte de
   la pente faible attendue, corriger la géométrie. Ne pas afficher de valeur
   chiffrée en vue client ; garder "pente faible".

## Corrections recommandées à faire si possible

1. Revoir la représentation des chevrons en 63 x 150 au lieu de 63 x 75 si la
   vue technique les montre clairement.
2. Ajouter une deuxième descente EP Ø 80 ou préparer une proposition visible :
   une seule descente est faible pour un développé de chéneau sur 8,00 m.
3. Supprimer la vue orpheline `Vue 3D 1` si Revit le permet.

## Points confirmés par Toiture-charpente

- Ne pas ajouter de rives de pignon : sur une toiture quatre pans avec croupe,
  il n'y a pas de pignon découvert au sens classique.
- Maintenir une lecture technique claire de la charpente : sablières, pannes,
  arêtiers, chevrons, empanons, chevêtres, lucarnes et raccords zinc.

## Livrable attendu

1. Enregistrer le fichier Revit corrigé.
2. Vérifier qu'il n'y a pas d'avertissement Revit majeur.
3. Mettre à jour les vues client et techniques concernées.
4. Rédiger ton retour dans :
   `projets/ringo-toiture/agents/dessinateur/message-dessinateur-pilote.md`

Titre du retour : `DESS-003-R`.

Ton rapport doit indiquer clairement :

- ce qui a été corrigé ;
- si les 7 trémies sont faites ;
- la pente du terrasson après contrôle ;
- le choix appliqué pour les chevrons ;
- le traitement de la deuxième descente EP ;
- confirmation que les poteaux 200 mm restent hors champ ;
- confirmation que les lucarnes pignon sont maintenues ;
- les réserves restantes, s'il y en a.
