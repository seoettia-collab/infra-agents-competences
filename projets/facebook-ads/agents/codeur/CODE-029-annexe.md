# CODE-029 — correction du contexte IA Reco

## Références et livraison
- Gouvernance lue après pré-vol : 467ed4f50a0309fd5f6878491a14bb88a3a436df.
- Base backend distante : e66a4b15a640bfd6e75259758b85ab4efee45800.
- Baseline locale équivalente : 0207e4f, arbre d60620dc9ce2179db9ed8ad8333e614e243f9929 identique à la base distante.
- Branche isolée : code-029-active-delivery.
- Commit local : 7176cb2 ; publication par objets GitHub avec parent distant exact.
- Commit distant et avance rapide main : 69d4411d43e0e471901c85b2780d35ae5a274e57.
- HEAD distant vérifié avant publication ; mise à jour avec expected_sha, sans force.
- Rebase local sur origin/main vérifié ; transport privé sans authentification utilisé via connecteur GitHub pour publier.
- Autorisation de déploiement : section Déploiement de la mission CODE-029.
- Service exclusivement : mistral-pro-reno-backend, srv-d6cq3hi4d50c73aa1rkg, workspace tea-d4qdtsali9vc739s5000.
- Déploiement : dep-db6rl1oae00c73be8fig ; trigger new_commit ; live à 2026-10-13T04:59:45.681647Z.
- Santé vérifiée : healthy.
- Commit final : 359225f3ba612118de298926f18cf32abced3556 ; ajout du cas zéro publicité en diffusion après la première validation réelle.
- Déploiement final : dep-db6rnv942hec73bednqg.
- Aucun lancement manuel de déploiement, aucun appel au service SaaS, aucune écriture sur Meta.

## Causes corrigées
- /analyze passait status:ACTIVE à getAds, mais getAds ignorait ce paramètre ; des créations anciennes et des publicités en pause pouvaient entrer.
- /analyze et /audit-config calculaient l’âge à partir de created_time.
- /audit-config gardait toute la structure du compte dans son contexte de campagnes et ensembles.
- /copilot-orchestrate réinjectait tous les noms et statuts, publicités en pause comprises.
- Les données globales pouvaient inclure des périodes et publicités hors diffusion actuelle.

## Source commune
- services/ai-delivery-scope.js collecte uniquement par GET les publicités, campagnes, ensembles et activités Meta.
- Pagination par curseur, avec refus d’une pagination incomplète.
- Sélection stricte : ad.effective_status ACTIVE ; parents effectifs ACTIVE ; horaire de l’ensemble compatible avec maintenant.
- Aucun recours au statut configuré ACTIVE comme preuve de diffusion.
- Campagnes et ensembles transmis limités aux parents des ads sélectionnées.
- Créatifs, données agrégées et flags ne portent que sur les IDs sélectionnés.
- Aucune publicité en pause, supprimée ou archivée transmise dans l’index du Copilote.
- Modèle Claude Opus 4.7 et paramètres du moteur inchangés.

## Reprise et compteurs
- Lecture des activités event_time/event_type/extra_data/object_id.
- Reconnaissance des transitions de statut vers Active, sur la publicité et ses parents ; la plus récente date applicable est retenue.
- Les modifications de créatif ne sont pas confondues avec une reprise.
- Aucun usage de created_time ou updated_time comme substitut.
- Historique indisponible ou non interprétable : reprise inconnue, métriques inconnues et protection active ; jamais une ancienneté inventée.
- Âge sans arrondi de seuil : 71,999h reste protégé ; 72h exact devient éligible à analyse.
- Métriques filtrées à l’intersection de la période choisie et des jours postérieurs au jour de reprise.
- Jour partiel de reprise exclu : Meta fournit ici des métriques quotidiennes, pas une coupe exacte à la seconde.
- Les compteurs retournés décrivent donc explicitement une couverture partielle post-reprise ; ils ne permettent pas de conclure « 42 jours sans lead ».
- Aucun zéro substitué à des métriques indisponibles.
- La durée depuis reprise n’est pas utilisée comme durée sans résultat lorsque la fenêtre de métriques ne la couvre pas entièrement.
- Champs de preuve ajoutés aux métadonnées : delivery_since, age_hours, learning_protected, metrics_since, metrics_until et metrics_note.

## Protection 72h
- Règles injectées dans le prompt de performance, l’audit et la fusion.
- Interdiction de pause/désactivation et de changement de budget si âge <72h ou inconnu.
- La règle vise aussi les budgets d’ensemble et de campagne qui affectent la publicité.
- Filtrage des recommandations structurées retournées pour empêcher une réponse fautive de passer.
- Les recommandations d’observation restent possibles.
- Mode réduction, HOUSING, D5 et contraintes commerciales existantes conservés.

## Tests
- Node 20.11.1 ; better-sqlite3 compatible ABI 115 ; SQLite isolé.
- DATA_DIR=/tmp/code-029-tests PORT=18229 node --test tests/*.test.js.
- Résultat final : 96 tests passés, zéro échec.
- node --check sur les cinq JavaScript modifiés/ajoutés ; git diff --check passé.
- Tests de statut effectif, parents, exclusion de sentinelles paused/archived/deleted, reprise du parent, absence d’usage de création.
- Tests de métriques antérieures exclues, intervalle sélectionné, historique manquant, jour partiel et frontière exacte 72h.
- Tests de réponse IA volontairement fautive : pause et budget supprimés ; mature reste analysable.
- Tests des routes /analyze, /audit-config et /copilot-orchestrate avec captures du contexte envoyé au modèle.
- Réduction, HOUSING et D5 présents dans le prompt ; aucune action Meta exécutée pendant les tests.

## Nouvelle analyse réelle
- Première analyse réelle exécutée sur 69d4411 ; le correctif final ne modifie que le cas sans publicité active.
- POST /api/ai/copilot-orchestrate ; date_preset=today, status_filter=active.
- performance=ok ; audit_config=ok.
- Deux publicités seulement :
- Extension maison en IDF : reprise 2026-10-12T20:15:48Z, soit 22:15:48 Paris ; ≈8,75h ; 65 impressions, 0 clic, 0 lead, 0,78€ sur la fenêtre couverte.
- Salle de bain clé en main : reprise 2026-10-12T20:11:08Z, soit 22:11:08 Paris ; ≈8,83h ; 258 impressions, 7 clics, 0 lead, 4,76€ sur la fenêtre couverte.
- Les deux ont learning_protected=true.
- Métriques couvertes : 13/10/2026 ; jour partiel de reprise du 12/10 exclu.
- Verdict retourné : « Les 2 pubs sont en apprentissage protégé (<9h depuis reprise). Aucune modification possible, surveillance uniquement. »
- Plan : « Laisser l’apprentissage se dérouler » ; « Surveiller CTR et clics à 72h ».
- Types d’action : info_only ; info_only ; aucune exécution automatique.
- Vérification sur le rapport final et les deux sources : aucune expression 42 jours/days.
- Aucune recommandation de pause de Salle de bain ; aucun changement de budget recommandé.
- Analyse sauvegardée par le chemin normal du Copilote, sans modification du compte publicitaire.

## Périmètre inchangé
- Aucun fichier frontend modifié.
- Studio Pub, Rédacteur IA et rédaction assistée non modifiés.
- Aucune modification des SMS, du nettoyage, de Messenger ou de CODE-028.
- Aucun secret ajouté dans les sources, journaux ou preuves.

## Contrôle du déploiement final
- dep-db6rnv942hec73bednqg : live, terminé à 2026-10-13T05:06:09.311687Z.
- Après redémarrage : /health HTTP 200 healthy ; /api/ai/copilot-latest HTTP 200 success=true ; aucune mention 42 jours/days dans le rapport enregistré.
