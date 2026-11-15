CODE-048 | 2026-11-15 | v1.0
OK — déployé et vérifié : Sans SMS affiche Active dans le dashboard et dans Meta ; 173 impressions aujourd’hui à Paris ; totaux CODE-047 égaux à 395,90 €, écart 0,00 €.

| Nº | Demande | Réalisé | Preuve | Statut |
|---|---|---|---|---|
| 1 | Trois statuts effectifs ACTIVE + impression du jour | Les trois effective_status sont exigés ; lecture GET distincte des impressions du jour | Production Sans SMS Active, 173 impressions le 15/11 ; Gestionnaire Active dans la même fenêtre de recette | OK |
| 2 | Zéro impression = Indéterminé avec motif | Motif exact « Meta indique ACTIVE, aucune diffusion constatée aujourd'hui », échappé et affiché au survol | Tests backend zéro explicite/ligne absente et test frontend du titre | OK |
| 3 | Journée indépendante de la période affichée | Bornes today calculées à Paris, même avec 30 jours ou une période ancienne à l’écran ; métriques affichées inchangées | Fixture 9 000 impressions de période contre 0/1 du jour ; production sur 17/10–15/11 et requête du seul 15/11 | OK |
| 4 | Lecture du jour en erreur = Indéterminé | Panne, réponse invalide ou pagination incomplète ne valident jamais Active | Tests panne, valeur absente et seconde page en erreur | OK |
| 5 | Autres cas inchangés | Pause, examen, refus, problème, archive et suppression conservent leurs règles ; totaux/lecture seule préservés | Tests et quatre historiques réels sans contrôles ; somme = campagne = 395,90 €, 36 prospects | OK |

Défaut bloquant : aucun détecté. Aucun retour arrière nécessaire. Les cas zéro/panne sont testés sur fixtures, sans provoquer de panne ni modifier une annonce réelle.
Tests Node 20.11.1 : backend 322 réussis / 0 échec / 1 intégration devis externe ignorée ; frontend 173 réussis / seul échec préexistant CODE-041 hors périmètre ; ciblés CODE-047/048 24/24 ; node --check 6/6 JS modifiés. Les 13 routes d’écriture et les 23 autres méthodes du service restent inchangées.
Livraisons : backend [PR #24](https://github.com/seoettia-collab/facebook-ads-backend/pull/24), commit 83adc57, fusion bc591bc, Render dep-dbsoe7e8bjmc73eovmdg live 11:20:03 ; frontend [PR #22](https://github.com/seoettia-collab/facebook-ads-frontend/pull/22), commit 278ba79, fusion e441914, Netlify 6af987872f5d78688ec19591 publié 11:21:01. Backend et health vérifiés avant fusion frontend ; health final 200 healthy à 11:24:12. Aucun rebase nécessaire.
Recette : 11:22:34, période 17/10–15/11 ; Sans SMS Active et 3,73 € dans les deux interfaces, 173 impressions dans la lecture du seul 15/11, total publicitaire 395,90 € et référence campagne 395,90 €. Aucun nouvel échec JS relevé depuis la publication ; quatre historiques sans bouton/input.
Non fait : aucun changement Meta, budget, campagne, formulaire, CRM ou saas ; pas de test destructif en production. Retour arrière prêt : revert fusion frontend e441914 puis backend bc591bc en préservant les éventuels changements ultérieurs.
Fichiers : 4 backend et 2 frontend ; détail, données publicitaires filtrées et captures dans [preuves-code-048/recette.md](preuves-code-048/recette.md).
FIN CODE-048 — livré en production, contrôle Pilote sur preuves réelles disponible.
