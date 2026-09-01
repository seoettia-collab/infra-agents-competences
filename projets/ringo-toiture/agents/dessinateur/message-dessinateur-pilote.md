# Message dessinateur -> Pilote (ringo-toiture)

EN-REPONSE-A : DESS-006-MACONNERIE-OUVERTURES (commit a437125)
TITRE : DESS-006-MACONNERIE-OUVERTURES-R
STATUT : TERMINÉ avec une réserve de conception à arbitrer —
`D:\CLIENT\Ringo\Plan\Projet1.rvt` enregistré, 0 avertissement Revit.

## 1. Sauvegarde

Oui. État enregistré, puis copie datée avant toute modification :
`D:\CLIENT\Ringo\Plan\Projet1_AVANT_MACONNERIE_2026-09-02.rvt` — 7360 Ko.

## 2. Lecture de l'image de référence

L'image montre une surélévation maçonnée en blocs, avec des trumeaux entre
baies, des appuis et des linteaux en pierre, un bandeau mouluré en pied, et une
ossature bois posée au-dessus. J'en ai retenu le **principe constructif** —
maçonnerie montée jusqu'à une arase franche, baies traitées avec appui, linteau
et tableaux, arase prête à recevoir la charpente — et non son architecture.

Deux écarts assumés avec l'image, parce qu'elle contredirait le volume Ringo :

- l'image montre les baies sur la **façade longue** ; la mission demande les
  ouvertures **dans les pignons**, faces de 4,00 m. J'ai suivi la mission ;
- l'image montre des **linteaux cintrés** en pierre moulée. J'ai posé des
  linteaux droits : un cintre est une décision architecturale et un surcoût, pas
  un principe constructif. À demander si le Gérant le veut.

## 3. Ce qui a été créé

**Chaînage d'arase R+1** — 4 poutres BA 200 × 200, sur les quatre murs,
**tête calée exactement à +6000**, vérifiée : Z 5800 → 6000. C'est le support de
reprise des futures sablières. Le niveau `EGOUT - Tete de mur` n'a pas bougé.

**Pignons maçonnés** — 2 murs sur les faces de 4,00 m (axes x = 100 et x = 7900),
type créé `MPR MACONNERIE - Bloc 200`, de **+6000 à +7600**, hauteur 1600 mm.

**Ouvertures** — 1 baie par pignon, **900 × 900**, axée sur la face (y = 2000),
appui à +6250, sous-face de linteau à +7150.

**Appuis** — 2 appuis BA 200 × 100, Z 6150 → 6250, longueur 1100 mm
(900 de baie + 100 de débord de chaque côté).

**Linteaux** — 2 linteaux BA 200 × 200, Z 7150 → 7350, longueur 1300 mm
(900 de baie + 200 d'appui de chaque côté).

**Tableaux** — 4 jambages / raidisseurs de baie, 200 × 200, de +6000 à +7150,
de part et d'autre de chaque baie. Modélisés en volumes nommés
`MACONNERIE - Tableaux / raidisseurs de baie`, faute de famille de poteau béton
200 × 200 chargée. Lisibles en 3D et en coupe.

**Chaînage d'arase de pignon** — 2 poutres BA 200 × 200, Z 7400 → 7600, en tête
de chaque pignon. C'est l'arase sur laquelle la charpente viendra prendre appui.

Tous les éléments portent en commentaire d'instance
`MACONNERIE DE PRINCIPE - non dimensionnee execution - a confirmer au releve`,
et les chaînages d'arase de pignon portent en plus la mention *hauteur
provisoire, dépend de la future toiture*.

## 4. Niveaux

| Niveau | Altitude | État |
|---|---|---|
| SOL - Fond de fouille | −900 | conservé |
| FONDATIONS - Dessus semelle | −600 | conservé |
| DALLE - Sous-face | −200 | conservé |
| RDC | 0 | conservé |
| R+1 | +3000 | conservé |
| **EGOUT - Tete de mur** | **+6000** | **conservé, non déplacé** |
| ARASE PIGNON - PROVISOIRE | +7600 | **créé** |

Aucun niveau supprimé ni renommé. Le nouveau niveau porte « PROVISOIRE » dans
son nom même : son altitude est un repère de travail, pas une cote.

## 5. Vues créées

- `MPR ETAT 01 - SUPPORT NU` — 3D bornée sous +6000, montre le support seul.
- `MPR ETAT 02 - PIGNONS MACONNES` — 3D d'ensemble, ossature et volumes masqués :
  la maçonnerie seule.
- `MPR ETAT 03 - OUVERTURES APPUIS LINTEAUX` — 3D recadrée sur le pignon ouest,
  tout visible : baie, appui, linteau, tableaux.
- `MPR ETAT 04 - INTERFACE CHARPENTE` — 3D bornée entre +5600 et +7900 : les deux
  arases et les chaînages, c'est-à-dire ce sur quoi la charpente viendra poser.
- `MPR COUPE - MACONNERIE ET PIGNONS` — coupe longitudinale au 1/50 passant dans
  l'axe des deux baies.

Les vues client de DESS-005 (`MPR CLIENT - PLAN RDC`, `PLAN R+1`, les 4
élévations) sont conservées et restent valides.

## 6. Points précis à transmettre à l'agent Charpente

1. **Deux appuis distincts, à deux altitudes.** Sur les faces longues de 8,00 m :
   arase à **+6000**, chaînage BA 200 × 200 déjà en place, prêt pour les
   sablières. Sur les pignons de 4,00 m : arase à **+7600**, provisoire.
2. **Emprise et axes.** Hors tout 8000 × 4000 aux nus extérieurs ; axes de murs à
   100 mm du nu (murs de 200 mm, justification centrée). Les pignons sont montés
   sur les mêmes axes que les murs du R+1, sans décalage.
3. **Ne pas déplacer `EGOUT - Tete de mur`.** Interface figée entre Structure et
   Charpente.
4. **La hauteur de pignon +7600 est à valider par la Charpente, pas par moi.**
   Elle a été fixée pour loger une baie de 900 × 900 avec appui, linteau et
   chaînage d'arase dans une logique constructive tenable. Si la géométrie de
   toiture retenue impose une autre arase, c'est la maçonnerie qui doit être
   reprise, pas la toiture qui doit s'adapter à mon chiffre.

## 7. Réserve de conception — à arbitrer avant la reprise Charpente

**Des pignons maçonnés et une toiture à quatre pans avec croupe sont
incompatibles.** Une croupe couvre les faces de 4,00 m par un pan de toiture
incliné ; il n'y a alors pas de pignon découvert, ce que le contrôle
Toiture-charpente avait d'ailleurs confirmé en refusant les rives de pignon.
En montant deux pignons maçonnés jusqu'à +7600, on décrit une toiture **à deux
pans avec pignons**, pas la mansarde à quatre pans du cadrage initial.

J'ai exécuté l'arbitrage du Gérant tel qu'écrit, sans le contourner. Mais l'un
des deux doit céder :

- soit la toiture reste **à quatre pans avec croupe**, et les pignons doivent
  redescendre à +6000 — ils deviennent alors de simples arases, et le travail de
  cette mission se réduit au chaînage périmétrique ;
- soit la toiture passe **à deux pans avec pignons maçonnés**, et il faut acter
  que la référence « mansardée à la Mansart à quatre pans avec croupe » validée
  pour la présentation client ne décrit plus le projet.

Ce n'est pas un détail de représentation : c'est le parti de couverture. Tant
qu'il n'est pas tranché, l'altitude +7600 et les deux baies de pignon restent
provisoires, et l'agent Charpente travaillerait sur une base qui peut bouger.

## 8. Autres réserves

1. **Tableaux modélisés en volumes** et non en poteaux, faute de famille de
   poteau béton 200 × 200 chargée. Lisibles, mais non quantifiables dans une
   nomenclature de poteaux. À reprendre si un métré est attendu.
2. **Linteaux droits** et non cintrés, contrairement à l'image de référence.
3. **Une seule baie par pignon.** Sur 4,00 m de large et 1,60 m de hauteur
   d'allège à arase, une seconde baie tiendrait mal avec ses tableaux. Si le
   Gérant en veut deux, il faut soit réduire les baies, soit remonter l'arase.
4. **Toiture et charpente restent absentes** : toits = 0, ossature bois = 0.
   Les 10 pièces d'ossature du modèle sont toutes des éléments BA de maçonnerie
   (chaînages, appuis, linteaux), aucune pièce de charpente.
5. **Vue orpheline `Vue 3D 1`** toujours présente, Revit refusant sa suppression
   par API tant qu'elle est la vue active.
6. **Fichier toujours pas en travail partagé.** La règle d'une seule mission
   active reste la seule protection.
