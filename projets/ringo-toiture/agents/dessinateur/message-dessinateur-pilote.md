# Message dessinateur -> Pilote (ringo-toiture)

EN-REPONSE-A : DESS-002 (version « préciser charpente », commit 68e3088)
STATUT : TERMINÉ avec réserves — `D:\CLIENT\Ringo\Plan\Projet1.rvt` enregistré,
0 avertissement Revit.

> Note de traçabilité : DESS-002 a été enrichi (charpente) pendant l'exécution.
> Mon rapport précédent (commit cff594e) répondait à la version antérieure du
> même MESSAGE-ID. Le présent rapport le remplace et couvre les deux volets.

## 1. État du modèle

| Poste | Quantité |
|---|---|
| Niveaux | 8 |
| Murs | 30 (12 structure + 18 de lucarnes) |
| Toits | 8 (brisis, terrasson, 6 lucarnes) |
| Sols | 3 (semelle, dallage, plancher R+1) |
| Pièces de bois | 121 |
| Volumes zinc + EP | 6 |
| Fenêtre de toit | 1 |
| Vues préparées | 12 |

## 2. Volume et toiture (rappel, inchangé)

Emprise hors tout 8,00 × 4,00 m, murs 200 mm, RDC 0 → 3000, R+1 3000 → 6000.
Toiture mansardée à quatre pans avec croupe : brisis pente forte (70° en travail
interne) tronqué à la ligne de bris, retrait 800 mm ; terrasson pente faible
(18°) ; peaux extérieures raccordées à +9055, faîtage à +9445. Type de toit créé :
`MPR TOIT - Ardoise 20x30 + liteaunage + ecran HPV`.

6 lucarnes rampantes (2 par face longue, 1 par pignon), baie 1200 × 800,
encombrement 1560 mm. 1 fenêtre de toit `MK04 78 x 98`, 780 × 980, sur le
rampant sud du terrasson. 1 descente EP Ø 80, position provisoire.

## 3. Charpente de principe — ce qui a été modélisé

Famille `M_Timber` chargée, 6 types créés (`MPR BOIS - ...`). Toutes les pièces
portent en commentaire d'instance : *bois traité classe 2, sections et entraxes
indicatifs, non dimensionnés*.

| Ouvrage | Section | Nb | Position |
|---|---|---|---|
| Sablières en pied de brisis | 100 × 100 | 4 | +6050, sur tête de mur |
| Pannes de bris (rectangle 6400 × 2400) | 100 × 225 | 4 | +8310, retrait 800 |
| Panne faîtière | 100 × 225 | 1 | +9249, axe x 2000 → 6000 |
| Arêtiers de croupe | 63 × 175 | 8 | 4 sur brisis, 4 sur terrasson |
| Chevrons de brisis | 63 × 75 | 30 | entraxe 600 |
| Chevrons de terrasson + empanons de croupe | 63 × 75 | 22 | entraxe 600 |
| Chevêtres de lucarnes | 63 × 175 | 24 | 4 par lucarne |
| Linteaux de lucarnes | 63 × 100 | 6 | au-dessus de chaque baie |
| Petits chevrons des pans rampants | 63 × 75 | 18 | 3 par lucarne |
| Chevêtre de fenêtre de toit | 63 × 175 | 4 | sur terrasson |

**Choix de représentation assumés :**

- Les chevrons sont posés à **entraxe 600** et non 400-450. C'est un entraxe de
  lecture : à 450 la vue 3D devient illisible et le fichier s'alourdit sans rien
  apprendre au client. L'entraxe réel relève du dimensionnement, hors mission.
- Sur les faces de brisis, les chevrons ne sont posés qu'entre les arêtiers ; les
  triangles de croupe sont tenus par les arêtiers seuls. Sur le terrasson, les
  croupes reçoivent des **empanons** de longueur décroissante, réellement
  calculés.
- **Écran HPV, contre-lattage et liteaunage ne sont pas modélisés pièce à pièce**
  : ils sont compris dans l'épaisseur du type de toit (293 mm). Les modéliser
  individuellement n'apporterait rien à la lecture et multiplierait les éléments
  par cent.
- **Aucun assemblage n'est représenté** (embrèvements, ferrures, sabots).

## 4. Zinguerie de principe

5 volumes, 34 bandes, tous commentés *zinguerie de principe, développés et
fixations à confirmer* :

- **ligne de bris continue** sur les quatre faces (bande 250 mm) — c'est la
  rupture géométrique du mansard, matérialisée comme demandé ;
- **faîtage** (200 mm) ;
- **arêtiers** des quatre pans, brisis et terrasson (150 mm) ;
- **bavette d'égout** périmétrique (200 mm) ;
- **noues, solins et bavettes de lucarnes** : 2 noues latérales + 1 bavette
  frontale par lucarne (18 bandes).

Pas de rives : une toiture à quatre pans avec croupe n'a pas de pignon
découvert. Si le Gérant attend des rives, c'est que la géométrie retenue diffère
— à arbitrer.

## 5. Vues préparées

**Client (9)** — `MPR CLIENT - PLAN RDC`, `PLAN R+1`,
`COUPE TRANSVERSALE SUR MANSARDE`, `ELEVATION NORD / SUD / EST / OUEST`,
`VUE GENERALE TOITURE`, `CADRAGE FENETRE DE TOIT`.

**Technique (3)** — `MPR TECHNIQUE - PRINCIPE CHARPENTE` (3D, toits et sols
masqués, la charpente entière est lisible), `MPR TECHNIQUE - CHEVETRES LUCARNE ET
FENETRE DE TOIT` (3D recadrée), `MPR TECHNIQUE - COUPE SUR LUCARNE ET LIGNE DE
BRIS` (coupe au 1/20 passant dans l'axe d'une lucarne).

Rappel de gouvernance pour les vues client : **ne pas afficher 70° et 18°**.
Dire « pente forte » et « pente faible ».

## 6. Réserves

1. **Le brisis n'est toujours pas percé à l'aplomb des lucarnes ni de la fenêtre
   de toit.** `NewOpening` sur toit a été refusé dans les deux modes, 12
   tentatives annulées au commit. Les chevêtres sont en place et corrects, mais
   la trémie manque dans le panneau de couverture. En 3D et en élévation le
   rendu est juste ; en coupe et depuis l'intérieur, non. **À reprendre à la main
   dans Revit** (Toit > Ouverture > Verticale), 7 percements. C'est le seul point
   qui empêche de qualifier la maquette de techniquement complète.
2. **Poteaux 200 mm non modélisés**, toujours en attente d'arbitrage. Aucune
   famille de poteau béton 200 × 200 n'est chargée ; sur un volume de 4 × 8 m en
   murs porteurs de 200 mm, des poteaux font doublon. Je ne pose pas de profilés
   acier HE-A qui induiraient le client en erreur.
3. **Aucun débord de toit.** Si un débord est décidé, abaisser le toit de
   tan(pente) × débord pour ne pas remonter le faîtage.
4. **Vue orpheline `Vue 3D 1`** : Revit refuse de la supprimer par API tant
   qu'elle est la vue active. À supprimer à la main.

## 7. Points restant à confirmer au relevé

Emprise réelle, hauteurs sous plafond, épaisseur réelle des murs, pentes exactes
du brisis et du terrasson, retrait réel de la ligne de bris, implantation
définitive des 6 lucarnes et de la fenêtre de toit, sections et entraxes de la
charpente, développés de zinguerie, position des descentes EP. **Une seule
descente EP est posée ; sur 8,00 m de chéneau, deux sont probables.**

Aucune de ces valeurs n'est une donnée chantier.

## 8. Deux points à remonter hors périmètre (rappel)

1. **Bibliothèque française complète** : 3730 familles dans `Libraries\French`.
   Le point ouvert au palier 0 de `stack-outils-revit.md` est soldé.
2. **Deux pièges du plugin Revit, non documentés** :
   - `Wall.Create(..., height, offset, ...)` prend un décalage **relatif au
     niveau**, pas une altitude absolue.
   - En `transactionMode: "auto"`, une transaction peut être **annulée au commit
     sans aucune remontée d'erreur** : le code retourne un journal de succès
     alors que rien n'a été écrit. Seul contrôle fiable : ouvrir soi-même une
     `Transaction` en mode `none` et lire le `TransactionStatus` du `Commit()`.
     C'est ce qui a permis de sauver cette mission.

   À ajouter à `setup-revitmcp.md` (dépôt travaux-architecte) : je signale, je
   n'édite pas. Décision Direction, via le Pilote.
