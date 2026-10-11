# VÉRIFICATION APPELS — facebook-ads

Vérification statique croisée du frontend `7975a80` et du backend `873e367`.
Aucun appel réseau n'a été exécuté et aucune donnée n'a été modifiée.

## Partie A — dix sites frontend signalés sans route correspondante

| Appel frontend | Route backend réellement existante ? | Verdict | Conséquence à l'écran |
|---|---|---|---|
| `POST /api/leads/:id/rename` | Non sous ce préfixe ; l'équivalent réel est `POST /api/facebook/leads/:id/rename`. | cassé | Le renommage tombe dans le `catch` et affiche « Échec du renommage ». |
| `POST /api/cache/clear` — rafraîchissement leads | Oui, route directe dans `server.js`. | fonctionne | Le cache est vidé avant le rechargement ; l'échec éventuel est volontairement silencieux dans ce flux. |
| `POST /api/facebook/upload-attachment` — photo inline | Oui ; `messengerRouter` est monté sous `/api/facebook`. | fonctionne | La vignette passe de « Upload… » à « Prêt » si l'upload réussit. |
| `POST /api/facebook/send-photo` — photo inline | Oui ; même montage `/api/facebook`. | fonctionne | La photo est envoyée et le compteur de messages envoyés est affiché. |
| `POST /api/facebook/upload-attachment` — modale Messenger | Oui ; `messengerRouter` est monté sous `/api/facebook`. | fonctionne | La photo passe à l'état « Prêt » dans la modale. |
| `POST /api/facebook/send-photo` — modale Messenger | Oui ; même montage `/api/facebook`. | fonctionne | La modale affiche le nombre de messages envoyés. |
| `GET /debug/reset-conversations` | Oui, route directe dans `server.js`. | fonctionne | Après confirmation, l'écran affiche le nombre de conversations et éléments de test supprimés puis recharge les données. |
| `POST /debug/create-test-lead` | Oui, route directe dans `server.js`. | cassé | Le backend renvoie une liste de leads, tandis que le frontend attend des champs unitaires ; l'alerte de succès affiche des valeurs indéfinies et aucun SMS n'est déclenché par cette route. |
| `POST /api/video/image-upload` | Oui ; `videoRouter` est monté sous `/api/video` et expose localement `/image-upload`. | fonctionne | L'éditeur reçoit le média et affiche le succès d'upload. |
| `POST /api/cache/clear` — écran audit IA | Oui, route directe dans `server.js`. | fonctionne | L'écran confirme le nombre de clés vidées et invite à relancer l'analyse. |

**Bilan partie A : 2 appels cassés confirmés sur 10 ; 1 est réparable par simple correction de chemin.**
Les écarts photo Messenger et image éditeur provenaient de chemins mal reconstruits dans l'inventaire backend, pas de routes absentes.

## Partie B — deux GET destructrices

| Route | Effet exact lu dans le code | Authentification | Confirmation | Un lien navigateur suffit ? | Équivalent plus sûr existant |
|---|---|---|---|---|---|
| `GET /api/ai/publish/delete-campaign` | Supprime la campagne dont l'identifiant est fourni en query via `facebook-publish.deleteCampaign`. | Oui : middleware global `/api/*` par clé API en production. | Non. | Production : non depuis la barre d'adresse seule, car le header `x-api-key` est requis ; développement sans clé configurée : oui. | Oui : `DELETE /api/ai/publish/campaign/:id`, même opération avec méthode HTTP destructive explicite. |
| `GET /api/ai/publish/delete-all-test` | Liste les campagnes puis marque supprimées toutes celles qui ne sont pas déjà supprimées, sauf une campagne protégée par une exception codée en dur. | Oui : même middleware global `/api/*`. | Non. | Production : non depuis la barre d'adresse seule pour la même raison ; développement sans clé configurée : oui. | Non pour une purge en masse ; seule la suppression unitaire en `DELETE` existe. |

Aucune de ces routes n'a été appelée pendant la vérification.

## Partie C — 60 routes sans correspondance frontend explicite

Méthode : recherche dans l'ensemble des fichiers JavaScript/HTML des deux dépôts aux commits figés, complétée par les montages Express et les callbacks/outils externes documentés.
Catégories :
- **appelées ailleurs** : consommateur statique retrouvé hors des neuf fichiers inventoriés, chemin neutralisé résolu, callback externe configuré ou outil externe documenté ;
- **jamais appelées nulle part** : aucune référence d'appel trouvée dans les deux dépôts hors définition de route ;
- **indéterminées** : aucun appel statique trouvé, mais usage manuel/debug/diagnostic/externe plausible d'après le code, donc absence runtime non prouvée.

