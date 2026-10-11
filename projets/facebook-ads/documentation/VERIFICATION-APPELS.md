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

### C1 — Appelées ailleurs : 19

| Réf. | Route / identité | Appel ou usage retrouvé |
|---|---|---|
| B007 | `POST /api/ai/execute-action` | Quatre appels de `js/ai-recommendations.js` avaient été neutralisés dans l'inventaire frontend ; lecture du code confirme cette route. |
| B044 | `GET /api/facebook/account` | `js/api.js` → `loadAccount()`. |
| B066 | Route de ciblage restreint | Appel neutralisé de `js/ai-recommendations.js` résolu par lecture du code. |
| B075 | `GET /api/facebook/insights/campaigns` | `js/api.js` → `loadCampaigns()`. |
| B076 | `GET /api/facebook/insights/ads` | `js/api.js` → `loadCreatives()`. |
| B078 | `GET /api/facebook/insights/daily` | `js/api.js` → `loadDailyData()`. |
| B079 | `GET /api/facebook/insights/intraday` | `js/api.js` → `loadIntradayData()`. |
| B080 | `GET /api/facebook/geographic` | `js/api.js` et `js/geographic.js`. |
| B082 | Route géographique restreinte | `js/api.js` et `js/geographic.js` la chargent explicitement. |
| B105 | Upload pièce jointe Messenger | Le routeur est monté sous `/api/facebook` ; `conversions.js` appelle l'URL effective deux fois. |
| B106 | Envoi photo Messenger | Même montage `/api/facebook` ; `conversions.js` appelle l'URL effective deux fois. |
| B121 | `GET /api/facebook/leads-deleted` | Page séparée `leads-deleted.html`. |
| B122 | `POST /api/facebook/leads/:id/restore` | Page séparée `leads-deleted.html`. |
| B141 | Upload image direct de `video.js` | Chemin effectif `/api/video/image-upload` via montage du routeur ; appelé par `js/ai-creation.js`. |
| B147 | `GET /webhook` | Callback externe de vérification Meta. |
| B148 | `POST /webhook` | Callback externe de réception Messenger Meta. |
| B149 | `POST /webhook/twilio/call-status` | `services/twilio-service.js` le fournit explicitement comme `StatusCallback`. |
| B154 | `GET /api/pilote/status` | Outil externe Pilote documenté avec appel CLI dans `VOIE_B_DEV-006.md`. |
| B155 | `POST /api/pilote/push-meta-response` | Outil externe Pilote Drive → backend → GitHub documenté dans `VOIE_B_DEV-006.md`. |

### C2 — Jamais appelées nulle part dans les deux dépôts : 17

Aucune référence d'appel statique n'a été trouvée hors de leur définition au commit analysé.

- B003 — `GET /api/ai/history`
- B015 — `DELETE /api/ai/publish/campaign/:id`
- B043 — `GET /api/facebook/recommendations`
- B049 — `GET /api/facebook/adsets`
- B051 — `GET /api/facebook/ads/logs`
- B057 — `POST /api/facebook/ads/:id/update-text`
- B073 — `GET /api/facebook/geo/idf-regions`
- B077 — `GET /api/facebook/insights/adsets`
- B087 — `POST /api/comms/mms`
- B100 — `PATCH /api/comms/notes/:id`
- B126 — `POST /api/facebook/leads/:id/rename`
- B131 — `GET /api/history/analyses`
- B132 — `GET /api/history/analyses/:id`
- B133 — `POST /api/history/analyses`
- B134 — `DELETE /api/history/analyses/:id`
- B135 — `DELETE /api/history/analyses`
- B144 — `GET /api/context/ad/:id`

### C3 — Indéterminées : 24

Aucun consommateur statique n'a été trouvé, mais le code les présente comme routes de diagnostic, test, administration, consultation manuelle ou polling ; une utilisation externe ponctuelle ne peut donc pas être exclue par lecture des dépôts.

- B011 — `GET /api/ai/status`
- B013 — `GET /api/ai/publish/check`
- B014 — `GET /api/ai/publish/test-post`
- B016 — `GET /api/ai/publish/delete-campaign`
- B017 — `GET /api/ai/publish/list-campaigns`
- B018 — `GET /api/ai/publish/delete-all-test`
- B019 — `GET /api/ai/publish/test-image`
- B020 — `GET /api/ai/publish/test-page`
- B021 — `GET /api/ai/publish/test-creative`
- B022 — `GET /api/ai/publish/test-adset`
- B023 — `GET /api/ai/publish/leadgen-forms`
- B024 — `GET /api/ai/publish/create-leadgen-form`
- B025 — `GET /api/ai/publish/test-lead-ad`
- B026 — `GET /api/ai/publish/search-regions`
- B027 — `GET /api/ai/publish/campaign-adsets`
- B038 — `GET /api/ai/publish/video-permissions`
- B092 — `GET /api/comms/sms/status`
- B094 — `GET /api/comms/email/status`
- B104 — `POST /api/comms/relink-orphan-sms`
- B113 — `POST /api/facebook/conversations/refresh-names`
- B114 — `POST /api/facebook/conversations/force-sync`
- B137 — `GET /api/video/status/:videoTempId`
- B139 — `GET /api/video/storage-info`
- B152 — `GET /api/image/status/:imageTempId`

**Bilan partie C : 19 appelées ailleurs + 17 sans aucun appel statique retrouvé + 24 indéterminées = 60.**

## Conclusion factuelle

- Les dix sites frontend signalés ne correspondent pas à dix pannes : huit fonctionnent par routes réelles non correctement représentées dans l'inventaire.
- Deux fonctions utilisateur sont cassées : renommage de lead et création de lead de test ; une seule relève d'un simple changement de chemin.
- Les deux GET destructrices sont protégées par l'authentification globale en production mais n'exigent aucune confirmation métier.
- Parmi les 60 routes sans correspondance initiale, 19 ont un usage retrouvé ailleurs ; 17 n'ont aucun appel statique retrouvé ; 24 restent indéterminées.
