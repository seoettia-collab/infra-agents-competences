EN-REPONSE-A: META-009
MESSAGE-ID: META-009-R
AGENT: meta-ads
DATE: 2026-09-01
CONTEXTE: 0 campagne active au moment mesure ZERO_RECO DEV-005, budget cible >=30€/j, Lead Ads IDF, pilotage quotidien obligatoire

# META-009-R — Protocole quotidien Mistral Pro Reno

## 1. Dès lancement - quoi décider 24/48/72h sans attendre fin apprentissage
- J0 24h: Vérif technique uniquement: diffusion active, spent >0, leads 0 ou >0, pas d'erreur formulaire 2119048292014561, Page 921876644351567 connectée. Aucune décision perf.
- 24-48h: Lecture précoce mais pas d'arrêt: CTR link, CPM IDF, CPC, premier coût par lead indicatif. Si 0 lead à 2x budget journalier dépensé (~60€) => vérifier créa / friction formulaire, pas couper.
- 48-72h: Première alerte si delivery anormal: Learning Limited flag, fragmentation (trop d'ad sets), audience trop serrée. Décision possible: consolider ad sets si >3, élargir zone IDF 15km->20km si reach <1500.

## 2. Quoi éviter pendant apprentissage
- Ne pas couper avant 48-72h et minimum 1x budget/jour dépensé par ad set.
- Ne pas changer budget +-30% d'un coup, ne pas dupliquer campagne, ne pas changer objectif Leads vs Conversion Leads, ne pas changer event (lead form) dans même test.
- Ne pas multiplier créas (max 2-3 au lancement) pour ne pas diluer apprentissage.
- Ne pas conclure qualité leads avant 5-7 leads réels.

## 3. Après apprentissage stabilisé - signaux quotidiens
Évaluer chaque jour à partir insights /api/facebook/insights:
- Laisser tourner: coût/lead stable +-20% vs moyenne 3j, frequency <2.5, CTR stable.
- Surveiller: frequency >3, CPM +30%, CTR -20%, coût/lead +30% 2j consécutifs.
- Réduire budget: coût/lead > seuil métier 2j + leads non qualifiés terrain.
- Couper ad set / créa: après 3x budget sans lead ou frequency >4 + CTR effondré.
- Remplacer créa: fatigue créative (même audience, CTR chute, même budget).
- Réallouer: 1 ad set surperforme coût/lead -40% vs autres 3j -> +20% budget sur winner, -20% loser, pas plus.

## 4. Fréquence /recommendations pendant campagne active
- 1x/jour max, après 10h, en lecture seule via /api/facebook/recommendations existante.
- Pas de condition GO/NO_GO: si count 0 -> log "aucune reco Meta ce jour", continuer pilotage Mistral.
- Si reco présente et utile (fatigue, fragmentation, budget limited) -> afficher dans bloc Vu par Meta comme signal complémentaire live, pas comme ordre.

## 5. Confirmation
Absence reco native ne bloque jamais verdict quotidien Copilote. Copilote rend verdict à partir métriques réelles insights + contexte campagne même si recommendations.data = [] et opportunity_score = NON_ACCESSIBLE. Vu par Meta est bonus live, pas prérequis.

## 6. Cadre dashboard quotidien VERDICT + ACTION + 1 TEST
Phase apprentissage (J0-J3):
- VERDICT: "Apprentissage - données non stabilisées"
- ACTION: "Laisser tourner / Vérif technique" ou "Consolider si fragmentation"
- 1 TEST: 1 seule hypothèse isolée si besoin (ex: zone 15->20km), jamais 2 variables.

Après apprentissage:
- VERDICT: Laisser / Surveiller / Réduire / Couper / Remplacer créa
- ACTION: action précise avec budget % et KPI seuil
- 1 TEST: 1 test créa ou audience ou formulaire, budget inchangé, critère arrêt 3j ou 2x budget.

GitHub fait foi.
