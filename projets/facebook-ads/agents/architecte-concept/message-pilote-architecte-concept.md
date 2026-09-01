# Message Pilote -> Architecte Concept

MESSAGE-ID : ARCH-004
EN-REPONSE-A : DIR-015 / META-013-R
DATE : 2026-09-01

DIRECTIVE — AUTOMATISER LE MAILLON META -> SYSTÈME

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OBJECTIF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Supprimer totalement le relais manuel du Gérant entre l'interface META et le système.

État actuel validé :
- Pilote -> Drive -> META : fonctionne ;
- Drive -> backend Render -> GitHub : fonctionne en production (Voie B) ;
- maillon manquant : META -> Drive/backend sans copier-coller humain.

Le système cible doit permettre :
`Pilote crée mission -> META lit -> META produit rapport -> rapport entre automatiquement dans notre système -> backend archive GitHub -> Pilote lit`

Le Gérant ne doit ni copier, ni télécharger, ni ré-uploader, ni transmettre le rapport META.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTRAINTES CONFIRMÉES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- META ne peut pas écrire directement dans Google Drive.
- META ne peut pas écrire directement dans GitHub.
- Le sandbox `/mnt/data` de META est inaccessible à Render.
- Le backend Voie B sait déjà lire un document Drive précis et écrire la boîte GitHub META.
- GitHub reste la source de vérité.
- Aucun secret permanent ne doit être donné à META.
- SaaS gelé, frontend hors périmètre sauf nécessité démontrée.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISSION ARCHITECTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Concevoir 2 à 4 architectures réalistes pour le maillon META -> backend en partant uniquement de capacités vérifiables.
2. Prioriser une solution sans intervention humaine, sûre et maintenable à long terme.
3. Examiner notamment, sans les présupposer valides :
   - ingestion par navigation HTTPS GET avec jeton one-shot et payload borné/chunké ;
   - page de dépôt backend utilisant le navigateur META pour transformer une navigation en POST si JavaScript/formulaire est réellement supporté ;
   - mécanisme de fichier/lien public temporaire récupérable par backend si META peut en produire un ;
   - toute autre voie plus propre démontrable.
4. Pour chaque solution : sécurité, limites taille, idempotence, expiration, journalisation, risque cache/prefetch, rollback, impact backend.
5. Ne jamais recommander un secret long terme dans une URL ou dans Drive.
6. Définir les tests de capacité à faire avec META AVANT code afin de ne pas développer sur une hypothèse.
7. Donner une recommandation nette GO/NO-GO et un plan DEV minimal si faisable.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITÈRE DE SUCCÈS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
La solution retenue doit permettre à META de remettre un rapport complet sans que Ricardo touche au contenu, avec destination GitHub fixe et traçabilité mission/réponse.

Aucune implémentation dans cette mission.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LIVRABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Remplacer `message-architecte-concept-pilote.md` avec :
- MESSAGE-ID : ARCH-004-R
- architectures évaluées
- capacités META à vérifier
- architecture recommandée
- menaces/garde-fous
- plan d'implémentation DEV
- verdict GO / NO-GO

STATUT ÉCRAN :
ARCH-004 — MISSION TERMINÉE
ou
ARCH-004 — MISSION NON TERMINÉE

— GPT Pilote — facebook-ads
