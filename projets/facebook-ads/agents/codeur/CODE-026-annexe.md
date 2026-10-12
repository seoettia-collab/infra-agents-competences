# CODE-026 — diagnostic réception SMS

## Références vérifiées
- Pré-vol gouvernance : fab87e2a7965d4cc470afe91f5512430fd61994a.
- Production Render exclusivement : srv-d6cq3hi4d50c73aa1rkg ; workspace tea-d4qdtsali9vc739s5000.
- Déploiement live consulté : dep-db5u2sjbc2fs7394rn60 ; commit 2c0f683a5738ec35f7b6e99ea04880cac4ca7c3b.
- server.js relu par GitHub au commit live ; blob b22671c5e2a19bfbd38d89295ecf7a8c8c54373e.
- services/database.js relu par GitHub sur main ; blob ed71d40b2fd1b01b0a9eb49f440d818b06d11e14.
- Fetch Git backend refusé par authentification ; comparaison avec fichiers GitHub effectuée, aucun code modifié.

## Cause exacte
Les deux SMS observés arrivent au backend, mais findLeadByPhone ne trouve aucun lead non supprimé pour leur expéditeur ; FILTRE-LEAD-01 répond success:true/ignored:true/reason:not_a_lead avant createInboundSms, donc rien n’est enregistré ni affiché.

## Chronologie — heure de Paris
- 11/10/2026 19:02:27 (17:02:27 UTC) : msg_id e083bea5, texte de test « T'est Gateway », event sms:received puis findLeadByPhone « Aucun lead » puis INBOUND_SMS_GW_FILTERED.
- 11/10/2026 21:13:17 (19:13:17 UTC) : msg_id 72388c7c, texte « CODES  025 test sms », event sms:received puis INBOUND_SMS_GW_FILTERED.
- Le contenu de ce second événement identifie un test CODE-025, contrairement à la réserve de l’ancien rapport.
- Le lien avec le téléphone nommé A n’est pas établi ; son expéditeur doit être comparé au numéro exact du lead prévu avant un nouvel essai.
- Téléphone : passe indirectement, car le payload sms:received est arrivé ; aucune consultation native de l’application.
- Queue : passe pour ces événements puisque le backend les reçoit ; Completed/0 réessai du premier test provient de la mission, pas d’une observation UI actuelle.
- Backend : validation franchie ; ni rejet 401 ni payload incomplet 400 sur ces événements.
- HTTP 200 correspond au return res.json du filtre ; recherche des journaux HTTP de 17:02:20–17:02:40 UTC vide, donc code déduit et non mesuré.
- Pas de preuve de panne généralisée de réception : les deux pertes observées sont applicatives.

## Condition du filtre et comportement avec un lead
- server.js : le filtre est exactement la branche else après database.findLeadByPhone(parsed.from).
- Aucun lead = aucune insertion, aucun nouveau lead créé, STOP non traité puisqu’il est après le filtre.
- Lead trouvé = createInboundSms puis journal SAVED ; STOP met ce lead en opt-out.
- Le code ne conditionne pas l’enregistrement à isFacebookLead : tout lead correspondant non supprimé suffit ; ce booléen décrit seulement la source.
- findLeadByPhone ignore deleted=1 ; il n’exclut pas les leads archivés par une condition spécifique.
- Si plusieurs leads correspondent, le plus récent created_time est retenu.
- Si phone_number ne correspond pas, recherche de secours dans full_name/raw_fields.

## Formats : vérification SQL isolée
- Requêtes SQL extraites de findLeadByPhone, exécutées avec Python sqlite3 en mémoire ; aucune base applicative ouverte.
- 28/28 combinaisons : sept formats stockés (national, E.164, 0033, espaces, points, tirets, parenthèses) × quatre formats entrants.
- 6 autres contrôles : inconnu absent ; deleted=1 exclu ; fallback nom ; fallback raw_fields ; numéro trop court exclu ; tabulations stockées non nettoyées.
- Total 34/34 conformes au comportement attendu du code.
- +33 versus 0 et espaces ordinaires ne sont donc pas la cause démontrée des deux événements.
- Limites : côté SQLite, nettoyage limité à espaces ASCII, points, tirets et parenthèses ; tabulations/espaces insécables peuvent empêcher un match.
- Limites : comparaison sur neuf derniers chiffres sans contrôle du pays ; une collision internationale est possible.
- Aucun test Node 20.11.1 exécuté : runtime disponible v24.19.0 ; diagnostic sans fichier JavaScript modifié.
- Le chemin DATA_DIR du module database.js n’utilise pas la variable d’environnement ; module volontairement non chargé pour éviter une base réelle.

## Suite proposée, sans exécution
- Conserver la règle leads-only tant que le Gérant ne l’amende pas.
- Vérifier qu’un lead actif contient le numéro exact réellement utilisé pour répondre, et pas un autre téléphone de test.
- Réaliser ensuite un seul SMS horodaté depuis ce numéro ; attendre matched → SAVED puis entrée dashboard.
- Si le produit doit conserver les SMS de prospects absents, faire décider un périmètre distinct de messages non rattachés ; ne pas supprimer le filtre global sans arbitrage.
- Aucun nouveau test réel nécessaire pour identifier la cause des deux SMS retrouvés ; test lead connu requis pour la validation métier complète.
- Aucun accès au service saas, aucune modification Meta/Messenger, aucune écriture production.

## Publication
- Rapport préparé sur branche code-026-rapport depuis le HEAD de gouvernance nommé ci-dessus.
- Aucun merge sur main : l’autorisation antérieure de publication concernait CODE-023 uniquement.

## Blocage de livraison
- Push de code-026-rapport refusé par le contrôle automatique : publication externe du diagnostic jugée non autorisée.
- Remote contrôlé : github.com/seoettia-collab/infra-agents-competences.git ; refus maintenu après vérification.
- Rapport et preuves conservés en commit local ; aucune publication via un autre outil tentée.
- Autorisation du Gérant requise pour publier ce rapport et ses preuves masquées.
