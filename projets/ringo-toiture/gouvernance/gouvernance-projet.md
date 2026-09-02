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
- Interface Revit entre Structure et Charpente :
  - `Projet1.rvt` n'est pas en travail partagé ; il ne doit jamais y avoir deux
    agents qui écrivent dans le fichier en même temps ;
  - le Dessinateur / Structure livre l'emprise, les axes de murs et le niveau
    `EGOUT - Tete de mur` à +6000 ;
  - la Charpente construit au-dessus de ce niveau ;
  - le niveau `EGOUT - Tete de mur` ne doit pas être déplacé sans avenant du
    Pilote ;
  - les lucarnes, y compris leurs joues, relèvent de Toiture / Charpente dans
    la répartition corrigée.
- Niveau attendu pour la reconstruction toiture :
  - la future toiture ne doit pas être une simple visualisation décorative ;
  - elle doit être montée comme une vraie construction de principe, avec
    charpente, supports, fixations, assemblages lisibles, raccordements entre
    ouvrages, chevêtres, lucarnes, couverture, zinguerie et évacuation EP ;
  - les éléments peuvent rester non dimensionnés exécution tant que le relevé
    manque, mais ils doivent être cohérents techniquement ;
  - chaque état ou étape importante doit avoir sa propre vue Revit : support
    seul, charpente, couverture, lucarnes/fenêtre de toit, zinguerie/EP, vue
    client finale.
- Arbitrage Gérant du 2026-09-02 après DESS-006 :
  - option retenue : conserver les deux pignons maçonnés ;
  - la toiture quatre pans avec croupe est abandonnée pour cette version de
    travail ;
  - la reprise Charpente devra partir sur une toiture mansardée avec pignons
    maçonnés aux deux extrémités ;
  - un oeil-de-boeuf doit être placé sur chacun des deux pignons ;
  - la future toiture comporte aussi quatre fenêtres de toit type Velux, à
    traiter par l'agent Toiture / Charpente ;
  - principe de couverture retenu : partie haute en zinc, pourtour / brisis en
    ardoise ;
  - les pignons maçonnés doivent intégrer une forme/arase inclinée de principe
    sur les côtés, compatible avec la future toiture mansardée ; ils ne doivent
    pas rester de simples rectangles verticaux si une pente latérale est
    nécessaire ;
  - les ouvertures de pignon et leurs encadrements relèvent du Dessinateur /
    Structure avant reprise Charpente.
- Précision constructive du Gérant après DESS-008 :
  - une dalle haute continue couvre entièrement le R+1 sous la toiture ;
  - elle est distincte du plancher intermédiaire entre le RDC et le R+1 ;
  - sa face supérieure constitue avec les têtes de murs l'interface horizontale
    à +6000 pour les pignons et la future charpente ;
  - le profil de pignon 70° / 18° produit dans DESS-008 n'est pas validé : son
    inclinaison doit être contrôlée par Toiture / Charpente avant correction
    de la maçonnerie ;
  - arbitrage Gérant retenu après comparaison : brisis 60°, partie haute 10°,
    retrait de bris 900 mm, oeil-de-boeuf Ø800 et axe +6800 conservés ;
  - valeurs géométriques de principe attendues, à contrôler par Charpente :
    ligne de bris vers +7559, faîtage vers +7735, soit environ 1735 mm au-dessus
    de la dalle/arase +6000.

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
