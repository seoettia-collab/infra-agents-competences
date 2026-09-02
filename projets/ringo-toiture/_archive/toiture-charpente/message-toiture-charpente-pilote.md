# Message toiture-charpente -> Pilote (ringo-toiture)

MESSAGE-ID : TOIT-005-CONTROLE-PROFIL-MANSARDE-R
DATE-HEURE : 02/09/2026 — Europe/Paris
ÉMETTEUR : Toiture / Charpente
DESTINATAIRE : GPT Architecte — Pilote
EN-REPONSE-A : TOIT-005-CONTROLE-PROFIL-MANSARDE
STATUT : TERMINÉ
SUJET : Contrôle géométrique du profil mansardé — comparaison DESS-008 vs arbitrage Gérant

---

## 1. Contrôle du profil DESS-008 (70° / 18° / retrait 800 mm)

Calcul trigonométrique pour une demi-largeur de 2000 mm, arase à +6000 :

- Brisis 70° sur 800 mm de retrait → élévation = 800 × tan 70° = **2198 mm**
- Ligne de bris = +6000 + 2198 = **+8198** ✓ cohérent avec DESS-008
- Terrasson 18° sur 1200 mm restants → élévation = 1200 × tan 18° = **390 mm**
- Faîtage calculé = +8198 + 390 = **+8588**

DESS-008 annonçait un faîtage à +8555 : **écart de 33 mm** (probablement un
arrondi intermédiaire dans DESS-008, non bloquant mais à signaler).

### Diagnostic

Le profil 70° / 18° produit une hauteur totale de **2588 mm** au-dessus de
l'arase, soit un ratio hauteur/largeur de **0,65**. C'est un profil raide et
disproportionné pour un volume de 4 m de large :

- le brisis à 70° est quasi-vertical (mur incliné, pas une pente de toiture) ;
- le terrasson à 18° est trop pentu pour un terrasson de mansarde classique ;
- le sommet apparaît haut et resserré, exactement comme le Gérant l'a observé.

**Conclusion : profil 70° / 18° non recommandé.** L'observation du Gérant est
confirmée par les proportions.

---

## 2. Contrôle du profil arbitré (60° / 10° / retrait 900 mm)

- Brisis 60° sur 900 mm de retrait → élévation = 900 × tan 60° = **1559 mm**
- Ligne de bris = +6000 + 1559 = **+7559** ✓
- Terrasson 10° sur 1100 mm restants → élévation = 1100 × tan 10° = **194 mm**
- Faîtage calculé = +7559 + 194 = **+7753**

La mission annonçait des valeurs attendues de +7559 / +7735 / 1735 mm. Écarts
constatés :

| Valeur | Attendu mission | Calculé | Écart |
|---|---|---|---|
| Ligne de bris | +7559 | +7559 | 0 mm |
| Faîtage | +7735 | +7753 | +18 mm |
| Hauteur totale | 1735 mm | 1753 mm | +18 mm |

L'écart de 18 mm sur le faîtage provient vraisemblablement d'un arrondi dans
les valeurs « environ » de la mission. **Non bloquant.** Les valeurs calculées
(+7559 / +7753 / 1753 mm) sont les valeurs exactes à retenir pour la maquette.

### Diagnostic

- ratio hauteur/largeur : **0,44** — proportion classique de mansarde ;
- brisis 60° : pente standard de mansarde parisienne, constructivement éprouvée ;
- terrasson 10° : pente très douce en partie haute, lisible et classique ;
- hauteur totale de 1753 mm : modérée et proportionnée au volume 4 × 8 m ;
- 835 mm de moins que le profil DESS-008 → silhouette nettement plus équilibrée.

**Conclusion : profil 60° / 10° / retrait 900 mm validé techniquement.**

---

## 3. Tableau comparatif

| Paramètre | DESS-008 (70/18/800) | Arbitré (60/10/900) |
|---|---|---|
| Angle brisis | 70° | **60°** |
| Angle terrasson | 18° | **10°** |
| Retrait horizontal | 800 mm | **900 mm** |
| Ligne de bris | +8198 | **+7559** |
| Faîtage | +8588 | **+7753** |
| Hauteur totale | 2588 mm | **1753 mm** |
| Ratio H/L | 0,65 | **0,44** |
| Marge oeil-de-boeuf | 868 mm | **229 mm** |
| Aspect | Raide, resserré au sommet | **Classique, proportionné** |

---

## 4. Compatibilité de l'oeil-de-boeuf (profil arbitré)

- Axe oeil-de-boeuf : +6800 (centré sur le pignon, x = 2000 mm)
- Haut du cercle Ø800 : +7200
- Encadrement maçonnerie estimé à 130 mm : haut encadrement à **+7330**
- Ligne de bris (interface chaînage rampant) : **+7559**
- **Marge verticale : 229 mm** avant prise en compte du chaînage rampant

L'oeil-de-boeuf est entièrement dans la zone de brisis du pignon. L'axe à
+6800 place le centre 800 mm au-dessus de l'arase, ce qui laisse un cadrage
symétrique et lisible.

La marge de 229 mm est **suffisante** pour un chaînage rampant standard
(section courante 150–200 mm dans un ouvrage de principe). Elle reste cependant
serrée : toute augmentation de l'encadrement ou du chaînage au-delà des
estimations réduirait cette marge. **À confirmer au relevé.**

Le bas de l'encadrement se situe à +6270, soit 270 mm au-dessus de l'arase :
la maçonnerie de pignon sous l'oeil-de-boeuf est suffisante.

**Conclusion : axe à +6800 conservable avec le profil arbitré.**

---

## 5. Interface exploitable pour charpente

Le profil 60° / 10° laisse une interface constructivement saine :

- **Sablière basse** : posée sur l'arase à +6000, en pied de brisis. Appui
  franc sur la tête de mur / dalle haute. Classique et direct.
- **Panne de bris** : à +7559, au droit du changement de pente. Interface
  nette entre brisis et terrasson. La panne porte les arêtiers ou les
  empannons de transition.
- **Faîtière** : à +7753, panne faîtière classique en axe.
- **Pannes intermédiaires** du brisis : à positionner entre +6000 et +7559
  selon l'entraxe retenu (à définir au dimensionnement). La pente à 60° impose
  des assemblages adaptés (embrèvement ou sabots).
- **Raccord couverture** : partie haute en zinc (terrasson 10° — zinc adapté
  aux faibles pentes), brisis en ardoise (60° — pose classique au crochet).
  La ligne de bris est le raccord naturel entre les deux matériaux.

**Aucune impossibilité constructive identifiée.**

---

## 6. Tableau de points du profil — pour correction des pignons par le Dessinateur

### Profil de pignon (demi-section symétrique)

| Point | Description | X (depuis bord gauche) | Z (altitude) |
|---|---|---|---|
| A | Égout gauche — départ brisis | 0 | +6000 |
| B | Ligne de bris gauche | 900 | +7559 |
| C | Faîtage — axe de symétrie | 2000 | +7753 |
| D | Ligne de bris droite | 3100 | +7559 |
| E | Égout droite — départ brisis | 4000 | +6000 |

### Oeil-de-boeuf (chaque pignon)

| Point | Description | X | Z |
|---|---|---|---|
| OdB | Axe oeil-de-boeuf | 2000 | +6800 |
| OdB-h | Haut encadrement (~130 mm) | 2000 | +7330 |
| OdB-b | Bas encadrement (~130 mm) | 2000 | +6270 |

### Angles et longueurs de rampant

| Segment | Angle / horizontal | Longueur rampant |
|---|---|---|
| A → B (brisis) | 60° | 900 / cos 60° = **1800 mm** |
| B → C (terrasson) | 10° | 1100 / cos 10° = **1117 mm** |

---

## 7. Valeurs de principe vs valeurs à confirmer au relevé

| Catégorie | Valeurs |
|---|---|
| **Valeurs de maquette (arbitrage Gérant)** | Brisis 60°, terrasson 10°, retrait 900 mm, ligne de bris +7559, faîtage +7753, oeil-de-boeuf Ø800 axe +6800 |
| **À confirmer au relevé** | Épaisseur réelle des murs de pignon, section exacte du chaînage rampant, dimensions de l'encadrement oeil-de-boeuf, entraxe des pannes, état et portance de l'arase existante |
| **Aucun arbitrage supplémentaire requis** | Le profil arbitré est constructivement cohérent. Pas de conflit identifié. |

---

WARN : écart de 18 mm entre le faîtage attendu (+7735) et le faîtage calculé
(+7753). Valeur calculée recommandée. Écart de 33 mm sur le faîtage DESS-008
(+8555 annoncé vs +8588 calculé) — confirme une imprécision dans DESS-008.

REVIT ENREGISTRÉ : SANS OBJET — mission de calcul, aucune modification Revit.

INFORMATIONS À SYNCHRONISER : profil de principe validé techniquement
(60° / 10° / 900 mm), tableau de points prêt pour correction pignons.

STOP.
