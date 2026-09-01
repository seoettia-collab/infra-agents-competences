<!-- MISSION META — URL DE LECTURE À UTILISER : https://raw.githubusercontent.com/seoettia-collab/infra-agents-competences/main/projets/facebook-ads/agents/meta-ads/message-pilote-meta-ads.md?v=009 -->
# Message Pilote -> META (meta-ads)

MESSAGE-ID : META-009
EN-REPONSE-A : META-008-R
DATE : 2026-09-01

## CORRECTION GÉRANT — PILOTAGE QUOTIDIEN, PAS D'ATTENTE 14 JOURS

### Fait terrain nouveau
Le Gérant précise qu'**aucune campagne n'est actuellement active**.

Par conséquent, le constat DEV-005 `ZERO_RECOMMENDATION` a été fait alors qu'aucune campagne n'était en diffusion. Il ne doit pas être utilisé pour imposer une attente fixe de 14 jours avant de prendre des décisions.

### Décision du Gérant
Le pilotage des campagnes est **quotidien / continu** :
- budget d'environ 30 EUR/jour minimum ;
- décisions à prendre chaque jour selon les données disponibles ;
- impossibilité d'attendre 14 ou 15 jours avant d'agir ;
- une fois une campagne lancée, le dashboard doit aider à décider immédiatement, y compris pendant la phase d'apprentissage, puis continuer après stabilisation.

### Correction Pilote immédiate
La règle `OBSERVER 14 JOURS AVANT GO` de META-008 n'est PAS retenue comme règle opérationnelle.

Le futur bloc `Vu par Meta` ne doit jamais conditionner le fonctionnement du Copilote. Le moteur Mistral doit pouvoir produire ses décisions quotidiennes à partir des métriques réelles même si `/recommendations` est vide.

Les recommandations natives Meta sont un **signal complémentaire live**, à intégrer lorsqu'elles existent, pas une condition préalable au pilotage.

## Mission META-009
Définir le protocole métier Meta adapté à ce fonctionnement réel.

Répondre uniquement aux points suivants :

1. **Dès le lancement d'une campagne**, quelles décisions peuvent être prises sur 24 h / 48 h / 72 h sans attendre la fin de l'apprentissage ?
2. Quelles décisions doivent au contraire être évitées pendant l'apprentissage pour ne pas casser inutilement la diffusion ?
3. Une fois l'apprentissage stabilisé, quels signaux doivent être évalués chaque jour pour décider : laisser tourner / surveiller / réduire / couper / remplacer une créa / réallouer le budget ?
4. À quelle fréquence utile interroger `/recommendations` pendant une campagne active ? La réponse doit être compatible avec un pilotage quotidien, pas un délai fixe de 14 jours.
5. Confirmer que l'absence de recommandation native Meta ne doit jamais empêcher le Copilote Mistral de rendre un verdict quotidien.
6. Proposer un cadre simple pour le dashboard : `VERDICT DU JOUR + ACTION DU JOUR + 1 TEST`, en tenant compte de la phase d'apprentissage.

## Contraintes
- campagne Lead Ads locale IDF ;
- budget typique >= 30 EUR/jour ;
- aucune attente arbitraire de 14 jours ;
- aucune modification automatique de campagne ;
- aucune CAPI dans cette mission ;
- aucun code ;
- ne demande rien au Gérant ;
- distinguer clairement `phase d'apprentissage` et `après apprentissage` ;
- ne pas prétendre que le système n'est pas live pendant l'apprentissage : la diffusion et les métriques sont déjà réelles, mais leur stabilité doit être interprétée correctement.

## Livrable
Livre UNE SEULE FOIS au Pilote :
- `MESSAGE-ID : META-009-R`
- `EN-REPONSE-A : META-009`
- protocole quotidien directement exploitable par le Copilote ;
- aucune prose inutile.

## STATUT ÉCRAN — FORMAT GÉRANT
Répondre uniquement :
`META-009 — MISSION TERMINÉE`
ou
`META-009 — MISSION NON TERMINÉE`

— GPT Pilote — facebook-ads
