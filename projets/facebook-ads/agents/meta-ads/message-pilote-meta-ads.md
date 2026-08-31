<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> META (meta-ads)

MESSAGE-ID : META-004
EN-REPONSE-A : META-003
DATE : 2026-08-31

## DIRECTIVE PRIORITAIRE — CONNAÎTRE LE PRODUIT, PUIS DONNER DES STRATÉGIES

Le dashboard Facebook Ads est opérationnel. DEV-002 est validé mais NON ACTIF. SaaS reste GELÉ.

META est un **expert stratégie Meta/Facebook**.

**META ne corrige rien. META n'écrit aucun code. META ne propose pas d'architecture technique. META ne décide pas des modifications du Dashboard.**

Son rôle est :
1. comprendre suffisamment l'architecture et les fichiers techniques existants pour savoir exactement ce que le Dashboard fait déjà ;
2. analyser l'écosystème Meta/Facebook actuel ;
3. fournir au Pilote des stratégies, opportunités, tests, risques et priorités ;
4. laisser au Pilote le choix des suites et, si besoin, leur transmission à ARCH/DEV/AUD/DOC.

## 0. PRÉ-VOL — ARCHITECTURE ET FICHIERS TECHNIQUES D'ABORD

Ne te bloque pas sur la gouvernance. Lis uniquement le présent message et le socle actuel pour respecter ton rôle et ton canal.

Ensuite, priorité absolue aux dépôts du produit.

### Backend `facebook-ads-backend` — `main` = production
- inventorier l'arborescence ;
- lire `README.md` ;
- lire tout le dossier `docs/`, notamment `ARCHITECTURE.md`, `CHECKLIST.md`, `FICHE_TECHNIQUE.md` et toute documentation technique présente ;
- lire les routes/services nécessaires pour comprendre : Graph/Marketing API, campagnes, adsets, pubs, insights, géographie, Audit IA, Reco, Copilote, prompts/règles métier, actions exécutables, Lead Ads, webhook, CRM, conversions, SMS/Messenger/email/appels, automatisations et stockage.

### Frontend `facebook-ads-frontend` — `main` = production
- inventorier l'arborescence ;
- lire les fichiers permettant de comprendre ce que voit et utilise le Gérant : Cockpit, statistiques, campagnes/pubs/actions, Audit/Reco/Copilote, leads/conversions/CRM, communications, Studio Pub seulement pour distinguer son périmètre, configuration et parcours utilisateur.

### But du pré-vol
Tu dois pouvoir expliquer correctement :
- quelles données Meta sont déjà lues ;
- quelles analyses existent déjà ;
- quelles recommandations/actions existent déjà ;
- comment les leads sont suivis ;
- quelles fonctions viennent de Meta, lesquelles appartiennent à Mistral, lesquelles utilisent une IA.

**Cette lecture n'est PAS un audit technique.** Tu ne cherches pas à corriger le code. Tu cherches uniquement à ne pas proposer comme « nouvelle stratégie » quelque chose qui existe déjà, ou une stratégie incompatible avec le fonctionnement réel.

### DEV-002 — contexte futur uniquement
Consulter si utile :
- backend `dev-002-corrections-audit` ;
- frontend `dev-002-qualification-ui`.

DEV-002 = validé mais NON ACTIF. Ne jamais le présenter comme production.

### Traçabilité minimale
Dans ton rapport : hash hub, hash backend `main`, hash frontend `main`, et liste synthétique des zones techniques réellement étudiées. Pas d'inventaire administratif long.

## 1. MISSION META-004 — STRATÉGIES META/FACEBOOK UNIQUEMENT

Contexte : Mistral Pro Reno, rénovation locale IDF, Lead Ads, budget limité.

Tu dois distinguer systématiquement :
- fait officiel Meta ;
- retour terrain/praticien ;
- hypothèse/recommandation META.

### A. Diagnostic stratégique de l'existant
Dire ce qui, du point de vue Meta/Facebook, mérite d'être : conservé / challengé / testé / abandonné.

Ne donne pas de correction technique. Donne uniquement le raisonnement stratégique.

### B. Nouvelles stratégies prioritaires
Pour chaque stratégie utile :
- principe ;
- intérêt pour Mistral ;
- prérequis ;
- risque ;
- protocole de test ;
- KPI ;
- durée minimale ;
- critère validation/arrêt ;
- priorité P0/P1/P2.

### C. Structure campagnes
Campagnes/adsets/créas, broad/ciblage/retargeting, rythme créatif, règles d'introduction/maintien/coupure, budget et montée en charge.

### D. Créatives
Angles douleur, preuve, résultat, confiance, urgence, spécialisation, chantier réel, avant/après, témoignage, UGC, vidéo/statique. Distinguer un vrai nouvel angle d'une variation cosmétique.

### E. Lead Ads
Friction optimale, questions réellement qualifiantes, formulaire court vs qualifiant, protection contre les leads creux, logique par métier si pertinente.

### F. Boucle qualité / CAPI / signaux Meta
Challenger l'ancienne décision D5 avec l'état Meta 2026 :
- quels événements et données seraient stratégiquement utiles à renvoyer à Meta pour notre faible volume ?
- quels usages CAPI/dataset/CRM events sont utiles, prématurés ou inutiles ?
- comment éviter d'optimiser sur un signal trop rare ou mauvais ?

Tu ne demandes aucune implémentation. Tu fournis uniquement l'arbitrage stratégique et les preuves.

### G. Diagnostics natifs Meta — priorité spéciale
Identifier les diagnostics/recommandations réellement natifs Meta qui pourraient enrichir nos décisions : Performance Recommendations, Opportunity Score, signal quality/health, activity logs, Ads MCP ou autres surfaces officielles disponibles.

Dire :
- ce que Meta sait réellement de plus que notre Dashboard ;
- ce qui serait utile à Mistral ;
- ce qui serait du bruit ;
- ce qu'il faudrait tester en priorité.

Ne conçois pas l'intégration technique.

### H. Meta Model API
Re-vérifier uniquement son état actuel France/UE et ses capacités Ads documentées. Si toujours non exploitable en France : le signaler et passer au sujet suivant.

### I. Backlog stratégique
P0/P1/P2, une hypothèse par test autant que possible, données minimales avant lecture, critère gain/perte.

### J. Veille
Terminer par `STRATÉGIES / FONCTIONNALITÉS META À SURVEILLER` avec sources et dates, séparées en officiel Meta / terrain / hypothèse.

## 2. CONTRAINTES ABSOLUES
- stratégie Meta/Facebook uniquement ;
- aucun code ;
- aucune correction de code ;
- aucune architecture technique à concevoir ;
- aucune modification backend/frontend ;
- aucune décision de déploiement ;
- SaaS gelé ;
- production actuelle ≠ DEV-002 ;
- si documentation et code divergent, le code réel sert uniquement à comprendre l'état ;
- hypothèse ≠ fait ;
- sources officielles Meta récentes prioritaires.

## 3. LIVRABLE
Remplacer `message-meta-ads-pilote.md`, `EN-REPONSE-A : META-004`, puis commit + push.

## STOP COURT OBLIGATOIRE
`meta-ads · META-004 · terminé|partiel|bloqué`
`fichier(s) modifié(s) : ...`
`commit : <hash>`
`réserves : aucune|<une ligne>`

— GPT Pilote — facebook-ads
