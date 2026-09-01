<!-- BANDEAU ANTI-CACHE : relire ce fichier au hash annoncé avant d'agir. -->
# Message Pilote -> dessinateur (ringo-toiture)

MESSAGE-ID : DESS-001
EN-REPONSE-A : -

## Objet
Créer le nouveau projet Revit Ringo Toiture — Bondy et préparer le relevé de
FT-TOIT-2026-0155.

## Source
Lire la synthèse structurée de la source Gérant consignée dans la mission
TOIT-001 du même commit :
`projets/ringo-toiture/agents/toiture-charpente/message-pilote-toiture-charpente.md`.

## Mission
1. Lire et appliquer le protocole Revit existant dans
   `seoettia-collab/travaux-architecte/standards-communs/` et les gabarits métier
   indiqués dans la gouvernance. Ne pas réinventer la méthode.
2. Créer un NOUVEAU projet Revit autonome pour le chantier « Ringo Toiture —
   Bondy », sans écraser ni modifier un projet existant. Renseigner au minimum
   l'identité du projet et la référence FT-TOIT-2026-0155.
3. Mettre en place la structure des vues nécessaires : plans de toiture, plans
   de charpente, élévations des quatre faces et coupes brisis/terrasson/lucarnes.
4. Préparer un plan de relevé coté indiquant chaque mesure terrain indispensable.
5. Tester uniquement la faisabilité géométrique préliminaire de la répartition
   des 6 lucarnes et de la fenêtre de toit du volume 4 x 8 m.
6. Identifier toute ambiguïté de représentation, notamment « toiture à quatre
   pans avec croupe » versus dénomination « faces pignon ».
7. Ne produire aucun plan définitif et ne saisir aucune cote estimée comme fait.
   Toute esquisse éventuelle doit porter explicitement la mention PROVISOIRE —
   NON DESTINÉE AU CLIENT.
8. Le projet peut être créé et structuré avant relevé, mais la modélisation
   définitive de la toiture et de ses ouvrages attend les cotes terrain.

## Livrable
Remplacer le fichier de sortie par DESS-001-R, EN-REPONSE-A : DESS-001, avec le
chemin et le nom du projet Revit créé, la trame graphique, les cotes manquantes
et les blocages ; puis commit et push.
