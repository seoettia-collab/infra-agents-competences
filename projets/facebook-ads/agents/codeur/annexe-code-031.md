# Annexe CODE-031 — diagnostics natifs Meta

## Mission, sources et bases

- Mission CODE-031 lue au HEAD du hub `05f78a2334604e2765ec62fec6fc222882fede18`.
- [Documentation officielle Meta : Opportunity Score and Recommendations](https://developers.facebook.com/documentation/ads-commerce/marketing-api/overview/performance-recommendations), consultée le 13/10/2026.
- [Référence officielle Ad Account](https://developers.facebook.com/documentation/ads-commerce/marketing-api/reference/ad-account), consultée le 13/10/2026.
- Les outils de recherche n'ont pas rendu la page de guide ; le texte officiel a été obtenu directement à son URL, sans connexion ni exécution de script.
- Le lecteur historique DEV-004 existait ; ses anciens champs ne correspondent pas au schéma groupé documenté aujourd'hui. Il reste intact ; CODE-031 utilise un nouveau lecteur natif dédié.
- Backend main de départ : `ea239c3b683e164b03dd2f4856689641d128baf2`.
- Frontend main de départ : `66a2189fff4f7630fb267cbf58b330e31ab5037d`.
- Branche isolée dans les deux dépôts : `code-031-meta-diagnostics`.

## Lecture native et filtrage

- GET compte `/recommendations` uniquement ; contenu optionnel demandé avec `fields=recommendation_content` ; pagination par curseur, sans utiliser les URLs de pagination pouvant porter un jeton.
- Schéma groupé normalisé : type, objets concernés, stade, heure de recommandation, corps exact, gain annoncé et lien Ads Manager.
- Score : lecture du portefeuille propriétaire du compte puis GET portefeuille `/recommendations`, restreint à ce compte par `ad_account_ids`.
- Aucun score reconstitué ; aucun score Meta utilisé pour recalculer le score Mistral.
- Seul `mid_flight_recommendation` est conservé ; absence de stade non interprétée comme mid-flight.
- Les objets identifiés doivent appartenir au périmètre en diffusion ; une suggestion globale sans objets n'est pas injectée dans une analyse limitée à une campagne.
- Liste blanche : CREATIVE_FATIGUE, CREATIVE_LIMITED, FRAGMENTATION_V3, CONVERSION_LEADS_OPTIMIZATION, BUDGET_LIMITED, SCALE_GOOD_CAMPAIGN, AUTOMATIC_PLACEMENTS, ADVANTAGE_PLUS_AUDIENCE.
- Les suggestions CAPI/pixel/signaux documentées restent visibles en conflit D5, même lorsqu'elles sortent de la liste blanche générale ; aucun masquage silencieux de ces conflits.
- Réduction : budget/scaling, remplacement créatif, expansion d'audience et nouvelles configurations de leads bloqués.
- HOUSING : suggestion Advantage+ Audience affichée en conflit avec les règles de ciblage.
- D5 : suggestions CAPI/pixel/signaux et optimisation Conversion Leads liée aux signaux CRM bloquées.
- Les modifications budget/consolidation touchant une publicité protégée restent en conflit avec les 72 heures.
- Compteurs distincts : types non pertinents, stades exclus, objets hors périmètre et entrées anciennes.
- Le texte natif est affiché sans réinterprétation ; les liens sont limités aux domaines Ads Manager autorisés, sans paramètres sensibles.
- Toute suggestion du bloc natif est en consultation. Les liens des entrées conflictuelles ou anciennes sont désactivés.

## IA, fraîcheur et indépendance

- Les faits pertinents, frais et non conflictuels sont ajoutés aux trois prompts : performance, audit, fusion.
- Les règles Mistral sont réaffirmées avant ces données ; les textes externes ne sont jamais des instructions ni une autorisation d'exécuter.
- Le prompt demande une provenance Mistral, Meta ou Mistral + Meta lorsque les constats concordent.
- Aucune recommandation conflictuelle n'entre dans le JSON de faits envoyé à l'IA.
- L'indisponibilité Meta ne change ni les métriques, ni le modèle, ni le calcul du score Mistral ; l'analyse Mistral continue.
- Cache de lecture de 2 minutes, mutualisé entre les sources ; appels Meta limités dans le temps. Une lecture incomplète n'est pas présentée comme un comptage complet.
- Fraîcheur locale : lecture à actualiser après 15 minutes ; une recommandation de plus de 24 heures, sans heure valide, ou avec expiration explicite atteinte est marquée à revalider et exclue des faits IA.
- Ces seuils sont des protections locales ; ils ne prétendent pas être une durée de validité annoncée par Meta.
- Source et heure visibles dans le bloc ; chaque entrée a trois lignes de contenu : texte, gain, lien.
- États explicites : zéro recommandation, diagnostics indisponibles, diagnostics désactivés.
- Les anciens rapports gardent les protections CODE-030 ; une lecture Meta actuelle peut être rafraîchie indépendamment sous le rapport Mistral.

## Interrupteur et déploiement

- Interrupteur dans le bloc Vu par Meta ; réglage authentifié GET/POST `/api/ai/meta-diagnostics/settings`.
- Réglage booléen persistant dans le DATA_DIR ; désactivation immédiate des lectures et des ajouts aux prompts, invalidation des caches sans redéploiement.
- Backend publié : `e6b6e520c685103e56df87fe0e8a2fbf774b0681` ; arbre `e197e89cff68d85a8cbf92498efc21b5f3457223`.
- Frontend publié : `c9f0d821a6df43810d04fb16d3d4e3163a01788b` ; arbre `1a791358edbd27c09625d53d2239cff96ab92f57`.
- Arbres distants identiques aux arbres locaux testés ; références mises à jour depuis leur main vérifié avec contrôle du SHA attendu.
- Render : workspace `tea-d4qdtsali9vc739s5000`, unique service `srv-d6cq3hi4d50c73aa1rkg`.
- Déploiement `dep-db6sh4m7bikc73fid810`, live le 13/10/2026 à `05:59:46.843537Z`.
- Script frontend servi sur Netlify identique au fichier local testé.
- Arrêt puis réactivation effectués en production : le réglage et l'état désactivé ont été relus ; le même déploiement reste live ; réglage final activé.

## Preuves du compte réel

- Ancienne route avant déploiement : zéro recommandation, score absent.
- Nouveau lecteur après déploiement : recommandations disponibles, nombre reçu 0, types reçus `[]`, aucun fait Meta inventé.
- Score portefeuille NON_ACCESSIBLE, classification technique GRAPH_ERROR ; aucun chiffre de remplacement.
- Analyse réelle `/api/ai/copilot-orchestrate`, today, active, terminée à `2026-10-13T06:01:50.015Z` / 08h01 Paris.
- Performance et audit OK ; métadonnées natives identiques dans performance, audit et fusion, lecture du `06:01:17.123Z`.
- Plan final : une action informative, non exécutable automatiquement ; aucune action publicitaire effectuée.
- Rendu vérifié avec le script réellement servi et le JSON réel : bloc sous le diagnostic Mistral, message « Meta ne signale rien à ce jour », score indisponible, source et date visibles.
- Le compte ne fournit aucune entrée réelle : gains, conflits et convergence Mistral/Meta ne peuvent pas être démontrés sur le compte aujourd'hui. Leurs comportements sont vérifiés sur fixtures.

## Tests et limites

- Node 20.11.1, backend DATA_DIR temporaire et PORT 39304 ; `node --test tests/*.test.js` : 111 backend et 15 frontend, aucun échec ni test ignoré.
- `node --check` réussi sur chaque fichier JavaScript modifié/ajouté avant commit ; `git diff --check` réussi.
- Fixtures : réponse groupée et pagination, score portefeuille nul valide, zéro réel, panne et lecture partielle, stade inconnu, liste blanche, compteurs, conflits, expiration, absence d'appel réseau à l'arrêt, sécurité des liens et rendu des états.
- Aucun branchement MCP, aucune mutation Meta, aucune activation CAPI, aucun changement de saas ou du service interdit.
- CODE-032 est apparu dans le hub pendant la livraison ; sa maquette et sa refonte ne sont pas implémentées dans CODE-031.

## Fichiers applicatifs

- Backend : `routes/ai.js`, `services/claude-api.js`, nouveau `services/meta-diagnostics.js`, nouveau `tests/code-031-meta-diagnostics.test.js`.
- Frontend : `js/ai-recommendations.js`, `css/ai-recommendations.css`, nouveau `tests/code-031-meta-diagnostics.test.js`.
- Preuves structurées sans secret : `preuves-code-031.json`.
