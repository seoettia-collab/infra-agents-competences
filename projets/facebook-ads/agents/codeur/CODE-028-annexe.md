# CODE-028 — livraison et checkpoint

## Gouvernance et bases
- HEAD de gouvernance lu : 3b7f96a41b7d2673f7fd9a25f3cd664c87fcd992.
- Worktree isolé infra-code-028 pour préserver les commits locaux CODE-026.
- Pré-vol fetch/reset réalisé dans le worktree neuf après un échec temporaire réseau ; HEAD confirmé.
- Base backend : 2c0f683a5738ec35f7b6e99ea04880cac4ca7c3b.
- Base frontend : 4e6e02b0655743afccc743506c3bb803788562d3.
- Bases main vérifiées avec le connecteur GitHub ; rebase local sur origin/main de même SHA.
- Transport Git privé sans authentification utilisable ; publication par objets GitHub puis refs protégées par expected_sha.
- Les commits locaux et distants ont des SHA différents ; les SHA de production ci-dessous font foi.
- Branches isolées dans les deux dépôts : code-028-sms-separes.
- Aucune opération sur branche saas.

## Implémentation
- server.js monte le handler injecté services/inbound-sms-handler.js.
- Validation du token et de l’événement préservée ; requêtes invalides refusées ; tous les SMS valides reçus sont enregistrés.
- Le rapprochement initial avec un lead reste identique.
- Sans lead : lead_id NULL ; aucune création automatique ; retour unattached=true.
- FILTRE-LEAD-01 / INBOUND_SMS_GW_FILTERED conservé, transformé en trace d’enregistrement sans numéro ni contenu.
- Journaux findLeadByPhone et RELINK_SMS nettoyés pour éviter de réexposer les nouveaux SMS inconnus.
- getFluxEchanges exclut les entrants sans lead et les références absentes ; compteur et liste habituels restent séparés.
- GET /api/comms/sms/unattached : liste paginée et total, exclusivement lead_id NULL.
- GET /api/comms/sms/attachment-leads : choix de leads existants non supprimés, sans appel Graph.
- POST /api/comms/sms/unattached/:id/attach : rattachement au lead choisi OU création explicite en transaction.
- Un seul message est rattaché par action ; refus si déjà rattaché, lead supprimé/absent ou choix ambigu.
- STOP reçu avant rattachement est appliqué au lead lors du rattachement.
- Création explicite : Contact SMS, numéro expéditeur, id manual_sms_UUID, source SMS Entrant ; aucune programmation de SMS sortant.
- Frontend : onglet SMS sans lead et compteur propre ; état local et pagination ; menu de rattachement et bouton Créer un lead.
- Le panneau se trouve dans viewConversions et n’est pas visible par défaut.
- Les actions de lecture n’altèrent pas les leads ; rafraîchissement des leads seulement après une action explicite de rattachement/création.
- Échappement dédié des textes et attributs dans le nouveau panneau.
- Aucune alerte/toast ni nouveau badge dans les leads.
- DATA_DIR respecté dans database.js pour les tests isolés ; fallback de production conservé en absence de variable.

## Validation locale
- Runtime installé via registre npm officiel : Node 20.11.1.
- better-sqlite3 : binaire ABI 115 compatible, ouverture :memory: validée.
- Backend : DATA_DIR=/tmp/code-028-backend PORT=18228 node --test tests/*.test.js ; 84/84.
- Frontend : node --test tests/*.test.js ; 6/6.
- node --check sur chaque JavaScript modifié et ajouté avant commit ; git diff --check passé.
- Tests : inconnu enregistré sans lead ; exclusion du flux et compteurs ; rapprochement connu 06/+33 ; STOP ; doublon ; pagination.
- Tests : rattachement explicite, création, refus lead absent/supprimé, conflit de rattachement, rollback transaction.
- Test HTTP réel local : webhook → SQLite → API séparée ; HTTP 401 sans clé ; import explicite → flux habituel.
- Nettoyage : tests des identifiants exacts, préservation du hors-périmètre, idempotence et rollback.
- Frontend : compteur propre, panneau séparé, HTML échappé, actions dédiées et pagination masquée à zéro.
- Installation Chromium locale indisponible (archive téléchargée invalide) ; vérification UI réalisée avec le navigateur cloud sur le site déployé.

## Livraison de code
- Backend première livraison : 1f468bb98973e2c3513b5aff98497f0a1046d59f.
- Frontend première livraison : fb4b36c52e0fa5728c7ea0523a723830223d874c.
- Backend final : e66a4b15a640bfd6e75259758b85ab4efee45800.
- Frontend final : f503aab2b691f4f9c6a03945da84981850c51d6c.
- Publication des branches isolées puis avance rapide main, autorisée dans CODE-028.
- Frontend publié avant backend : index et js/unattached-sms.js vérifiés HTTP 200.
- Aucun déclenchement manuel de déploiement.
- Production Render exclusivement : srv-d6cq3hi4d50c73aa1rkg ; workspace tea-d4qdtsali9vc739s5000.
- Premier déploiement : dep-db6i9460tbcc7390qag0, new_commit, live.
- Final : dep-db6ib4jncjis73c3slb0, new_commit, live à 2026-10-12T18:24:00.857188Z.
- Santé finale : HTTP 200, healthy.
- Écran déployé vérifié : SMS sans lead · 0 messages sans lead ; panneau Aucun SMS sans lead ; pagination absente.
- API séparée : HTTP 200, total 0 ; flux SMS habituel HTTP 200, total 1 (filtres historiques existants inchangés).

## Partie C — attendue
- Demande adressée au Gérant : envoyer CODE-028 TEST INCONNU au téléphone SMSGate habituel depuis un numéro absent des leads, puis confirmer envoyé et heure.
- Aucun événement réel corrélé reçu à la vérification ; pas de SMS artificiel injecté en production.
- Ne pas confondre les tests HTTP locaux avec une réception réelle par la SIM et SMSGate.
- À réception : vérifier l’enregistrement lead_id NULL, le panneau séparé et l’absence du même id dans le flux/les leads.
- Puis tester seulement les actions explicitement demandées par le Gérant ; ne pas créer/rattacher son SMS sans instruction.
- En cas d’échec de la réception réelle : retour arrière de code conformément à C4 ; ne pas supprimer les données de message collectées.

## Partie D — refus ciblé, données conservées
- Fixtures annoncées : leads test_A_1791745972278 et test_B_1791745972278 ; SMS sortant 269.
- Route temporaire authentifiée exigeant une confirmation exacte ; SQL limité à ces identifiants, sans motif de nom, téléphone, ni cascade.
- Protection refuse si de nouvelles communications ou notes sont attachées aux deux fixtures.
- Tentative : HTTP 409 ; aucune suppression effectuée grâce à la transaction.
- État observé par endpoints authentifiés d’historique :
- test_A : SMS 269, type sms, delivered ; appel 271, type call, queued.
- test_B : SMS 270, type sms, Pending.
- Aucun entrant et aucune note dans les deux historiques consultés.
- Donc 2 leads, 2 SMS sortants et 1 appel ; aucune extension de suppression aux IDs 270/271.
- Routes temporaires retirées immédiatement après refus ; POST /api/comms/code-028/cleanup-tests : HTTP 404 au déploiement final.
- services/code-028-cleanup.js et ses tests restent une preuve du garde-fou ; aucune route ne l’expose.
- Arbitrage demandé au Pilote sur les nouvelles communications avant de supprimer les fixtures.
- Messenger non modifié ; aucun arrêt ou changement de sa synchronisation ; aucun comptage intégral de la base revendiqué.

## Point de reprise
- Code déployé, stable, arbres de travail locaux propres.
- Réception physique encore à vérifier avec le Gérant.
- Nettoyage encore à reprendre sous périmètre actualisé.
- Rapport verdict NON ; ne pas fermer la mission avant ces deux points.
