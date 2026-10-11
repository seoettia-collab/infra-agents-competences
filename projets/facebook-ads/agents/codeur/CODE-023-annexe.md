# CODE-023 — preuves et limites — 2026-10-11

## Références Git réellement utilisées

- Gouvernance lue au démarrage après fetch/reset : `677d51c457d5581417a9569a48c16633a9993601`.
- Gouvernance avant dépôt du rapport après nouveau fetch/reset : `0ba8b4621b2f054c733e2cbf3468dc6f231b5abe`.
- Aucun changement des trois fichiers de consignes entre ces deux HEAD.
- Backend base main : `802338d21cc966f6b35ce3cbe777b8215bdd83e6`.
- Backend livré : `e14a49986303f46471de6151d87cc65d27392195`.
- Frontend base main : `014800d10f225cc82d2943b02870e49f9f4038ad`.
- Frontend livré : `4e6e02b0655743afccc743506c3bb803788562d3`.
- Branche dans chaque dépôt : `code-023-sms-manuel`.
- Push effectué après add, commit, fetch et rebase origin/main.
- ls-remote confirme les deux commits livrés ; les deux main gardent leurs commits de base.
- Identité des commits : Ricardo ETTIA, ricardoettiadocuments@gmail.com.
- Branche saas jamais récupérée ni modifiée.

## A — authentification et réception

- Comparaison de la fonction du commit backend de base et de la branche sans SMS_GATEWAY_TOKEN : avant true ; après false.
- La version de base compare une valeur x-gateway-token ou query token ; elle ne vérifie pas X-Signature.
- La Signing Key Android produit un HMAC-SHA256 sur le corps HTTP brut suivi de X-Timestamp.
- validateWebhookToken vérifie maintenant ce HMAC avec SMS_GATEWAY_TOKEN, en temps constant.
- Absence de clé, signature absente/malformée, corps modifié, timestamp absent ou décalé de plus de cinq minutes : refus.
- Aucun accès par simple token statique ou query token.
- Tests HTTP de la route réellement extraite de server.js sur serveur Express local et SQLite temporaire : 401 non signé, 200 signé.
- SMS d'un lead connu enregistré ; STOP active l'opt-out ; répétition de l'événement ne crée pas de doublon.
- Expéditeur inconnu : 200 avec reason not_a_lead, sans création de lead.
- En production, un POST non signé system:ping renvoie 401 ; aucun SMS ni lead créé par ce contrôle.
- Les deux valeurs de Signing Key sont déclarées identiques par la mission du Pilote/Gérant ; aucune lecture ou régénération de secret.
- La réception réelle avec la nouvelle version reste NOT_CHECKED : aucune autorisation de déploiement.
- Journaux de production antérieurs : sms:received à 17:29:57 UTC, puis filtre not_a_lead ; cela prouve la réception avant correction, pas après.

## B — suppression de l'envoi automatique

- services/syncService.js : suppression de la programmation des nouveaux leads, du rattrapage et de la lecture AUTO_SMS_ENABLED/settings auto_sms_enabled.
- routes/webhook.js : extraction du téléphone conservée ; programmation SMS après extraction retirée.
- server.js : démarrage des relances J+1 retiré.
- services/auto-sms-service.js : file, timers, envoi automatique, génération interne pour ces envois et relances supprimés.
- Constantes SMS_SIGNATURE, MMS_IMAGE_URL, OPT_OUT_LINE et détection STOP conservées.
- routes/comms.js : anciennes routes /auto-sms/status et /auto-sms/toggle supprimées.
- index.html et js/conversions.js : bouton, requêtes, fonctions et chargement Auto-SMS supprimés.
- Test frontend existant adapté à la disparition de sa borne d'extraction.
- Tests : nouveau lead persisté sans appel à l'automatisation ; envoi manuel avec signature conservé ; anciennes routes absentes.
- Rédaction assistée dans routes/ai.js, Rédacteur IA et autres actions du dashboard conservés.
- Aucune variable Render créée, supprimée ou modifiée pendant cette livraison de branches.

## C — causes et correction du statut Pending

- L'envoi persiste l'état initial Pending renvoyé par SMSGate.
- Le webhook de base ignore tous les événements autres que sms:received.
- GET /debug/sms-webhooks en production : success true, fixed false, un seul abonnement sms:received au backend de production.
- Aucun abonnement sms:sent, sms:delivered, sms:failed ou sms:cancelled dans cette liste.
- Correction : traitement de ces quatre événements et recherche par payload.messageId, jamais par l'id du callback.
- Mise à jour réservée aux lignes SMS/MMS ; les appels vocaux ne changent pas.
- Statuts stockés en minuscules ; événement sent tardif ne rétrograde pas delivered, failed ou cancelled.
- SMS multipart : sms:delivered est émis par segment ; GET /messages/{id} fournit l'état global avant d'afficher delivered.
- Échec du contrôle d'état ou message pas encore persisté : HTTP 503, afin que la passerelle puisse réessayer.
- Réparation préparée dans /debug/sms-webhooks : abonnements absents créés pour le device configuré ; aucun doublon au deuxième appel.
- Aucun abonnement de production modifié pendant la mission.
- Tests : sent, failed, cancelled, livraison partielle puis complète, doublon, callback tardif, erreur API, id absent et exclusion d'une ligne call.
- La disparition de Pending sur un vrai envoi reste NOT_CHECKED avant déploiement et activation des abonnements.

## D — état des données observé

- Render consulté exclusivement avec workspace tea-d4qdtsali9vc739s5000 et service srv-d6cq3hi4d50c73aa1rkg.
- Identité vérifiée : mistral-pro-reno-backend, dépôt backend main, disque /var/data.
- Aucun appel au service srv-d7139du3jp1c7390flq0.
- Journaux : création de test_A_1791739771179 et test_B_1791739771179 le 11/10 à 17:29:31 UTC.
- Journaux : cleanup-all-tests exécuté à 18:18:56 UTC, self_sms=1 et test_leads_prefix=2, total=3.
- Deux DELETE ciblés sur ces IDs répondent 404 : ils sont déjà absents ; aucune suppression supplémentaire effectuée.
- /api/comms/history pour chacun de ces deux IDs : success true, total 0.
- /debug/recent-inbound-sms : entrants total 0, entrants 24h 0, sortants SMS 24h 0.
- /api/comms/flux-echanges?limit=1000 : success true, total 130, 130 lignes retournées, toutes de type messenger, aucune contenant CODE-021.
- Le compteur flux n'est pas un comptage SQL exhaustif de toutes les tables.
- Le contrôle /api/facebook/leads a expiré ; cette route peut déclencher le fallback de synchronisation sur une base vide.
- Le nombre global actuel de leads n'est donc pas confirmé ; aucune affirmation de base entièrement vide.
- Les trois objets CODE-021 sont déjà nettoyés ; les 130 échanges Messenger ne sont pas supprimés car hors du nettoyage ciblé.
- Aucun nouveau lead, SMS sortant ou appel réel de test créé par cette mission.

## Vérification technique

- Runtime téléchargé et utilisé : Node v20.11.1.
- npm ci puis npm rebuild better-sqlite3 réussis sous ce runtime.
- Backend : DATA_DIR=/tmp/code023-tests PORT=3023 node --test tests/*.test.js : 75 tests, 75 réussites, zéro échec.
- Frontend : DATA_DIR=/tmp/code023-frontend PORT=3024 node --test tests/*.test.js : 2 tests, 2 réussites.
- Nouveau test webhook : SQLite isolée dans /tmp, accès au répertoire persistant neutralisé dans la doublure fs.
- Services externes simulés dans les tests ; aucune écriture Meta, aucun appel SMS/vocal réel.
- node --check réussi sur les huit fichiers JS backend modifiés et les deux fichiers JS frontend modifiés avant commit.
- index.html : aucun script inline à vérifier ; bouton Auto-SMS absent, bouton Rédacteur IA présent.
- git diff --check réussi dans les deux dépôts.
- Dépôts de code propres après commit/push.
- Aucun secret Git ajouté au diff ; aucune valeur de secret dans cette annexe.

## Vérifications à effectuer après décision du Gérant

1. Le Gérant autorise puis effectue le merge/déploiement des deux branches.
2. Sur le seul backend de production, GET /debug/sms-webhooks vérifie et enregistre les cinq événements nécessaires.
3. Vérifier un SMS entrant réel : signature acceptée ; stockage si lead connu, filtre not_a_lead attendu si inconnu.
4. Si la réception casse, revenir immédiatement à la version précédente et consigner l'échec ; ne pas changer la Signing Key.
5. Vérifier le statut d'un SMS envoyé manuellement, puis nettoyer uniquement ses éventuelles données de test.
6. Le Pilote arbitre séparément le retour global à zéro des échanges Messenger.

## Sources techniques primaires consultées

- https://docs.sms-gate.app/features/webhooks/ — HMAC et abonnements par événement.
- https://docs.sms-gate.app/features/status-tracking/ — état global du message.
- Les observations de production proviennent du service et des endpoints ci-dessus, pas de ces sources.
