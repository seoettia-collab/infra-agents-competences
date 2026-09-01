# Message Pilote -> ingenieur-developpeur

MESSAGE-ID : DEV-012
EN-REPONSE-A : META-021-R
DATE : 2026-09-01

DIRECTIVE — AUDIT DU DASHBOARD POUR PRÉPARER LA CAMPAGNE SDB

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
META-021-R a défini la campagne Salle de bain à préparer avant lancement :
- 1 campagne Lead Ads ;
- 1 ad set ;
- budget 32 €/j ;
- zone Neuilly-sur-Marne + 20 km / Paris petite couronne ;
- audience broad 25-65+ ;
- placements Advantage+ ;
- formulaire Lead Ads qualifiant ;
- 2 publicités ;
- créas réelles chantier ;
- test webhook lead -> SMS avant GO.

Le Gérant rappelle que le projet possède déjà un dashboard. Avant toute manipulation manuelle dans Ads Manager ou tout développement, il faut savoir ce que le dashboard actuel sait réellement faire.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISSION — LECTURE / AUDIT UNIQUEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Auditer le backend `main` et le frontend `main` actuels et répondre, pour chacun des points suivants :

1. Créer une nouvelle campagne Meta Lead Ads depuis le dashboard.
2. Créer un nouvel ad set depuis le dashboard.
3. Régler depuis le dashboard : budget, zone géographique, âge, audience broad, placements.
4. Créer ou modifier un formulaire instantané Lead Ads avec questions de qualification.
5. Importer/choisir les 2 créas réelles (image/vidéo).
6. Créer les 2 nouvelles publicités dans l'ad set choisi.
7. Prévisualiser avant publication.
8. Publier en PAUSED ou ACTIVE depuis le dashboard.
9. Vérifier/réaliser un lead test et confirmer la chaîne webhook -> SMS T+2 min.
10. Lire ensuite les métriques et piloter J0/24/48/72 dans le dashboard.

Pour chaque point, classer strictement :
- `DÉJÀ SUPPORTÉ`
- `PARTIELLEMENT SUPPORTÉ`
- `NON SUPPORTÉ`

Pour chaque point partiel/non supporté, indiquer la pièce manquante exacte et l'action minimale recommandée.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTION DÉCISIONNELLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Conclure par :
A. Ce que le dashboard peut faire aujourd'hui sans aucun développement.
B. Ce que l'agent développeur devrait ajouter pour que le lancement SDB soit pilotable depuis le dashboard.
C. Ce qui doit obligatoirement rester une action du Gérant dans Meta Ads Manager, s'il y en a.
D. Est-il possible d'arriver à un flux où le Gérant fournit seulement les créas + donne le GO final ? OUI/NON, avec conditions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTRAINTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- AUDIT UNIQUEMENT : aucun code dans ce lot ;
- aucune écriture Meta ;
- aucune création/activation de campagne ;
- aucun déploiement ;
- SaaS gelé ;
- ne pas toucher CAPI ;
- ne pas exposer de secret ;
- le code `main` actuel fait foi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LIVRABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Remplacer `message-ingenieur-developpeur-pilote.md` par `DEV-012-R` avec le tableau des 10 capacités, les preuves (fichiers/routes/fonctions) et la recommandation finale.

## STATUT ÉCRAN
Répondre uniquement :
`DEV-012 — MISSION TERMINÉE`
ou
`DEV-012 — MISSION NON TERMINÉE`

— GPT Pilote — facebook-ads
