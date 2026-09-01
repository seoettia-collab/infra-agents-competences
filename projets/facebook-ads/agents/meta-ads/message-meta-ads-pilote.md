EN-REPONSE-A: META-006
AGENT: meta-ads
DATE: 2026-09-01
BRIEF: Brief produit vérifié fourni par Pilote (proxy) - dashboard acquisition/conversion/décision compris
VEILLE: Muse Spark 1.2 + Meta Model API global élargi confirmé

# META-006 — Stratégies Meta - Mode Conseiller Intérieur

## Objectif conseiller
Devenir conseiller à partir des données dashboard : 4 inputs (dépense/leads/CPL/RDV)
-> 1 verdict + 1 décision jour + 1 test semaine. Pas de code.

## 1. Structure qui tient avec petit budget IDF
- Fait officiel : Opportunity Score évalue audience breadth, Meta recommande éviter fragmentation.
- Recommandation META : 1 campagne CBO, 1 adset broad IDF (Housing respecté, pas d'âge), 4-6 créas. Intérêt Mistral : sort de Learning Limited.
- Risque : fragmentation = Learning Limited persistant.
- Test : même budget des deux côtés, 1 hypothèse : 1 adset broad vs 3 intérêts serrés. KPI : coût/RDV, % Learning Limited. Critère : keep si coût/RDV baisse.

## 2. Lead Ads - friction utile
- Fait officiel : Higher Intent existe.
- Recommandation META : activer Higher Intent + 2 questions : Type projet / Budget tranche. Budget <5k gardé en CRM mais non renvoyé comme qualifié. Intérêt : protège l'algo du volume creux.
- Protocole : même budget, même audience, même créas, seule variable = formulaire. KPI : taux RDV.

## 3. CAPI for CRM - boucle qualité
- Fait officiel : Conversions API for CRM permet de connecter les données CRM pour optimiser la qualité, pas seulement le volume (docs Meta).
- Recommandation META : D5 doit être réexaminée/amendée pour autoriser CAPI for CRM qualité. META ne modifie pas D5, Pilote/Gérant décide.
- Retour terrain : envoyer RDV pris en observation même en faible volume améliore le signal health.
- Protocole : 1 event secondaire RDV pris en CAPI, optimisation reste Lead jusqu'à volume jugé suffisant dans Events Manager. KPI : EMQ, coût/RDV.

## 4. Diagnostics natifs à injecter (2e source experte)
- Visible Ads Manager : Opportunity Score, Recommandations performance, Learning Limited.
- Marketing API : Recommandations performance (surface exacte à vérifier docs jour J).
- Ads MCP : check_signal_health officiel, MCP lancé 2026-04-29.
- Recommandation META : garder l'Audit métier prioritaire, ajouter un bloc « Vu par Meta : Score + 1 reco + Learning ». Lecture seule MCP au début. Risque write auto si scope trop large.

## 5. Créas - angles vs variations
- Angles nouveaux : douleur dépassement budget / preuve chantier réel 17e avec tranche / confiance UGC patron 3 chantiers par mois / urgence planning / spécialisation <4m².
- Variation cosmétique (même angle, couleur différente) à ne pas tester comme nouvel angle.
- Test : même budget, 1 hypothèse, 10-14 j, KPI taux RDV.

## 6. Backlog P0/P1/P2
- P0 — Conversion Leads vs Leads, même budget — hypothèse : coût RDV baisse — KPI coût/RDV
- P0 — Broad 1 adset vs multi intérêts — hypothèse : CPA baisse
- P1 — Formulaire Higher Intent + budget — hypothèse : qualification monte
- P1 — Opportunity Score dans l'Audit, lecture seule
- P2 — UGC chantier vs statique

## 7. Veille
- Muse Spark 1.2 global élargi confirmé (Muse Code + Meta Model API, accès global élargi). EU éligible, mais reste généraliste sans avantage Ads privilégié démontré.
- Déclencheur de réouverture : documentation officielle Ads-specific pour Muse Spark.
