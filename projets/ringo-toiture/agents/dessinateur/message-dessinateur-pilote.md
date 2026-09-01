# Message dessinateur -> Pilote (ringo-toiture)

EN-REPONSE-A : DESS-002
STATUT : BLOQUÉ — outil indisponible, aucune géométrie produite

## 1. Ce qui bloque

Le serveur `revit-mcp` (plugin `mcp-servers-for-revit` + serveur Node) est le
SEUL à créer de la géométrie : `create_level`, `create_line_based_element`,
`create_surface_based_element`, `create_floor`, `send_code_to_revit`. Il ne
répond pas.

Chronologie mesurée :

| Étape | Résultat |
|---|---|
| Avant activation du switch | `Connect to Revit client failed` (socket fermé) |
| Après `Add-Ins -> Revit MCP Switch` | `Command timed out after 30s` |
| Après extinction/rallumage du switch | `Command timed out after 30s`, puis `120s` |

Cinq appels, trois commandes différentes (`get_project_info`,
`get_current_view_info`, `get_available_family_types`). Toutes expirent.

Ce qui est écarté :
- **Taille du modèle** : le fichier est quasi vide (6 niveaux, 0 mur, 0 toit).
- **Revit lui-même** : `revitmcp` (pyRevit) répond instantanément sur le même
  processus (pid 13316), avec ouverture puis annulation d'une transaction test
  — Revit est idle, sans boîte de dialogue modale bloquante.
- **Contournement par pyRevit** : vérifié, `revitmcp` n'expose aucune route de
  création de géométrie ni d'exécution de code. Conforme à `setup-revitmcp.md`.

Le socket s'ouvre donc bien, mais le plugin n'exécute pas les commandes reçues.
Le défaut est localisé dans le plugin, pas dans la session ni dans Revit.

## 2. Ce qui a pu être fait (lecture seule)

Fichier cible ouvert et conforme à la mission :
`D:\CLIENT\Ringo\Plan\Projet1.rvt` — projet « MISTRAL PRO RENO », statut Étude,
non partagé, vue active `Niveau 1`.

**Niveaux existants, hérités du gabarit et incompatibles avec le cadrage :**

| Niveau | Élévation | À corriger |
|---|---|---|
| Fondation B.O. | −4600 mm | à réétager |
| Base T.O. | −4300 mm | à réétager |
| Dalle T.O. | −4000 mm | à réétager |
| Mur de fondation T.O | −300 mm | à conserver/ajuster |
| Niveau 1 | 0 mm | devient RDC |
| Niveau 2 | +4000 mm | doit passer à +3000 (RDC = 3,00 m) |

Manquent : R+1 (+6000), toiture, et la ligne de bris.

**Modèle vide** : aucun mur, sol, toit ni poteau.
**Familles chargées quasi nulles** : 9 fenêtres « Fixe » sans nom de type,
2 poteaux HE-A. Aucune fenêtre de toit, aucune famille de lucarne.

## 3. Points à confirmer avant reprise (hors relevé)

1. **Fenêtre de toit MK04 78 × 98 cm** : famille absente du fichier. Charger
   depuis la bibliothèque française (*Fenêtre de toit*) — à confirmer par le
   Pilote, faute de quoi je la représente en volume simple marqué provisoire.
2. **Lucarnes rampantes** : aucune famille disponible. Elles seront modélisées
   en volumes (murs joues + toit rampant), pas en familles paramétriques.
3. **6 lucarnes sur 4 × 8 m** : à 2 par face longue de 8,00 m plus 1 par pignon
   de 4,00 m, le pignon de 4,00 m avec brisis à 70° laisse peu de largeur utile
   pour une baie de 1,20 m et un encombrement hors tout de 1,56 m. Risque
   d'« impossibilité graphique manifeste » prévue par la mission. Je le
   signalerai chiffré dès que le volume sera monté.

## 4. Points restant à confirmer au relevé

Tout le cadrage dimensionnel est aujourd'hui une **HYPOTHÈSE DE VISUALISATION**,
non une donnée chantier : emprise 4,00 × 8,00 m, hauteurs 3,00 / 3,00 m,
épaisseur 200 mm, poteaux 200 mm, fondations et dalle standard, pentes 70° et
15–20°, implantation des lucarnes, des fenêtres de toit et de la descente EP.
Aucune de ces valeurs ne part au client comme cote.

## 5. Demande au Pilote

Faire lever le blocage plugin côté poste. Piste protocolaire :
`correction-port-8088.md` — mesurer le port réellement en écoute
(`Get-NetTCPConnection -State Listen -OwningProcess (Get-Process Revit).Id`) et
vérifier que le serveur Node vise bien ce port. Si l'écart est confirmé, c'est
l'incident déjà documenté. Sinon, réinstallation propre par `INSTALLA.bat`
(Revit fermé) puis `diagnose.ps1`, sections hors n° 5.

Dès rétablissement, la mission repart directement à l'étape « niveaux » : le
relevé de l'existant ci-dessus est fait et n'est pas à refaire.
