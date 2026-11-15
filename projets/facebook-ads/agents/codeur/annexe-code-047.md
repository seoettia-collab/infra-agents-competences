# CODE-047 — reprise 1 — 15 novembre 2026

## Verdict et versions

**NON POUR FUSION.** Le code de la reprise est publié, les tests pertinents passent. La lecture réelle de Meta et du Gestionnaire a été effectuée, mais **le service candidat n’a pas été exécuté contre Graph réel**. Une lecture de référence n’est pas une recette du candidat. La correspondance exacte de « Préparation en cours » reste non établie avec les champs Graph publics vérifiés.

| Dépôt | Base de reprise | Commit livré | PR |
|---|---|---|---|
| Backend | ee35d112be2522d6cfb2f8aee124a42673b34947 | 071671107c76f38f08c82a4d0b09332f4324ae64 | [#22](https://github.com/seoettia-collab/facebook-ads-backend/pull/22) |
| Frontend | 6eef39d9c59c2075bf5b52fe8e4888abde9f6a81 | 68640b82784fa76e47955f8710e80eb80e1da8f2 | [#20](https://github.com/seoettia-collab/facebook-ads-frontend/pull/20) |

Branches : fix/code-047-reporting-coherence. Backend publié avant les modifications frontend. Les bases main restent 3db9c13 et b9b0740 ; aucun changement de saas, aucune fusion, aucun déploiement ni aucune écriture Meta. Les deux PR sont brouillons et GitHub indique mergeable=true / clean au contrôle final. Retour arrière après une éventuelle fusion : revert des commits, backend et frontend coordonnés.

## Changements de la reprise

| Couche | Fichier | Changement |
|---|---|---|
| Backend | services/meta-delivery.js | Résolution conservatrice des libellés, raisons Meta intactes, hiérarchie, statut Indéterminé explicite |
| Backend | services/facebook-api.js | Lecture GET fraîche séparée des diagnostics ; échec de diagnostic ne supprime pas les métriques ; logs GET de reporting sans texte brut |
| Backend | routes/campaigns.js | Retrait du cache 300 s sur GET /ads/details, Cache-Control: no-store |
| Backend | tests/code-047-reporting.test.js | Adaptation de l’isolation des tests et du faux objet réponse |
| Backend | tests/code-047-delivery.test.js | Quatre tests : ambiguïté, hiérarchie/motifs, fraîcheur, journalisation sûre |
| Frontend | index.html | Colonne Diffusion Meta à côté de Statut et signalement des annonces indéterminées |
| Frontend | js/ads-manager.js | Statut réglé, diffusion séparée, titres exacts et échappés, cache navigateur désactivé, lignes/squelettes à 13 colonnes |
| Frontend | tests/code-047-coherence.test.js | Tests de rendu adaptés et test ajouté de colonne, motif et rafraîchissement |

Les points 1, 2 et 4 acceptés sous réserve par le Pilote sont conservés : aucun ID de campagne par défaut, choix actif sinon active la plus dépensière, nom Meta visible ; période globale inclusive de Paris ; union annonces/insights/historique, historique sans boutons, données indisponibles distinctes de zéro. Les anciens MAIN_CAMPAIGN_ID et libellé fixe ne sont pas réintroduits.

## Champs Graph et limites établies

Référence primaire consultée : [Meta Graph API — Ad](https://developers.facebook.com/docs/graph-api/reference/adgroup/). API du service : v25.0. La lecture ajoutée, via GET multi-IDs de 50 objets, demande :

```text
id,status,effective_status,issues_info,ad_review_feedback,failed_delivery_checks,
adset{id,status,effective_status},campaign{id,status,effective_status}
locale=fr_FR
```

La requête est distincte de la lecture des métriques et des métadonnées créatives. Une absence de droit, un champ rejeté, une erreur d’objet ou un diagnostic manquant laisse la diffusion Indéterminé ; les dépenses et les lignes historiques sont préservées. La compatibilité réelle de cette expansion complète et des permissions du jeton serveur n’est pas validée dans cette session.

| Signal disponible | Résultat du candidat | Limite |
|---|---|---|
| status ACTIVE/PAUSED | Statut Actif/En pause, interrupteur correspondant | Ne vaut pas acceptation ni diffusion Meta |
| ARCHIVED ou DELETED | Archivée / Supprimée, lecture seule | Ne dépend pas d’une métrique récente |
| effective_status DISAPPROVED | Refusée + motifs Meta bruts | Motif manquant explicitement signalé |
| effective_status WITH_ISSUES | Erreur de diffusion + motifs Meta bruts | Le Gestionnaire peut séparer Diffusion et Actions |
| PENDING_REVIEW | En cours d’examen | Aucun IN_PROCESS assimilé à un examen |
| PAUSED confirmé dans le diagnostic | Désactivé | Diagnostic indisponible = Indéterminé |
| CAMPAIGN_PAUSED + campagne PAUSED | Campagne désactivée | Aucune déduction depuis le seul interrupteur de campagne |
| ADSET_PAUSED + ensemble PAUSED | Ensemble de publicités désactivé | À comparer au libellé Meta réel pour ce cas |
| ACTIVE, IN_PROCESS, PREAPPROVED ou code inconnu | Indéterminé + avertissement visible | Ni Active ni Préparation en cours inventé |

issues_info, ad_review_feedback et failed_delivery_checks sont lus. Les textes sont conservés dans les raisons de la réponse, avec les statuts source et observed_at. L’interface échappe les caractères HTML et guillemets ; aucun modèle ne traduit ou reformule les motifs. Le survol utilise title ; le texte est également exposé dans aria-label sur un élément focalisable.

Le connecteur officiel Meta disponible dans la session expose **delivery**, avec les alias delivery_info/delivery_status et des sous-statuts. Il a renvoyé pending/preparing pour le carrousel. Ce catalogue de connecteur n’établit pas que le même champ existe dans l’API Graph publique. Aucun champ non documenté, aucun accès aux API internes du Gestionnaire, aucun Windsor, aucune extraction de jeton du navigateur et aucun branchement du connecteur de conversation dans le produit n’ont été ajoutés.

## Lectures Meta réelles — source distincte du candidat

Compte autorisé : 1485808979635813. Période du **17/10/2026 au 15/11/2026**, Paris. Source : connecteur officiel « Mistral Pro Reno — Meta Ads », lectures seules. Référence enregistrée le 15/11 à 08:38:53 UTC. Aucun autre compte n’a été interrogé pour cette recette.

| Objet | Réglage / effectif | Diffusion renvoyée | Dépense | Prospects renvoyés |
|---|---|---|---:|---:|
| Campagne Paris | ACTIVE / ACTIVE | Non demandée au niveau campagne | 390,40 € | 36 |
| Annonce 2, 120248281347920417 | PAUSED / PAUSED | off/off | 383,34 € | 36 |
| Carrousel, 120249397519330417 | ACTIVE / ACTIVE | pending/preparing | 0,04 € | null |
| TEST 14/11, 120249397928260417 | PAUSED / PAUSED | off/off | 0,03 € | null |
| Extension IDF, 120248878541540417 | ARCHIVED / ARCHIVED | archived/archived | 6,99 € | null |
| Court sans SMS v4, 120249391658050417, autre campagne | PAUSED / WITH_ISSUES | error/with_issues | 0,00 € | null |

**383,34 + 0,04 + 0,03 + 6,99 = 390,40 €**, égal au total Campagne Paris. Les valeurs null du connecteur sont conservées dans la preuve JSON ; elles ne sont pas converties en zéro. L’archivée n’est pas apparue dans la liste courante du connecteur : une lecture explicite de son ID l’a retrouvée. La preuve de réconciliation est [meta-live-reference.json](preuves-code-047/reprise-1/meta-live-reference.json).

Les chiffres 388,53 € et 381,54 € du message de mission ne sont plus les chiffres réels au moment de la reprise. La plage comprend la journée courante et Meta continue de mettre à jour ses résultats. Le premier relevé UI de la reprise donnait encore 383,23 € pour Annonce 2 ; il précède la référence API ci-dessus. Il ne faut pas présenter ces captures à des instants différents comme une comparaison simultanée exacte.

## Comparaison avec le Gestionnaire réel

Un onglet de recette a été ouvert à partir de l’onglet Meta de l’utilisateur. Le sélecteur a été réglé via le calendrier sur **17 octobre – 15 novembre 2026**. Seuls la période, les filtres d’affichage, l’actualisation et le survol ont été utilisés. Aucun interrupteur, bouton Modifier, publication ou action d’écriture n’a été déclenché. L’onglet de travail existant de l’utilisateur n’a pas servi à modifier des annonces.

| Cas | Gestionnaire réel observé | Candidat attendu avec les champs Graph seuls | Verdict |
|---|---|---|---|
| Annonce 2 | Désactivé | Désactivé si diagnostics accessibles | Parité plausible, à exécuter contre Graph |
| Carrousel | Préparation en cours | Indéterminé | Diffusion exacte non reproductible, signalée |
| TEST formulaire 14/11 | Désactivé, évolution depuis le tableau initial | Désactivé si diagnostics accessibles | État initial du message dépassé ; candidat à exécuter |
| Court sans SMS v4 | Diffusion : Non diffusé ; Actions : Erreur de diffusion | Erreur de diffusion selon WITH_ISSUES | Différence de placement/sémantique explicitée, pas une parité littérale prouvée |

Motif français exact au survol dans le Gestionnaire : **« La publicité doit être examinée: La résolution peut prendre entre 5 et 7 jours ouvrés. »** La lecture d’erreurs du connecteur, distincte du Graph candidat, a renvoyé le motif en allemand ; il n’a pas été traduit dans le code. Le candidat demande locale=fr_FR, dont le résultat effectif reste à vérifier avec le jeton serveur.

![Gestionnaire réel, période fixe](preuves-code-047/reprise-1/meta-manager-fixed-period.jpg)

![Gestionnaire réel, motif exact au survol](preuves-code-047/reprise-1/meta-manager-error.jpg)

## Rafraîchissement, journaux et périmètre d’écriture

Le bouton Rafraîchir appelle à nouveau /ads/details. Le frontend utilise fetch cache:no-store ; la route n’a plus de cacheMiddleware ; la réponse porte Cache-Control:no-store. La méthode de détails ne consulte aucun cache interne pour ses lectures de diffusion et de hiérarchie. Une panne après un rafraîchissement ne conserve pas un ancien badge : erreur explicite ou Indéterminé.

Les anciennes captures/journaux détaillés de getAdsWithDetails ne sont pas réintroduits. Les erreurs GET de reporting sont journalisées sous FB_REPORT_READ_ERROR avec statut HTTP, code, sous-code et indicateur transitoire ; les erreurs par objet sous FB_REPORT_REVIEW_UNAVAILABLE avec code. Ni texte brut d’erreur, ni URL, ni configuration Axios, ni jeton ne sont enregistrés dans ces nouveaux journaux. Les routes et journaux hors de ce chemin restent inchangés.

La comparaison par exécution isolée et sérialisation des fonctions confirme **13 handlers POST/DELETE identiques à la base main 3db9c13**, notamment budget, statut, texte, créa, formulaire et duplication. Les **23 autres méthodes de service** sont identiques. Le client partagé ajoute seulement une option de journalisation pour GET ; ses branches POST restent inchangées. Preuve : [write-scope-reprise.json](preuves-code-047/reprise-1/write-scope-reprise.json) et [script de contrôle](preuves-code-047/reprise-1/check-write-scope.cjs).

## Tests et captures locales

Node **20.11.1**, commande dans chaque dépôt : node --test tests/*.test.js. Backend avec DATA_DIR isolé dédié aux tests, sans base de production.

| Contrôle | Résultat |
|---|---|
| Backend complet | 318 tests : 317 réussis, 0 échec, 1 intégration externe ignorée |
| Frontend complet | 172 tests : 171 réussis, 1 échec préexistant CODE-041 |
| Tests CODE-047 | 9 backend + 8 frontend : 17/17 |
| Syntaxe avant commits de reprise | node --check, 5 JS backend + 2 JS frontend : 7/7 |
| Recette locale Chromium ordinateur/mobile | Aucune erreur JS ; 5 lectures de détails ; aucune écriture Meta ; historique sans boutons ; raison intacte ; colonne séparée ; cas ambigu signalé |

L’échec frontend tests/code-041-leads-navigation.test.js:15 reste le même que sur la base b9b0740 : assertion de texte sur conversions.js, non modifié. Le Pilote l’a explicitement laissé hors périmètre. L’intégration backend ignorée attend une source devis externe SITE_ESTIMATE_DEVIS_SOURCE.

La recette locale utilise des API simulées et porte le bandeau **RECETTE LOCALE — DONNÉES SIMULÉES**. Elle ne prouve pas une connexion réelle du candidat. Son appel POST /api/ai/generate-image-prompt est également intercepté localement ; aucun service externe ni aucune annonce Meta n’a été modifié. Script et résultat : [qa-reprise.cjs](preuves-code-047/reprise-1/qa-reprise.cjs), [qa.json](preuves-code-047/reprise-1/qa.json).

![Candidat local, ordinateur — données simulées](preuves-code-047/reprise-1/ads-1920.png)

![Candidat local, mobile défilé vers Diffusion Meta — données simulées](preuves-code-047/reprise-1/ads-390-delivery.png)

## Reprise nécessaire avant D-024

1. Exécuter le commit backend candidat dans un service local ou une prévisualisation disposant de la configuration Meta serveur existante, sans copier les secrets dans les rapports.
2. Vérifier réellement l’expansion des diagnostics Graph et ses permissions ; préserver Indéterminé si une information manque.
3. Charger le candidat frontend sur la période fixe, relever simultanément résultats et libellés du Gestionnaire, vérifier l’archivée en lecture seule et la somme des lignes.
4. Résoudre ou accepter explicitement la limite preparing et la différence Diffusion/Actions du cas Court. Le fallback Indéterminé est livré ; la parité exacte n’est pas déclarée réussie.
5. Retour Pilote puis fusion backend avant frontend et déploiement seulement selon D-024.

Aucun accès serveur Meta configuré n’est disponible pour exécuter le candidat dans cet environnement ; le connecteur officiel ne propose pas une requête Graph arbitraire au nom du service. Cette limite ne doit pas être contournée par une extraction d’identifiants de session ou un test en production non autorisé.
