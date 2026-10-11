# INVENTAIRE FRONTEND — facebook-ads

Appels backend réellement présents dans le code du dashboard.
Commit de base : 7975a80 — branche main.

## js/conversions.js

| Chemin appelé | Méthode | Ce qui le déclenche | Route présente dans l’inventaire backend ? | Remarque |
|---|---|---|---|---|
| `/api/leads/:leadId/rename` | POST | Clic sur le crayon de renommage d’un lead. | non | Préfixe différent : backend inventorié sous /api/facebook/leads/:id/rename. |
| `/webhook/admin/backfill-messenger-leads` | POST | Bouton de synchronisation rétroactive Messenger vers leads. | oui | — |
| `/api/cache/clear` | POST | Rafraîchissement forcé de la liste des leads. | non | Route absente des 155 routes backend inventoriées. |
| `/api/facebook/leads[?filter=archived]` | GET | Chargement ou rafraîchissement de la liste des leads. | oui | Le même site choisit la vue active ou archives. |
| `/api/facebook/leads/:id/archive` | PATCH | Action groupée Archiver sur les leads sélectionnés. | oui | Route réutilisée dans plusieurs flux d’archivage. |
| `/api/facebook/leads/:id/archive` | PATCH | Catégorisation groupée depuis Archives : désarchivage préalable. | oui | Appel répété dans le même fichier. |
| `/api/facebook/leads/:id/category` | PATCH | Catégorisation groupée : application de la catégorie choisie. | oui | Route appelée aussi pour le flux Relance. |
| `/api/facebook/leads/:id/archive` | PATCH | Action groupée Désarchiver. | oui | Appel répété dans le même fichier. |
| `/api/facebook/leads/:id/archive` | PATCH | Action groupée Mettre en relance : désarchivage préalable. | oui | Appel répété dans le même fichier. |
| `/api/facebook/leads/:id/category` | PATCH | Action groupée Mettre en relance : affectation de la catégorie Relance. | oui | Appel répété dans le même fichier. |
| `/api/facebook/leads/:id` | DELETE | Action groupée Supprimer sur les leads sélectionnés. | oui | Même route aussi utilisée pour la suppression unitaire. |
| `/api/comms/full-history/:leadId?limit=50` | GET | Ouverture ou rafraîchissement de l’historique d’un lead. | oui | Même historique complet chargé aussi depuis la modale communications. |
| `/api/ai/write-from-idea` | POST | Bouton IA de rédaction depuis une idée dans la zone lead. | oui | Même route réutilisée plus bas par le brouillon depuis idée. |
| `/api/facebook/upload-attachment` | POST | Sélection d’une photo dans la zone de réponse Messenger inline. | non | Inventaire backend : /api/messenger/upload-attachment. |
| `/api/ai/verify-text` | POST | Bouton de vérification du texte dans la réponse inline. | oui | Route de vérification appelée depuis plusieurs zones. |
| `/api/comms/sms` | POST | Bouton Envoyer SMS depuis la zone inline. | oui | Route SMS appelée depuis plusieurs flux du fichier. |
| `/api/facebook/leads/:leadId/conversation` | GET | Envoi Messenger inline : résolution de la conversation du lead. | oui | Même résolution réutilisée dans la modale Messenger. |
| `/api/facebook/conversations/:id/reply` | POST | Envoi Messenger inline : envoi du texte. | oui | Même route de réponse appelée depuis trois flux. |
| `/api/facebook/send-photo` | POST | Envoi Messenger inline : envoi d’une photo. | non | Inventaire backend : /api/messenger/send-photo. |
| `/api/ai/verify-text` | POST | Vérification du texte d’une réponse manuelle. | oui | Appel répété dans le même fichier. |
| `/api/comms/sms` | POST | Envoi d’une réponse manuelle par SMS. | oui | Appel répété dans le même fichier. |
| `/api/ai/sms-generate` | POST | Bouton IA pour générer un SMS de contact. | oui | Même génération SMS réutilisée dans la modale. |
| `/api/comms/sms` | POST | Envoi du SMS généré ou édité depuis la zone inline. | oui | Appel répété dans le même fichier. |
| `/api/facebook/conversations` | GET | Chargement de la liste des conversations Messenger. | oui | La même route sert aussi à la vue archivées avec un filtre. |
| `/api/facebook/conversations/:id/messages` | GET | Clic sur une conversation pour charger ses messages. | oui | — |
| `/api/facebook/conversations/:id/reply` | POST | Bouton Envoyer dans le fil Messenger. | oui | Appel répété dans le même fichier. |
| `/api/ai/suggest-reply` | POST | Bouton de suggestion IA dans une conversation Messenger. | oui | — |
| `/api/ai/commercial-reply` | POST | Bouton de génération d’une réponse commerciale. | oui | Même route réutilisée dans le drawer lead. |
| `/api/ai/messenger-reply-custom` | POST | Génération Messenger avec instructions personnalisées. | oui | Même route réutilisée dans la modale Messenger. |
| `/api/facebook/conversations/:id` | DELETE | Suppression de la conversation ouverte. | oui | Même route aussi appelée depuis la liste. |
| `/api/facebook/conversations/:id/archive` | PATCH | Archivage ou désarchivage de la conversation ouverte. | oui | Même route aussi appelée depuis la liste. |
| `/api/facebook/conversations/:id/archive` | PATCH | Archivage ou désarchivage directement depuis la liste. | oui | Appel répété dans le même fichier. |
| `/api/facebook/conversations/:id` | DELETE | Suppression d’une conversation directement depuis la liste. | oui | Appel répété dans le même fichier. |
| `/api/facebook/conversations?filter=archived` | GET | Ouverture de la vue Conversations archivées. | oui | Variante filtrée de la route conversations. |
| `/api/facebook/conversations/:id/status` | PATCH | Changement du statut CRM d’une conversation. | oui | — |
| `/api/facebook/conversations/stats` | GET | Chargement des KPI du pipeline commercial. | oui | Déclenché au chargement de l’écran Conversions. |
| `/api/comms/flux-echanges?limit=:n&offset=:n[&type=:type]` | GET | Ouverture, filtrage ou pagination du Flux Échanges. | oui | URL construite dynamiquement selon filtre et pagination. |
| `/api/comms/{inbound|outbound}/:id` | DELETE | Suppression groupée d’éléments sélectionnés dans le Flux Échanges. | oui | Le chemin choisit inbound ou outbound selon la source. |
| `/api/comms/{inbound|outbound}/:id` | DELETE | Suppression unitaire d’un élément du Flux Échanges. | oui | Même appel dynamique que la suppression groupée. |
| `/api/comms/notes/:leadId` | GET | Chargement des notes d’un lead dans le Flux Échanges. | oui | — |
| `/api/comms/notes` | POST | Ajout d’une note depuis le Flux Échanges. | oui | — |
| `/api/comms/notes/:id` | DELETE | Suppression d’une note depuis le Flux Échanges. | oui | — |
| `/api/facebook/leads/:id/archive` | PATCH | Archivage ou désarchivage depuis le drawer du lead. | oui | Appel répété dans le même fichier. |
| `/api/facebook/leads/:id/archive` | PATCH | Archivage ou désarchivage depuis la liste des leads. | oui | Appel répété dans le même fichier. |
| `/api/facebook/leads/:id/status` | PATCH | Changement du statut CRM d’un lead. | oui | — |
| `/api/facebook/leads/:id/note` | PATCH | Sauvegarde de la note inline d’un lead. | oui | — |
| `/api/facebook/leads/:id` | DELETE | Suppression unitaire d’un lead depuis la liste. | oui | Même route que la suppression groupée. |
| `/api/ai/lead-reply-custom` | POST | Génération d’une réponse lead avec instructions personnalisées. | oui | — |
| `/api/ai/commercial-reply` | POST | Génération d’une réponse commerciale depuis le drawer lead. | oui | Appel répété dans le même fichier. |
| `/api/ai/verify-text` | POST | Vérification du texte IA généré pour un lead. | oui | Appel répété dans le même fichier. |
| `/api/comms/email` | POST | Bouton d’envoi email du texte IA d’un lead. | oui | — |
| `/api/comms/sms` | POST | Bouton d’envoi SMS du texte IA d’un lead. | oui | Appel répété dans plusieurs flux SMS. |
| `/api/facebook/leads?filter=archived` | GET | Ouverture ou rafraîchissement de la vue Leads archivés. | oui | Même variante filtrée que le chargement principal des leads. |
| `/api/ai/suggest-lead-followup` | POST | Bouton de suggestion de relance pour un lead. | oui | — |
| `/api/comms/call/click-to-call` | POST | Bouton Appeler depuis une fiche lead. | oui | Même route utilisée aussi depuis un autre contexte. |
| `/api/comms/call/hangup` | POST | Bouton Raccrocher pour l’appel courant. | oui | Même route utilisée aussi depuis un autre contexte. |
| `/api/comms/call/click-to-call` | POST | Bouton Appeler depuis le contexte ou drawer secondaire. | oui | Appel répété dans le même fichier. |
| `/api/comms/call/hangup` | POST | Bouton Raccrocher depuis le contexte secondaire. | oui | Appel répété dans le même fichier. |
| `/api/comms/templates` | GET | Ouverture de la modale SMS : chargement des modèles disponibles. | oui | Chargé une fois puis conservé en cache frontend. |
| `/api/ai/sms-generate` | POST | Bouton Générer SMS IA dans la modale SMS. | oui | Appel répété dans le même fichier. |
| `/api/facebook/upload-attachment` | POST | Sélection de photos dans la modale Messenger. | non | Inventaire backend : /api/messenger/upload-attachment. |
| `/api/ai/messenger-reply-custom` | POST | Bouton Générer Messenger IA dans la modale. | oui | Appel répété dans le même fichier. |
| `/api/facebook/leads/:leadId/conversation` | GET | Envoi Messenger depuis la modale : résolution de la conversation du lead. | oui | Appel répété dans le même fichier. |
| `/api/facebook/conversations/:id/reply` | POST | Envoi Messenger depuis la modale : envoi du texte. | oui | Appel répété dans le même fichier. |
| `/api/facebook/send-photo` | POST | Envoi Messenger depuis la modale : envoi d’une photo. | non | Inventaire backend : /api/messenger/send-photo. |
| `/api/comms/sms` | POST | Bouton Envoyer SMS dans la modale SMS. | oui | Appel répété dans le même fichier. |
| `/api/comms/full-history/:leadId` | GET | Ouverture de l’historique communications : chargement bidirectionnel complet. | oui | Chargé avec l’historique sortant juste après. |
| `/api/comms/history/:leadId` | GET | Ouverture de l’historique communications : complément sortant appels/SMS. | oui | Recoupe partiellement full-history dans le même flux. |
| `/debug/reset-conversations` | GET | Commande de test pour réinitialiser les conversations. | non | Route absente des 155 routes backend inventoriées. |
| `/debug/create-test-lead` | POST | Commande de test pour créer un lead de test. | non | Route absente des 155 routes backend inventoriées. |
| `/api/comms/auto-sms/status` | GET | Chargement de l’état actuel Auto-SMS. | oui | Même route relue avant chaque bascule. |
| `/api/comms/auto-sms/status` | GET | Clic sur la bascule Auto-SMS : lecture de l’état courant. | oui | Appel répété dans le même fichier. |
| `/api/comms/auto-sms/toggle` | POST | Clic sur la bascule Auto-SMS : écriture du nouvel état. | oui | — |
| `/api/ai/write-from-idea` | POST | Bouton Brouillon depuis idée dans la zone de rédaction. | oui | Appel répété dans le même fichier. |
| `/api/comms/sms` | POST | Bouton Envoyer le brouillon rédigé en SMS. | oui | Appel répété dans plusieurs flux SMS. |

## Suite de l'inventaire

Les autres fichiers frontend seront ajoutés ici lors des missions séparées.
