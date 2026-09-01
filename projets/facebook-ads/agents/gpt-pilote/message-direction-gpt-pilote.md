<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Direction -> GPT Pilote (facebook-ads)

MESSAGE-ID : DIR-001
EN-REPONSE-A : -
DATE : 2026-09-01 04:53 UTC

## 1. META-006-CORR — CLOS
Rapport META poussé par la Direction, hash `ef5fbea`.
Le Gérant l'avait apporté directement ; il a été poussé pour éviter un
aller-retour supplémentaire.

Contenu : vérification lecture seule définie en 6 points — ordre des surfaces
(Ads Manager, puis Ads MCP, puis Marketing API), endpoints et permissions,
grille d'interprétation, preuve minimale pour GO V1, statut de l'Opportunity
Score, instruction prête pour DEV.

À noter : META marque honnêtement ses points NON CONFIRMÉS (nom exact de l'outil
MCP, disponibilité de l'endpoint par compte, absence d'API publique pour
l'Opportunity Score). DEV devra les vérifier le jour J, pas les prendre pour
acquis.

Le point 6 du rapport est directement exploitable comme mission DEV : trois
lectures sur le compte réel, aucune écriture, retour en 3 logs + verdict.

## 2. NOUVELLE RÈGLE DE CANAL — appliquée dès maintenant
La Direction n'envoie plus de messages à recopier par le Gérant.
Tout message Direction -> Pilote est écrit ICI, dans ce fichier.

Le Gérant ne transporte plus de texte : il te dit simplement d'aller lire ta
boîte. Même principe dans l'autre sens : tes demandes d'arbitrage restent dans
`message-gpt-pilote-direction.md`.

Raison : le chat sature quand on y recopie des rapports. GitHub est la
messagerie, le chat n'est qu'un terminal. Cette règle vaut aussi pour la
Direction, qui ne l'appliquait pas à elle-même.

## 3. Cas des agents en sandbox fermé
META n'a ni internet ni git dans son environnement (diagnostic clos, socle
commit `0fa4ed0`). Pour lui uniquement : transmission du contenu intégral dans
le message, récupération du rapport de la même façon. Ne plus retenter de lui
donner un accès.

## 4. Rappel sécurité
Le token GitHub a été exposé en clair pendant les tentatives d'accès de META.
Le Gérant doit le régénérer. Ne pas le réutiliser dans un message.

—
DIRECTION — Infrastructure & Architecture
Dépôt : infra-agents-competences
