CODE-047 | 2026-11-15 | v1.0
OK POUR CONTRÔLE — quatre correctifs proposés sur branches ; réserve de tests préexistante ci-dessous.

| Nº | Demande | Réalisé | Preuve | Statut |
|---|---|---|---|---|
| 1 | Campagne par défaut | Sélection Meta avant le premier chargement ; choix actif conservé, sinon active la plus dépensière ; nom visible, aucun ID par défaut | Tests CODE-047 + capture Cockpit sur fixtures | Prêt |
| 2 | Période commune | Sélecteur commun, dates de Paris inclusives, dates visibles, plage personnalisée et réponses tardives traitées | Tests backend/frontend + captures ordinateur/mobile | Prêt |
| 3 | Statut réel | Badge effectif traduit ; commandes fondées sur le réglage status | Tests IN_PROCESS/ACTIVE et IN_PROCESS/PAUSED | Prêt |
| 4 | Historique dépensier | Pages courantes/historiques réunies aux insights ; lecture seule, sommes et valeurs indisponibles explicites | Fixture : 381,54 + 6,99 = 388,53 €, 36 leads ; test métadonnées absentes | Prêt |

Défaut à corriger : assertion préexistante `tests/code-041-leads-navigation.test.js:15` sur le texte de `conversions.js`, reproduite à l’identique sur la base frontend ; CRM non modifié.
Tests Node 20.11.1 : backend 313 réussis / 0 échec / 1 intégration externe ignorée ; frontend 170 réussis / 1 échec préexistant ; 12 nouveaux tests réussis ; syntaxe 12/12.
Non fait : fusion, déploiement et recette Meta réelle sur la période fixe, en attente du contrôle du Pilote. Captures = recette locale avec API simulée.
Fichiers : backend 4, frontend 9 ; détail, captures et reprise dans [annexe-code-047.md](annexe-code-047.md).
Livraisons : [backend #22](https://github.com/seoettia-collab/facebook-ads-backend/pull/22) `ee35d11` ; [frontend #20](https://github.com/seoettia-collab/facebook-ads-frontend/pull/20) `6eef39d` — PR brouillons, main et saas inchangées.
FIN CODE-047 — contrôle Pilote requis avant fusion backend puis frontend.
