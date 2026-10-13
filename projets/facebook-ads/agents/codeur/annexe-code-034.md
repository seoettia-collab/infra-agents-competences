# CODE-034 — annexe de livraison

## Base et publication

Hub : `7958de66b15015aefbdae6696cefbcc43d39a631` (fetch effectué avant lecture puis avant rapport).
Frontend main initial : `44d1cdf674125595ae44532906840ff3e2110adc`, arbre `97b4b5ed82552ffa65db35a27e5150498b7dcbd8` ; copie locale équivalente `653a790`.
Branche isolée : `code-034`. Frontend main final : `91a1b547e28126dba5b1b0bb46b74859bcf179f4` ; arbre `a91f252f9cb4acef521f4ad87ca451948ff1bb4c`, identique au commit local `6d977f4`.
Publications intermédiaires : `d6c3b584caef02a54c2a3d51cc35251d29f02d59`, `910fb6d50bc3bd7606e8bbb8624d0f7c04e38f5d`.
Chaque publication vérifie le HEAD distant par connecteur et utilise une mise à jour avec expected_sha, sans force. Rebase local sur le parent équivalent ; accès Git privé remplacé par le connecteur GitHub déjà utilisé sur les missions précédentes. Aucun concurrent écrasé.
Backend inchangé : `eed11386b448e30f8e7226ad7131d7fd303a8d4d`. Aucun déploiement Render ni changement de service.

## Réalisation

- `js/ai-recommendations.js` : décisions seules dans la colonne principale ; motif limité à la première phrase ; chevron accessible fermé, détail complet conservé ; une commande et Ignorer par ligne courante ; rapports historiques toujours en lecture seule.
- Chiffres ouverts ; points forts, points à surveiller, Vu par Meta, bilan, conversation et analyses sources fermés dans la colonne droite. Les nœuds des analyses sources sont déplacés sans perte lors d'une nouvelle analyse ou d'un rendu après Ignorer.
- `css/ai-recommendations.css` : variables existantes, grille 1fr/340 px, passage en une colonne à 980 px, boutons sur ligne séparée à 600 px, défilement du tableau limité au panneau Chiffres.
- `index.html` : analyses détaillées sous un volet fermé et suppression de l'ancien texte annonçant Tout appliquer.
- Ignore : clé versionnée par campagne, type de décision et publicité(s) ciblée(s), jamais le titre reformulé. Situation comparée par paramètres de l'action, IDs, statut, reprise, protection apprentissage et métriques. Date du rapport et âge continuellement croissant exclus. Les avis sans cible explicite utilisent le périmètre analysé ; des avis info_only de mêmes paramètres et mêmes cibles correspondent à la même décision ignorée. Métriques ou reprise modifiées : décision visible de nouveau. Persistance locale au navigateur comme auparavant ; stockage impossible signalé sans faux masquage. Anciennes clés globales par titre non réutilisées.
- Correction du rendu après Ignorer/Restaurer : appel de renderCopilotReport, au lieu de l'ancien nom de fonction inexistant.
- Pause/relance réutilisent POST `/api/ai/execute-action` sans confirmation. Budget réutilise la même route avec confirmation danger ; suppression réutilise DELETE `/api/facebook/ads/:id`, rouge et confirmation irréversible. Cible absente : commande désactivée. Liens Meta soumis à la liste autorisée existante. Aucune recommandation ajoutée artificiellement : l'IA conserve ses types et paramètres.
- Moteur IA, prompts, réduction, HOUSING, D5, protection 72 h et exclusion des pubs en pause inchangés. Studio CODE-033 et Rédacteur inchangés. Pas de retour des troncatures 40/125/30.

## Validation

Node **20.11.1**, `node --test tests/*.test.js` : **30/30 verts**. Vérification de syntaxe de chaque JS modifié et `git diff --check` réussies.
Nouveaux tests : présentation/repli, Ignore avec reformulation/date, séparation des cibles/campagnes, reprise/apprentissage/métriques modifiés, restauration, échec du stockage, commandes simulées pause/relance, refus et acceptation simulés de budget/suppression, interdiction d'exécution historique/ignorée/sans cible, conservation des panneaux sources.
Le test CODE-030 a été ajusté pour la disparition du bouton Tout appliquer ; protection historique et absence de métriques toujours couvertes. CODE-031 et CODE-033 passent sans modification.

Production : https://mistral-fb-ads-dashboard.netlify.app/ ouverte et contrôlée. Deux analyses courantes lancées sur les publications intermédiaires ; aucune écriture sur les publicités. Après la dernière correction de clé Ignore, nouvelle ouverture/restauration vérifiée en production, sans relancer le modèle. Rapport restauré daté et verrouillé vérifié ; analyse fraîche avec Ignorer vérifiée. Dépliage du chevron montre Pourquoi/Source/Impact. Ignorer retire la ligne ; le volet Actions ignorées contient Restaurer ; restauration effective. Les décisions ignorées pour les essais ont été restaurées.
Le backend conserve l'apprentissage : les deux publicités à moins de 13 heures sont protégées ; seules des décisions info_only ont été rendues, avec boutons désactivés. Mode réduction actif conservé. Diagnostics Meta désactivés par le réglage existant : état explicite conservé sans modification du réglage.
Disposition DOM constatée à **1348 px** : colonne actions `(x=257, y=408, largeur=712)`, contexte `(x=983, y=408, largeur=340)` ; tous volets fermés sauf Chiffres ; détails hidden=true ; analyses détaillées dans le panneau droit. Captures desktop et Ignorer enregistrées sur 910fb6d ; le dernier commit modifie seulement la clé des avis sans cible et son test, sans changement de disposition.
Règle CSS réellement lue dans le navigateur : `@media (max-width: 980px) { .copilot-decision-cols { grid-template-columns: minmax(0px, 1fr); } }`.

## Réserve explicite

Le navigateur fourni n'expose pas de commande de redimensionnement. Les raccourcis de zoom/outils n'ont pas réduit la largeur du document ; aucun résultat en écran étroit n'est revendiqué. Vérification visuelle à 980 px et sur mobile encore nécessaire.
La maquette locale a été lue intégralement, y compris styles et disposition ; son ouverture via file: a été refusée par la politique du navigateur. Aucun contournement tenté.
Les commandes Meta ont été vérifiées uniquement avec fetch simulé. Leur exécution réelle est volontairement exclue des tests, conformément à la mission.

## Preuves

- `preuves-code-034/desktop.jpg` : actions en tête, boutons et volets fermés.
- `preuves-code-034/ignorer.jpg` : une action retirée et volet Actions ignorées.
- `preuves-code-034/tests.txt` : journal des 30 tests.
- `preuves-code-034/deploiement.json` : comparaison des actifs publiés ; HTML publié : seul le lien Corbeille est réécrit de leads-deleted.html vers /leads-deleted à la ligne 1080 ; disposition finale vérifiée dans le DOM.
