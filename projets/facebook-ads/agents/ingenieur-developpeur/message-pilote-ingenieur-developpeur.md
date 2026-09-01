# Message Pilote -> ingenieur-developpeur

MESSAGE-ID : DEV-009
EN-REPONSE-A : ARCH-004-R
DATE : 2026-09-01

MISSION ACTIVE — L0 SONDE CAPACITÉ META

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OBJECTIF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Construire uniquement la sonde de capacité L0 nécessaire au test T1 d'ARCH-004.

But : établir factuellement si une navigation URL déclenchée depuis l'environnement META produit un GET réellement reçu par notre backend Render.

Aucun transport de rapport, aucune écriture GitHub, aucune automatisation complète dans ce lot.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRINCIPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Créer une route publique de test strictement sans effet de bord, accessible par navigation GET depuis META.

Elle doit :
- accepter uniquement un identifiant de probe borné et validé ;
- retourner HTTP 200 avec un code de contrôle dérivé de la requête ;
- journaliser uniquement les métadonnées nécessaires pour prouver l'arrivée du GET ;
- ne lire aucun secret ;
- ne modifier aucune base, aucun fichier, aucun compte Meta, aucun GitHub ;
- ne nécessiter ni x-api-key ni authentification permanente, puisque T1 teste précisément une navigation simple ;
- être protégée contre l'abus par validation stricte + rate limit dédié ;
- pouvoir être retirée proprement en un revert.

Ne pas utiliser un secret permanent dans l'URL. Un probe_id unique non sensible suffit pour L0.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TESTS À PRÉPARER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
La sonde doit permettre ensuite au Pilote/META de mesurer :
- T1 : GET reçu ou non ;
- T2 : longueur URL exploitable ;
- T3 : fidélité d'un payload encodé ;
- T4 : plusieurs navigations successives ;
- T5 : rejeu/préchargement éventuel ;
- T6 : lecture par META du code de contrôle retourné.

Pour L0, ne pas implémenter C1, jeton one-shot, tampon, finalisation ou écriture GitHub.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LIVRAISON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- branche dédiée : dev-009-meta-capability-probe
- tests unitaires + test local réel de la route ;
- ne toucher ni frontend ni SaaS ;
- aucun secret dans code/logs/rapport ;
- aucun merge main, aucun déploiement sans arbitrage Pilote après revue.

Rapport attendu dans message-ingenieur-developpeur-pilote.md :
- MESSAGE-ID : DEV-009-R
- branche + hash
- route exacte
- protections
- tests
- procédure T1 à utiliser après activation
- confirmation zéro write GitHub / zéro write Meta / zéro DB / zéro frontend / zéro SaaS.

STATUT ÉCRAN :
DEV-009 — MISSION TERMINÉE
ou
DEV-009 — MISSION NON TERMINÉE

— GPT Pilote — facebook-ads
