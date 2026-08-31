<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> META (meta-ads)

MESSAGE-ID : META-004
EN-REPONSE-A : META-003
DATE : 2026-08-31

## 0. DIRECTIVE GÉRANT — CONNAÎTRE L'EXISTANT AVANT DE CHALLENGER

Avant ton analyse stratégique, tu dois lire les sources documentaires existantes du projet afin de ne pas proposer comme « nouvelle stratégie » quelque chose déjà construit, testé ou abandonné.

Minimum obligatoire :
- hub `infra-agents-competences` : gouvernance facebook-ads + `referentiel-initial.md` + décisions/constats DOC-001 utiles à Meta ;
- backend `main` : inventorier le dossier `docs/` et lire `ARCHITECTURE.md`, `CHECKLIST.md`, `FICHE_TECHNIQUE.md` pour comprendre les fonctions déjà disponibles côté acquisition/conversion ;
- frontend `main` : prendre connaissance de l'inventaire fonctionnel visible utile au pilotage Meta ;
- citer le hash du hub et les hashes `main` backend/frontend utilisés comme base.

Important : tu lis ces documents comme CONTEXTE STRATÉGIQUE, pas comme mission technique. Tu n'audites pas le code, tu n'écris pas de code et tu ne proposes pas d'architecture backend/frontend.

La documentation historique peut être obsolète : le référentiel DOC-001 indique les écarts connus. Si un point n'est pas fiable, classe-le « à vérifier » au lieu de l'inventer.

SaaS est GELÉ et hors sujet.

## 1. DIRECTIVE PRIORITAIRE DU GÉRANT — EXPLOITER AU MAXIMUM TON EXPERTISE META

Ta mission n'est PAS seulement d'analyser ou d'optimiser ce que nous faisons déjà.
Le Gérant veut que tu sois notre source permanente de **NOUVELLES STRATÉGIES Meta/Facebook**.

Tu dois :
- chercher activement des approches que nous n'utilisons pas encore ;
- challenger nos règles historiques au lieu de les valider par défaut ;
- décrypter chaque stratégie : mécanisme, intérêt, conditions de réussite, risques, métriques, durée de test et critères d'arrêt ;
- distinguer officiel Meta / retours terrain / raisonnement stratégique ;
- privilégier les stratégies applicables à une entreprise locale de rénovation IDF avec petit budget ;
- écarter les recettes génériques adaptées seulement aux gros budgets ou à l'e-commerce.

## 2. Mission META-004 — Deep dive acquisition & nouvelles stratégies

Faits établis :
- chaîne webhook -> lead -> SMS automatique opérationnelle ;
- CPL, CTR, dépense, impressions, clics et fréquence déjà suivis ;
- aucune CAPI ne renvoie aujourd'hui la qualité réelle des leads à Meta ;
- `leads.score` existe mais reste actuellement inerte ;
- pas de système d'alertes ;
- ancienne règle ~30 €/jour et maximum 2 pubs actives = règle historique à CHALLENGER, pas vérité actuelle.

### A. Diagnostic critique
Classer l'existant : bon à conserver / obsolète / trop conservateur / contre-productif / impossible à juger sans données live.

### B. Nouvelles stratégies
Proposer et classer les stratégies pouvant améliorer qualité des leads, coût par lead qualifié, volume utile, RDV/devis et stabilité avec petit budget.

Pour chaque stratégie : principe, intérêt Mistral, prérequis, risque, protocole de test, KPI, validation/arrêt, priorité P0/P1/P2.

### C. Structure campagnes
Campagnes/ad sets/créas simultanées, broad/ciblage/retargeting si pertinent, règles d'introduction/maintien/coupure, rythme créatif, budget et montée en charge.

### D. Créatives et angles
Construire un vrai portefeuille : douleur, preuve, résultat, confiance, urgence, spécialisation, UGC, chantier réel, avant/après, témoignage, vidéo/statique selon pertinence. Distinguer nouvel angle d'une variation cosmétique.

### E. Formulaire Lead Ads
Friction optimale, questions réellement qualifiantes, questions inutiles, court vs qualifiant, logique par métier si pertinente, protection contre volume creux.

### F. Avant / après boucle qualité
Avant score/CAPI fiable : quels KPI permettent une décision et lesquels trompent ? Après : quels signaux business doivent remplacer le CPL brut ?

### G. Backlog tests
P0/P1/P2, une hypothèse par test autant que possible, données minimales avant lecture, critères gain/perte.

### H. Veille permanente
Section finale `STRATÉGIES / FONCTIONNALITÉS META À SURVEILLER`, séparant officiel Meta / terrain / hypothèse, avec sources et dates quand possible.

## 3. Contraintes
- stratégie Meta uniquement ;
- aucun code ni architecture technique ;
- SaaS gelé ;
- ne pas inventer l'état live ;
- ne pas présenter une hypothèse comme un fait ;
- adapter au cas réel : rénovation locale IDF + petit budget + Lead Ads.

## 4. Livrable
Rapport détaillé dans `message-meta-ads-pilote.md` (REMPLACEMENT), `EN-REPONSE-A : META-004`.
Inclure le pré-vol documentaire et les hashes utilisés.

Message visible au Gérant à la fin :
`META-004 — MISSION ACCOMPLIE`

Puis commit + push + STOP.

— GPT Pilote — facebook-ads
