# Gouvernance — Marketing Dashboard Mistral Pro Reno

Version 3.0 — 29 octobre 2026. Phase : production et utilisation.
Demandée par Ricardo ETTIA. Remplace les procédures de construction de la v2 pour ce projet uniquement.

## Responsabilités

- Ricardo ETTIA est le Gérant et le décideur : objectifs, priorités, budgets et changements engageants.
- Le Pilote existant utilise son skill dédié pour coordonner les agents, spécifier les interventions, contrôler les livraisons et tenir la documentation.
- L'assistant personnel de Ricardo explique les rapports, prépare ses réponses et formule ses questions. Il ne remplace pas le Pilote et n'engage pas de travaux de sa propre initiative.
- Les agents spécialisés interviennent selon leur métier et le périmètre confié par le Pilote. Leur modèle n'est pas figé dans cette gouvernance.
- Une demande directe du Gérant autorise le travail documentaire qu'elle décrit ; elle ne transforme pas l'assistant en Pilote.

## Objectif en production

Acquérir des demandes qualifiées via Meta Ads et ChatGPT Ads, les retrouver dans Conversions, alerter le Gérant et suivre leur évolution commerciale.

Priorité : fiabilité de la réception, rapidité de traitement, mesure des résultats et préservation des données. Les fonctions livrées, déployées et testées en réel doivent être distinguées.

## Coordination

Le Pilote organise directement le travail avec ses agents via son skill.
Les anciens circuits manuels et formats obligatoires de la v2 ne constituent plus une condition d'exécution.
Les réponses au Gérant sont courtes, compréhensibles et indiquent le résultat, les limites réelles et la prochaine décision utile.
Les preuves durables sont conservées dans les dépôts, sans imposer un gabarit de rapport.

## Interventions en production

- Vérifier le code et l'état courant avant toute intervention ; ne pas reconstruire une fonction déjà livrée.
- Isoler les changements de code, effectuer les tests appropriés et prévoir un retour arrière.
- Préserver les leads Facebook, demandes site, échanges et statuts CRM.
- La phase production n'interdit pas la maintenance ni les évolutions utiles.
- La fusion et le déploiement technique suivent l'autorisation du Gérant et le contrôle du Pilote. Une autorisation déjà donnée pour le travail concerné reste valable ; ne pas la redemander.
- Un commit, une fusion et un déploiement sont des preuves différentes ; le fonctionnement réel nécessite son propre contrôle.
- La branche `saas` reste hors périmètre et gelée sauf décision explicite.
- Les standards partagés du dépôt ne sont pas modifiés ; les présentes règles locales remplacent les procédures locales antérieures devenues incompatibles.

## Réception et suivi commercial

- Enregistrer la demande avant l'alerte et ne confirmer au client qu'après stockage réussi.
- Conserver le prospect en cas d'échec de notification.
- Distinguer alerte interne et contact client : une alerte ne signifie pas « contacté ».
- Préserver chaque nouvelle demande, sa provenance et son projet lors d'un rapprochement.
- Ne pas promettre une déduplication multicanale complète tant qu'elle n'est pas livrée.
- « Acceptée par SMSGate » ne signifie pas « livrée au téléphone ».
- Une UTM déclarée ne constitue pas une attribution OpenAI vérifiée.

## Publicité et mesure

- Aucune activation payante, prolongation, hausse de budget ni modification engageante sans autorisation du Gérant couvrant l'action.
- Les accès du plugin ChatGPT et les capacités du Dashboard sont distincts.
- Le module natif ChatGPT Ads est actuellement en lecture seule ; ne pas présenter ses commandes de lancement ou d'optimisation comme disponibles.
- Les budgets et les statistiques viennent d'une lecture datée du compte, jamais d'une ancienne consigne.
- Distinguer statut actif, approbation, éligibilité et diffusion mesurée.
- Suivre dépenses, clics, demandes, demandes qualifiées, coût par demande, devis et chantiers signés lorsque les données existent. Une donnée manquante n'est pas un zéro.
- Les contraintes Meta, dont la catégorie spéciale applicable au compte, restent propres à Meta et ne sont pas transposées automatiquement à OpenAI.
- La décision historique D5 concernant le pixel/CAPI Meta ne vaut pas interdiction globale du suivi OpenAI ; sa mise en œuvre doit être explicitement cadrée.

## Documentation et sécurité

- Source de référence : `projets/facebook-ads/documentation/` dans `seoettia-collab/infra-agents-competences`.
- Lire d'abord `README.md`, `REFERENTIEL.md`, puis les documents du module concerné.
- Le code décrit la capacité livrée ; seuls des contrôles de production datés prouvent son fonctionnement réel.
- Conserver les décisions et preuves historiques avec leur date ; retirer les anciennes procédures des documents d'usage.
- Aucun secret ni donnée personnelle de prospect dans la documentation, les logs ou les URL. Ne pas reproduire la clé Dashboard existante.
- Les valeurs Advertiser API, modèles, SMS et téléphonie restent dans leurs configurations sécurisées.
- La présente révision documentaire ne modifie ni campagne, ni budget, ni fournisseur SMS, ni authentification.
