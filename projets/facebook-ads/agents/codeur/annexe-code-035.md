# CODE-035 — annexe de livraison

## Pré-vol, bases et publication

Fiche Codeur, gouvernance et mission lues après fetch/reset du hub au HEAD `6f910454065f57dc2e8af1d211f49fedda47e828`. `documentation/DIAGNOSTIC-003.md` intégralement lu avant modification ; ses lignes historiques ont été recoupées avec le code courant.
Bases distantes : backend `eed11386b448e30f8e7226ad7131d7fd303a8d4d` (copie locale équivalente `0dccda3`, arbre `867b9bc021525cd49a91c1837729a2f0de008e4b`) ; frontend `91a1b547e28126dba5b1b0bb46b74859bcf179f4` (copie locale équivalente `6d977f4`, arbre `a91f252f9cb4acef521f4ad87ca451948ff1bb4c`).
Travail isolé sur branches `code-035` des deux dépôts. Commit local backend `8e8d856`, frontend `8807e87` ; rebase effectué sur chaque parent équivalent. HEAD distants vérifiés avant publication par le connecteur GitHub, mises à jour avec expected_sha et sans force. Les arbres API et locaux sont identiques. Accès Git privé assuré par le connecteur, comme aux missions précédentes.
Backend main livré : `eab85bd99726501448fc3d82fa86f49baf83d7a1`, arbre `9b821ab9a5d6037dcce158b4998f8c3abe09c630`.
Frontend main livré : `8e27eb9147cb0e2954e590e3a7b282a6cd5e7c45`, arbre `ee0ad9e84a12a00ea23238cecc3b634ec42e903e`.

## F03 — sélection de période

`js/ai-recommendations.js` transmet since et until en plage personnalisée, sans substituer last_7d. Le preset reste transmis pour les autres sélections.
`routes/ai.js` transmet ces bornes aux deux routes sources et au périmètre chargé pour la fusion. L'analyse simple reçoit également les bornes qu'elle envoyait déjà.
`services/ai-analysis-context.js` valide les dates et l'ordre des bornes, accepte les presets définis, résout les jours dans le fuseau Meta et rejette les plages incomplètes/impossibles ou presets inconnus avec HTTP 400. Les dernières 3 journées sont désormais explicites ; une fin future est limitée au jour courant avec un avertissement dans les metadata.
`services/ai-delivery-scope.js` intersecte la fenêtre choisie avec le lendemain de la reprise vérifiée. L'exclusion du jour partiel de reprise, l'ancienneté et la protection 72 h ne changent pas. Aucun résultat hors plage n'est retenu ; une intersection vide reste indisponible, jamais zéro.
Le rapport expose dans Chiffres, ouvert par défaut, période choisie, fenêtre effective, fuseau et couverture de chaque publicité. Les anciens rapports sans ces metadata sont signalés comme tels.

Le défaut CRM est confirmé : la fonction existante ne filtre pas les campagnes, ne prend pas de plage personnalisée et utilise des fenêtres glissantes sans borne supérieure, avec certains presets absents. Option « signaler » retenue, sans modification du schéma ni de la base :
- campagne sélectionnée ou custom/yesterday/this_month : CRM non joint ; aucun total global substitué ; raison affichée dans le rapport et transmise au modèle ;
- périodes que le CRM sait lire : contexte explicitement distinct, toutes campagnes, borne inférieure réelle, aucune borne supérieure, caractère glissant/minuit du serveur indiqué. Les chiffres publicitaires restent ceux de la période Meta après reprise.

## F04 — audit en échec

La réponse de remplacement score_config=50 est supprimée. Si parsing et réparation échouent, retour HTTP 502 avec success=false et sans données d'audit notées. Un JSON parsable dont le score est absent/invalide est également un échec ; le vrai zéro numérique reste valide.
L'orchestrateur accepte une source audit uniquement si success=true et si score_config est un nombre fini entre 0 et 100. Une source en échec n'entre pas dans les rapports sources transmis au modèle et porte audit_config=failed.
Choix autorisé par la mission : si une source a échoué, le score global est supprimé (null), plutôt que de prétendre recalculer une pondération du score produit par le modèle. Le plan issu de la source restante est conservé avec les garde-fous. Le rapport affiche l'échec et le motif du score indisponible dans Chiffres ; le bilan affiche un tiret.
Aucun échec volontaire provoqué sur le modèle de production : ces branches sont exercées par les tests de routes avec réponses fournisseur simulées.

## F05 et F06

Le filtre de statut IA ne propose plus Toutes/En pause. Il affiche « Publicités en diffusion uniquement ». Les anciens appels de changement de statut restent forcés à active. Les trois routes de lecture concernées publient status_filter=active, y compris lorsqu'un client envoie paused. Le filtrage ACTIVE de la publicité, de ses parents et du calendrier reste inchangé.
Les compteurs de guardReport utilisent strictement executable_auto===true, comme la sélection du batch existant. execution ne décide plus de l'automatisabilité. Les compteurs moyen/faible sont également recalculés après retrait des recommandations protégées. Dans le rapport, les compteurs visibles et les attributs des lignes lisent le même champ booléen.
Aucun bouton Tout appliquer réintroduit dans l'écran CODE-034 ; la fonction existante continue à lire le champ canonique. Les décisions info_only ont une commande désactivée, pas une action Meta.

## Vérification et production

Node **20.11.1** : **125/125 tests backend** et **34/34 tests frontend**, soit **159 verts**. Syntaxe vérifiée pour chaque fichier JS modifié ; git diff --check réussi. Backend testé avec DATA_DIR temporaire et PORT dédié.
Tests ajoutés : passage des bornes sur les trois collectes, métriques limitées à septembre, plage entièrement avant reprise, frontière du jour dans le fuseau Meta, dates invalides/futures, CRM incompatible sans substitution, source audit illisible/score invalide, fusion partielle sans note, filtre actif malgré paused, compteurs executable_auto malgré un ancien execution contradictoire, présentation de la période effective et de l'échec. Les tests historiques, protection 72 h, absence/zéro, Meta natif et Studio restent verts.
Premier lancement des tests dans le nouveau worktree : dépendances locales absentes ; réutilisation des dépendances installées par lien local, sans changement du lockfile. Deux erreurs de fixtures nouvelles ont ensuite été corrigées ; le journal livré est celui de la suite finale verte.

Déploiement automatique Render confirmé **live** : `dep-db6vj4942hec73bid3p0`, service `srv-d6cq3hi4d50c73aa1rkg`, workspace `tea-d4qdtsali9vc739s5000`, commit backend livré, terminé le 13/10 à 09:28:53 UTC. Aucun redéploiement manuel doublonné.
Frontend Netlify : actif js/ai-recommendations.js identique octet pour octet au fichier testé ; SHA256 `7092f70f6a4e7251cfb574287b31e0531a8a48ff8d3f9b1f42172de29d77601a`.

Analyse réelle déclenchée par l'interface après choix Cockpit **01/09/2026–30/09/2026**, puis IA Reco → Analyser. Rapport du **13/10/2026 à 11:31:37 Europe/Paris** :
- période choisie et effective : 2026-09-01 au 2026-09-30 ; les metadata de performance, audit et fusion contiennent les mêmes bornes ;
- les deux publicités courantes ont repris après septembre : aucun jour admissible de septembre après reprise, aucune collecte d'insights hors fenêtre, toutes métriques rendues par tirets ;
- les deux publicités restent protégées par learning_protected=true ; mode réduction actif conservé ;
- sources performance/audit = ok sur cet essai réel ; contexte CRM non joint et raison visible ;
- plan : deux info_only, executable_auto=false ; auto_count=0, manuel_count=2, moyen_count=1, faible_count=1 ; deux commandes désactivées « Aucune action nécessaire » ;
- filtre visible « Publicités en diffusion uniquement », metadata active ; refonte CODE-034 conservée.
Une requête incomplète réelle, sans appel aux modèles, est rejetée HTTP 400 / success=false.
La lecture de copilot-latest confirme les metadata et les compteurs ; elle ne déclenche aucune réanalyse ni action Meta.

## Périmètre préservé et preuves

Aucune écriture sur les publicités, aucun CAPI, aucun changement HOUSING/D5/réduction, aucune modification Studio ou Rédacteur. CSS et index.html inchangés ; rapports restaurés toujours verrouillés. Aucun secret dans les preuves.

- `preuves-code-035/tests-backend.txt` et `tests-frontend.txt` : suites finales.
- `preuves-code-035/deploiement.json` : statut live, commit et hash du frontend, rejet d'une demande incomplète.
- `preuves-code-035/analyse-reelle.json` : extrait sans secrets, bornes des trois analyses, statuts, garde-fous et compteurs.
- `preuves-code-035/septembre.jpg` : sélection respectée, filtre honnête et compteurs.
