# Message dessinateur -> Pilote (ringo-toiture)

EN-REPONSE-A : DESS-004-ROLLBACK (commit 35c8462)
TITRE : DESS-004-ROLLBACK-R
STATUT : TERMINÉ — `D:\CLIENT\Ringo\Plan\Projet1.rvt` enregistré, 0 avertissement.

## 1. Sauvegarde avant suppression

Oui. Copie datée du fichier complet, prise après enregistrement de l'état
DESS-002 et avant toute suppression :

`D:\CLIENT\Ringo\Plan\Projet1_AVANT_ROLLBACK_2026-09-02.rvt` — 7308 Ko.

Toute la toiture supprimée est donc récupérable telle quelle si le Gérant
revient sur sa décision.

## 2. Ce qui a été supprimé

| Poste | Quantité |
|---|---|
| Pans de toiture (brisis, terrasson, 6 toits de lucarnes) | 8 |
| Joues et frontons de lucarnes | 18 murs |
| Charpente bois (sablières, pannes, arêtiers, chevrons, empanons, chevêtres, linteaux) | 121 pièces |
| Zinguerie (ligne de bris, faîtage, arêtiers, bavette d'égout, noues/solins/bavettes de lucarnes) | 5 volumes, 34 bandes |
| Descente EP Ø 80 | 1 |
| Fenêtre de toit MK04 et son chevêtre | 1 + 4 pièces |
| Vues décrivant l'ancienne toiture | 6 |

Vues supprimées : `MPR CLIENT - COUPE TRANSVERSALE SUR MANSARDE`,
`MPR CLIENT - VUE GENERALE TOITURE`, `MPR CLIENT - CADRAGE FENETRE DE TOIT`,
`MPR TECHNIQUE - PRINCIPE CHARPENTE`,
`MPR TECHNIQUE - CHEVETRES LUCARNE ET FENETRE DE TOIT`,
`MPR TECHNIQUE - COUPE SUR LUCARNE ET LIGNE DE BRIS`.

## 3. Ce qui a été conservé

**Volume support maçonné, intact :**

- emprise hors tout 8,00 × 4,00 m ;
- 12 murs `Générique - 200 mm` : 4 RDC (0 → 3000), 4 R+1 (3000 → 6000),
  4 de fondation (−600 → −200) ;
- 3 sols : semelle débordante, dallage terre-plein, plancher R+1 ;
- 8 niveaux.

**Niveau d'interface préservé et non déplacé :**
`EGOUT - Tete de mur` = +6000 mm, id 5855.

**Vues conservées, toutes valides sans la toiture :**
`MPR CLIENT - PLAN RDC`, `MPR CLIENT - PLAN R+1`,
`MPR CLIENT - ELEVATION NORD / SUD / EST / OUEST`.
Les 15 vues de nomenclature `MPR 01` à `MPR 15` du gabarit sont intactes.

## 4. Contrôles

- **Toute l'ancienne toiture est retirée.** Comptage après rollback :
  toits = 0, bois = 0, volumes zinc/EP = 0, fenêtres = 0, murs = 12 (les 12 du
  support, vérifiés un par un par leur identifiant).
- **Aucune toiture n'a été reconstruite.** Aucune trémie n'a été traitée, aucun
  poteau ajouté, aucun débord créé, conformément aux limites de la mission.
- **0 avertissement Revit.**
- Fichier enregistré.

## 5. Réserves

1. **Les niveaux `LIGNE DE BRIS` (+9055) et `FAITAGE` (+9445) ont été conservés**,
   la mission demandant explicitement de conserver les niveaux. Attention : ces
   deux altitudes ne sont pas des données de projet, elles sont le **résultat
   calculé de ma géométrie supprimée** (retrait de bris 800 mm, brisis 70°,
   terrasson 18°, épaisseur de toit 293 mm). L'agent Toiture-charpente doit être
   libre de les redéfinir, sinon il héritera sans le savoir de mes hypothèses.
   Je propose au Pilote soit de les supprimer, soit de les renommer avec une
   mention explicite. Je ne l'ai pas fait de moi-même : c'est un arbitrage, pas
   une correction.
2. **8 types restent chargés mais inutilisés** : `MPR TOIT - Ardoise 20x30 +
   liteaunage + ecran HPV`, les 6 types `MPR BOIS - ...` et le type de fenêtre
   `MK04 78 x 98 - rotation motorisee + VR solaire`, ainsi que les familles
   `M_Timber` et `Fenêtre de toit`. Je ne les ai pas purgés : ils correspondent
   au cadrage du Gérant et éviteront à l'agent Toiture-charpente de refaire ce
   travail. À purger sur demande.
3. **Vue orpheline `Vue 3D 1`** toujours présente : Revit refuse de la supprimer
   par API tant qu'elle est la vue active. À supprimer à la main.
4. **Le fichier n'est pas en travail partagé.** Si Structure et Toiture-charpente
   doivent intervenir dans la même séquence, il faudra soit maintenir la règle
   d'une seule mission active, soit passer le fichier en worksharing avec un
   workset par agent. Deux agents écrivant en parallèle dans ce fichier
   s'écraseraient.

## 6. Note d'interface pour la reprise

Ce que l'agent Toiture-charpente trouvera en arrivant : un volume maçonné de
8,00 × 4,00 m arasé à +6000, sans rien au-dessus. Les axes de murs sont tracés à
100 mm du nu extérieur (murs de 200 mm à justification centrée), l'emprise hors
tout est donc bien 8000 × 4000 aux nus extérieurs. Il construit à partir de
`EGOUT - Tete de mur`, que je ne déplacerai plus sans avenant du Pilote.
