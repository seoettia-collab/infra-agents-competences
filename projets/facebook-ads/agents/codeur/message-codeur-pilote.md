CODE-021 | 2026-10-11 | v1.0
VERDICT : ARRÊT — SMS sortant livré, mais SMS entrant non enregistré sur base vide et chaîne voix non testée réellement.

| N° | Point demandé | OK / NON | Ce qu'on a vu (1 ligne) | Ce qu'il faut (1 ligne) |
|---|---|---|---|---|
| 1 | SMS entrant : route réelle et message de 19h02 | NON | Route réelle GET /api/comms/flux-echanges?type=sms ; webhook reçu à 19h02 puis [INBOUND_SMS_GW_FILTERED] car aucun lead correspondant ; base SMS = 0. | Refaire le test avec un lead connu correspondant au numéro expéditeur. |
| 2 | SMS sortant : envoi, arrivée, enregistrement | OK | Gateway online/configured, Device ID présent ; envoi backend réussi au 1er essai ; SMSGate = Delivered ; historique DB contient 1 SMS avec provider_sid. | Prévoir la mise à jour du statut DB final, resté Pending malgré Delivered fournisseur. |
| 3 | Appel : configuration sortante et ligne entrante | OK | Runtime twilio_comms=true ; TWILIO_ACCOUNT_SID/AUTH_TOKEN/PHONE_NUMBER présents ; bridge, call-status et incoming existent ; aucun appel réel lancé. | Vérifier côté Twilio que le numéro pointe bien vers /webhook/twilio/incoming avant test réel. |
| 4 | Verdict par canal | NON | SMS entrant = cassé au niveau filtre applicatif ; SMS sortant = fonctionne ; appel = non testable bout-en-bout sans appel réel autorisé. | Ne pas relancer avant nouveau test entrant avec lead connu et nettoyage des données de test. |

DÉFAUTS À CORRIGER
1. Base vide + filtre FILTRE-LEAD-01 : tout SMS d'un numéro inconnu est accepté par le webhook puis ignoré avant insertion.
2. SMS_GATEWAY_TOKEN est absente : validateWebhookToken() accepte toute requête quand aucun token n'est configuré ; le message de 19h02 est passé ainsi.
3. Le statut outbound en base reste Pending alors que SMSGate confirme Delivered.
4. Le mapping VoiceUrl du numéro Twilio n'a pas été confirmé côté fournisseur ; le plugin Twilio Developer Kit n'est pas exposé dans cette session.
5. Deux leads test et un SMS test créés pour CODE-021 restent à nettoyer ; l'appel au nettoyage automatique a été bloqué par la couche de sécurité de l'outil.

NON FAIT
Aucun appel vocal réel ; aucun code modifié ; aucun déploiement ; nettoyage production des artefacts CODE-021 non exécuté.

FICHIERS
- projets/facebook-ads/agents/codeur/message-codeur-pilote.md

MISSION TERMINÉE — CODE-021 / ARRÊT / projets/facebook-ads/agents/codeur/message-codeur-pilote.md
