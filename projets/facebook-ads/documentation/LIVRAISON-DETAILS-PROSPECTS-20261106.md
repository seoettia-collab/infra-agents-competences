# Détails complets des prospects — livraison du 6 novembre 2026

## Instruction du Gérant

Toutes les réponses renseignées sur les formulaires doivent être conservées et accessibles pour répondre au client, sur le Dashboard et dans l'application mobile, avec accès depuis la notification. Validation explicite dans cette conversation.

## Livraison

- Frontend main : `658cec5c974640bb5cacc92f35ab838852dc80b4`.
- Backend main final : `9c859874e870437449fe03609bbd90cb9c334fba` ; premier lot intégralité/mobile : `d7200de6cdb2193f4e38f680978a7c5a86b2ab9a`.
- Toutes les questions, réponses multiples, valeurs zéro/faux, descriptions longues et coordonnées disponibles affichées ; aucune sélection arbitraire de champs formulaire.
- Import Meta conservant les choix multiples ; enrichissement des réponses existantes sans effacement sur entrée vide, maintien des notes et statuts.
- Mobile : réponses intégrales et demandes site, estimations et pièces authentifiées. Conservation existante de 24 heures pour les pièces inchangée.
- Notification : référence opaque, résolution limitée à la session active et à sept jours, puis ouverture de la fiche complète. Pas de données personnelles ajoutées au push externe.

## Vérifications

42 tests backend et 60 frontend réussis, sur données synthétiques. Revue indépendante du code par l'agent principal : normalisation, préservation SQLite, rendu texte sûr, authentification, rattachement et expiration pièces, session et résolution notification.
Readback public frontend : `mobile/core.js` avec formEntries, `mobile/app.js` avec requestedEvent, service worker shell v6 servis en HTTP 200. Backend revenu healthy après déploiement ; fonctionnement de la nouvelle route établi par réponse production version `lead-form-complete-v1`.

## Rattrapage exécuté en production

Route authentifiée `POST /api/facebook/leads/refresh-details` ; seuls les prospects Meta numériques déjà présents, actifs, non archivés, non supprimés et non terminés sont éligibles. Lectures Meta puis UPDATE des seules réponses, sans INSERT ni synchronisation générale.

| Contrôle | Résultat |
|---|---:|
| Lots terminés | 2 |
| Prospects relus | 22 |
| JSON de réponses actualisés | 21 |
| Écritures confirmées par relecture SQLite | 21 |
| Inchangés | 1 |
| Échecs | 0 |
| Ignorés | 0 |
| Autres lots à traiter | Aucun dans ce périmètre |

Le compteur actualisé signifie JSON modifié ; il ne mesure pas le nombre de nouvelles informations dans chaque fiche. Cache Dashboard vidé avec succès. Aucun prospect réel ni contenu personnel copié dans la documentation ; compteurs seuls.

Aucun envoi client, création de prospect, modification de statut, notification déclenchée par le rattrapage ou modification de campagne/budget. Pas de réception physique sur téléphone testée dans ce lot. Les prospects archivés, supprimés, terminés et les réponses que Meta ne fournirait plus restent hors de ce rattrapage.

## Reprise et retour arrière

Documentation technique : `docs/LEAD-FORM-COMPLETE-20261106.md` dans les deux dépôts applicatifs. Aucun changement de schéma. Tout retour arrière se fait par commit de réversion, sans réinitialisation de base. Ne pas utiliser la synchronisation générale pour rejouer ce rattrapage : elle comporte d'autres traitements. Aucun nouveau déploiement applicatif requis pour cette trace.
