# Message dessinateur -> Pilote (ringo-toiture)

EN-REPONSE-A : DESS-002
STATUT : TERMINÉ avec réserves — maquette de présentation livrée dans
`D:\CLIENT\Ringo\Plan\Projet1.rvt`, fichier enregistré, 0 avertissement Revit.

## 1. Ce qui a été créé

**Niveaux (8)** — les 6 niveaux du gabarit ont été renommés et réétagés, 2 créés.

| Niveau | Altitude |
|---|---|
| SOL - Fond de fouille | −900 |
| FONDATIONS - Dessus semelle | −600 |
| DALLE - Sous-face | −200 |
| RDC | 0 |
| R+1 | +3000 |
| EGOUT - Tete de mur | +6000 |
| LIGNE DE BRIS | +9055 |
| FAITAGE | +9445 |

**Volume support** — emprise hors tout 8,00 × 4,00 m. Murs `Générique - 200 mm`,
axes tracés à 100 mm du nu extérieur (justification centrée). 4 murs RDC
(0 → 3000), 4 murs R+1 (3000 → 6000), 4 murs de fondation (−600 → −200).
Semelle débordante 300 mm, dallage terre-plein, plancher R+1 poutrelles-hourdis.

**Toiture mansardée à quatre pans avec croupe** — deux `FootPrintRoof`
superposés, type créé pour l'occasion :
`MPR TOIT - Ardoise 20x30 + liteaunage + ecran HPV`.

- Brisis : pente forte 70°, croupe sur les quatre faces, tronqué à la ligne de
  bris. Retrait 800 mm par rapport au nu extérieur.
- Terrasson : pente faible 18°, croupe, faîtage à +9445.
- Les deux peaux extérieures se rejoignent exactement à +9055. Il a fallu
  décaler chaque toit de son épaisseur verticale (857 mm à 70°, 308 mm à 18°) :
  l'esquisse d'un toit Revit est en SOUS-FACE, l'épaisseur monte au-dessus du
  plan de troncature.

**6 lucarnes rampantes** — 2 par face longue de 8,00 m, 1 par pignon de 4,00 m.
Chacune : 2 joues + 1 fronton (140 mm), baie 1200 × 800 percée dans le fronton,
toiture rampante propre (450/700, soit 32,7°). Encombrement hors tout 1560 mm.

**1 fenêtre de toit** — famille `Fenêtre de toit` chargée depuis la
bibliothèque française, type créé
`MK04 78 x 98 - rotation motorisee + VR solaire`, dimensions 780 × 980, posée
sur le rampant sud du terrasson.

**1 descente EP** — volume rond Ø 80 mm, hauteur 6300, angle sud-est, marquée
POSITION PROVISOIRE.

**Vues client (9)** — `MPR CLIENT - PLAN RDC`, `PLAN R+1`,
`COUPE TRANSVERSALE SUR MANSARDE`, `ELEVATION NORD / SUD / EST / OUEST`,
`VUE GENERALE TOITURE` (3D ombrée), `CADRAGE FENETRE DE TOIT` (3D avec boîte de
coupe, pour illustrer la fenêtre de toit que la planche d'intention ne montre
pas).

## 2. Réponse à la question posée sur les 6 lucarnes

**Elles passent, y compris sur les pignons de 4,00 m.** Je l'avais mis en doute
avant de modéliser ; la mesure le dément. À la ligne de bris, le pignon offre
2400 mm (4000 − 2 × 800 de retrait) pour un encombrement de lucarne de 1560 mm.
Sur les faces longues, 6400 mm disponibles pour 2 × 1560 mm. Aucune impossibilité
graphique. Les 6 lucarnes sont en place, 0 avertissement.

## 3. Hypothèses de visualisation utilisées

Tous les éléments porteurs et de toiture portent en commentaire d'instance
`STANDARD DE VISUALISATION` ou `HYPOTHESE DE VISUALISATION`, avec renvoi au
relevé. Aucune de ces valeurs n'est une donnée chantier :

- retrait du brisis 800 mm — choisi pour obtenir une silhouette mansardée
  correcte, non imposé par le Gérant ;
- pentes 70° et 18° — ordres de grandeur de la fiche technique ;
- géométrie de lucarne (fronton à 150 mm du nu, joues 140 mm, baie à 300 mm du
  plancher de lucarne) — proportions plausibles, non relevées ;
- fondations, semelle, dallage, plancher — épaisseurs de catalogue ;
- position de la descente EP — proposition.

Rappel de gouvernance : **pentes non chiffrées dans la présentation client**.
Dire « pente forte » pour le brisis et « pente faible » pour le terrasson.

## 4. Réserves

1. **Le brisis n'est pas percé à l'aplomb des lucarnes.** `NewOpening` sur le
   toit a été refusé dans les deux modes (perpendiculaire et vertical), les 12
   tentatives ont été annulées au commit. Conséquence : en 3D et en élévation le
   rendu est juste — les lucarnes ressortent bien — mais en coupe et depuis
   l'intérieur, la trémie manque. À reprendre à la main dans Revit
   (Toit > Ouverture > Verticale) ou à traiter dans une mission dédiée.
2. **Poteaux 200 mm non modélisés.** Le cadrage les demande, mais aucune famille
   de poteau béton 200 × 200 n'est chargée (seuls des HE-A acier). Sur un volume
   de 4 × 8 m en murs porteurs de 200 mm, ils font doublon. J'attends l'arbitrage
   du Pilote plutôt que de poser des profilés acier qui induiraient le client en
   erreur.
3. **Aucun débord de toit.** Le cadrage n'en demande pas ; la couverture s'arrête
   au nu extérieur. Si un débord est voulu, il faudra abaisser le toit de
   tan(pente) × débord pour ne pas remonter le faîtage.
4. **Vue orpheline `Vue 3D 1`** laissée dans le fichier : elle est la vue active,
   Revit refuse de la supprimer par API. À supprimer à la main.
5. **Zinguerie non modélisée** (noues, solins, bavettes, ligne de bris) : elle
   relève du CCTP toiture, pas de la maquette de présentation.

## 5. Points restant à confirmer au relevé

Emprise réelle, hauteurs sous plafond, épaisseur réelle des murs, pentes
exactes du brisis et du terrasson, implantation définitive des 6 lucarnes et de
la fenêtre de toit, position des descentes EP. **Une seule descente EP a été
posée ; sur 8,00 m de chéneau, deux sont probables.**

## 6. Deux points à remonter hors périmètre

1. **La bibliothèque française est désormais complète** : 3730 familles dans
   `Libraries\French` (contre 29 auparavant). Le point resté ouvert au palier 0
   de `stack-outils-revit.md` est donc soldé. Le fichier appartient à
   `travaux-architecte` : je ne l'édite pas, je signale.
2. **Deux pièges du plugin Revit rencontrés, non documentés :**
   - `Wall.Create(..., height, offset, ...)` prend un décalage **relatif au
     niveau**, pas une altitude absolue. Six lucarnes ont été construites à
     +12900 avant que je le voie.
   - En `transactionMode: "auto"`, une transaction peut être **annulée au commit
     sans aucune remontée d'erreur** : le code retourne un journal de succès
     alors que rien n'a été écrit. Le seul contrôle fiable est de recompter les
     éléments après coup, ou d'ouvrir soi-même une `Transaction` en mode `none`
     et de lire le `TransactionStatus` retourné par `Commit()`.

   Les deux méritent d'être ajoutés à `setup-revitmcp.md`. À la Direction d'en
   décider, via le Pilote.
