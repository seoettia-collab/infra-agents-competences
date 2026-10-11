CODE-020 | 2026-10-11 | v1.0
VERDICT : ARRÊT — poser SMS_GATEWAY_TOKEN couperait les SMS entrants avec le mécanisme actuel.

| N° | Point demandé | OK / NON | Ce qu'on a vu (1 ligne) | Ce qu'il faut (1 ligne) |
|---|---|---|---|---|
| 1 | Lire le code de validation du webhook SMS | OK | Sans SMS_GATEWAY_TOKEN, validateWebhookToken() retourne true : toute requête passe ; aucun refus ni avertissement dans ce validateur. | Rien. |
| 2 | Décider du comportement sûr | OK | Le webhook doit échouer fermé, mais pas avec le token brut actuel : SMSGate signe nativement les webhooks en HMAC. | Passer à la vérification HMAC X-Signature + X-Timestamp avant de fermer le webhook. |
| 3 | Générer et poser un token sur Render production | NON | Non exécuté : le service SMSGate n'envoie pas x-gateway-token et l'ajout côté Render ferait rejeter les vrais SMS. | Ne rien poser tant que le mécanisme côté passerelle n'est pas compatible. |
| 4 | Vérifier que la passerelle transmet le token | NON | Le code d'enregistrement envoie seulement url, event, device_id ; la documentation SMSGate décrit X-Signature/X-Timestamp, pas notre token brut. | Récupérer/configurer la signing key sur l'appareil et implémenter la vérification HMAC côté backend. |
| 5 | Tester refus sans token / acceptation avec bon token | NON | Sonde Node 20.11.1 actuelle : absent=true, mauvais=false, bon=true ; le cas demandé « absent=refus » n'existe pas encore. | Implémenter le fail-closed avec HMAC puis rejouer les deux tests. |
| 6 | Supprimer PURGE_ENABLED, ALLOWED_ORIGINS, FB_APP_ID | NON | Dernier grep main : aucune lecture runtime des trois noms ; suppression non exécutée car arrêt obligatoire en partie A. | Retirer ces trois variables lors d'une mission séparée ou après sécurisation du webhook. |

DÉFAUTS À CORRIGER
1. Le webhook SMS entrant accepte tout quand aucun secret local n'est configuré.
2. Le commentaire du code parle d'une signature HMAC SMSGate, mais cette signature n'est actuellement pas vérifiée.
3. SMS_GATEWAY_TOKEN est un mécanisme maison que la passerelle SMSGate Cloud ne transmet pas dans les webhooks enregistrés.
4. PURGE_ENABLED, ALLOWED_ORIGINS et FB_APP_ID restent orphelines sur Render production.

NON FAIT
Aucun token généré ou posé, aucune variable supprimée, aucun code modifié, aucun déploiement ni redémarrage — arrêt avant toute action risquant de couper la réception SMS.

FICHIERS
- projets/facebook-ads/agents/codeur/message-codeur-pilote.md

MISSION TERMINÉE — CODE-020 / ARRÊT / projets/facebook-ads/agents/codeur/message-codeur-pilote.md
