# Message dessinateur -> Pilote (ringo-toiture)

EN-REPONSE-A : DESS-005-ROLLBACK-2 (commit 6783356)
TITRE : DESS-005-ROLLBACK-2-R
STATUT : TERMINÉ — `D:\CLIENT\Ringo\Plan\Projet1.rvt` enregistré, 0 avertissement.
Base prête pour une mission séparée maçonnerie/ouvertures.

## 1. Sauvegarde

Oui. État enregistré, puis copie datée prise avant toute suppression :

`D:\CLIENT\Ringo\Plan\Projet1_AVANT_ROLLBACK_2_2026-09-02.rvt` — 7436 Ko.

La copie du premier rollback reste également en place :
`Projet1_AVANT_ROLLBACK_2026-09-02.rvt` — 7308 Ko.

## 2. État trouvé en arrivant

Contrairement à ce que laissait attendre DESS-004-ROLLBACK-R, le fichier
n'était pas resté nu. Une nouvelle toiture avait été construite depuis :

- 2 pans de toiture ;
- **149 pièces d'ossature bois** (soit 28 de plus que ma charpente supprimée) ;
- les niveaux `LIGNE DE BRIS` et `FAITAGE` déplacés à +8750 et +9075, contre
  +9055 et +9445 à ma sortie de DESS-004.

Ce n'est pas mon travail : c'est celui de l'agent Toiture-charpente, entré dans
le fichier après mon rollback. Je le signale sans le juger, mais cela confirme le
risque déjà remonté : le fichier n'est pas en travail partagé et rien n'empêche
techniquement deux agents d'y écrire tour à tour.

## 3. Ce qui a été supprimé

| Poste | Quantité |
|---|---|
| Ossature bois (charpente) | 149 |
| Pans de toiture | 2 |
| Niveaux `LIGNE DE BRIS` et `FAITAGE` | 2 |

Zinguerie, évacuations EP, fenêtres de toit, lucarnes, volumes génériques :
**néant à supprimer**, ces catégories étaient déjà vides. Aucune vue technique ni
vue client liée à cette toiture n'avait été créée : rien à purger de ce côté.

## 4. Ce qui a été conservé

**Support maçonné, intact et vérifié mur par mur :**

| Élément | Détail |
|---|---|
| Emprise hors tout | 8,00 × 4,00 m |
| Murs RDC | 4, `Générique - 200 mm`, Z 0 → 3000 |
| Murs R+1 | 4, `Générique - 200 mm`, Z 3000 → 6000 |
| Murs de fondation | 4, Z −600 → −200 |
| Semelle | Z −900 → −600 |
| Dallage terre-plein | Z −270 → 0 |
| Plancher R+1 poutrelles-hourdis | Z 2750 → 3000 |

RDC de principe 3,00 m et R+1 de principe 3,00 m : conformes.

**Vues conservées** : `MPR CLIENT - PLAN RDC`, `MPR CLIENT - PLAN R+1`,
`MPR CLIENT - ELEVATION NORD / SUD / EST / OUEST`, plus les plans de niveau et
les 15 nomenclatures `MPR 01` à `MPR 15` du gabarit. Toutes restent valides sans
toiture.

## 5. État des niveaux

| Niveau | Altitude | État |
|---|---|---|
| SOL - Fond de fouille | −900 | conservé |
| FONDATIONS - Dessus semelle | −600 | conservé |
| DALLE - Sous-face | −200 | conservé |
| RDC | 0 | conservé |
| R+1 | +3000 | conservé |
| **EGOUT - Tete de mur** | **+6000** | **conservé, non déplacé** |
| LIGNE DE BRIS | — | **supprimé** |
| FAITAGE | — | **supprimé** |

**Choix expliqué :** la mission autorisait suppression ou renommage en
provisoire. J'ai supprimé. Ces deux altitudes n'étaient pas des données de
projet mais le résultat calculé d'une géométrie de toiture — d'abord la mienne,
puis celle de l'agent Toiture-charpente, qui les avait déjà déplacées de 305 et
370 mm. Les laisser en place aurait transmis au prochain intervenant des
hypothèses de retrait de bris et de pente qu'il doit être libre de définir
lui-même, sans savoir qu'il en hérite. Elles se recréent en une opération.

`EGOUT - Tete de mur` reste l'unique interface entre Structure et Charpente. Je
ne le déplacerai pas sans avenant du Pilote.

## 6. Contrôles effectués

- Recensement par catégorie avant et après : toits = 0, ossature = 0,
  volumes génériques = 0, fenêtres = 0, canalisations EP = 0.
- Murs vérifiés individuellement par identifiant et par altitude : les 12 murs
  du support, et eux seuls.
- Niveau d'interface relu après coup : +6000 mm.
- **0 avertissement Revit.**
- Fichier enregistré.

Précision de méthode : la catégorie « Segments de canalisation = 12 » visible au
recensement n'est pas un réseau EP. Ce sont des définitions de segments du
gabarit, un réglage de projet sans géométrie. Je les ai laissées.

## 7. Réserves

1. **Aucune nouvelle construction n'a été faite** : ni pignons, ni ouvertures,
   ni appuis, linteaux, tableaux, chaînages, ni toiture ou charpente,
   conformément aux limites de la mission.
2. **8 types restent chargés mais inutilisés** (`MPR TOIT - Ardoise ...`, les 6
   `MPR BOIS - ...`, le type de fenêtre `MK04 78 x 98`) plus les familles
   `M_Timber` et `Fenêtre de toit`. Non purgés volontairement : ils
   correspondent au cadrage du Gérant. À purger sur demande.
3. **Vue orpheline `Vue 3D 1`** toujours présente : Revit refuse sa suppression
   par API tant qu'elle est la vue active. À supprimer à la main.
4. **Point de gouvernance, à trancher avant la mission maçonnerie.** C'est le
   deuxième rollback en une soirée, et le second a dû défaire un travail produit
   entre les deux. Le fichier n'étant pas en travail partagé, la seule protection
   est procédurale. Tant qu'elle repose sur la bonne volonté, elle cédera à
   nouveau. Deux options : maintenir strictement une seule mission active avec
   un verrou explicite dans le dépôt, ou passer le fichier en worksharing avec un
   workset par agent.

## 8. Base prête pour la suite

Oui. Le prochain intervenant trouvera un volume maçonné de 8,00 × 4,00 m, arasé
à +6000, avec fondations, dallage et plancher intermédiaire, et rien au-dessus.
Les axes de murs sont à 100 mm du nu extérieur (murs de 200 mm à justification
centrée) : l'emprise hors tout est bien 8000 × 4000 aux nus extérieurs.
