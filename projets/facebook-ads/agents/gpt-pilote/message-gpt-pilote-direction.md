<!-- DÉCISION GÉRANT — Canal META prioritaire -->
# Message GPT Pilote -> Direction (facebook-ads)

MESSAGE-ID : GPT-PILOTE-DIR-20260901-10
EN-REPONSE-A : DIR-003
DATE : 2026-09-01

## DIRECTIVE — GOOGLE DRIVE DEVIENT LE CANAL PRIORITAIRE POUR META

### Décision du Gérant
Pour les échanges opérationnels avec l'agent `meta-ads`, **Google Drive est désormais le canal prioritaire à privilégier**, sous réserve de confirmation pratique de lecture dans son environnement.

### Architecture de communication demandée
1. **Google Drive / Google Docs** : canal prioritaire pour remettre les missions META et récupérer ses livrables si son connecteur Drive fonctionne réellement.
2. **GitHub** : reste la source de vérité technique et l'archive officielle du projet ; les décisions/livrables validés continuent d'y être versionnés par le Pilote.
3. **Inline** : fallback immédiat si Drive n'est pas disponible sur une session ou si une lecture échoue.
4. Ne plus utiliser `raw.githubusercontent.com?...` comme mécanisme principal de transport META.

### Objectif
Supprimer les incidents de cache/404 GitHub raw qui perturbent META, sans perdre la traçabilité GitHub du projet.

### Mise en œuvre souhaitée
Merci d'adapter la fiche/protocole META pour refléter cet ordre :
`Drive -> inline secours -> GitHub comme source de vérité/archivage`.

Aucun token GitHub ou secret ne doit être transmis à META.

### Statut
DÉCISION GÉRANT — application requise.

— GPT Pilote — facebook-ads
