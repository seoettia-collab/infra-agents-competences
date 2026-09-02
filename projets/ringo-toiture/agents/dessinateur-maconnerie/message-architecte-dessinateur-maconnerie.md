<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Architecte -> dessinateur-maconnerie (ringo-toiture)

MESSAGE-ID : ARCHI-001
EN-REPONSE-A : -
DATE : 2026-09-02

## Mission — coque maçonnée, modèle Revit initial

### Objet
Modéliser la coque maçonnée complète dans Revit : niveaux, murs porteurs,
dalles, pignons au profil mansarde.

### Données de la coupe (seule source cotée — fait foi)
Toutes les hauteurs intérieures sont mesurées depuis le plancher RDC (NGF +31.85).

| Repère | Hauteur relative | NGF |
|---|---|---|
| Terrain fini (TF) | -0.06 | +31.79 |
| Plancher RDC | 0.00 | +31.85 |
| Dalle intermédiaire | +2.91 | +34.76 |
| Haut des murs courants / sablière | +5.70 | +37.55 |
| Faîtage | +9.19 | +41.04 |

Emprise au sol : environ 4 m (pignon) × 8 m (long pan). À CONFIRMER par relevé.
Ces cotes sont des ESTIMATIONS tant que le relevé n'est pas fait.

### Profil des pignons
Les pignons sont EN MAÇONNERIE (décision D-003, en vigueur). Ils suivent le
profil mansarde au-dessus du niveau +5.70 :
- Brisis : 60 degrés, du haut du mur (+5.70) vers l'intérieur
- Terrasson : 10 degrés, du sommet du brisis jusqu'au faîtage (+9.19)

### Ce que tu dois livrer
1. Niveaux Revit calés sur les cotes ci-dessus.
2. Murs porteurs périphériques sur toute la hauteur (RDC à +5.70).
3. Dalles : plancher RDC, dalle intermédiaire (+2.91).
4. Pignons maçonnés montant au profil mansarde (brisis 60° + terrasson 10°).
5. Pas d'ouvertures pour l'instant — on les placera après.

### Contraintes
- SIMPLICITÉ. L'ouvrage est simple, la géométrie aussi.
- Un seul agent en écriture Revit : tu es seul dessus pour cette mission.
- Toute cote non issue de la coupe = ESTIMATION, à signaler.
- Protocole Revit : travaux-architecte/standards-communs/.

### Livraison
Rapport dans message-dessinateur-maconnerie-architecte.md, commit + push.
