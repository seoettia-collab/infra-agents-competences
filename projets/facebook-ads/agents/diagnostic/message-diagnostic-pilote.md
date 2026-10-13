DIAG-003 | 2026-10-13 | v1.0
VERDICT : NON — calculs et rapports peuvent encore conduire à une mauvaise décision.

| N° | Point demandé | OK / NON | Ce qu'on a vu (1 ligne) | Ce qu'il faut (1 ligne) |
|---|---|---|---|---|
| 1 | Données entrant dans l’analyse | NON | [SÛR] Inconnu rendu zéro ; plage personnalisée perdue ; CRM hors périmètre campagne. | Arbitrage des défauts F02–F03. |
| 2 | Formules de calcul | NON | [SÛR] Reprise corrigée ; audit invalide noté 50 ; scores métier générés sans recalcul. | Arbitrage F04 ; scores réels erronés non démontrés. |
| 3 | Distinction des statuts | NON | [SÛR] Parents/calendrier et protection 72 h présents ; filtre « en pause » sans effet. | Arbitrage F05 ; déploiement non vérifié. |
| 4 | Fiabilité de la priorité | NON | [SÛR] Urgence et ordre viennent du modèle ; anciens rapports actionnables ; compteurs incohérents. | Arbitrage F01 et F06. |

DÉFAUTS À CORRIGER
1. [SÛR] F01 : ancienne recommandation restaurée sans revalidation ; pause possible après confirmation.
2. [SÛR] F02 : mesures inconnues/CPM absent présentés à zéro, protection insuffisante si reprise mature.
3. [SÛR] F03 : dates personnalisées ignorées et CRM sur une autre fenêtre, sans filtre campagne.
4. [SÛR] F04 : audit invalide converti en score 50 et source « ok ».
5. [SÛR] F05 : filtre de statut annoncé différent du périmètre actif calculé.
6. [SÛR] F06 : compteurs d’actions auto/manuelles incompatibles avec les boutons.

NON FAIT
Production, déploiement et payloads réels non contrôlés ; aucun code modifié ni action Meta ; exemples uniquement fictifs.

FICHIERS
projets/facebook-ads/documentation/DIAGNOSTIC-003.md — formules, preuves, contre-exemples, SHA et limites.
projets/facebook-ads/agents/diagnostic/message-diagnostic-pilote.md — rapport remplacé.

MISSION TERMINÉE — DIAG-003 / NON / projets/facebook-ads/agents/diagnostic/message-diagnostic-pilote.md
