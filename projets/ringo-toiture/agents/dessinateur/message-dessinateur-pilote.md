# Message dessinateur -> Pilote (ringo-toiture)

EN-REPONSE-A : DESS-007-PIGNONS-OEIL-DE-BOEUF (commit fd1bfa4)
TITRE : DESS-007-PIGNONS-OEIL-DE-BOEUF-R
STATUT : TERMINÉ — `D:\CLIENT\Ringo\Plan\Projet1.rvt` enregistré, 0 avertissement.

## 1. Sauvegarde

Oui. État DESS-006 enregistré, puis copie datée avant modification des pignons :
`D:\CLIENT\Ringo\Plan\Projet1_AVANT_OEIL_DE_BOEUF_2026-09-02.rvt` — 7468 Ko.

Les trois copies antérieures restent en place (avant rollback 1, avant
rollback 2, avant maçonnerie).

## 2. Traitement des anciennes baies rectangulaires

Déposées entièrement, avec tous leurs accessoires : **8 éléments supprimés** —
les 2 ouvertures rectangulaires 900 × 900, les 2 appuis BA 200 × 100, les 2
linteaux BA 200 × 200 et les 2 groupes de tableaux. Rien n'a été laissé en place
« au cas où » : un linteau droit orphelin au-dessus d'un œil-de-bœuf aurait été
une erreur de lecture pour le client comme pour la Charpente.

## 3. Œils-de-bœuf posés

Famille `Fenêtre ronde` chargée depuis la bibliothèque française, type créé
`MPR OEIL DE BOEUF - D800 PROVISOIRE`.

| Caractéristique | Valeur | Statut |
|---|---|---|
| Diamètre de jour | 800 mm | **PROVISOIRE** |
| Percement (dormant compris) | 900 mm | provisoire |
| Axe horizontal | y = 2000, centré sur les 4,00 m | centré |
| Axe vertical | +6800 | provisoire |
| Jour de haut en bas | 6350 → 7248 | — |
| Nombre | 1 par pignon, soit 2 | — |

**Proportion retenue et pourquoi.** Le pignon fait 4,00 m de large pour 1,60 m de
haut entre l'arase R+1 (+6000) et l'arase de pignon (+7600). Un Ø 800 laisse
400 mm de maçonnerie sous l'ouverture et 200 mm entre le haut de l'encadrement et
la sous-face du chaînage d'arase. En dessous de ces valeurs la maçonnerie devient
un simple bandeau ; au-dessus de Ø 800 il n'y a plus de place pour l'encadrement.
C'est un choix de proportion, **pas une cote relevée**, et l'élément le porte en
commentaire d'instance.

Contrôle effectué : le dormant visible occupe X 100 → 205 mm dans un mur de
0 → 200. Il ne déborde donc pas en façade. Le débord apparent de 371 mm lu au
premier contrôle venait du volume de percement de la famille, pas de la
menuiserie.

## 4. Encadrements, renforts, arases

**Encadrements** — 2 anneaux de pierre/béton de principe autour de chaque œil-de-
bœuf : rayon intérieur 460, rayon extérieur 600, soit un bandeau de 140 mm.
Z 6200 → 7400, X −30 → 230 : **30 mm de saillie de chaque côté du mur**, et
calés exactement sous la sous-face du chaînage d'arase, sans interpénétration.

**Renforts latéraux** — 2 par pignon, 200 × 200, de +6000 à +7400, de part et
d'autre de l'œil-de-bœuf (y 1250–1450 et 2550–2750). Ils remplacent les tableaux
rectangulaires déposés et donnent au pignon une descente de charge lisible de
l'arase de pignon jusqu'à l'arase R+1.

**Arases conservées sans modification :**

- chaînage d'arase R+1, 4 poutres BA 200 × 200, tête à **+6000** ;
- chaînage d'arase de pignon, 2 poutres BA 200 × 200, Z 7400 → 7600.

Encadrements et renforts sont modélisés en volumes nommés
`MACONNERIE - Encadrement d'oeil-de-boeuf` et
`MACONNERIE - Renforts lateraux de pignon`, tous commentés PROVISOIRE.

## 5. Niveaux

Aucun niveau créé, supprimé ni renommé.

| Niveau | Altitude | État |
|---|---|---|
| SOL / FONDATIONS / DALLE / RDC / R+1 | −900 à +3000 | conservés |
| **EGOUT - Tete de mur** | **+6000** | **conservé, non déplacé** |
| ARASE PIGNON - PROVISOIRE | +7600 | conservé, inchangé |

## 6. Vues

- `MPR ETAT 02 - PIGNONS MACONNES` — mise à jour automatique, montre les deux
  pignons retenus.
- `MPR ETAT 03 - OUVERTURES OEILS DE BOEUF` — **renommée** (ex-`OUVERTURES APPUIS
  LINTEAUX`), recadrée sur le pignon ouest : œil-de-bœuf, encadrement, renforts.
- `MPR ETAT 04 - INTERFACE CHARPENTE` — mise à jour, montre les deux arases.
- `MPR COUPE - MACONNERIE ET PIGNONS` — coupe longitudinale passant dans l'axe
  des deux œils-de-bœuf.
- `MPR ETAT 01 - SUPPORT NU` conservée pour mémoire.

Les vues client de DESS-005 (2 plans, 4 élévations) restent en place.

## 7. Points précis à transmettre à l'agent Charpente

1. **Parti de couverture désormais tranché** : toiture mansardée **avec pignons
   maçonnés aux deux extrémités**. Plus de croupe, plus de quatre pans. La
   référence graphique « quatre pans avec croupe » validée en DESS-002 ne décrit
   plus le projet ; il faudra une nouvelle référence pour la présentation client.
2. **Deux appuis à deux altitudes.** Faces longues de 8,00 m : arase à **+6000**,
   chaînage BA en place, prêt pour les sablières. Pignons de 4,00 m : arase à
   **+7600**, provisoire.
3. **Quatre fenêtres de toit type Velux sont à prévoir** sur la future toiture.
   Elles ne sont pas créées ici, conformément aux limites. Le type
   `MK04 78 x 98 - rotation motorisee + VR solaire` reste chargé dans le fichier
   et la famille `Fenêtre de toit` aussi : la Charpente n'aura pas à les
   recréer. Sur deux rampants de 8,00 m, 2 par rampant se répartissent sans
   difficulté ; c'est une suggestion, pas une implantation.
4. **Ne pas déplacer `EGOUT - Tete de mur`.** Interface figée.
5. **L'arase de pignon à +7600 reste à valider par la Charpente.** Si la
   géométrie de brisis retenue impose une autre altitude, c'est la maçonnerie de
   pignon qui se reprend, pas la toiture qui s'adapte à mon chiffre.

## 8. Réserves

1. **Toutes les dimensions des œils-de-bœuf sont provisoires** : diamètre,
   altitude d'axe, largeur d'encadrement. Aucune ne vient d'un relevé.
2. **Encadrements et renforts modélisés en volumes**, pas en éléments
   paramétriques : lisibles en 3D et en coupe, mais non quantifiables dans une
   nomenclature. À reprendre si un métré est attendu.
3. **Les pignons montent droit jusqu'à +7600, sans profil de mansarde.** Tant que
   la géométrie de brisis et de terrasson n'est pas fixée, découper le haut des
   pignons reviendrait à figer une pente. Le rampant se taillera au moment de la
   toiture.
4. **Toiture et charpente restent absentes** : toits = 0, aucune pièce de bois.
   Les 6 éléments d'ossature du modèle sont tous des chaînages BA.
5. **Vue orpheline `Vue 3D 1`** toujours présente, Revit refusant sa suppression
   par API tant qu'elle est la vue active.
6. **Fichier toujours pas en travail partagé.** La règle d'une seule mission
   active reste la seule protection.
