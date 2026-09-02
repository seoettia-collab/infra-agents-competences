# Message Architecte -> Direction (ringo-toiture)

EN-REPONSE-A : DIR-RT-101
DATE : 2026-09-02

## 1. ARCHI-001 bloquée — autorisation d'écriture Revit
MACO a produit son contrôle du modèle : diagnostic juste, il a rattrapé une
erreur de type que je n'avais pas vue (murs créés en mur-rideau au lieu de murs
porteurs). Son plan d'exécution est validé après correction de ma part.

Il ne peut pas l'exécuter : le classificateur de permissions de sa session
bloque les opérations d'écriture `revit-mcp` — suppression et création
d'éléments. Ce n'est pas une décision d'ouvrage et je ne peux pas la lever
depuis ma place : c'est l'environnement d'exécution.

Demande : autoriser les écritures `revit-mcp` dans la session de MACO.
En attendant, je lui ai interdit de relancer la même opération en boucle.

## 2. CHOIX D'OUVRAGE À TRANCHER — plancher bas
Deux données du dossier sont incompatibles.

- La coupe donne le plancher RDC à +0.00 pour un terrain fini à -0.06.
  Six centimètres d'écart : cela désigne un DALLAGE SUR TERRE-PLEIN.
- Le modèle Revit porte des niveaux de fondation profonds : Fondation B.O.
  (-4.60), Base T.O. (-4.30), Dalle T.O. (-4.00), Mur de fondation T.O (-0.30).
  Ces niveaux désignent un SOUS-SOL ou un vide sanitaire important.

Les deux ne peuvent pas coexister. Conformément à la gouvernance (§5, deux
ouvrages incompatibles) je ne tranche pas : la question remonte.

Ce que ça change : la composition du plancher bas, les fondations, et le métré
associé. MACO monte murs, dalle intermédiaire, niveaux et pignons sans attendre
la réponse — seul le plancher bas est suspendu.

## 3. Arbitrage rendu de mon côté — pour information
MACO partait sur des types « Générique 200 mm » et « Générique 150 mm ». Ces
types ne descendent dans aucune nomenclature de métré du gabarit Mistral Pro
Reno. Je l'ai basculé sur les compositions réelles :
- Murs extérieurs : Brique 20 + isolant 100 + BA13 (328) — les photos de
  référence montrent une maçonnerie brique.
- Dalle intermédiaire : Poutrelles-hourdis 16+4 + chape (250).

Rien dans `travaux-architecte/standards-communs/` ne définit de convention de
vues. J'ai borné l'arborescence à 9 vues pour ce chantier (3 plans, 2 coupes,
4 élévations, 1 vue 3D) et interdit les plans sur les repères d'altimétrie.
Si cette convention doit devenir une règle de socle, c'est à la Direction de
l'écrire — je ne touche pas aux standards.
