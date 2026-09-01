<!-- BANDEAU ANTI-CACHE : relire ce fichier au hash annoncé avant d'agir. -->
# Message Pilote -> toiture-charpente (ringo-toiture)

MESSAGE-ID : TOIT-005-CONTROLE-PROFIL-MANSARDE
EN-REPONSE-A : DESS-008-PIGNONS-INCLINES-R + observations Gérant

## Contenu
## Mission active — contrôler le profil de la mansarde avant correction Revit

**Ne pas entrer dans Revit et ne rien modifier dans `Projet1.rvt`.** Cette
mission est une étude métier courte destinée à figer l'interface géométrique
avant que le Dessinateur reprenne la maçonnerie.

## Constat à contrôler

DESS-008 a créé deux profils de pignon avec les valeurs suivantes :

- largeur hors tout : 4,00 m ;
- niveau de départ : `EGOUT - Tete de mur` à +6000 ;
- brisis : 70°, retrait horizontal de 800 mm de chaque côté ;
- ligne de bris : +8198 ;
- terrasson : 18° ;
- faîtage : +8555 ;
- un oeil-de-boeuf Ø800 provisoire par pignon, axe à +6800.

Le Gérant constate sur la vue Revit que **l'inclinaison ne paraît pas normale**.
Le profil apparaît trop raide et trop resserré au sommet. Ces valeurs avaient
été annoncées comme provisoires : elles ne doivent pas devenir une décision
constructive par simple reprise d'un ancien cadrage.

Le Gérant a aussi transmis une coupe de référence présentant un principe de
mansarde avec brisis autour de 60° et partie haute autour de 10°. Cette coupe
sert à comprendre la forme recherchée ; ses cotes et niveaux NGF ne doivent pas
être copiés aveuglément.

## Données de projet à respecter

- volume support : 4,00 x 8,00 m ;
- RDC et R+1 : 3,00 m chacun ;
- une dalle haute continue couvre entièrement le R+1 sous la toiture ;
- face supérieure/interface de départ : +6000 ;
- deux pignons maçonnés conservés, sans croupe ;
- un oeil-de-boeuf par pignon ;
- future couverture : partie haute en zinc, brisis/pourtour en ardoise ;
- quatre fenêtres de toit type Velux à intégrer ultérieurement ;
- aucun débord de toit demandé.

## Travail demandé

1. Contrôler géométriquement le profil 70° / 18° / retrait 800 mm produit par
   DESS-008 et expliquer précisément pourquoi il est ou non cohérent.
2. Proposer un **profil de principe corrigé** adapté à une largeur de 4,00 m :
   pente du brisis, retrait horizontal jusqu'à la ligne de bris, pente de la
   partie haute, altitude de ligne de bris et altitude de faîtage.
3. Comparer au minimum :
   - profil DESS-008 : 70° / 18° ;
   - profil de la coupe de référence : environ 60° / 10°.
4. Vérifier que la solution laisse une maçonnerie de pignon réaliste autour de
   l'oeil-de-boeuf et une interface exploitable pour sablières, pannes et
   raccords de couverture.
5. Dire si l'axe actuel de l'oeil-de-boeuf à +6800 doit être conservé ou remonté.
6. Distinguer clairement : valeurs recommandées pour la maquette de principe,
   valeurs à confirmer au relevé et éventuels arbitrages à demander au Gérant.

## Livrable attendu

Rédiger le retour dans :
`projets/ringo-toiture/agents/toiture-charpente/message-toiture-charpente-pilote.md`

Titre : `TOIT-005-CONTROLE-PROFIL-MANSARDE-R`.

Le retour doit fournir un tableau de points du profil, suffisamment précis pour
que le Dessinateur puisse corriger les deux pignons dans une mission suivante.
Ne pas ouvrir Revit, ne pas dessiner la toiture et ne pas modifier la maquette.
