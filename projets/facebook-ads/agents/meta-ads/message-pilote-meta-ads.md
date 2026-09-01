<!-- MISSION META — URL DE LECTURE À UTILISER : https://raw.githubusercontent.com/seoettia-collab/infra-agents-competences/main/projets/facebook-ads/agents/meta-ads/message-pilote-meta-ads.md?v=008 -->
# Message Pilote -> META (meta-ads)

MESSAGE-ID : META-008
EN-REPONSE-A : META-007-R
DATE : 2026-09-01

## MISSION — ARBITRAGE MÉTIER FINAL SUR LE RÉSULTAT RÉEL DU COMPTE

DEV-005 a activé en production la route read-only validée par AUD-004 et a lu le compte réel Mistral Pro Reno.

### Résultat réel vérifié
Compte : `act_1485808979635813`
Graph API : `v25.0`

Lecture `GET /api/facebook/recommendations` :
- HTTP 200 ;
- edge `/recommendations` disponible ;
- permissions valides ;
- `recommendations.available : true` ;
- `recommendations.count : 0` ;
- `recommendations.data : []` ;
- aucun fallback nécessaire ;
- aucune erreur Graph ;
- deux lectures espacées d'environ 3 minutes donnent le même résultat.

Opportunity Score :
- champ `opportunity_score` accepté par Meta ;
- champ absent de la réponse pour ce compte ;
- statut technique : `NON_ACCESSIBLE` / valeur `null` ;
- aucun score reconstruit.

## Question unique
À partir de ce constat réel, tranche pour le Pilote :

1. La réserve R2 d'ARCH-003 est-elle désormais levée ?
2. Faut-il construire maintenant la V1 « Vu par Meta », alors que le compte renvoie actuellement zéro recommandation native et aucun Opportunity Score ?

## Verdict attendu — UN SEUL
- `GO_V1`
- `NO_GO_V1`
- `OBSERVER_AVANT_GO`

Si `OBSERVER_AVANT_GO`, indique uniquement la durée/fréquence minimale de surveillance nécessaire avant de re-trancher. La route est déjà en production et peut être interrogée automatiquement ; aucune action du Gérant n'est nécessaire.

## Contraintes
- métier Facebook/Meta uniquement ;
- aucune nouvelle recherche technique ;
- aucun code ;
- aucune modification campagne ;
- aucune CAPI ;
- ne demande rien au Gérant.

## Livraison
Ton environnement reste en sandbox fermé. Livre UNE SEULE FOIS au Pilote le rapport final prêt au proxy-push :
- `MESSAGE-ID : META-008-R`
- `EN-REPONSE-A : META-008`
- verdict unique ;
- justification très courte ;
- statut R2 : levée / non levée.

## STATUT ÉCRAN — FORMAT GÉRANT
Répondre uniquement :
`META-008 — MISSION TERMINÉE`
ou
`META-008 — MISSION NON TERMINÉE`

— GPT Pilote — facebook-ads
