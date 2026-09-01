# Message toiture-charpente -> Pilote (ringo-toiture)

EN-REPONSE-A : TOIT-002
STATUT : TERMINÉ — proxy-push Pilote

## Contenu
## TOIT-002-R — contrôle charpente/couverture de la maquette Revit

Rapport reçu par le Pilote depuis l'agent Toiture-charpente, dont le push direct
était bloqué dans sa session. Le commit local annoncé par l'agent était
`661e410`; le présent fichier constitue le proxy-push du rapport.

## Verdict

Maquette acceptable avec corrections.

## Correction bloquante

1. Reprendre les trémies/percements de toiture : 7 percements manuels sont à
   réaliser dans Revit pour les 6 lucarnes et la fenêtre de toit.

Sans ces percements, le rendu extérieur peut rester lisible, mais la maquette
n'est pas techniquement complète en coupe ni depuis l'intérieur.

## Corrections recommandées

1. Vérifier la pente du terrasson : écart signalé entre l'objectif de 18° et une
   lecture possible autour de 38°.
2. Revoir la section de chevrons : préférer une représentation 63 x 150 au lieu
   de 63 x 75 si l'objectif est une lecture technique plus crédible.
3. Prévoir une deuxième descente EP : une seule descente Ø 80 est faible pour un
   développé de chéneau sur 8,00 m.
4. Supprimer la vue orpheline `Vue 3D 1` si elle n'est pas utile au dossier.

## Arbitrages à demander au Gérant

1. Poteaux 200 mm : les représenter uniquement si le Gérant veut les voir comme
   repère de structure standard. Techniquement, avec murs porteurs 200 mm sur un
   petit volume 4 x 8 m, ils peuvent faire doublon dans une maquette de toiture.
2. Débord de toit : confirmer s'il faut un débord. En cas de débord, corriger la
   géométrie pour ne pas remonter artificiellement le faîtage.
3. Lucarne sur pignon de 4,00 m : confirmer le maintien de la lucarne pignon si
   la lecture graphique ou réglementaire devient trop contrainte.

## Rives

Le point du Dessinateur est confirmé : sur une toiture quatre pans avec croupe,
il n'y a pas de pignon découvert au sens classique. Les rives ne sont donc pas
à représenter comme sur une toiture à deux pans avec pignons.

## Consignes à transmettre au Dessinateur

1. Reprendre manuellement les 7 percements de toiture dans Revit.
2. Vérifier la pente réelle du terrasson dans la maquette et corriger si elle
   s'écarte de la pente faible attendue.
3. Ajuster la représentation des chevrons vers une section plus crédible si la
   vue technique doit être montrée au client ou à un intervenant.
4. Ajouter ou proposer une deuxième descente EP.
5. Supprimer la vue orpheline si possible.
6. Ne pas ajouter de rives de pignon sur cette géométrie quatre pans avec
   croupe.
7. Ne pas poser les poteaux 200 mm sans arbitrage du Gérant.
