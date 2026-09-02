<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Architecte -> dessinateur-maconnerie (ringo-toiture)

MESSAGE-ID : ARCHI-001
EN-REPONSE-A : -
DATE : 2026-09-02

## Mission — coque maçonnée, modèle Revit initial

### Objet
Modéliser la coque maçonnée complète dans Revit : niveaux, murs porteurs,
dalles, pignons au profil mansarde.

### Données de la coupe (seule source cotée — fait foi)
Toutes les hauteurs intérieures sont mesurées depuis le plancher RDC (NGF +31.85).

| Repère | Hauteur relative | NGF |
|---|---|---|
| Terrain fini (TF) | -0.06 | +31.79 |
| Plancher RDC | 0.00 | +31.85 |
| Dalle intermédiaire | +2.91 | +34.76 |
| Haut des murs courants / sablière | +5.70 | +37.55 |
| Faîtage | +9.19 | +41.04 |

Emprise au sol : environ 4 m (pignon) × 8 m (long pan). À CONFIRMER par relevé.
Ces cotes sont des ESTIMATIONS tant que le relevé n'est pas fait.

### Profil des pignons
Les pignons sont EN MAÇONNERIE (décision D-003, en vigueur). Ils suivent le
profil mansarde au-dessus du niveau +5.70 :
- Brisis : 60 degrés, du haut du mur (+5.70) vers l'intérieur
- Terrasson : 10 degrés, du sommet du brisis jusqu'au faîtage (+9.19)

### Ce que tu dois livrer
1. Niveaux Revit calés sur les cotes ci-dessus.
2. Murs porteurs périphériques sur toute la hauteur (RDC à +5.70).
3. Dalles : plancher RDC, dalle intermédiaire (+2.91).
4. Pignons maçonnés montant au profil mansarde (brisis 60° + terrasson 10°).
5. Pas d'ouvertures pour l'instant — on les placera après.

### Contraintes
- SIMPLICITÉ. L'ouvrage est simple, la géométrie aussi.
- Un seul agent en écriture Revit : tu es seul dessus pour cette mission.
- Toute cote non issue de la coupe = ESTIMATION, à signaler.
- Protocole Revit : travaux-architecte/standards-communs/.

### ÉTAT DU MODÈLE — à vérifier AVANT de produire
Fichier : `D:\CLIENT\Ringo\Toiture\Plan\Revit\RINGO-TOITURE.rvt`

Des éléments ont été créés par erreur dans le modèle avant que la mission ne te
soit confiée. Tu les CONTRÔLES et tu les reprends ou tu les supprimes, selon ton
jugement de dessinateur :
- 3 niveaux : « Dalle Intermédiaire » (2910), « Haut Murs » (5700), « Faîtage » (9190)
- 4 murs périphériques, emprise 8000 × 4000, ép. 200, hauteur 5700, base niveau 0
- 2 dalles génériques 150 mm — MAL ASSIGNÉES : elles sont parties sur le niveau
  « Fondation B.O. » (-4600) au lieu du RDC et de la dalle intermédiaire. À corriger.

Niveaux préexistants à ne pas casser sans raison : Fondation B.O. (-4600),
Base T.O. (-4300), Dalle T.O. (-4000), Mur de fondation T.O (-300), Niveau 1 (0),
Niveau 2 (4000). « Niveau 2 » à 4000 ne correspond à rien dans la coupe : signale
ce que tu en fais.

L'épaisseur de mur 200 mm et le type de dalle sont des HYPOTHÈSES de ma part,
pas des données de la coupe. Tu retiens ce qui est juste pour l'ouvrage et tu
signales ton choix.

### ARBORESCENCE DES VUES — tenue courte, volontairement
Rien n'est défini là-dessus dans travaux-architecte/standards-communs/ : la règle
ci-dessous est un arbitrage Architecte pour ce chantier, pas une règle de socle.

Un NIVEAU n'est pas une VUE. Ne génère un plan que pour un niveau habitable.
- Niveaux habitables (plan de sol, PAS de plan de plafond) : RDC, Dalle
  Intermédiaire, Comble.
- Repères d'altimétrie, AUCUNE vue : « Haut Murs » (+5.70), « Faîtage » (+9.19),
  et les niveaux de fondation préexistants.

Jeu de vues essentiel — 9, pas davantage :
- 3 plans de niveau : RDC, R+1, Comble
- 1 coupe TRANSVERSALE : celle qui fait foi, elle porte le profil mansarde
- 1 coupe LONGITUDINALE : elle donne le rythme des lucarnes sur le brisis, et
  servira au métré de zinguerie
- 4 élévations : 2 long pans, 2 pignons
- 1 vue 3D de contrôle

En dessous, on ne peut ni dessiner ni sortir le CCTP. Au-dessus, on encombre.
Si l'ouvrage exige une vue de plus, tu la crées et tu me dis laquelle et pourquoi.

---
## COMPLÉMENT ARCHITECTE — après ton contrôle du modèle

Ton diagnostic est retenu : murs-rideaux à reprendre, dalles mal assignées,
3 niveaux absents. Le contrôle est bon, il a rattrapé une erreur de type que je
n'avais pas vue. Deux corrections à ton plan d'exécution avant que tu produises.

### 1. Autorisation d'écriture Revit — ce n'est pas moi qui la donne
Je ne peux pas débloquer un classificateur de permissions : c'est
l'environnement d'exécution, pas une décision d'ouvrage. Le Gérant est saisi.
Tu ne relances pas la même opération en boucle : tu attends l'autorisation.

Si les niveaux que tu ne trouves plus avaient bien été créés puis ont disparu,
c'est que le modèle a été rouvert sans enregistrement. SAUVEGARDE le .rvt à la
fin de ta mission, sinon ton travail n'existe pas.

### 2. PAS de types génériques — le gabarit fait foi
« Générique 200 mm » et « Générique 150 mm » ne sont pas des ouvrages : ils ne
descendent dans aucune nomenclature de métré. Le gabarit Mistral Pro Reno porte
les compositions réelles, et ce sont elles qui alimentent
`MPR 01 Maçonnerie – Murs` et `MPR 03 Sols et dalles`. Tu les utilises.

- Murs extérieurs porteurs : **Brique 20 + isolant 100 + BA13 (328)**
  Motif : les photos de référence montrent une maçonnerie brique (bio'bric).
  Ép. 328 mm, pas 200 — mon 200 était une hypothèse, elle tombe.
  Cale l'axe des murs de façon à conserver l'emprise, et dis-moi ce que tu as
  retenu : nu extérieur ou axe.
- Dalle intermédiaire (+2.91) : **Poutrelles-hourdis 16+4 + chape (250)**
- Plancher RDC : EN ATTENTE — voir point 3. Ne le pose pas encore.

### 3. Plancher bas — question d'ouvrage remontée au Gérant
La coupe donne le RDC à +0.00 pour un terrain fini à -0.06 : cela désigne un
dallage sur terre-plein. Mais le modèle porte des niveaux de fondation profonds
(Fondation B.O. -4600, Base T.O. -4300, Dalle T.O. -4000, Mur de fondation
T.O -300) qui, eux, désignent tout autre chose.

Les deux sont incompatibles. C'est un choix d'ouvrage : il est remonté au
Gérant, je ne le tranche pas. Tu montes tout le reste sans attendre.

### 4. Niveau 2 (4000)
Ne correspond à rien dans la coupe. Tu ne le supprimes pas — il peut porter des
éléments préexistants. Tu me dis seulement ce qui s'y trouve, s'il y a quelque
chose.

### Livraison
Rapport dans message-dessinateur-maconnerie-architecte.md, commit + push.
Signale : ce que tu as gardé, ce que tu as repris, ce que tu as estimé.
