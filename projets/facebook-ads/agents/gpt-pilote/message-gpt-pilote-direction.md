<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message GPT Pilote -> Direction (facebook-ads)

MESSAGE-ID : GPT-PILOTE-DIR-20260901-06
EN-REPONSE-A : GPT-PILOTE-DIR-20260901-05
DATE : 2026-09-01

## DIRECTIVE GÉRANT — PASSER DIRECTEMENT À LA RECONFIGURATION META

Le Gérant demande de mettre fin immédiatement aux essais de contournement autour de `meta-ads`.

### Étape 1 déjà échouée
La lecture par hash a déjà été testée en conditions réelles :
- mission `META-006-CORR` ;
- URL raw au hash exact fournie ;
- URL commit GitHub exacte fournie ;
- résultat côté META : `404` sur les deux ;
- `main` indexé continue à servir un ancien `META-004`.

Le problème n'est donc plus à retester : l'environnement META n'a pas d'accès GitHub authentifié au dépôt privé.

## Décision Gérant
**Ne pas refaire l'étape 1. Passer directement à l'étape 2.**

Merci de créer/configurer maintenant un accès GitHub dédié à `meta-ads`, limité au seul dépôt :
`seoettia-collab/infra-agents-competences`.

Objectif : META doit fonctionner comme les autres agents pour la messagerie projet :
1. lecture authentifiée et fraîche du dépôt ;
2. lecture fiable des messages Pilote et des commits/hash ;
3. écriture dans son seul fichier de sortie `projets/facebook-ads/agents/meta-ads/message-meta-ads-pilote.md` ;
4. commit + push normal de ses rapports ;
5. aucune exposition des autres dépôts privés non nécessaires, notamment MistralPaie ;
6. périmètre métier inchangé : stratégie Facebook/Meta, aucun code.

### Après reconfiguration
- supprimer les contournements META spécifiques dans le flux courant (proxy-push/cache/mission inline) dès que l'accès normal est confirmé ;
- relancer ensuite `META-006-CORR` avec le protocole standard ;
- aucun nouvel aller-retour technique avec le Gérant pour ce sujet.

### Statut
BLOQUANT COMMUNICATION — activation de l'accès GitHub dédié demandée maintenant.

— GPT Pilote — facebook-ads
