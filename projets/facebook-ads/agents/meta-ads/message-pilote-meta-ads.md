<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> META (meta-ads)

MESSAGE-ID : META-004
EN-REPONSE-A : META-003
DATE : 2026-08-31

## DIRECTIVE PRIORITAIRE — LE PRODUIT AVANT LA GOUVERNANCE

Le dashboard Facebook Ads est opérationnel. DEV-002 est validé mais NON ACTIF. SaaS reste GELÉ.

### 0. Pré-vol très court
Ne te bloque pas sur la gouvernance.

À lire dans le hub AVANT de commencer, et rien de plus sauf besoin réel :
1. le présent message `META-004` ;
2. `standards-communs/organisation-agents.md` dans sa version actuelle.

Aucune synthèse de gouvernance n'est demandée. Le socle sert seulement à respecter ton rôle, ton canal de message et ton STOP court.

Les rapports DOC/ARCH/AUD ne sont plus un prérequis de lecture exhaustive. Consulte seulement les conclusions utiles si une question précise l'exige.

## 1. PRIORITÉ ABSOLUE — COMPRENDRE LE DASHBOARD RÉEL

Travaille d'abord sur les dépôts du produit.

### Backend `facebook-ads-backend` — `main` = production
- inventorier l'arborescence ;
- lire `README.md` ;
- lire tout le dossier `docs/`, notamment `ARCHITECTURE.md`, `CHECKLIST.md`, `FICHE_TECHNIQUE.md` et toute autre documentation technique présente ;
- lire les routes/services nécessaires pour comprendre : Graph/Marketing API, campagnes, adsets, pubs, insights, géographie, Audit IA, Reco, Copilote, prompts/règles métier, actions exécutables, Lead Ads, webhook, CRM, conversions, SMS/Messenger/email/appels, automatisations et stockage.

But : comprendre ce que le dashboard FAIT réellement. Tu n'es pas chargé d'auditer la qualité du code.

### Frontend `facebook-ads-frontend` — `main` = production
- inventorier l'arborescence ;
- lire les fichiers nécessaires pour comprendre ce que voit et utilise le Gérant : Cockpit, statistiques, campagnes/pubs/actions, Audit/Reco/Copilote, leads/conversions/CRM, communications, Studio Pub uniquement pour distinguer son périmètre, configuration et parcours utilisateur.

Après ce pré-vol tu dois pouvoir expliquer simplement :
- quelles données Meta sont déjà lues ;
- quelles analyses existent déjà ;
- quelles recommandations/actions sont déjà possibles ;
- comment les leads sont suivis ;
- quelles fonctions viennent de Meta, lesquelles appartiennent à Mistral, lesquelles utilisent une IA.

### DEV-002 — contexte futur uniquement
Consulter si utile :
- backend `dev-002-corrections-audit` ;
- frontend `dev-002-qualification-ui`.

DEV-002 = validé mais NON ACTIF. Ne jamais le présenter comme production.

### Traçabilité minimale
Dans ton rapport : hash hub, hash backend `main`, hash frontend `main`, et liste synthétique des zones techniques réellement étudiées. Pas d'inventaire administratif long.

## 2. Faits de pilotage à connaître

- Remplacer Audit/Reco par la Meta Model API = NO-GO aujourd'hui : preview US-only et aucun avantage Ads privilégié démontré.
- La piste intéressante est d'enrichir Audit/Reco avec des diagnostics réellement natifs Meta : Marketing API, Performance Recommendations, qualité/santé des signaux, Ads MCP, etc.
- DEV-002 prépare une boucle de qualité des leads mais reste NON ACTIVE.
- L'ancienne décision D5 qui écartait Pixel/CAPI/Events Manager doit être challengée avec l'état Meta 2026, pas considérée comme vérité éternelle.

## 3. MISSION META-004 — STRATÉGIE META/FACEBOOK

Tu es l'expert métier Meta. Apporte des stratégies nouvelles et distingue toujours : fait officiel Meta / retour terrain / hypothèse-recommandation.

Contexte : Mistral Pro Reno, rénovation locale IDF, Lead Ads, budget limité.

### A. Diagnostic de l'existant
Classer : à conserver / obsolète / trop conservateur / contre-productif / impossible à juger sans données live.

### B. Nouvelles stratégies
Pour chaque stratégie utile : principe, intérêt Mistral, prérequis, risque, protocole de test, KPI, durée minimale, critère validation/arrêt, priorité P0/P1/P2.

### C. Campagnes
Structure campagne/adsets/créas, broad/ciblage/retargeting, rythme créatif, règles d'introduction/maintien/coupure, budget et montée en charge.

### D. Créatives
Angles douleur, preuve, résultat, confiance, urgence, spécialisation, chantier réel, avant/après, témoignage, UGC, vidéo/statique. Distinguer un vrai nouvel angle d'une variation cosmétique.

### E. Lead Ads
Friction optimale, questions réellement qualifiantes, formulaire court vs qualifiant, protection contre les leads creux, logique par métier si pertinente.

### F. Boucle qualité / CAPI / signaux
Challenger D5 avec l'état Meta 2026 : quels événements et données méritent réellement d'être renvoyés à Meta pour notre faible volume ? Quels usages CAPI/dataset/CRM events sont utiles, prématurés ou inutiles ? Comment éviter d'optimiser sur un signal trop rare ou mauvais ?

### G. Diagnostics natifs Meta — priorité spéciale
Déterminer ce qu'il faut injecter dans notre Audit/Reco comme seconde source experte Meta : Performance Recommendations, Opportunity Score, signal quality/health, activity logs, A/B tests, lift, Ads MCP ou autres surfaces officielles réellement disponibles.

Séparer ce qui apporte une information Meta réellement nouvelle de ce que notre dashboard peut déjà déduire de ses métriques.

Par défaut, recommander lecture seule / permissions minimales pour tout connecteur capable d'écrire sur le compte, tant qu'un besoin d'écriture n'est pas démontré.

### H. Meta Model API
Re-vérifier uniquement son état actuel France/UE et ses capacités Ads documentées. Si toujours US-only : non exploitable aujourd'hui, puis préciser le déclencheur qui justifierait de rouvrir le sujet.

### I. Backlog tests
P0/P1/P2, une hypothèse par test autant que possible, données minimales avant lecture, critère gain/perte.

### J. Veille
Terminer par `STRATÉGIES / FONCTIONNALITÉS META À SURVEILLER` avec sources et dates, séparées en officiel Meta / terrain / hypothèse.

## 4. Contraintes
- stratégie Meta uniquement ;
- aucun code ni architecture technique ;
- SaaS gelé ;
- production actuelle ≠ DEV-002 ;
- code réel prioritaire si une documentation technique le contredit ;
- hypothèse ≠ fait ;
- sources officielles Meta récentes prioritaires.

## 5. Livrable
Remplacer `message-meta-ads-pilote.md`, `EN-REPONSE-A : META-004`, puis commit + push.

## STOP COURT OBLIGATOIRE
`meta-ads · META-004 · terminé|partiel|bloqué`
`fichier(s) modifié(s) : ...`
`commit : <hash>`
`réserves : aucune|<une ligne>`

— GPT Pilote — facebook-ads
