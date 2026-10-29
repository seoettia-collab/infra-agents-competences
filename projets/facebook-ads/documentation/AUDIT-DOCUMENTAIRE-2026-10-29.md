# Audit documentaire — 29 octobre 2026

Demande de Ricardo : retirer les anciennes procédures de construction et adapter la gouvernance à la production, avec le Pilote existant et son skill.

## Couverture

Arbres main consultés : infra-agents-competences, facebook-ads-backend, facebook-ads-frontend.
Lecture de la gouvernance locale, des six fiches de rôles actives, de tous les Markdown de premier niveau du dossier documentation et des documents Markdown/texte applicatifs (hors licence de police).
Les annexes de missions, preuves binaires, anciens échanges et archives ont été inventoriés par leurs chemins ; ils n'ont pas fait l'objet d'une réévaluation exhaustive.
Aucun contrôle en temps réel des comptes Ads, SMS ou hébergeurs pendant cet audit.

## Résultats et corrections

| Ensemble | Constat | Traitement |
|---|---|---|
| Gouvernance et six fiches actives | Procédures manuelles, réponses figées, modèles imposés, rôles périmés | Réécrits pour l'exploitation et le Pilote existant |
| README central | Poste documentation-technique supprimé encore désigné | Index et responsabilités corrigés |
| ARCHITECTURE / FICHE_TECHNIQUE centrales | Gabarits vides | Remplis à partir du code courant et des livraisons datées |
| REFERENTIEL | Projet annoncé à l'arrêt, ancien état SMS, absence du module Ads | Remplacé par un état daté avec limites explicites |
| DECISIONS / JOURNAL | Anciennes règles encore présentées comme actives | Amendement D-028 et entrée du 29/10 ; historique préservé |
| SUIVI-GPT-ADS-CENTRALISE | Date d'en-tête du 28/10 malgré ajouts du 29/10 ; plusieurs accès successifs | Date et guide de lecture corrigés ; preuves conservées |
| INVENTAIRE-BACKEND / FRONTEND | Bases antérieures à de nombreuses livraisons | Statut historique explicite, pas d'inventaire actuel prétendu |
| README backend | Création initiale du dépôt et du service, ancienne URL | Remplacé par l'entrée d'exploitation |
| ARCHITECTURE / CHECKLIST / FICHE_TECHNIQUE backend | Documents figés d'avril doublonnant la référence centrale | Remplacés par des renvois ; versions antérieures dans Git |
| CHATGPT-ADS-NATIVE backend | Ancien accès administrateur et formulaire annoncé séparé | Description d'accès et statut formulaire corrigés |
| DESKTOP-ADS-SESSION / REMEMBERED-DASHBOARD-SESSION | Accès desktop Ads remplacé le 29/10 | Avis explicite ; fonctionnalités mobiles à distinguer |
| DIRECT-DASHBOARD-ADS-READS | Correspond au routeur GET courant et dernière livraison | Référence actuelle conservée |
| CODE-045-SITE-INTAKE / GPT-ADS-FORM-INTEGRATION | Contrats utiles ; ancienne attente de raccordement externe | Ajout de l'état de déploiement sur domaine officiel et limites |
| VOIE_B_DEV-006 | Notice dit non fusionné alors que code et journal signalent livraison | En-tête historique corrigé ; ne pas utiliser comme procédure de coordination |
| MOBILE-PUSH backend / MOBILE-PWA frontend | Notices utiles aux circuits mobiles, distincts de l'Ads desktop | Conservées ; leur recette réelle n'est pas revalidée ici |
| MODIFICATIONS_INDEX_HTML frontend | Recette de construction ancienne | Retirée du guide d'usage, remplacée par un renvoi |
| POSTAL_CITIES frontend | Source, licence et commande de génération datées | Conservé ; aucun renouvellement de données prétendu |

## Sources datées conservées

- AUDIT-VARIABLES-RENDER.md : photographie du 11/10, pas inventaire actuel des secrets ou de la configuration.
- DIAGNOSTIC-001/002/003.md et VERIFICATION-APPELS.md : constats sur les commits indiqués ; ne pas les présenter comme défauts encore ouverts sans vérification.
- ETUDE-CREDIBILITE-2026.md, ETUDE-GPT-ADS.md, ETUDE-MCP-META.md, MARCHE-A-SUIVRE-MCP.md : études datées ; les conditions externes doivent être revalidées avant usage.
- REFERENCE-META.md, REFERENCE-CREAS.md : références métier Meta ; pas de transposition automatique aux annonces OpenAI.
- Les anciens rapports et archives sont des preuves historiques, pas des instructions courantes.

## Ce que cet audit ne valide pas

- Réception réelle d'une demande jusqu'au SMS : toujours à démontrer.
- Configuration actuelle du destinataire SMS, livraison des alertes et sauvegarde/restauration SQLite.
- Diffusion et dépenses actuelles, attribution OpenAI ou création d'événements de conversion.
- Capacité native de modification des campagnes : absente du routeur actuel en lecture seule.
- Concordance intégrale de chaque inventaire de routes avec tout le code courant.
- La suppression d'une phrase illustrative demandée le 28/10 n'établit pas une abrogation générale de D-026 : réserve conservée.

Les changements demandés portent uniquement sur la documentation. Aucun changement de campagne, budget, SMS, donnée prospect ou configuration.
Les instructions de ce projet dans l'interface ChatGPT ne sont pas modifiables par ces écritures GitHub ; leur ancienne version doit être remplacée séparément.
