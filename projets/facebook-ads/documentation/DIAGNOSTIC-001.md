# DIAGNOSTIC-001 — Annexe de DIAG-001

DIAG-001 | 2026-10-11 | v1.0
EN-RÉPONSE-À : DIAG-001 · HEAD de lecture du hub : `442fa2a7ac75be8da1e9ab441b47e50a48f99c21`.

Sources exclusives : `INVENTAIRE-BACKEND.md` (base backend `873e367`), `INVENTAIRE-FRONTEND.md` (base frontend `7975a80`), `REFERENTIEL.md` et `DECISIONS.md` au HEAD ci-dessus.
Aucun code applicatif lu ; aucune requête de production, aucun test runtime, aucune action Meta.

## 1. Routes mortes — rapprochement exhaustif, qualification limitée

[SÛR] Les tables contiennent 155 routes dans 14 fichiers backend et 160 sites d’appel dans 9 fichiers frontend.
[SÛR] 95 routes backend distinctes ont au moins une correspondance explicite ; 60 n’en ont pas.
[SÛR] Répartition des 160 sites : 143 entièrement rapprochés, 9 entièrement sans correspondance, 1 partiellement rapproché (média vidéo/image), 7 indéterminés.
[SÛR] Les 153 sites à chemin exploitable produisent 156 branches après développement des alternatives ; 146 branches correspondent et 10 ne correspondent pas.
[SÛR] Clé de rapprochement : méthode HTTP + chemin ; noms des paramètres normalisés, query strings écartées, alternatives `{inbound|outbound}` et `{upload|image-upload}` développées.
[SÛR] La variante `/api/facebook/leads[?filter=archived]` correspond à `GET /api/facebook/leads`.
[À VÉRIFIER] Le nombre de routes réellement mortes est indéterminable : absence d’appel frontend ne prouve ni absence d’appel interne ni absence d’appel externe.
[SÛR] `POST /api/ai/copilot-orchestrate` appelle déjà en interne `GET /api/ai/analyze` et `GET /api/ai/audit-config` selon l’inventaire backend ; le frontend n’est pas le seul consommateur possible.
[SÛR] Les trois routes `/webhook` GET/POST et `/webhook/twilio/call-status` POST sont des callbacks externes ; elles ne doivent pas être jugées inutiles sur leur absence du frontend.
[SÛR] `POST /api/pilote/push-meta-response` est décrit comme livré dans le référentiel §2 ; son absence frontend ne dément pas cet usage externe.

### Liste des 60 routes sans correspondance explicite

Bxxx désigne le rang de la route dans les tables backend, en conservant leur ordre.
Les deux chemins sensibles sont identifiés par rang et ligne source sans détailler les dimensions interdites par la gouvernance.

| N° | Méthode et chemin | Source backend | Qualification |
|---|---|---|---|
| B003 | `GET /api/ai/history` | routes/ai.js · INVENTAIRE-BACKEND.md L12 | [SÛR] Placeholder documenté ; aucune correspondance frontend explicite. |
| B007 | `POST /api/ai/execute-action` | routes/ai.js · INVENTAIRE-BACKEND.md L16 | [À VÉRIFIER] Candidat aux quatre appels neutralisés `/api/ai/[action]`. |
| B011 | `GET /api/ai/status` | routes/ai.js · INVENTAIRE-BACKEND.md L20 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B013 | `GET /api/ai/publish/check` | routes/ai.js · INVENTAIRE-BACKEND.md L22 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B014 | `GET /api/ai/publish/test-post` | routes/ai.js · INVENTAIRE-BACKEND.md L23 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B015 | `DELETE /api/ai/publish/campaign/:id` | routes/ai.js · INVENTAIRE-BACKEND.md L24 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B016 | `GET /api/ai/publish/delete-campaign` | routes/ai.js · INVENTAIRE-BACKEND.md L25 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B017 | `GET /api/ai/publish/list-campaigns` | routes/ai.js · INVENTAIRE-BACKEND.md L26 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B018 | `GET /api/ai/publish/delete-all-test` | routes/ai.js · INVENTAIRE-BACKEND.md L27 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B019 | `GET /api/ai/publish/test-image` | routes/ai.js · INVENTAIRE-BACKEND.md L28 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B020 | `GET /api/ai/publish/test-page` | routes/ai.js · INVENTAIRE-BACKEND.md L29 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B021 | `GET /api/ai/publish/test-creative` | routes/ai.js · INVENTAIRE-BACKEND.md L30 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B022 | `GET /api/ai/publish/test-adset` | routes/ai.js · INVENTAIRE-BACKEND.md L31 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B023 | `GET /api/ai/publish/leadgen-forms` | routes/ai.js · INVENTAIRE-BACKEND.md L32 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B024 | `GET /api/ai/publish/create-leadgen-form` | routes/ai.js · INVENTAIRE-BACKEND.md L33 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B025 | `GET /api/ai/publish/test-lead-ad` | routes/ai.js · INVENTAIRE-BACKEND.md L34 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B026 | `GET /api/ai/publish/search-regions` | routes/ai.js · INVENTAIRE-BACKEND.md L35 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B027 | `GET /api/ai/publish/campaign-adsets` | routes/ai.js · INVENTAIRE-BACKEND.md L36 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B038 | `GET /api/ai/publish/video-permissions` | routes/ai.js · INVENTAIRE-BACKEND.md L47 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B043 | `GET /api/facebook/recommendations` | routes/campaigns.js · INVENTAIRE-BACKEND.md L61 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B044 | `GET /api/facebook/account` | routes/campaigns.js · INVENTAIRE-BACKEND.md L62 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B049 | `GET /api/facebook/adsets` | routes/campaigns.js · INVENTAIRE-BACKEND.md L67 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B051 | `GET /api/facebook/ads/logs` | routes/campaigns.js · INVENTAIRE-BACKEND.md L69 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B057 | `POST /api/facebook/ads/:id/update-text` | routes/campaigns.js · INVENTAIRE-BACKEND.md L76 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B066 | Chemin restreint non recopié ; voir la ligne source. | routes/campaigns.js · INVENTAIRE-BACKEND.md L86 | [À VÉRIFIER] Candidat à l’appel neutralisé F125. |
| B073 | `GET /api/facebook/geo/idf-regions` | routes/campaigns.js · INVENTAIRE-BACKEND.md L93 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B075 | `GET /api/facebook/insights/campaigns` | routes/insights.js · INVENTAIRE-BACKEND.md L100 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B076 | `GET /api/facebook/insights/ads` | routes/insights.js · INVENTAIRE-BACKEND.md L101 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B077 | `GET /api/facebook/insights/adsets` | routes/insights.js · INVENTAIRE-BACKEND.md L102 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B078 | `GET /api/facebook/insights/daily` | routes/insights.js · INVENTAIRE-BACKEND.md L103 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B079 | `GET /api/facebook/insights/intraday` | routes/insights.js · INVENTAIRE-BACKEND.md L104 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B080 | `GET /api/facebook/geographic` | routes/geographic.js · INVENTAIRE-BACKEND.md L110 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B082 | Chemin restreint non recopié ; voir la ligne source. | routes/geographic.js · INVENTAIRE-BACKEND.md L112 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B087 | `POST /api/comms/mms` | routes/comms.js · INVENTAIRE-BACKEND.md L127 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B092 | `GET /api/comms/sms/status` | routes/comms.js · INVENTAIRE-BACKEND.md L132 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B094 | `GET /api/comms/email/status` | routes/comms.js · INVENTAIRE-BACKEND.md L134 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B100 | `PATCH /api/comms/notes/:id` | routes/comms.js · INVENTAIRE-BACKEND.md L140 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B104 | `POST /api/comms/relink-orphan-sms` | routes/comms.js · INVENTAIRE-BACKEND.md L144 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B105 | `POST /api/messenger/upload-attachment` | routes/messenger.js · INVENTAIRE-BACKEND.md L150 | [SÛR] Fonction proche appelée sous un autre chemin absent ; voir §2. |
| B106 | `POST /api/messenger/send-photo` | routes/messenger.js · INVENTAIRE-BACKEND.md L151 | [SÛR] Fonction proche appelée sous un autre chemin absent ; voir §2. |
| B113 | `POST /api/facebook/conversations/refresh-names` | routes/messenger.js · INVENTAIRE-BACKEND.md L160 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B114 | `POST /api/facebook/conversations/force-sync` | routes/messenger.js · INVENTAIRE-BACKEND.md L161 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B121 | `GET /api/facebook/leads-deleted` | routes/leads.js · INVENTAIRE-BACKEND.md L173 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B122 | `POST /api/facebook/leads/:id/restore` | routes/leads.js · INVENTAIRE-BACKEND.md L174 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B126 | `POST /api/facebook/leads/:id/rename` | routes/leads.js · INVENTAIRE-BACKEND.md L178 | [SÛR] Fonction proche appelée sous un autre chemin absent ; voir §2. |
| B131 | `GET /api/history/analyses` | routes/history.js · INVENTAIRE-BACKEND.md L188 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B132 | `GET /api/history/analyses/:id` | routes/history.js · INVENTAIRE-BACKEND.md L189 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B133 | `POST /api/history/analyses` | routes/history.js · INVENTAIRE-BACKEND.md L190 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B134 | `DELETE /api/history/analyses/:id` | routes/history.js · INVENTAIRE-BACKEND.md L191 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B135 | `DELETE /api/history/analyses` | routes/history.js · INVENTAIRE-BACKEND.md L192 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B137 | `GET /api/video/status/:videoTempId` | routes/video.js · INVENTAIRE-BACKEND.md L199 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B139 | `GET /api/video/storage-info` | routes/video.js · INVENTAIRE-BACKEND.md L201 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B141 | `POST /api/image/upload` | routes/video.js · INVENTAIRE-BACKEND.md L203 | [SÛR] Fonction proche appelée sous un autre chemin absent ; voir §2. |
| B144 | `GET /api/context/ad/:id` | routes/context.js · INVENTAIRE-BACKEND.md L211 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B147 | `GET /webhook` | routes/webhook.js · INVENTAIRE-BACKEND.md L219 | [SÛR] Callback externe identifié ; absence frontend attendue. |
| B148 | `POST /webhook` | routes/webhook.js · INVENTAIRE-BACKEND.md L220 | [SÛR] Callback externe identifié ; absence frontend attendue. |
| B149 | `POST /webhook/twilio/call-status` | routes/webhook.js · INVENTAIRE-BACKEND.md L221 | [SÛR] Callback externe identifié ; absence frontend attendue. |
| B152 | `GET /api/image/status/:imageTempId` | routes/image-upload.js · INVENTAIRE-BACKEND.md L229 | [SÛR] Sans correspondance explicite ; usage réel à vérifier. |
| B154 | `GET /api/pilote/status` | routes/pilote-drive.routes.js · INVENTAIRE-BACKEND.md L236 | [SÛR] Interface Pilote externe au dashboard ; usage décrit au référentiel. |
| B155 | `POST /api/pilote/push-meta-response` | routes/pilote-drive.routes.js · INVENTAIRE-BACKEND.md L237 | [SÛR] Interface Pilote externe au dashboard ; usage décrit au référentiel. |

### Sept sites dont la destination ne peut pas être rapprochée

| Sites frontend | Chemin inventorié | Limite |
|---|---|---|
| F120, F121, F134, F135 · js/ai-recommendations.js L146–147, L160–161 | `/api/ai/[action]` · POST | [SÛR] Quatre chemins neutralisés, étiquetés « oui » ; leur route réelle n’est pas nommée. |
| F125 · js/ai-recommendations.js L151 | `/api/facebook/adsets/:id/[restricted]` · POST | [SÛR] Chemin neutralisé ; sa correspondance ne peut pas être certifiée. |
| F159 · js/api.js L202 | `BACKEND_URL + endpoint` · GET | [SÛR] Paramètre dynamique ; liste complète des valeurs non fournie. |
| F160 · js/init.js L208 | `BACKEND_URL + url` · GET | [SÛR] Paramètre dynamique pouvant être une URL absolue ; destinations non fournies. |

[À VÉRIFIER] Si le Pilote confirme uniquement que les quatre appels `[action]` visent B007 et que F125 vise B066, le nombre sans correspondance nommée tombe de 60 à 58 ; cela ne résout pas les deux helpers GET.
[SÛR] Aucune correspondance n’a été inventée pour obtenir ce total hypothétique.

## 2. Appels orphelins — priorité aux fonctions utilisateur

[SÛR] La colonne frontend contient 9 « non », 148 « oui » et 3 « à vérifier ». Les 9 « non » portent sur 6 couples méthode/chemin.
[SÛR] Le développement de la branche image F115 ajoute un septième couple absent : 10 sites concernés, dont un partiellement valide.
[À VÉRIFIER] Une route absente de cet inventaire n’est pas une panne de production démontrée : aliases, routes hors des 14 fichiers et disponibilité runtime ne sont pas décrits.

| Priorité | Couple absent du backend inventorié | Sites frontend et déclencheur | Constat / limite |
|---|---|---|---|
| 1 | `POST /api/facebook/upload-attachment` | F014 / F061 · conversions.js L23 / L70 ; choix photo inline et modale | [SÛR] Backend B105 : `POST /api/messenger/upload-attachment` ; deux sélections photo incohérentes entre inventaires. |
| 1 | `POST /api/facebook/send-photo` | F019 / F065 · conversions.js L28 / L74 ; envoi photo inline et modale | [SÛR] Backend B106 : `POST /api/messenger/send-photo` ; deux envois photo incohérents entre inventaires. |
| 1 | `POST /api/video/image-upload` | F115 · ai-creation.js L136 ; branche image du téléversement éditeur | [SÛR] Absent ; backend B141 : `POST /api/image/upload`. La branche vidéo `/api/video/upload` correspond à B140. |
| 1 | `POST /api/leads/:leadId/rename` | F001 · conversions.js L10 ; crayon de renommage | [SÛR] Backend B126 : `POST /api/facebook/leads/:id/rename` ; différence de préfixe, pas de nom de paramètre. |
| 2 | `POST /api/cache/clear` | F003 / F129 · conversions.js L12 / ai-recommendations.js L155 ; rafraîchissements forcés | [SÛR] Absent ; [À VÉRIFIER] conséquence sur les étapes suivantes non décrite. |
| 3 | `GET /debug/reset-conversations` | F069 · conversions.js L78 ; commande de test | [SÛR] Absent ; [À VÉRIFIER] accessibilité de la commande et effet runtime inconnus. |
| 3 | `POST /debug/create-test-lead` | F070 · conversions.js L79 ; commande de test | [SÛR] Absent ; [À VÉRIFIER] accessibilité de la commande et effet runtime inconnus. |

[SÛR] Les 10 sites concernés sont F001, F003, F014, F019, F061, F065, F069, F070, F115 et F129.
[SÛR] SMS, email, appels, réponse Messenger texte, édition CRM et publication ont des destinations explicites présentes ; leur disponibilité réelle n’a pas été testée.

## 3. Redondances réelles — ne pas confondre même domaine et même usage

[SÛR] Aucun vrai doublon actif intégral, où une seule route suffirait avec les mêmes entrées, résultat et garanties, n’est démontrable à partir des descriptions disponibles.

| Paire de routes | Appels démontrés | Jugement |
|---|---|---|
| `POST /api/ai/suggest-reply` / `POST /api/ai/messenger-reply-custom` | F027 / F029 + F062 · conversions.js | [SÛR] Faux doublon : suggestion sur extrait + ton versus historique + instructions personnalisées ; deux usages distincts. |
| `POST /api/ai/suggest-lead-followup` / `POST /api/ai/lead-reply-custom` | F054 / F048 · conversions.js | [SÛR] Faux doublon : relance standard versus réponse contextualisée avec instructions ; deux usages distincts. |
| `DELETE /api/ai/publish/campaign/:id` / `GET /api/ai/publish/delete-campaign` | Aucun appel explicite pour B015 / B016 | [SÛR] Même suppression, même service `facebook-publish.deleteCampaign`, entrée chemin versus query ; doublon fonctionnel inactif côté inventaire frontend, hors critère des deux routes appelées. |
| `GET /api/ai/publish/campaigns` / `GET /api/ai/publish/list-campaigns` | B012 appelée F106 / F142 ; B017 sans appel explicite | [SÛR] Deux listes de campagnes, une seule appelée dans les chemins nommés ; pas de doublon actif démontré pour cette paire. |
| `GET /api/facebook/campaigns` / `GET /api/ai/publish/campaigns` | F149 / F151 / F153 versus F106 / F142 | [SÛR] Deux accès à des campagnes utilisés ; le premier expose statut/limite, le second alimente la publication ; [À VÉRIFIER] substituabilité des résultats non décrite. |
| `POST /api/facebook/ads/:id/budget` / `POST /api/facebook/adsets/:id/budget` | F092 versus F126 | [SÛR] Même effet métier sur un budget d’adset ; identifiant ad versus adset, et contrôle du mode budgétaire mentionné uniquement pour B063 ; [À VÉRIFIER] doublon intégral non établi. |
| `POST /api/facebook/ads/:id/status` / `POST /api/ai/execute-action` | F081 / F084 / F124 versus quatre chemins neutralisés | [À VÉRIFIER] Recouvrement décrit pour pause/activation ; l’utilisation de B007 reste non certifiable et l’exécuteur IA couvre aussi d’autres actions. |
| `GET /api/comms/full-history/:lead_id` / `GET /api/comms/history/:lead_id` | F067 / F068, chargés dans le même flux | [SÛR] Recouvrement partiel des communications sortantes : historique complet versus sortant ; [À VÉRIFIER] utilité du complément et risque de double affichage, schémas et fusion non décrits. |
| `GET /api/facebook/ads/details` / `GET /api/facebook/ads` | F118 / F119 · ai-recommendations.js | [SÛR] Faux doublon dans ce flux : résultat détaillé puis fallback conditionnel ; pas de double chargement systématique établi. |
| `POST /api/facebook/ads/:id/decline-preview` / `POST /api/facebook/ads/:id/decline-with-ai` | F088 / F089 · ads-manager.js | [SÛR] Faux doublon : génération sans publication versus création après validation. |
| `POST /api/ai/publish` / `POST /api/ai/publish-video` | F107 / F144 / F145 versus F143 | [SÛR] Faux doublon : publication image versus vidéo ; les médias et traitements diffèrent. |

[SÛR] Une même route appelée depuis plusieurs boutons, une vue active/archives, une action unitaire/groupée ou une modale/drawer n’est pas deux routes backend redondantes.
[SÛR] Les flux répétés de conversions.js restent des sites d’appel distincts dans le comptage de 160 ; ils ne sont pas gonflés en doublons de routes.

## 4. Incohérences — classement par gravité

### 4.1 Fonction utilisateur incompatible avec les chemins inventoriés

[SÛR] Les quatre familles photo Messenger, image éditeur, renommage et cache présentent les écarts du §2 ; les répétitions photo/cache montrent que ces écarts ne concernent pas un seul bouton.
[À VÉRIFIER] Le référentiel §2 décrit « photos in/out » opérationnelles, alors que les quatre appels photo sortants nommés ne correspondent pas aux chemins backend ; contradiction documentaire certaine, panne sortante réelle non testée.
[SÛR] Le référentiel §5 constate que tous les scores lead valent 50, tandis que le tri score et « Top 3 » sont présentés ; aucun classement de qualité distinctif ne peut en résulter selon ce référentiel.
[À VÉRIFIER] Ce dernier constat est une dette connue du référentiel, sans nouvelle vérification code ni production.

### 4.2 Actions destructrices ou mutantes accessibles par des lectures HTTP

[SÛR] `GET /api/ai/publish/delete-campaign` supprime la campagne indiquée en query ; aucune confirmation supplémentaire n’est décrite dans l’inventaire.
[SÛR] `GET /api/ai/publish/delete-all-test` supprime toutes les campagnes sauf une exception codée en dur ; son périmètre décrit est plus large que « uniquement les campagnes de test ».
[À VÉRIFIER] Ces GET mutent l’état Meta ; authentification, exposition effective, possibilités de déclenchement accidentel et protections non décrites route par route. Aucun appel n’a été effectué.
[SÛR] Les GET `test-post`, `test-image`, `test-creative`, `test-adset`, `create-leadgen-form` et `test-lead-ad`, tous sous `/api/ai/publish/`, créent ou téléversent également des objets Meta selon l’inventaire.
[SÛR] À l’inverse, `DELETE /api/history` et `DELETE /api/history/analyses` mentionnent explicitement `confirm=true` ; l’inventaire n’établit pas cette même garantie pour les deux GET de suppression campagne.
[À VÉRIFIER] Différence documentaire de garanties, pas preuve d’absence de contrôle dans le code.

### 4.3 Recouvrements et comportements différents

[SÛR] La route budget par publicité B063 mentionne un contrôle du mode budgétaire ; la route budget direct adset B067 ne le mentionne pas ; mêmes fonds d’adset, entrées et garanties décrites différemment.
[À VÉRIFIER] La différence réelle de validation et son effet sur une campagne CBO ne sont pas établis ; l’absence dans une description ne prouve pas l’absence dans le code.
[SÛR] `GET /api/ai/history` renvoie un historique indisponible, alors que `GET /api/history/analyses` renvoie des analyses persistées ; deux accès au même domaine présentent des capacités incompatibles.
[SÛR] Aucun des deux n’a de correspondance frontend explicite ; ce constat ne prouve donc pas une panne utilisateur.
[SÛR] Le référentiel D7 annonce la suppression du bouton manuel, tandis que F020 / F021 décrivent vérification et envoi d’une « réponse manuelle » ; contradiction entre descriptions.
[À VÉRIFIER] L’inventaire ne précise pas si ces fonctions sont encore accessibles ou si elles envoient un texte initialement généré par IA.
[SÛR] DECISIONS D-008 impose « nous » dans les SMS automatiques, tandis que le référentiel §2 décrit un rédacteur Je/Nous ; périmètres automatique et manuel différents, pas de contradiction démontrée.
[SÛR] Le référentiel abandonne les MMS et B087 reste une route conditionnelle sans appel frontend explicite ; présence du vestige établie, réactivation ou violation de la décision non démontrée.
[SÛR] Aucun endpoint CAPI ne figure dans les 155 routes ; cela est cohérent avec la décision D5 du référentiel, et non un oubli à transformer en instruction technique.

### 4.4 Inventaires et référentiel : limites qui empêchent une conclusion de suppression

[SÛR] Cinq lignes frontend « oui » masquent leur chemin ; deux autres lignes sont des helpers sans destinations ; un rapprochement entièrement nominatif est impossible.
[SÛR] Le référentiel décrit métriques par jour/publicité, snapshots intraday, recommandations natives et géographie par région, mais leurs routes B043, B075–B080 figurent parmi les 60 sans appel explicite.
[À VÉRIFIER] Cela peut relever des helpers GET ou d’appels non détaillés dans ces inventaires ; leur inutilité n’est pas démontrée.
[SÛR] Les deux inventaires conservent un paragraphe « Suite de l’inventaire » annonçant des ajouts futurs, alors que 14 fichiers / 9 fichiers et les totaux annoncés sont présents.
[SÛR] Le référentiel affirme « aucun système d’alertes » au §5, tandis que F147 décrit le chargement des pubs pour les alertes Cockpit ; contradiction de formulation.
[À VÉRIFIER] Alertes Cockpit et alertes de qualité des leads peuvent être deux périmètres distincts ; l’inventaire ne décrit pas les règles de ces alertes.
[SÛR] Les suppressions lead, conversation et publicité portent des effets différents : suppression locale réversible, suppression CRM sans effet Facebook, archivage Meta ; aucune équivalence ni destruction uniforme ne doit être supposée.

### Synthèse pour arbitrage, sans solution technique

1. [SÛR] Priorité utilisateur : 7 couples absents, 10 sites concernés ; panne réelle à vérifier avant de la déclarer.
2. [SÛR] Priorité danger : GET de suppression campagne et suppression large au périmètre décrit ; exposition et garde-fous à vérifier.
3. [SÛR] Priorité maintenance : recouvrements budget / historiques ; aucun vrai doublon actif intégral prouvé.
4. [SÛR] Priorité encombrement : 60 routes sans correspondance nommée, dont callbacks et interfaces externes légitimes ; aucune liste de suppression justifiée.
5. [SÛR] Limite documentaire : sept destinations non certifiables, placeholders et affirmations divergentes du référentiel ; informations manquantes signalées au Pilote.

### Contrôles de cohérence du rapprochement

| Contrôle | Résultat |
|---|---|
| Totaux lus dans les tables | [SÛR] 155 routes / 160 sites / 14 fichiers backend / 9 fichiers frontend. |
| Partition backend | [SÛR] 95 routes rapprochées + 60 sans correspondance nominative = 155. |
| Partition frontend | [SÛR] 143 entièrement rapprochés + 9 entièrement orphelins + 1 mixte + 7 indéterminés = 160. |
| Développement des chemins alternatifs | [SÛR] 156 branches nommées = 146 rapprochées + 10 absentes. |
| Colonne de présence frontend | [SÛR] 148 oui + 9 non + 3 à vérifier = 160 ; un « oui » neutralisé n’est pas une preuve de destination. |
| Périmètre | [SÛR] Aucun changement applicatif, aucune action externe et aucune solution technique proposés. |

## Trace Git de livraison

Pré-vol anti-cache : HEAD distant `442fa2a7ac75be8da1e9ab441b47e50a48f99c21`, puis lectures sur ce même état Git.
Le commit de livraison se retrouve par le message `docs(facebook-ads): DIAG-001 diagnostic des inventaires`.
Pré-push effectué : `git fetch origin` puis `git rebase origin/main` ; branche à jour.
Push Git HTTPS refusé faute de credential dans le terminal, sans modification distante.
Livraison via la connexion GitHub du compte du dépôt : mêmes deux fichiers, commit atomique sur le HEAD vérifié, avancement sans force et relecture distante.

Empreintes Git des quatre sources à l’état de lecture :

| Source | Blob Git |
|---|---|
| INVENTAIRE-BACKEND.md | `4fabbd85e636939ad219fa4edebd976432c3d951` |
| INVENTAIRE-FRONTEND.md | `ece238033b999f62795cc0c12a0e829278cdefe3` |
| REFERENTIEL.md | `e3389bf272639e346402b9f0ee9a6593b1987c82` |
| DECISIONS.md | `1a421b9ae0a59473392ee2e139865e5de3b8a17f` |
