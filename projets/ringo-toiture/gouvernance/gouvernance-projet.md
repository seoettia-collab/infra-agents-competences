# Gouvernance — projet ringo-toiture

## 1. Identité
- Projet : ringo-toiture
- Type : chantier bâtiment. Aucun développement logiciel.
- Outil de production : Revit (connecteurs revit-mcp / revitmcp).

## 2. Ouvrage
- Emprise : 4 x 8 m environ (à confirmer par relevé)
- Niveaux : RDC + dalle intermédiaire + R+1 + comble
- Toiture : MANSARDE — brisis à 60 degrés, terrasson à 10 degrés
- Lucarnes cintrées (chapeau de gendarme) sur le brisis
- PIGNONS EN MAÇONNERIE (et non en charpente)

## 3. Chaîne de commandement
Gérant -> Direction -> ARCHITECTE -> agents du cabinet.

L'Architecte dirige. Il ne demande pas la permission d'agir. Il ne remonte au
Gérant que pour un choix d'ouvrage, un budget ou une décision commerciale.

## 4. Cabinet
| Agent | ID | Rôle | Préfixe |
|---|---|---|---|
| Architecte | architecte | dirige, arbitre, distribue | ARCHI |
| Dessinateur maçonnerie | dessinateur-maconnerie | murs, pignons, structure maçonnée | MACO |
| Dessinateur toiture | dessinateur-toiture | charpente, couverture, zinguerie | TOIT |
| Ingénieur structure | ingenieur-structure | dimensionnement, validation | STRU |
| Suivi de chantier | suivi-chantier | SECOND ŒIL — contrôle uniquement | SUIV |
| Documentation technique | documentation-technique | CCTP, historique, archives | DOC |
| Historique | historique | mémoire longue du projet — CONSULTATION | HIST |

Tous les agents tournent sur Claude.

`historique` est hors flux courant : l'Architecte le consulte quand une question
de fond résiste. Il ne connaît pas la remise à plat du 2026-09-01 ni la coupe
récente : ses réponses sont des PISTES à recouper avec le référentiel.

## 5. Règles propres au projet
- Le devis final naît dans Mistral Devis. Les agents fournissent le TEXTE
  technique (mini-CCTP), jamais un document commercial.
- Le CCTP se produit ici, en texte structuré par lot. Jamais de PDF.
- Le relevé est la source des faits. Sans relevé, toute dimension est une
  ESTIMATION et doit être signalée comme telle.
- Deux ouvrages incompatibles : l'agent s'arrête et remonte à l'Architecte.
- Un seul agent en écriture Revit à la fois.
- SIMPLICITÉ : l'ouvrage est simple. Aucun agent ne complique la géométrie
  au-delà de ce que demande la coupe. En cas de doute, on simplifie.

## 5bis. Emplacement du modèle Revit
Dossier de travail : `D:\CLIENT\Ringo\Toiture\Plan\Revit`

C'est là que vit le modèle. Tous les agents Revit travaillent sur ce dossier,
jamais ailleurs, jamais sur une copie locale improvisée.
Un seul agent en écriture Revit à la fois.

## 6. Outillage Revit
Protocole défini dans `seoettia-collab/travaux-architecte`, sous
`standards-communs/` (setup-revitmcp, stack-outils-revit,
demande-technique-revit, correction-port-8088). Ces fichiers font foi.
Ne rien recopier, ne rien réinventer.

## 7. Règles héritées
Applique `standards-communs/organisation-agents.md`. Ne rien recopier ici.

## 8. Documentation
Dossier `projets/ringo-toiture/documentation/`, tenu par
`documentation-technique` : CCTP, REFERENTIEL, DECISIONS, JOURNAL.
