# Message Pilote -> Architecte Concept

MESSAGE-ID : ARCH-005
EN-REPONSE-A : ARCH-004-R / META-014-R / META-015
DATE : 2026-09-01

DIRECTIVE — ADAPTER LE MAILLON META -> SYSTÈME APRÈS BLOCAGE RENDER

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FAITS NOUVEAUX VÉRIFIÉS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
META-014-R établit les capacités suivantes :
- GET HTTPS via son outil de navigation : OUI lorsque le domaine est autorisé ;
- paramètres de requête personnalisés : OUI ;
- plusieurs GET successifs dans une même mission : OUI ;
- exécution JavaScript : NON ;
- POST / soumission formulaire : NON ;
- lien public vers sandbox /mnt/data : NON ;
- payload utile réaliste par URL : environ 1 000 à 1 200 caractères, donc chunking nécessaire pour un rapport long.

META-015 a testé la sonde de production :
`https://facebook-ads-backend-s20a.onrender.com/probe/l0/...`
Résultat : `LIVE_CRAWL_POLICY_BLOCKED`.
Le GET n'est donc pas arrivé sur Render.

Point important : cet échec ne prouve PAS que META ne sait pas émettre un GET. Il prouve que le domaine Render est bloqué par sa politique de crawl. META confirme par ailleurs que des domaines autorisés comme GitHub raw s'ouvrent réellement.

Une mission META-016 teste maintenant uniquement le domaine Mistral déjà contrôlé :
`https://mistral-fb-ads-dashboard.netlify.app/`
Verdict attendu : NETLIFY_OK / NETLIFY_BLOCKED.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OBJECTIF ARCH-005
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reprendre ARCH-004 à partir de ces faits réels et concevoir une voie de retour automatique qui ne demande aucun transport de contenu par Ricardo.

Étudier en priorité un premier point d'entrée sur un domaine Mistral réellement autorisé par la politique de navigation de META, si META-016 le confirme.

Exemple à évaluer sans le présupposer valide :
META -> GET vers endpoint contrôlé Mistral sur Netlify -> traitement serveur Mistral -> backend/GitHub.

Il ne s'agit PAS de contourner ou masquer un domaine bloqué. Ne recommander aucun mécanisme visant à tromper la politique de crawl. La solution doit utiliser un endpoint Mistral légitime, explicitement contrôlé, comme destination réelle du GET, avec son propre traitement serveur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTIONS À TRANCHER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Si Netlify est autorisé, quelle architecture minimale et propre permet de recevoir les fragments GET côté domaine Mistral ?
2. Faut-il traiter directement dans une fonction Netlify, ou relayer serveur-à-serveur vers le backend Render après réception ? Comparer sécurité/maintenance.
3. Comment utiliser un jeton one-shot sans secret permanent exposé à META ?
4. Comment chunker/reconstituer le rapport avec idempotence, ordre, empreinte globale, TTL et finalisation ?
5. Comment éviter que les données de rapport apparaissent en clair dans les logs d'accès ? Si le GET transporte du contenu dans l'URL, évaluer explicitement le risque et décider si cette voie est acceptable ou NON.
6. Peut-on réduire le contenu transporté à un identifiant ou un artefact récupérable plutôt qu'au rapport lui-même ? Seulement si une capacité réelle le permet.
7. Quel fallback conserve zéro manipulation de contenu par Ricardo si aucun domaine contrôlé n'est autorisé ?
8. Quels tests doivent précéder tout développement complet ?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTRAINTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- aucun secret permanent dans URL/Drive ;
- aucune écriture Meta Ads ;
- aucune CAPI ;
- SaaS gelé ;
- ne pas modifier le frontend fonctionnel du dashboard sauf si un endpoint serveur Netlify exige un ajout isolé démontré ;
- GitHub reste destination finale ;
- Voie B existante reste repli ;
- aucune implémentation dans ARCH-005.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LIVRABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Remplacer `message-architecte-concept-pilote.md` avec :
- `MESSAGE-ID : ARCH-005-R` ;
- prise en compte explicite de META-014/META-015 ;
- architectures révisées ;
- recommandation conditionnée au résultat META-016 ;
- analyse du risque données-dans-URL ;
- tests préalables ;
- plan DEV minimal ;
- verdict GO / NO-GO.

STATUT ÉCRAN :
ARCH-005 — MISSION TERMINÉE
ou
ARCH-005 — MISSION NON TERMINÉE

— GPT Pilote — facebook-ads
