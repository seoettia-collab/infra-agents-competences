DIAG-008 | 2026-10-25 | v1.0 | EN-REPONSE-A : DIAG-008 / GPT-ADS-001
VERDICT : NON — France éligible ; parcours site → dashboard → alerte gérant pas prêt.

| N° | Point demandé | OK / NON | Ce qu'on a vu (1 ligne) | Ce qu'il faut (1 ligne) |
|---|---|---|---|---|
| 1 | France éligible | OK | [SÛR] France disponible depuis l'expansion européenne, avant le 21/10 (O1/O2). | [À VÉRIFIER] Compte Mistral, validation et facturation. |
| 2 | Existant dashboard | OK | [SÛR] leads, raw_fields, routes /api/facebook/leads et statut « devis signé ». | [À VÉRIFIER] Réception site, champs multiples et suivi chantier distinct. |
| 3 | SMS et conservation | NON | [SÛR] Facebook enregistré avant SMS ; route prospect marque « contacté ». | Alerte interne SMSGate distincte, échec visible sans perte ; destinataire à confirmer. |
| 4 | Formulaire / provenance / doublons | NON | [SÛR] PR 1 brouillon vers n8n ; déduplication par ID, pas multicanale. | Remise CRM, origine fiable, conservation des projets et reconnaissance des rejeux. |
| 5 | API OpenAI et limites | OK | [SÛR] Lecture/gestion documentées ; optimisation et provisioning sous permissions. | [À VÉRIFIER] Droits du compte et divergence documentaire sur conversions. |

DÉFAUTS À CORRIGER
1. [SÛR] Destination n8n non retenue, aucun raccordement dashboard démontré.
2. [SÛR : mécanisme ; À VÉRIFIER : occurrence] Un lead site peut avancer le filtre Facebook ; rattrapage auto-SMS sans filtre d'origine.
3. [SÛR] Une alerte gérant via la route SMS prospect donnerait un faux statut « contacté ».
4. [SÛR] Déduplication multicanale, provenance et conservation des choix multiples non assurées.

PREMIER LOT
[À VÉRIFIER — à réaliser] Formulaire → CRM existant → alerte gérant SMSGate : enregistrement durable indépendant du SMS, champs complets, rejeux maîtrisés, historique multicanal et non-régression Facebook. Pas de gestion publicitaire nécessaire à ce lot.

NON FAIT
Compte/production, remise réelle, SMS et recette non testés ; étude uniquement, aucun code ni déploiement.

FICHIERS
projets/facebook-ads/documentation/ETUDE-GPT-ADS.md — preuves, accès manquants, sources O1–O9 datées, premier lot et recette.
Pré-vol hub : 58b45297a77d2befce77bc1debd5afa29b61f1f7 ; hashes code et PR dans l'étude.
Livraison : diag-008-rapport, sans fusion ; repli autorisé après refus de main lors de DIAG-006.

MISSION TERMINÉE — DIAG-008 / NON / projets/facebook-ads/agents/diagnostic/message-diagnostic-pilote.md
