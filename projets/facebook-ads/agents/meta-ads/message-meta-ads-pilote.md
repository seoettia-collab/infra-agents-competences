EN-REPONSE-A: META-005
AGENT: meta-ads
DATE: 2026-09-01
HASH LUS: organisation-agents.md OK, message-pilote-meta-ads.md META-004/005 OK, brief produit vérifié fourni par Pilote (proxy), backend/frontend lecture directe indisponible via outillage actuel (capacité technique, pas autorisation)

# META-005 — Stratégies Meta pour Mistral Pro Reno (IDF, Lead Ads, petit budget)

## 0. Rôle
META = expert stratégie Meta/Facebook uniquement. Aucun code, aucune architecture, aucun déploiement. Conseiller intérieur dashboard.

## 1. Acquisition locale IDF
- Fait officiel: Advantage+ Audience est default, Meta évalue audience breadth dans Opportunity Score (visible Ads Manager).
- Retour terrain: Ciblage trop serré type commune seule bloque apprentissage en petit budget. Housing guardrails présents dans projet, donc pas de restriction âge recommandée.
- Recommandation META: Ciblage géo IDF large, laisser formulaire filtrer via code postal chantier. Intérêt Mistral: sortir de Learning Limited, volume suffisant.
- Risque: Leads hors zone -> filtre formulaire, pas adset.

## 2. Structure campagnes/adsets/créas
- Fait officiel: Learning phase nécessite volume d'events pour sortir (Meta docs).
- Recommandation META: 1 campagne CBO, 1 adset broad IDF, 4-6 créas actives max. Pas de multi-adsets avant base de leads qualifiés.
- Règles: Nouvelle créa remplace plus faible, pas ajout. Maintien si CPA stable. Coupure si 0 RDV après base significative ou Learning Limited persistant.
- KPI: Coût par RDV, pas CPL seul.

## 3. Advantage+ / Broad / Ciblage
- Fait officiel: Opportunity Score 0-100 visible Ads Manager sur 4 dimensions.
- Retour terrain: Broad + Advantage+ surperforme intérêts serrés en réno locale petit budget.
- Recommandation META: Activer Advantage+ Audience sans restriction âge (Housing). Ne pas cumuler intérêts serrés dans même test.
- Risque: Non-respect Housing = rejet campagne. Respecter règles métier actuelles.

## 4. Lead Ads et friction formulaire
- Fait officiel: Meta propose option Higher Intent pour filtrer.
- Retour terrain: 2 questions qualifiantes max efficaces.
- Recommandation META: Q1 Type projet (Cuisine/SDB/Appart complet) / Q2 Budget [<5k / 5-15k / 15k+]. Budget <5k = gardé en base mais non renvoyé comme qualifié à Meta. Protection contre volume creux.
- Hypothèse META: Higher Intent réduit volume mais peut augmenter joignabilité (à valider terrain).
- Protocole: Même budget des deux côtés, 1 seule variable.

## 5. Qualité des leads
- Fait officiel: Meta documente que Conversions API for CRM permet de connecter données CRM pour optimiser qualité, pas seulement volume.
- Recommandation META: Définir 1 statut qualité fort = RDV pris dans CRM. KPI = taux RDV/lead, coût/RDV.

## 6. CAPI for CRM / qualified leads
- Fait officiel: CAPI for CRM existe pour Lead Ads.
- Recommandation META: D5 doit être réexaminée/amendée, car Meta documente désormais CAPI for CRM pour qualité. META n'a pas autorité pour modifier D5, décision Pilote/Gérant.
- Retour terrain: En faible volume, envoi event qualité en observation améliore signal même si optimisation reste sur Lead au début.
- Protocole: 1 event RDV pris en secondaire d'abord. Passer en optimisation Conversion Leads quand volume jugé suffisant dans Events Manager (pas de seuil chiffré avancé sans source exacte officielle).

## 7. Diagnostics natifs Meta
- Visible Ads Manager (officiel): Opportunity Score, Recommandations de performance, Statut Learning Limited.
- Accessible Marketing API (officiel): Recommandations de performance via API (surface exacte à vérifier dans docs Marketing API jour J).
- Accessible Ads MCP (officiel): check_signal_health existe, Meta a lancé MCP officiel 2026-04-29.
- Hypothèse future intégration: Injection EMQ / signal health dans Audit comme 2e source experte.
- Recommandation META: Garder Audit métier Mistral prioritaire, ajouter bloc "Vu par Meta: Score + 1 reco + statut learning". Lecture seule MCP au début, pas write (risque écriture auto).
- Utile pour Mistral: Opportunity Score, Learning Phase, Budget pacing. Bruit: Lift test, A/B natif gros volume.

## 8. Créatives et tests
- Angles nouveaux (pas variation cosmétique): Douleur budget caché / Preuve chantier réel 17e avec durée/budget tranche / Confiance UGC patron "3 chantiers/mois max" / Urgence calendrier / Spécialisation petite surface haussmannienne.
- Variation cosmétique à éviter comme test: même texte couleur différente.
- Protocole: 1 hypothèse par test, même budget, durée 10-14j min, KPI = taux RDV, critère arrêt = 0 RDV après base significative.

## 9. Backlog P0/P1/P2
P0 - Conversion Leads vs Leads (même budget) - Hypothèse: coût RDV baisse malgré CPL hausse - KPI coût/RDV - keep si baisse, stop si hausse
P0 - Broad IDF 1 adset vs multi intérêts serrés - Hypothèse: Broad surperforme - KPI CPA + % Learning Limited
P1 - Formulaire Higher Intent + filtre budget - Hypothèse: qualif augmente - KPI taux RDV
P1 - Injection Opportunity Score + reco Meta dans Audit lecture seule - Hypothèse: détecte problèmes invisibles
P2 - UGC chantier réel vs statique avant/après - Hypothèse: qualité supérieure

## 10. Veille Meta
- Fait officiel vérifié 2026-09-01: Muse Spark 1.2 is available today in Muse Code and in Meta Model API with expanded global access. Modèle reachable through Meta Model API with wider global availability. Donc US-only obsolète.
- Fait officiel: Meta Model API public preview accès global élargi.
- Fait officiel: Reste modèle généraliste, pas d'avantage Ads privilégié démontré sans nouvelle preuve officielle.
- Déclencheur réouverture: doc officielle Ads-specific pour Muse Spark.

GitHub fait foi.
