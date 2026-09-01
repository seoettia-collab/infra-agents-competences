<!-- BANDEAU ANTI-CACHE : relire ce fichier au hash annoncé avant d'agir. -->
# Message Pilote -> dessinateur (ringo-toiture)

MESSAGE-ID : DESS-002
EN-REPONSE-A : cadrage oral Gérant du 2026-09-01 + DOC-001-R

## Contenu
## Mission active — visualisation technique toiture/charpente Ringo Toiture Bondy

Le Gérant a indiqué que le fichier Revit existe déjà :

`D:\CLIENT\Ringo\Plan\Projet1.rvt`

Tu es autorisé à entrer dans Revit et à travailler dans ce fichier. Ne crée pas
un second fichier projet sauf blocage technique explicite.

Objectif corrigé par le Gérant : produire une maquette Revit utile au client,
mais avec une logique technique toiture/charpente lisible. La maquette ne doit
pas être seulement une image de présentation. Elle doit montrer une toiture
mansardée techniquement compréhensible : brisis, terrasson, croupe, arêtiers,
ligne de bris, raccords zinc, lucarnes rampantes, chevêtres et principe de
charpente.

Il ne s'agit pas d'un calcul structure d'exécution. Les éléments porteurs hors
toiture restent standards/provisoires, mais la toiture et la charpente doivent
être représentées de manière cohérente.

## Cadre imposé par le Gérant

- Emprise du volume support : 4,00 x 8,00 m.
- Niveaux à représenter : sol / fondations standards / dalle / RDC / R+1 /
  toiture.
- Hauteur RDC : 3,00 m.
- Hauteur R+1 : 3,00 m.
- Murs/blocs : épaisseur 200 mm.
- Poteaux/colonnes standards : 200 mm.
- Fondations : standard de visualisation, non dimensionnées exécution.
- Dalle/plancher : standard de visualisation, non dimensionné exécution.
- Usage attendu : rendu/maquette explicative client avec logique technique de
  toiture/charpente, pas plans définitifs.

## Toiture à représenter

Reprendre la fiche technique toiture transmise par le Gérant :

- Toiture mansardée à quatre pans avec croupe.
- Brisis à forte pente, ordre de grandeur 70° en travail interne.
- Terrasson à faible pente, ordre de grandeur 15° à 20° en travail interne.
- En présentation client, ne pas afficher ces valeurs comme faits mesurés :
  utiliser "pente forte" pour le brisis et "pente faible" pour le terrasson.
- Ligne de bris matérialisée par zinguerie.
- Couverture ardoise 20 x 30 cm gris anthracite, pose au crochet.
- Écran HPV, contre-lattage, liteaunage.
- Charpente bois traité classe 2 à représenter en principe technique.
- Fenêtres de toit : 9 unités au total sur l'ensemble du projet, format 78 x
  98 cm type MK04, rotation motorisée, volet roulant extérieur motorisé
  solaire. Pour la structure 4 x 8 m, prévoir 1 fenêtre de toit.
- Lucarnes rampantes : représenter 6 unités sur la structure 4 x 8 m, sauf
  impossibilité graphique manifeste :
  - 2 sur chaque face longue de 8,00 m ;
  - 1 sur chaque face pignon de 4,00 m ;
  - baie 1,20 x 0,80 m ;
  - encombrement indicatif hors tout 1,56 m par lucarne ;
  - joues et couverture en ardoise 20 x 30 ;
  - raccords zinc : noues, solins, bavettes.
- Descente EP zinc naturel ronde Ø 80 mm, position à proposer visuellement et
  à marquer provisoire.

## Charpente à rendre lisible dans la maquette

La toiture doit pouvoir être comprise techniquement. Représenter au minimum, en
principe et sans dimensionnement définitif :

- sablières en pied de brisis ;
- ligne de bris comme rupture géométrique et raccord zinc continu ;
- arêtiers de la toiture quatre pans avec croupe ;
- faîtage/terrasson cohérent avec la géométrie mansardée ;
- chevrons ou lignes de chevronnage si l'outil Revit le permet proprement ;
- chevêtres autour des lucarnes rampantes ;
- chevêtre autour de la fenêtre de toit ;
- structure simple des lucarnes : joues, linteau, petits chevrons, pan rampant ;
- raccords zinc visibles : noues/solins/bavettes/rives/faîtage/ligne de bris.

Si certaines pièces de charpente ne peuvent pas être modélisées proprement sans
famille Revit adaptée, les représenter par volumes simples ou annotations
techniques, et le signaler dans le rapport.

## Capture Revit transmise par le Gérant

Le Gérant a transmis une capture de la base Revit en cours. Elle montre déjà un
volume support, une toiture mansardée esquissée, des lucarnes et des tracés de
toiture. Cette base est une étape de travail, pas un résultat validé.

À contrôler/corriger dans cette base :

- cohérence du mansard : brisis, terrasson, croupe ;
- arêtiers, faîtage et ligne de bris ;
- lucarnes rampantes et leurs raccords ;
- chevêtres des lucarnes et de la fenêtre de toit ;
- cohérence entre ouvertures de toiture et principe de charpente ;
- absence de confusion entre maquette esthétique et toiture techniquement
  lisible.

## Référence visuelle complémentaire transmise par le Gérant

La planche d'intention "Toiture mansardée à la Mansart à quatre pans avec
croupe" est validée comme référence graphique générale pour :

- orthographe "croupe" ;
- terrasson en ardoise, sans zinc à joint debout ;
- lucarnes rampantes avec joues et fronton en ardoise ;
- formulation "quatre faces, chacune en deux pans" ;
- pentes non chiffrées dans la présentation client.

Attention : la planche reste générique. Ne pas reprendre les 3 lucarnes visibles
sur la face longue ; le projet retient 2 lucarnes par face de 8,00 m. La planche
ne montre pas de fenêtre de toit ; prévoir une seconde vue ou un cadrage dédié
pour illustrer la fenêtre de toit prévue sur la structure 4 x 8 m.

## Règles de production

- Ne pas figer les dimensions encore non relevées comme données chantier.
- Annoter dans Revit/rapport les éléments standard ou provisoires :
  fondations, dalle, murs, poteaux, planchers, hauteurs, implantation précise
  des ouvertures et sections de bois.
- Ne pas faire de calcul structure, ni de dimensionnement charpente définitif.
- Ne pas modifier les boîtes des autres agents.
- Ne pas démarrer une mission toiture-charpente ou documentation.

## Livrable attendu

1. Continuer dans le fichier existant `D:\CLIENT\Ringo\Plan\Projet1.rvt`.
2. Mettre en place ou corriger les niveaux : sol, RDC, R+1, toiture / ligne de
   bris.
3. Modéliser le volume 4,00 x 8,00 m.
4. Modéliser la toiture mansardée et la charpente de principe selon le cadrage
   ci-dessus.
5. Préparer des vues client lisibles : plan, coupe, élévations et 3D.
6. Prévoir une vue ou annotation technique montrant le principe charpente,
   lucarnes, chevêtres et fenêtre de toit.
7. Rédiger un court rapport de fin de mission dans ta boîte retour, avec :
   - ce qui a été créé ;
   - les hypothèses de visualisation utilisées ;
   - les choix de représentation technique toiture/charpente ;
   - les points restant à confirmer au relevé.
