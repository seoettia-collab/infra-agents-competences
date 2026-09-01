# Gouvernance — projet ringo-toiture

## 1. Identité
- Projet : ringo-toiture (chantier « Ringo Toiture »)
- Type : chantier bâtiment, pas de développement logiciel
- Ouvrage : volume rectangulaire simple, ouvert, sans refends, avec toiture
- Famille : proche du système Revit, en version allégée

## 2. Chaîne de commandement
Gérant -> Direction -> GPT Pilote ringo-toiture -> agents du projet.

## 3. Agents activés
| Agent | ID | Rôle | Activé |
|---|---|---|---|
| GPT Pilote | gpt-pilote | pilote du projet | oui |
| Dessinateur / Structure | dessinateur | volume support, maçonnerie, niveaux, plans/coupes hors toiture | oui |
| Toiture / Charpente | toiture-charpente | conception, dessin Revit et contrôle de la toiture/charpente/couverture | oui |
| Documentation Technique | documentation-technique | référentiel, historique | oui |

Pas d'ingénieur-développeur ni d'auditeur : chantier simple, aucun code.

## 4. Règles propres au projet
- Aucune partie ne produit le devis final : il naît dans Mistral Devis.
  Les agents fournissent le TEXTE technique (désignations en mini-CCTP) prêt à
  y être saisi.
- Le CCTP n'est pas un devis : il se produit ici, en texte structuré par lot,
  jamais en PDF.
- Le relevé est la source des faits chantier. Sans relevé, toute dimension est
  une ESTIMATION et doit être signalée comme telle. Aucune estimation ne part
  au client.
- Deux ouvrages incompatibles sur un même lot : l'agent s'arrête et remonte au
  Pilote. Il ne tranche pas seul. L'arbitrage appartient au Gérant.
- Répartition métier corrigée par le Gérant le 2026-09-01 :
  - l'agent Toiture / Charpente est l'agent spécial toiture. Il définit,
    dessine dans Revit et contrôle la toiture, la charpente, la couverture, les
    lucarnes, les fenêtres de toit, les chevêtres, la zinguerie et l'évacuation
    EP ;
  - l'agent Dessinateur / Structure ne dessine pas la toiture sauf instruction
    exceptionnelle. Son périmètre courant est le support maçonné : sol,
    fondations/dalle de principe, niveaux, murs, poteaux si demandés, plans,
    coupes et vues hors lot toiture.
- Si une mission Revit porte sur la toiture, elle doit être confiée à
  Toiture / Charpente. Si une mission Revit porte sur le volume support ou la
  maçonnerie, elle peut être confiée au Dessinateur / Structure.

## 5. Outillage Revit — protocole existant, ne pas réinventer
Les agents disposent de Revit via Claude Desktop. Le protocole est déjà défini
dans le dépôt `seoettia-collab/travaux-architecte`, sous `standards-communs/` :
- `setup-revitmcp.md` — mise en place de la connexion Revit
- `stack-outils-revit.md` — outils disponibles et leur usage
- `demande-technique-revit.md` — format d'une demande technique
- `correction-port-8088.md` — incident connu et sa résolution
- `gabarits-agents/ref-dessinateur-structure.md` et
  `gabarits-agents/ref-charpentier-toiture.md` — postes déjà cadrés, réutilisables

Ces fichiers font foi. Ne rien recopier ici, ne rien réinventer : s'y référer.

## 6. Règles héritées
Applique `standards-communs/organisation-agents.md`. Ne rien recopier ici.

## 7. Documentation du projet
Dossier `projets/ringo-toiture/documentation/`, tenu par
`documentation-technique`.
