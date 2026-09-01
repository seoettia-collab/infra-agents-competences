<!-- BANDEAU ANTI-CACHE : relire ce fichier au hash annoncé avant d'agir. -->
# Message Pilote -> toiture-charpente (ringo-toiture)

MESSAGE-ID : TOIT-004
EN-REPONSE-A : DESS-004-ROLLBACK-R + doctrine reconstruction charpente

## Contenu
## Mission active — reconstruction complète toiture/charpente dans Revit

Le rollback est terminé. Le Dessinateur a retiré l'ancienne toiture et conservé
le volume support. Tu reprends maintenant en tant qu'agent spécial
Toiture / Charpente.

Le Gérant demande un travail de vraie construction de principe : il ne faut pas
poser seulement une forme de couverture. La toiture doit être reconstruite avec
sa charpente, ses supports, ses fixations, ses raccordements et ses vues par
état.

La règle projet reste : une seule mission active à la fois. Tu es le seul agent
actif sur cette séquence. Ne modifie pas les boîtes des autres agents.

## Fichier Revit

Tu es autorisé à entrer dans Revit et à travailler dans le fichier existant :

`D:\CLIENT\Ringo\Plan\Projet1.rvt`

Le fichier n'est pas en travail partagé. Aucun autre agent ne doit écrire dans
ce fichier pendant ta mission.

## Base à reprendre

État après rollback `DESS-004-ROLLBACK-R` :

- ancienne toiture supprimée ;
- toits = 0 ;
- bois = 0 ;
- volumes zinc/EP = 0 ;
- fenêtres = 0 ;
- murs = 12, uniquement le support ;
- volume support maçonné 8,00 x 4,00 m conservé ;
- murs 200 mm conservés ;
- sols/dalle/fondations de principe conservés ;
- niveau `EGOUT - Tete de mur` conservé à +6000.

Le niveau `EGOUT - Tete de mur` à +6000 est l'interface intangible avec le
support. Ne pas le déplacer.

Attention : les niveaux `LIGNE DE BRIS` (+9055) et `FAITAGE` (+9445) peuvent
encore exister, mais ils viennent de l'ancienne géométrie supprimée. Ils ne sont
pas des données projet. Tu peux les supprimer, les renommer comme provisoires ou
les redéfinir selon ta nouvelle toiture.

## Toiture à reconstruire

Reconstruire une toiture mansardée à quatre pans avec croupe, sans débord de
toit, au-dessus du niveau `EGOUT - Tete de mur`.

Programme à respecter :

- brisis : pan bas à forte pente ;
- terrasson : pan haut à faible pente ;
- couverture ardoise 20 x 30 cm gris anthracite ;
- écran HPV, contre-lattage et liteaunage représentés de façon lisible ou
  intégrés au complexe avec annotation ;
- ligne de bris continue avec raccord zinc ;
- arêtiers, faîtage, noues/solins/bavettes/raccords zinc ;
- 6 lucarnes rampantes :
  - 2 sur chaque face longue de 8,00 m ;
  - 1 sur chaque face pignon de 4,00 m ;
  - baie 1,20 x 0,80 m ;
  - joues et couverture en ardoise ;
- 1 fenêtre de toit type MK04 78 x 98 cm ;
- deux descentes EP Ø 80 à proposer/poser sauf impossibilité technique.

Arbitrages Gérant :

- aucun débord de toit ;
- aucun poteau 200 mm à ajouter ;
- lucarnes sur pignons de 4,00 m maintenues ;
- pas de rives de pignon sur cette toiture quatre pans avec croupe.

## Exigence construction

Travailler comme une vraie construction de principe :

- supports de charpente cohérents ;
- sablières, pannes, arêtiers, chevrons, empanons ;
- chevêtres des 6 lucarnes et de la fenêtre de toit ;
- supports et fixations lisibles lorsque Revit le permet ;
- raccordements entre pièces de charpente cohérents ;
- raccordements entre toiture, lucarnes, fenêtre de toit et zinguerie cohérents ;
- pas de doublon avec l'ancienne charpente : elle a été supprimée ;
- sections et entraxes peuvent rester indicatifs tant que le relevé manque, mais
  ils doivent rester plausibles et clairement annotés.

## Vues obligatoires par état

Chaque état important doit avoir sa propre vue Revit. Préparer au minimum :

1. `MPR ETAT 01 - SUPPORT SEUL`
2. `MPR ETAT 02 - CHARPENTE`
3. `MPR ETAT 03 - COUVERTURE ARDOISE`
4. `MPR ETAT 04 - LUCARNES ET FENETRE DE TOIT`
5. `MPR ETAT 05 - ZINGUERIE ET EP`
6. `MPR ETAT 06 - VUE CLIENT FINALE`

Ces vues doivent permettre de comprendre le montage étape par étape, pas
seulement le rendu final.

## Référence visuelle

L'image de charpente mansardée transmise par le Gérant sert de référence métier
de principe : charpente mansardée, sablières, chevrons, liteaux, ferme /
triangulation, distinction pan bas fort / pan haut faible. Ne pas la copier
géométriquement si elle contredit le programme Ringo : notre toiture reste à
quatre pans avec croupe, sans débord, avec 6 lucarnes et 1 fenêtre de toit.

## Livrable attendu

1. Enregistrer le fichier Revit reconstruit.
2. Vérifier qu'il n'y a pas d'avertissement Revit majeur.
3. Vérifier que les percements/trémies sont faits et cohérents.
4. Vérifier que les vues par état sont créées.
5. Rédiger ton retour dans :
   `projets/ringo-toiture/agents/toiture-charpente/message-toiture-charpente-pilote.md`

Titre du retour : `TOIT-004-R`.

Ton rapport doit indiquer :

- ce qui a été reconstruit ;
- les choix de charpente et de raccordements ;
- les sections/entraxe utilisés et leur statut indicatif ;
- les trémies/percements réalisés ;
- les vues par état créées ;
- la gestion des niveaux `LIGNE DE BRIS` et `FAITAGE` ;
- les réserves restantes, s'il y en a.
