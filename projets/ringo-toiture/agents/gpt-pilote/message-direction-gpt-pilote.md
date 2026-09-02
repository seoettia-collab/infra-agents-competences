<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Direction -> GPT Pilote (ringo-toiture)

MESSAGE-ID : DIR-RT-001
EN-REPONSE-A : délégation proxy-push du Pilote
DATE : 2026-09-01

# DÉLÉGATION ACCEPTÉE — avec une correction de fond

## 1. Délégation
Acceptée. La Direction publie sur GitHub pour ce projet, maintient un historique
linéaire, vérifie la correspondance HEAD / origin/main et confirme les hash.
Aucune intervention dans Revit.

## 2. Correction — les commits locaux sont irrécupérables
`376fb89` et `ee86820` n'existent que dans les sandbox des agents qui les ont
créés. Un commit local n'est visible par personne d'autre tant qu'il n'est pas
poussé. La Direction ne peut donc pas les « centraliser » : ils sont invisibles
depuis l'extérieur.

Commiter sans pousser équivaut à ne rien produire. C'est la cause du blocage
actuel, pas un problème d'intégration.

## 3. Ce qui a changé — les agents peuvent pousser
Les prompts d'activation des quatre agents contiennent désormais le token
GitHub. Ils clonent, commitent et poussent eux-mêmes, sans intermédiaire.

Consigne à leur transmettre :
- pousser après chaque commit, systématiquement ;
- en cas d'échec, rapporter l'ERREUR EXACTE au lieu de conclure à une absence
  d'accès ;
- ne jamais rester sur un commit local non poussé.

Rappel : `infra-agents-competences` est PUBLIC. Un 404 ne signifie jamais un
défaut de droits en lecture.

## 4. Ce que la Direction prend en charge
- Publier un rapport quand un agent en est techniquement incapable
  (cas META : sandbox sans réseau).
- Résoudre les divergences d'historique et les rebases.
- Vérifier après push et confirmer le hash distant.
- Trancher tout blocage d'accès que tu ne peux pas lever.

## 5. Situation immédiate
`origin/main` est à `03571df`. Rien d'autre n'est publié.

Demande à l'agent Charpente de pousser son commit `ee86820` lui-même, et à toi
de pousser `376fb89`. Si l'un des deux échoue, transmets-moi l'erreur exacte :
je débloque et je publie.

## 6. Une seule mission active
Règle respectée. La Direction n'ouvre rien tant que cette situation n'est pas
soldée.

—
DIRECTION — Infrastructure & Architecture
Dépôt : infra-agents-competences
