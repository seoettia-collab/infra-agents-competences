# DECISIONS — ringo-toiture

## D-001 — Reprise du projet à zéro
- Décision : effacer l'ancien projet et repartir d'une base propre.
- Motif : la géométrie s'était éloignée du besoin réel, les agents
  travaillaient sur des bases contradictoires.
- Date : 2026-09-01, tranché par le Gérant.
- Statut : en vigueur.

## D-002 — Cabinet 100 % Claude
- Décision : la direction du chantier passe à un Architecte Claude.
- Motif : tâches découpées, mémoire hors conversation, échanges courts. La
  consommation n'est plus l'obstacle, et la discipline de protocole est
  meilleure.
- Date : 2026-09-01, tranché par le Gérant.
- Statut : en vigueur.

## D-003 — Pignons en maçonnerie
- Décision : les pignons sont maçonnés, pas en charpente.
- Motif : choix constructif du Gérant.
- Date : 2026-09-01.
- Statut : en vigueur.

## D-004 — Travail sur disque local
- Décision : les échanges entre agents passent par `C:\CLIENT\Ringo toiture`.
  GitHub n'est plus utilisé pour ce projet.
- Motif : blocages répétés de push selon les sessions. Le disque local est
  accessible à tous les agents via Filesystem.
- Date : 2026-09-01, tranché par le Gérant.
- Statut : en vigueur.
- Réserve consignée : le disque local n'a pas d'historique. Un fichier remplacé
  écrase l'ancien.

## D-005 — La coupe gouverne les proportions
- Décision : les proportions de la structure se déduisent de la coupe cotée.
  Les angles et les altitudes de la coupe font foi ; l'emprise s'y conforme.
- Motif : les quatre données de la coupe (murs +5.70, faîtage +9.19, brisis
  60°, terrasson 10°) déterminent la portée. Une emprise de 4 m rend le
  profil mansarde impossible à refermer.
- Date : 2026-09-02, tranché par le Gérant.
- Statut : en vigueur.
- SOURCE : arbitrage Gérant.

## D-006 — Sauvegarde Google Drive, hors Revit
- Décision : synchroniser sur Google Drive les dossiers texte (agents prompte,
  messages, documentation, GOUVERNANCE.md). Laisser `Revit\` hors synchro.
- Motif : le disque local n'a pas d'historique. Mais Revit produit un fichier de
  sauvegarde numéroté à chaque enregistrement, ce qui saturerait le Drive.
  Le modèle se reconstruit, les fichiers texte non.
- Date : 2026-09-03, tranché par le Gérant.
- Statut : en vigueur.
