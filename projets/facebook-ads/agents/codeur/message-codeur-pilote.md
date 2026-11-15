CODE-047 — reprise 1 | 2026-11-15 | v2.0
NON POUR FUSION — reprise du point 3 livrée et testée ; recette du candidat contre Graph réel non exécutée, parité « Préparation en cours » non établie.

| Nº | Demande | Réalisé | Preuve | Statut |
|---|---|---|---|---|
| 1 | Campagne par défaut | Correctif conservé : campagne active, choix actif mémorisé respecté, sinon dépense maximale ; nom Meta visible | Tests ; lecture réelle : Campagne Paris ACTIVE, 390,40 € / 36 prospects | Accepté précédemment ; recette candidat réservée |
| 2 | Période commune | Correctif conservé : bornes inclusives et dates visibles, même sélecteur | Tests et captures locales ; Gestionnaire réel réglé du 17/10 au 15/11 | Accepté précédemment ; recette candidat réservée |
| 3 | STATUT et Diffusion Meta | STATUT = status ; colonne distincte, hiérarchie/examen/motifs lus sans cache ; textes Meta échappés sans reformulation ; ACTIVE ambigu = Indéterminé signalé | 5 tests ajoutés dans la reprise ; lecture réelle et captures du Gestionnaire ; limites détaillées en annexe | Partiel : preparing non reproduit par Graph vérifié |
| 4 | Historique et total | Correctif conservé ; historique en lecture seule et données indisponibles explicites | Meta réel : Extension ARCHIVED 6,99 € ; somme 390,40 € = campagne ; lecture seule vérifiée localement | Accepté précédemment ; recette candidat réservée |

Défauts / réserves, par gravité :
1. La recette exigée « service local ou prévisualisation candidat connecté à Meta » reste bloquée : aucun accès serveur Meta configuré disponible pour ce candidat dans l’environnement. Le connecteur Meta et le Gestionnaire ont été lus réellement ; cela ne valide pas le chemin Graph ajouté.
2. Le champ delivery du connecteur officiel distingue pending/preparing d’ACTIVE. Son existence comme champ Graph public v25.0 n’est pas établie ; il n’a pas été inventé dans le dashboard. Le carrousel affichera Indéterminé tant que cette correspondance n’est pas vérifiée. Le Gestionnaire montre aussi Non diffusé dans Diffusion et Erreur de diffusion dans Actions pour Court sans SMS v4 : distinction documentée.
3. Frontend : seul échec préexistant tests/code-041-leads-navigation.test.js:15, hors périmètre selon le Pilote ; CRM inchangé.

Tests Node 20.11.1 : backend 317 réussis / 0 échec / 1 intégration externe ignorée ; frontend 171 réussis / 1 échec préexistant. Tests CODE-047 : 17/17. node --check : 7/7 fichiers JS de la reprise. Recette locale : aucune erreur JS, aucune écriture Meta, Rafraîchir relit les annonces, motif exact et historique sans contrôles. Les 13 handlers d’écriture et les 23 autres méthodes du service sont identiques à main 3db9c13 ; journalisation de lecture conservée sous forme de codes sans message brut ni secret.
Non fait : recette Graph réelle du candidat, équivalence exacte du carrousel, fusion et déploiement. Prochaine étape : exécuter le candidat avec la configuration Meta serveur existante dans une prévisualisation autorisée, contrôler les champs diagnostics et les quatre cas au même instant, puis contrôle Pilote D-024.
Fichiers de reprise : backend 5, frontend 3 ; [annexe-code-047.md](annexe-code-047.md), captures et preuves dans preuves-code-047/reprise-1/.
Livraisons : [backend #22](https://github.com/seoettia-collab/facebook-ads-backend/pull/22) `0716711` depuis `ee35d11` ; [frontend #20](https://github.com/seoettia-collab/facebook-ads-frontend/pull/20) `68640b8` depuis `6eef39d`. Deux PR brouillons sans conflit ; main et saas inchangées.
FIN CODE-047 — reprise 1 remise au Pilote avec réserves bloquantes ; aucune fusion ni mise en production.
