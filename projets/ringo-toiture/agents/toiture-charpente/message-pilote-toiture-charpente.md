<!-- BANDEAU ANTI-CACHE : relire ce fichier au hash annoncé avant d'agir. -->
# Message Pilote -> toiture-charpente (ringo-toiture)

MESSAGE-ID : TOIT-002
EN-REPONSE-A : DESS-002-R

## Contenu
## Mission active — contrôle charpente/couverture de la maquette Revit

Le Dessinateur a livré DESS-002 avec réserves au commit `c1dc757`.

Tu es l'agent spécialisé charpente/couverture. Ta mission est de contrôler le
résultat décrit dans le rapport du Dessinateur et de donner au Pilote une liste
claire des corrections à demander ensuite au Dessinateur.

La règle projet reste : une seule mission active à la fois. Tu es le seul agent
actif sur cette séquence. Ne modifie pas Revit et ne modifie pas les boîtes des
autres agents.

## Sources à lire

1. Le message Pilote/Dessinateur clôturé :
   `projets/ringo-toiture/agents/dessinateur/message-pilote-dessinateur.md`
2. Le rapport Dessinateur :
   `projets/ringo-toiture/agents/dessinateur/message-dessinateur-pilote.md`
3. La fiche technique chantier transmise par le Gérant dans l'historique projet
   si disponible dans ta mémoire ou ta boîte.

## Données principales à contrôler

- Projet : Ringo Toiture — Bondy.
- Fichier Revit cible : `D:\CLIENT\Ringo\Plan\Projet1.rvt`.
- Maquette livrée : 8 niveaux, 30 murs, 8 toits, 3 sols, 121 pièces bois,
  6 volumes zinc/EP, 1 fenêtre de toit, 12 vues.
- Volume support : 8,00 x 4,00 m, RDC 0 -> 3000, R+1 3000 -> 6000,
  murs 200 mm.
- Toiture mansardée quatre pans avec croupe.
- Brisis forte pente, terrasson faible pente.
- Couverture ardoise 20 x 30 cm gris anthracite.
- 6 lucarnes rampantes : 2 par face longue, 1 par pignon.
- 1 fenêtre de toit MK04 78 x 98 sur terrasson sud.
- Zinguerie de principe : ligne de bris, faîtage, arêtiers, bavette d'égout,
  noues/solins/bavettes de lucarnes.

## Points techniques à vérifier

1. Cohérence générale de la toiture mansardée à quatre pans avec croupe :
   brisis, terrasson, faîtage, arêtiers, ligne de bris.
2. Cohérence de la charpente de principe modélisée :
   - sablières 100 x 100 ;
   - pannes de bris 100 x 225 ;
   - panne faîtière 100 x 225 ;
   - arêtiers 63 x 175 ;
   - chevrons 63 x 75 à entraxe de lecture 600 ;
   - empanons de croupe ;
   - chevêtres lucarnes et fenêtre de toit ;
   - linteaux et petits chevrons de lucarnes.
3. Réserve principale du Dessinateur :
   les 7 trémies/percements dans le brisis ou la couverture ne sont pas faits
   automatiquement. Vérifier s'il faut impérativement les reprendre à la main
   dans Revit avant présentation technique.
4. Cohérence des 6 lucarnes sur un volume 4 x 8 m, notamment les pignons de
   4,00 m avec une lucarne de 1,56 m hors tout.
5. Cohérence de la fenêtre de toit sur terrasson sud avec son chevêtre.
6. Pertinence des raccords zinc :
   ligne de bris continue, faîtage, arêtiers, bavette d'égout, noues, solins,
   bavettes de lucarnes.
7. Question des rives :
   le Dessinateur indique qu'une toiture quatre pans avec croupe n'a pas de
   pignon découvert. Confirmer ou corriger.
8. Évacuation EP :
   une seule descente Ø 80 est posée ; le Dessinateur signale que deux descentes
   sont probables sur 8,00 m de chéneau. Donner ton avis technique.
9. Poteaux 200 mm :
   le Gérant avait donné "poteaux/colonnes 200 mm" comme standard. Le
   Dessinateur ne les a pas modélisés car, avec murs porteurs 200 mm, ils
   feraient doublon. Dire clairement s'il faut les représenter pour la maquette
   ou les laisser hors champ.
10. Distinguer ce qui est acceptable pour une maquette technique de présentation
    et ce qui resterait insuffisant pour un dossier d'exécution.

## Livrable attendu

Écrire ton retour dans :
`projets/ringo-toiture/agents/toiture-charpente/message-toiture-charpente-pilote.md`

Titre : `TOIT-002-R`.

Format attendu :

1. Verdict court : maquette acceptable / acceptable avec corrections /
   insuffisante.
2. Corrections obligatoires avant retour au Dessinateur.
3. Corrections recommandées mais non bloquantes.
4. Arbitrages à demander au Gérant, s'il y en a.
5. Consignes précises à transmettre ensuite au Dessinateur.
