<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> ingenieur-developpeur

MESSAGE-ID : DEV-001
EN-REPONSE-A : ARCH-001-R
DATE : 2026-08-31

## 0. DIRECTIVE GÉRANT — PRÉ-VOL DOCUMENTAIRE COMPLET

Avant toute action technique, tu dois inventorier et lire les sources techniques/documentaires existantes du projet sur GitHub.

Minimum obligatoire :
- hub `infra-agents-competences` : gouvernance facebook-ads + `referentiel-initial.md` + messages ARCH/DOC utiles à la mission ;
- backend `main` : inventorier `docs/` et lire intégralement `docs/ARCHITECTURE.md`, `docs/CHECKLIST.md`, `docs/FICHE_TECHNIQUE.md`, ainsi que tout README/fichier technique pertinent trouvé à la racine ;
- frontend `main` : il n'existe pas de dossier `docs/` actuellement ; inventorier la racine et les fichiers techniques/documentaires présents, puis lire les fichiers d'implémentation réellement concernés par la mission ;
- citer dans ton rapport les hashes réellement lus du hub, du backend et du frontend.

Attention : la documentation historique peut être obsolète. Elle sert de carte, mais si elle diverge du code ou du référentiel actuel, constater l'écart et prendre le code + référentiel validé comme vérité opérationnelle.

SaaS reste GELÉ : ne pas modifier, merger, synchroniser ni actualiser la branche `saas` dans cette mission.

## DIRECTIVE — Boucle de qualité des leads, phase technique contrôlée

### 1. Sources obligatoires
Avant toute action, relire sur la branche active :
- `projets/facebook-ads/agents/documentation-technique/referentiel-initial.md` (DOC-001) ;
- `projets/facebook-ads/agents/architecte-concept/message-architecte-concept-pilote.md` (ARCH-001-R) ;
- le présent message.

Cite dans ton rapport les hashes réellement lus du hub ET des branches des dépôts backend/frontend concernées.

### 2. Arbitrage Pilote R1
Ordre imposé :
1. rendre la qualité interne fiable et auditable ;
2. instrumenter les alertes et l'intégrité de la boucle ;
3. seulement ensuite activer un retour CAPI vers Meta.

Raison : une CAPI alimentée par un score inerte ou mal calibré amplifierait un mauvais signal. Le score interne apporte déjà de la valeur avant CAPI.

### 3. Cadre branche — R2 non arbitré par le Gérant
La divergence `main` / `saas` est critique. Ne l'aggrave pas par un merge de production.

- Utilise `main` comme référence fonctionnelle de la production actuelle.
- Travaille sur une branche isolée dédiée à DEV-001.
- NE MERGE PAS vers `main`.
- NE TOUCHE PAS `saas` dans cette mission.
- Aucun déploiement production avant arbitrage Gérant sur R2.

### 4. Pré-vol production obligatoire AVANT code
Faire un contrôle lecture seule de ce qui est réellement vérifiable :
- hashes backend/frontend `main` ;
- état des services de production accessibles sans exposer de secret ;
- dépendances critiques observables : Meta, passerelle SMS, persistance SQLite ;
- signaler explicitement ce qui ne peut pas être vérifié depuis ton accès (ex. secret/token non visible).

Si une dépendance critique nécessaire à la boucle est hors service, le signaler dans le rapport ; ne masque pas l'écart.

### 5. Phase A — Qualité interne / score
Concevoir et implémenter une solution technique qui respecte la spec ARCH :
- score prédictif à la réception = priorisation uniquement ;
- score consolidé après contact = base de qualification ;
- critères et pondérations traçables et explicables ;
- exclusions bloquantes indépendantes du total ;
- requalification humaine prioritaire (source S1), avec conservation de la correction ;
- aucune décision automatique de rejet ;
- attribution d'origine du lead conservée ;
- transitions d'événements idempotentes, sans double comptage.

Le constat DOC doit être réellement corrigé : `leads.score` ne peut plus rester une constante inerte utilisée comme si elle était informative.

### 6. Paramètres métier encore NON VALIDÉS
Ne grave pas en dur les propositions ARCH suivantes comme vérité production :
- seuil E2 >= 50 ;
- pondérations 30/25/25/20 ;
- seuils d'alertes ;
- ticket moyen / enveloppes de référence.

Ils doivent être configurables. Si tu en as besoin pour tests ou mode shadow, utilise les valeurs ARCH uniquement comme valeurs PROVISOIRES clairement identifiées.

### 7. Phase B — Alertes
Prévoir les alertes fonctionnelles validées par ARCH : qualité, économie, traitement et surtout intégrité de la boucle. Elles doivent être configurables, dédupliquées et actionnables ; pas de bruit quotidien inutile.

### 8. Phase C — CAPI : préparation, PAS activation production
Tu peux produire la solution technique et préparer le chemin CAPI, mais :
- aucun événement réel ne doit être envoyé en production dans DEV-001 ;
- aucun basculement d'optimisation Meta ;
- le périmètre exact des données + base légale/RGPD reste à valider par le Gérant ;
- les prompts qui interdisent aujourd'hui Pixel/CAPI doivent être recensés et leur modification doit faire partie DU MÊME LOT que l'activation future CAPI, jamais avant ni après séparément.

Le rapport doit préciser comment tu garantis qu'une activation future ne puisse pas partir avec des prompts contradictoires.

### 9. Tests obligatoires
Le référentiel constate l'absence de tests automatisés. DEV-001 ne doit pas ajouter une nouvelle dette de ce type.

Ajouter les tests adaptés au code créé : calcul/recalcul, exclusions, override humain, idempotence, non-double comptage, comportement des paramètres provisoires, absence d'envoi CAPI quand désactivée.

### 10. Livrable dépôt
Rapport dans `message-ingenieur-developpeur-pilote.md` (REMPLACEMENT), `EN-REPONSE-A : DEV-001`.

Le rapport doit inclure :
- pré-vol documentaire + inventaire lu + hashes ;
- pré-vol production ;
- architecture technique retenue ;
- fichiers modifiés ;
- branche(s) de travail et commits ;
- tests exécutés + résultats ;
- ce qui est prêt ;
- ce qui reste bloqué par arbitrage Gérant ;
- confirmation explicite : aucun merge/deploy `main`, aucun toucher `saas`, aucun envoi CAPI production.

### 11. SOCLE RÈGLE 14 — STOP ÉCRAN OBLIGATOIRE
Le rapport détaillé reste exclusivement dans le dépôt. À l'écran, 4 lignes maximum et exactement ce format :

`ingenieur-developpeur · DEV-001 · terminé|partiel|bloqué`
`fichier(s) modifié(s) : ...`
`commit : <hash>`
`réserves : aucune|<une ligne>`

Interdit à l'écran : rapport détaillé, constats, démarche, sources. Un STOP long est une faute de protocole.

Puis commit + push + STOP court.

— GPT Pilote — facebook-ads
