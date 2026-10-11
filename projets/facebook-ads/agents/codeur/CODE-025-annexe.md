# CODE-025 — preuves et reprise

- Gouvernance lue après pré-vol : e4d1366b5da478c0efe54f7beedafeb3e0fa90c1.
- Base backend : 802338d21cc966f6b35ce3cbe777b8215bdd83e6.
- Base frontend : 014800d10f225cc82d2943b02870e49f9f4038ad.
- Merge backend par avance rapide : e14a49986303f46471de6151d87cc65d27392195.
- Merge frontend par avance rapide : 4e6e02b0655743afccc743506c3bb803788562d3.
- Production Render exclusivement : srv-d6cq3hi4d50c73aa1rkg ; workspace tea-d4qdtsali9vc739s5000.
- CODE-023 live : dep-db5tql0ae00c73a2t0k0, trigger new_commit, 19:03:46 UTC.
- Netlify : site 04d5638d-0357-4f4c-a808-cfaada13a585 ; déploiement publié 6acbdd5f6a59be000850eafa, ready.
- /health : HTTP 200, healthy, sms_gateway configured.
- /debug/sms-webhooks : HTTP 200, fixed true, quatre abonnements créés : sms:sent, sms:delivered, sms:failed, sms:cancelled ; sms:received présent.
- Requête non signée sur /webhook/sms-gateway : HTTP 401.
- Envoi manuel HTTP 200 ; callback sent à 19:13:23 UTC ; callback delivered à 19:13:24 UTC ; historique du lead temporaire : un SMS delivered.
- Gérant : confirmation « SMS envoyé », puis « SMS renvoyé », puis confirmation du téléphone de test A.
- Aucun inbound enregistré dans les deux historiques temporaires ; compteur inbound à zéro.
- SMS réel accepté à 19:13:17 UTC, puis filtré not_a_lead ; expéditeur différent des deux fixtures et de la passerelle ; aucune preuve que ce soit le test demandé.
- Aucun événement CODE-025 entrant retrouvé ensuite dans la fenêtre observée.
- Retour arrière live : dep-db5u2sjbc2fs7394rn60, new_commit, 19:21:15 UTC.
- Retour arrière demandé par B3 : revert complet backend e14a499 ; commit 2c0f683a5738ec35f7b6e99ea04880cac4ca7c3b.
- Le retour arrière rétablit aussi les mécanismes Auto-SMS et l’ancienne validation ; frontend CODE-023 conservé.
- Cause de non-réception non établie : aucune conclusion de signature incompatible ; un événement réel avait passé la validation.

## Purge strictement Messenger

- Branche isolée code-025-purge-messenger ; pose d026f5df87d40449ee89ddb7478a70f3bda92f45 ; retrait 75c147edabaf01b6f0ca338be3e2298cf4f66519.
- Routes temporaires dans un fichier séparé : POST /api/admin/purge/count et /execute.
- Authentification x-api-key, confirmation exacte PURGE-TOTALE-11-10-2026, montage et contrôle runtime PURGE_ENABLED=true.
- Nombre de messages attendu 130 : tout autre nombre refuse la purge avant la première suppression.
- DELETE messages puis conversations dans la même transaction SQLite ; aucune autre table modifiée par la purge.
- Tests : 83/83, dont authentification, interrupteur, confirmation, préservation du hors-périmètre, rollback sur erreur injectée et refus d’un nombre différent.
- PURGE_ENABLED activé puis repassé à false sur le seul service autorisé, par mise à jour fusionnée des variables.
- Ces mises à jour de variables ont produit des déploiements Render de trigger api ; aucun outil de lancement manuel de déploiement appelé.
- Retrait immédiat après purge vérifiée ; deux routes testées par POST : HTTP 404.

### Comptages observés

```json
{
  "avant": {
    "success": true,
    "targets": {
      "leads_active": 2,
      "leads_archived": 0,
      "leads_deleted": 0,
      "inbound_communications": 0,
      "outbound_communications": 1,
      "crm_notes": 0,
      "messenger_conversations": 39,
      "messenger_messages": 130
    },
    "protected": {
      "publications": 15,
      "analyses": 71,
      "campaign_context": 1,
      "ad_context": 1,
      "metrics_snapshots": 8650,
      "webhook_events": 104,
      "settings": 1
    }
  },
  "purge": {
    "success": true,
    "before": {
      "leads_active": 2,
      "leads_archived": 0,
      "leads_deleted": 0,
      "inbound_communications": 0,
      "outbound_communications": 1,
      "crm_notes": 0,
      "messenger_conversations": 39,
      "messenger_messages": 130
    },
    "deleted": {
      "messages": 130,
      "conversations": 39
    },
    "after": {
      "leads_active": 2,
      "leads_archived": 0,
      "leads_deleted": 0,
      "inbound_communications": 0,
      "outbound_communications": 1,
      "crm_notes": 0,
      "messenger_conversations": 0,
      "messenger_messages": 0
    },
    "protected": {
      "publications": 15,
      "analyses": 71,
      "campaign_context": 1,
      "ad_context": 1,
      "metrics_snapshots": 8650,
      "webhook_events": 104,
      "settings": 1
    }
  }
}
```

## Blocage du nettoyage des fixtures

- Deux leads temporaires créés via /debug/create-test-lead pour A6/B2 ; un seul SMS manuel envoyé.
- /debug/cleanup-all-tests a été refusé AVANT exécution par le contrôle automatique.
- Motif : suppression production large par motifs sur plusieurs tables, non limitée aux identifiants exacts des résidus créés ; action irréversible insuffisamment bornée.
- Aucun contournement effectué ; conformément à la partie C, reprise destructive à exécuter par le Pilote.
- Identifiants techniques des seuls résidus à examiner et supprimer :
- Lead : `test_A_1791745972278`.
- Lead : `test_B_1791745972278`.
- SMS sortant : `269`.

- Dernier comptage SQLite complet pris avant retrait des routes : leads actifs 2, archivés 0, supprimés 0 ; inbound 0 ; outbound 1 ; notes 0 ; conversations 0 ; messages 0.
- Ce comptage n’est pas un état final à zéro ; aucun comptage SQLite intégral après retour arrière n’est disponible sans nouvelle route.
- Ne pas appeler /api/facebook/leads pour compter : une base vide peut déclencher une synchronisation Graph.
- Reprise attendue : nettoyer exclusivement les fixtures identifiées, confirmer tous les compteurs à zéro, diagnostiquer le SMS de test entrant avant toute nouvelle fermeture du webhook.

## Validation

- Node 20.11.1 : backend CODE-023 75/75 ; frontend 2/2 ; route temporaire 83/83 ; après retrait 75/75 ; après retour arrière 70/70.
- node --check exécuté sur chaque fichier JavaScript modifié conservé avant ses commits ; git diff --check sans erreur.
- Push de chaque branche et de main précédé de fetch/rebase origin/main.
- Aucune suppression Meta/Facebook ; branche et service saas non touchés.

## Dernier contrôle après retour arrière

- /health : HTTP 200, healthy après retour arrière live.
- POST /api/admin/purge/count et /execute : HTTP 404 après retour arrière également.
- GET /api/comms/flux-echanges?limit=1000 : HTTP 200, total 130, 130 éléments de type messenger.
- Les échanges supprimés sont donc à nouveau visibles après les redémarrages ; l’état Messenger à zéro n’a pas persisté.
- startSyncLoop exécute runFullSync dix secondes après démarrage puis toutes les cinq minutes ; syncConversations recopie les données Meta en SQLite.
- Aucun réglage ou arrêt de cette synchronisation n’est autorisé par le périmètre actuel ; décision à prendre par le Pilote avant nouvelle purge durable.
- Le dernier comptage complet de zéro Messenger concernait seulement l’instant après DELETE ; il ne décrit pas l’état final.
- Nettoyage bloqué et resynchronisation : mission non terminée.
