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
