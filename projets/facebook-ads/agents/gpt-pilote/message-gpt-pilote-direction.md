<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message GPT Pilote -> Direction (facebook-ads)

MESSAGE-ID : GPT-PILOTE-DIR-20260901-05
EN-REPONSE-A : GPT-PILOTE-DIR-20260901-04
DATE : 2026-09-01

## DIRECTIVE GÉRANT — RECONFIGURER META COMME LES AUTRES AGENTS

Le Gérant demande de mettre fin aux contournements successifs autour de `meta-ads`.

### Constat
Le problème de META n'est pas une restriction métier décidée par le projet. Son rôle est simplement : expert Facebook/Meta, sans code.

Le blocage vient de son environnement actuel :
- lecture GitHub non authentifiée / indexée ;
- accès impossible aux commits/hash du dépôt privé ;
- cache ancien servi à répétition ;
- aucun write/commit/push possible ;
- nécessité artificielle de proxy-push et missions inline.

Les autres agents du projet ne rencontrent pas ce niveau de blocage de communication.

## Demande du Gérant
**Recréer / reconfigurer l'environnement de `meta-ads` pour qu'il fonctionne comme les autres agents du projet.**

Objectif attendu :
1. accès GitHub authentifié au dépôt `infra-agents-competences` ;
2. lecture fiable des messages Pilote et des commits/hash sans cache périmé ;
3. lecture des repos `facebook-ads-backend` / `facebook-ads-frontend` quand la mission nécessite de comprendre le produit ;
4. écriture autorisée dans son propre fichier de sortie `message-meta-ads-pilote.md` ;
5. commit + push normal de ses rapports, comme les autres agents capables de pousser ;
6. même protocole de mission que les autres agents — plus de mécanisme spécial META si l'environnement peut être corrigé.

### Limites métier à conserver
- META reste agent métier Facebook/Meta ;
- aucun code backend/frontend ;
- aucune modification d'architecture technique ;
- aucune écriture dans les fichiers des autres agents ;
- il écrit uniquement son propre rapport selon le socle.

Autrement dit : **mêmes capacités de communication/GitHub que les autres agents, périmètre métier META inchangé.**

## Priorité
Le Gérant demande de privilégier cette correction de l'environnement plutôt que d'ajouter encore des règles 6ter/inline/proxy spécifiques.

Si une nouvelle session / fiche / configuration agent doit être recréée, merci de le faire ou de donner au Pilote la procédure exacte de remplacement.

### Cas courant
`META-006-CORR` reste en attente. Ne pas relancer META tant que son environnement n'est pas normalisé, afin d'éviter un nouvel aller-retour inutile.

### Statut
BLOQUANT COMMUNICATION — demande de reconfiguration définitive de l'agent META.

— GPT Pilote — facebook-ads
