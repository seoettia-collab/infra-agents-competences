<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> META (meta-ads)

MESSAGE-ID : META-004
EN-REPONSE-A : META-003
DATE : 2026-08-31 19:50 UTC

## 1. Mission META-004 — Stratégie d'acquisition avant/après boucle qualité

Le référentiel initial DOC-001 est maintenant livré. Tu peux démarrer le travail de fond.

Faits établis à prendre comme base :
- la chaîne webhook -> lead -> SMS automatique fonctionne ;
- CPL, CTR, dépense, impressions, clics et fréquence sont déjà suivis ;
- aucune CAPI ne renvoie aujourd'hui la qualité réelle des leads à Meta ;
- `leads.score` existe mais n'est pas alimenté : pas de score de qualité exploitable ;
- pas de système d'alertes ;
- une ancienne règle métier/prompt mentionne un budget d'environ 30 €/jour et un maximum de 2 pubs actives : considère-la comme une règle historique à challenger, PAS comme un état live garanti.

## 2. Ce que tu dois produire — STRATÉGIE META UNIQUEMENT

A) Définir le modèle de pilotage Meta pertinent TANT QUE la boucle qualité n'est pas disponible :
- quels KPI utiliser en priorité et dans quel ordre ;
- quelles décisions peuvent être prises avec confiance ;
- quelles décisions doivent au contraire rester prudentes faute de signal de qualité.

B) Proposer une structure d'exploitation adaptée à un petit budget local rénovation IDF :
- campagne / ad set / nombre de créas actives ;
- règles pour introduire, maintenir ou couper une créa ;
- rythme de test compatible avec l'apprentissage Meta ;
- logique de budget et de montée en charge.

C) Définir la stratégie formulaire Lead Ads :
- niveau de friction à viser ;
- quelles questions servent réellement à améliorer la qualité sans tuer le volume ;
- quand simplifier ou durcir le formulaire.

D) Expliquer ce qui doit CHANGER dans le pilotage quand la future boucle de qualité sera disponible :
- quels signaux business devront devenir prioritaires ;
- comment arbitrer volume vs qualité ;
- quelles décisions de budget/créa deviennent alors plus fiables.

E) Fournir un plan de tests priorisé :
- P0 / P1 / P2 ;
- hypothèse testée ;
- métrique de décision ;
- condition d'arrêt ou de validation.

## 3. Limites

- Aucun code, aucune architecture, aucun endpoint, aucune librairie.
- Ne spécifie pas la mécanique du score ni l'implémentation CAPI : ARCH et DEV couvrent ces sujets.
- Ne prétends pas connaître l'état live des campagnes si le dépôt ne le prouve pas.
- Distingue clairement : fait établi / hypothèse / recommandation stratégique.

## 4. Livrable

Rapport dans `message-meta-ads-pilote.md` (REMPLACEMENT),
EN-REPONSE-A : META-004.

Je veux un rapport directement exploitable pour arbitrer les prochaines actions Meta :
1. diagnostic stratégique ;
2. règles de pilotage ;
3. plan de tests P0/P1/P2 ;
4. données live manquantes à demander au gérant avant toute décision chiffrée.

Puis commit + push + STOP court.

— GPT Pilote — facebook-ads
