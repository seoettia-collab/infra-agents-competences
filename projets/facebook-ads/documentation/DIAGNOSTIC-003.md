# DIAGNOSTIC-003 — Calculs et données réels du Copilote
DIAG-003 | 2026-10-13 | v1.0
EN-RÉPONSE-À : DIAG-003

[SÛR] Hub lu au HEAD `2a9ae1d5fa4b7432c86153e555b63f04b37c06e1`.
[SÛR] Backend : `main` au commit `359225f3ba612118de298926f18cf32abced3556`.
[SÛR] Frontend : `main` au commit `f503aab2b691f4f9c6a03945da84981850c51d6c`.
[SÛR] D-019 et la fiche amendée autorisent la lecture du code ; aucun dépôt de code n’a été modifié, aucune branche applicative créée, aucun appel de production ou écriture Meta effectué.
[SÛR] Les références de lignes ci-dessous concernent exclusivement ces commits ; le déploiement effectif sur Render/Netlify n’a pas été vérifié.
[SÛR] Les contre-exemples utilisent des données fictives et les fonctions pures lues, sans dépendances réseau ni base de production.
[SÛR] Ce rapport remplace les incertitudes documentaires de DIAG-002 par les constats permis par ce code ; il ne déclare pas que tous les scores et toutes les métriques sont faux.

## 1. Ce qui entre dans l’analyse

### Chaîne actuelle et périmètre

| Étape | Entrées réelles | Preuve |
|---|---|---|
| Lancement | Le frontend transmet `date_preset`, campagne et filtre de statut. | [SÛR] Frontend js/ai-recommendations.js L1414–1427. |
| Collecte commune | Publicités, campagnes et adsets, statuts effectifs, calendrier des adsets, créatifs, budgets et fuseau du compte ; pagination jusqu’à 20 pages. | [SÛR] Backend services/ai-delivery-scope.js L37–46, L68–81. |
| Historique de reprise | Activités des 90 derniers jours ; transitions vers ACTIVE et événements de première diffusion de la publicité ou de ses parents. | [SÛR] Même fichier L4–19, L82–96. |
| Insights par pub | Dépense, impressions, clics, actions et dates des résultats journaliers, sur une fenêtre après reprise. | [SÛR] Même fichier L100–125. |
| Analyse performance | Agrégat, contextes campagne/pub, créatifs et règles avec métriques individuelles et dates en JSON. | [SÛR] Même fichier L135–151 ; routes/ai.js L50–96 ; services/claude-api.js L243–275. |
| Audit de configuration | Même périmètre, créatifs détaillés, résumé CRM et contexte business ; prompt simplifié et règles du périmètre. | [SÛR] routes/ai.js L1071–1090, L1145–1168, L1231–1289. |
| Fusion | Rapports performance/audit, nouveau chargement du périmètre, contexte business et CRM ; une source réussie suffit. | [SÛR] routes/ai.js L4046–4075, L4144–4166. |
| Chat | Score/verdict/plan du rapport reçu et historique de conversation ; aucune nouvelle collecte Meta dans cette route. | [SÛR] routes/ai.js L3756–3824 ; frontend L2227–2234. |

[SÛR] Les résultats agrégés concernent les seules pubs actuellement effectivement actives et peuvent porter sur des débuts de fenêtre différents selon la reprise ; ils ne représentent pas toute la campagne sur toute sa vie.
[SÛR] `performanceData` laisse géographie et autres ventilations vides ; portée et fréquence ne sont pas collectées dans ce chemin ; CPM n’y est pas calculé.
[SÛR] Le prompt affiche néanmoins un CPM avec `insights.cpm || 0` : un CPM absent est annoncé à 0 €. Voir F02.
[SÛR] Les dates de mesure individuelles et les données de reprise entrent bien dans le prompt via `delivery_rules` ; ce n’est plus un simple extrait de titre et de texte.
[À VÉRIFIER] L’attribution des leads et la disponibilité réelle des activités/insights nécessitent une réponse Meta réelle ; aucun payload de production n’a été obtenu.

### F03 — Périodes sélectionnées et contexte CRM incohérents

[SÛR] En plage personnalisée, `getPeriodQueryString` produit `since=X&until=Y` : frontend js/state.js L15–28.
[SÛR] Le Copilote extrait uniquement `date_preset` de cette chaîne et, en son absence, choisit `last_7d` ; il n’envoie aucune borne : js/ai-recommendations.js L1414–1422.
[SÛR] Contre-exemple : sélection du 01/09 au 30/09 → requête Copilote `last_7d`, et non septembre.
[SÛR] L’analyse simple transmet la query string complète, mais sa route ne lit que `date_preset`, campagne et statut : frontend L116–119 ; backend routes/ai.js L48–50.
[SÛR] Dans `loadDeliveryScope`, une période non gérée, telle que `last_3d`, utilise le lendemain de reprise comme début : services/ai-delivery-scope.js L104–114.
[SÛR] Le CRM gère pourtant `last_3d` comme les dernières 72 heures : services/database.js L724–736.
[SÛR] Pour `yesterday` et `this_month`, le CRM retombe sur les sept dernières journées glissantes, sans borne supérieure, tout en étiquetant le bloc avec la période demandée : database.js L724–738, L759–760, L807–808, L823–824.
[SÛR] Exemple : audit demandé sur hier → résultats Meta d’hier mais CRM des sept derniers jours, y compris aujourd’hui.
[SÛR] Même pour `last_7d`, les métriques utilisent des dates calendaires dans le fuseau Meta et le lendemain de reprise ; le CRM utilise `now - 7 × 86400000` à l’heure courante.
[SÛR] Le CRM ne reçoit aucun identifiant de campagne : routes/ai.js L1237, L4153 ; database.js L720–798.
[SÛR] Exemple : campagne A sélectionnée, leads de A non traités mais nombreux leads traités de B dans la période → le prompt commercial parle du mélange A+B.
[À VÉRIFIER] L’effet réellement produit sur les recommandations dépend des données du compte ; la divergence de fenêtres et de périmètre est établie par le code.

## 2. Les calculs

### Formules utilisées et portée

| Calcul | Formule ou mécanisme réel | Jugement |
|---|---|---|
| Reprise | Maximum des dates d’événements reconnus sur la pub, l’adset et la campagne. | [SÛR] ai-delivery-scope.js L6–19 ; aucune utilisation de la création pour ce calcul actuel. |
| Ancienneté de reprise | `(now - Date.parse(delivery_since)) / 3600000`, sinon null. | [SÛR] L94–96 ; mesure depuis reprise vérifiée, pas temps d’impression réellement cumulé. |
| Protection | Reprise inconnue ou ancienneté < 72 heures. | [SÛR] L96 ; le cas fictif d’une reprise 24 h auparavant supprime une proposition de pause nommée. |
| Fenêtre de résultats | Début = max(lendemain de reprise dans le fuseau Meta, début du preset reconnu) ; fin = jour actuel ou hier. | [SÛR] L100–125 ; jour partiel de reprise volontairement exclu, donc ses clics ne sont pas comptés. |
| Leads | Pour chaque ligne, première action trouvée dans l’ordre `lead`, `onsite_conversion.lead_grouped`, `leadgen.other`, `onsite_conversion.leadgen` ; somme des valeurs. | [SÛR] L58–61 ; évite d’additionner indistinctement plusieurs types ; [À VÉRIFIER] équivalence avec l’attribution métier sur le compte. |
| CTR | `100 × clics / impressions`, ou 0 si aucune impression. | [SÛR] L63 ; 7 clics / 222 impressions = 3,153… %. |
| CPC / CPL | Dépense / clics ou dépense / leads ; null si dénominateur nul. | [SÛR] L64–65 ; aucune division infinie ; inconnue ensuite mal rendue dans le prompt, voir F02. |
| Absence de résultat prolongée | Aucune série « dernier lead » ni calcul déterministe de jours sans lead ; des conditions textuelles de durée + zéro lead sont données au modèle. | [SÛR] claude-api.js L308–325 ; routes/ai.js L4127–4129 ; règles nouvelles interdisent de confondre la fenêtre observée et la durée de reprise. |
| Score performance | `score_global` produit par le modèle à partir du prompt, puis JSON parsé. | [SÛR] claude-api.js L405–419, L497–553 ; aucune formule métier déterministe ni validation numérique dans ce chemin. |
| Score configuration | `score_config` produit par le modèle ; si le JSON reste invalide, valeur imposée 50. | [SÛR] routes/ai.js L1281–1298, L1303–1345 ; voir F04. |
| Score fusion | Instruction au modèle : 60 % performance + 40 % audit, adaptation si source absente. | [SÛR] routes/ai.js L4171, L4278–4289 ; aucun calcul JavaScript de `0,6 × P + 0,4 × A` ni bornage 0–100. |
| Qualité technique de l’analyse | 100, moins 30 pour résumé court, 20 pour moins de deux recos, 10 sans point fort, et une pénalité de conformité. | [SÛR] claude-api.js L532–547 ; ce score n’examine ni les métriques ni l’ancienneté ni la validité arithmétique. |

[SÛR] Avec performance 80 et audit 20, la pondération demandée vaut 56 ; le backend accepte un autre nombre renvoyé par le modèle s’il est dans du JSON parsable.
[À VÉRIFIER] Aucun score fusion erroné produit réellement n’est disponible ; absence de contrôle ne prouve pas que tous les scores générés sont faux.
[SÛR] Le prompt d’audit demande une checklist d’objectif, budget, géographie, catégorie et formulaire, mais le résumé explicite L1276–1279 ne présente pas les objectifs collectés ni la configuration géographique/formulaire complète.
[SÛR] Les règles JSON ajoutées contiennent les pubs et leurs métriques, pas tous les champs des campagnes/adsets collectés : ai-delivery-scope.js L21–35.
[À VÉRIFIER] Un jugement de configuration peut donc reposer sur des informations partielles ; le nombre précis de checklists fausses n’est pas établi.
[SÛR] La fonction `auditCampaignConfig` de claude-api.js n’est pas appelée par `/audit-config` : cette route construit son propre prompt ; son autre formule de qualité n’est pas attribuée au Copilote actuel.

### F02 — Inconnu remplacé par zéro, alors que la collecte le préserve

[SÛR] Une métrique indisponible reste `ad.metrics = null` ; si une seule pub manque, l’agrégat performance passe également à null : ai-delivery-scope.js L97–125, L135–139.
[SÛR] `buildAnalysisPrompt` affiche ensuite dépense, impressions, clics, CTR, CPC et leads via `valeur || 0` : claude-api.js L250–258.
[SÛR] Contre-exemple fictif : `leads: null` devient « Leads générés : 0 » ; l’encart de règles conserve pourtant `metrics:null`.
[SÛR] Le prompt contient donc deux informations contradictoires sur le même périmètre : métriques inconnues et valeurs nulles présentées comme zéro.
[SÛR] Le CPM inexistant dans `performanceData` devient aussi « CPM : 0€ » sans formule.
[SÛR] `learning_protected` dépend uniquement de la reprise et du seuil 72 h, pas de la disponibilité des métriques ; `guardReport` n’examine pas les métriques : L96, L154–174.
[SÛR] Contre-exemple fictif : pub reprise depuis 100 h, métriques indisponibles, proposition `pause_ad` nommée → la proposition survit au garde-fou.
[À VÉRIFIER] Que le modèle propose effectivement cette pause est non démontré ; le zéro mensonger dans le prompt et la limite du garde-fou sont reproductibles.

### F04 — Audit partiel noté 50 et traité comme source réussie

[SÛR] Après échec de parsing/réparation, la route construit `score_config: 50` avec verdict d’audit partiel, puis renvoie `success:true` : routes/ai.js L1327–1345.
[SÛR] L’orchestrateur définit `auditOk` à partir de `success` et marque cette source `ok` : L4053–4075.
[SÛR] Un échec de génération reçoit ainsi une note de configuration 50, susceptible de compter pour 40 % dans le score de fusion.
[SÛR] Le frontend affiche l’alerte de source seulement si sa valeur vaut `failed` : js/ai-recommendations.js L1583–1586.
[SÛR] Le verdict « audit partiel » reste dans le rapport source ; il n’est donc pas entièrement caché, mais la réussite et la note ne correspondent pas à une mesure fiable de configuration.
[À VÉRIFIER] La fréquence de ce parsing défaillant et l’effet du 50 sur un score réel ne sont pas connus.

### Tendance : même famille de risque, autre chemin que le moteur actuel

[SÛR] `getAdsWithDetails` calcule `100 × (clics actuels - précédents) / précédents`, arrondit et classe selon ±5 % ; sinon il utilise la dépense, puis des sentinelles +100 ou -100 : facebook-api.js L712–740.
[SÛR] Une erreur de collecte courante/précédente est capturée et laisse un dictionnaire vide ; les résultats absents deviennent zéro : L570–639, L706–714.
[SÛR] Contre-exemple : collecte courante échouée, anciens clics 10 et ancienne dépense positive → zéro courant puis tendance -100 « stopped », alors que la mesure est inconnue.
[SÛR] En sens inverse, ancienne collecte absente et 7 clics courants → +100 « new », sans preuve d’un doublement.
[SÛR] Le fallback sur la dépense peut aussi annoncer une hausse alors que les clics tombent à zéro, si les deux dépenses sont positives.
[SÛR] La comparaison ne tient pas compte des pauses/reprises ni d’un volume d’exposition équivalent ; « aujourd’hui » contre une journée terminée compare une période partielle à une complète.
[SÛR] Ces données servent notamment la liste de pubs de la modale IA : frontend L458–465 ; le moteur performance/fusion actuel utilise `loadDeliveryScope`, sans cette tendance.
[SÛR] Il serait faux d’affirmer que le Copilote actuel reçoit directement cette formule de tendance ; ce défaut est un constat secondaire sur la collecte consultée, pas la cause prouvée des 42 jours.
[À VÉRIFIER] Le calendrier précis des presets Graph et le fuseau du runtime de `getPreviousPeriod` ne sont pas testés ici ; aucune erreur d’un jour supplémentaire n’est affirmée.

## 3. Les statuts

### Ce qui est désormais correctement distingué

[SÛR] `loadDeliveryScope` exige ACTIVE pour la pub ET l’adset ET la campagne, puis contrôle les dates de début/fin de l’adset : ai-delivery-scope.js L76–81.
[SÛR] Les pubs effectivement pausées et celles exclues par un parent ou calendrier ne sont pas agrégées dans ce moteur.
[SÛR] Le code ne calcule plus la maturité depuis `created_time` ; une reprise impossible à vérifier reste inconnue et protégée.
[SÛR] L’ancien cas « 42 jours » n’est donc pas reproduit comme formule actuelle depuis création ; CODE-029 est présent dans le code inspecté.
[À VÉRIFIER] La reconnaissance d’un historique réel Meta, les événements absents et le déploiement du correctif n’ont pas été vérifiés en production.
[SÛR] ACTIVE et calendrier admissible n’établissent pas une impression livrée à chaque instant ; la durée depuis reprise n’est pas une intégrale de temps effectivement diffusé.

### F05 — Le filtre visible ne correspond plus aux objets analysés

[SÛR] Le frontend propose et envoie le statut sélectionné, y compris `paused` : js/ai-recommendations.js L1399–1421.
[SÛR] Les routes lisent/transmettent ce filtre mais ne le passent pas à `loadDeliveryScope`, qui n’accepte que campagne, période et temps : routes/ai.js L48–50, L4021–4044 ; ai-delivery-scope.js L68–81.
[SÛR] En sélection « en pause », les calculs portent toujours sur les pubs effectivement actives ; le metadata reprend néanmoins le statut sélectionné : routes/ai.js L114, L4318.
[SÛR] Le périmètre actif restreint est voulu par les nouvelles règles ; le défaut est le filtre/interface et metadata qui annoncent un autre périmètre.
[SÛR] Le code ne distingue pas, pour analyse des pubs en pause, « depuis hier » de « depuis six mois » : il les exclut toutes ; ce n’est plus une assimilation de leur durée dans le calcul des actives.
[SÛR] `audit-and-fix` suit une collecte distincte de textes, filtrée ACTIVE, avec limite 50 et sans le calendrier/parents de `loadDeliveryScope` : routes/ai.js L1379–1409.
[SÛR] Cette route n’est pas une source de `copilot-orchestrate`, qui appelle seulement `analyze` et `audit-config` ; elle ne calcule pas de maturité dans le fragment lu.
[SÛR] Le chat n’a ni périmètre de diffusion, ni métriques courantes : il discute le rapport existant, sans prouver la situation actuelle.

## 4. La priorisation

### Mécanisme réel

[SÛR] L’urgence est décidée par le modèle sur l’instruction « critique performance ou conformité » ; aucun seuil chiffré d’urgence ni recalcul de priorité n’est appliqué : routes/ai.js L4179–4188, L4278–4289.
[SÛR] Le frontend ne trie pas selon la valeur `priorite` : il place les actions ignorées en fin puis conserve l’ordre renvoyé par le modèle : js/ai-recommendations.js L1523–1532.
[SÛR] Une mauvaise recommandation classée urgente et placée en premier par le modèle restera donc à cette place ; aucun contrôle frontend de ses calculs ne la remet en cause.
[SÛR] `guardReport` peut retirer certaines propositions de pause/budget touchant des pubs protégées ; c’est une protection réelle, pas un simple texte de prompt.
[SÛR] Le filtre est lexical, fondé sur des mots et les noms/IDs présents dans le JSON ; il ne valide ni les chiffres ni la priorité : ai-delivery-scope.js L154–174.
[À VÉRIFIER] Les paraphrases et noms partiels peuvent ne pas être reconnus ; aucune réponse réelle de modèle contournant ce garde-fou n’a été obtenue.

### F01 — Une ancienne urgence est restaurée sans réévaluation actuelle

[SÛR] `copilot-latest` choisit un rapport sauvegardé, décode son payload, ajoute `restored:true`, puis le renvoie sans charger le périmètre actuel ni appliquer le garde-fou : routes/ai.js L4360–4380.
[SÛR] Le frontend restitue ce rapport avec ses actions ; il affiche « restauré » et l’horodatage, mais ne les invalide pas selon leur ancienneté ou les nouveaux filtres : js/ai-recommendations.js L1461–1472, L1578–1596.
[SÛR] Exemple : une recommandation de pause sauvegardée avant une nouvelle reprise reste affichée après celle-ci ; les nouvelles protections de génération ne sont pas réappliquées à cet affichage.
[SÛR] Le clic individuel exige une confirmation : L2003–2006 ; il n’y a donc pas de pause autonome démontrée.
[SÛR] Après confirmation, seules les données d’action sont envoyées : L2010–2016 ; la branche backend pause recherche le premier nom contenant le fragment, puis change le statut, sans vérifier la reprise : routes/ai.js L504–545.
[SÛR] Le risque d’utiliser une recommandation périmée demeure même avec le correctif des nouveaux rapports ; l’identité par fragment peut également désigner une autre pub portant un nom proche.
[À VÉRIFIER] L’existence réelle d’un ancien rapport concerné, de noms concurrents et une action exécutée ne sont pas établies.

### F06 — Compteurs automatiques/manuels calculés sur un autre champ

[SÛR] Le format fusion exige `executable_auto` ; la sélection du bouton « Tout appliquer » lit ce champ : routes/ai.js L4261–4263 ; frontend L1534–1540.
[SÛR] `guardReport` recalcule pourtant `auto_count` avec `execution === 'auto'`, puis `manuel_count = longueur - auto_count` : ai-delivery-scope.js L171–174.
[SÛR] Contre-exemple fictif : une action `executable_auto:true`, sans `execution`, donne auto=0 et manuel=1, alors que le bouton l’inclut comme automatique.
[SÛR] `urgent_count` est recalculé, mais `moyen_count` et `faible_count` restent ceux du modèle après retrait éventuel d’actions ; les compteurs peuvent contredire le plan effectivement affiché.
[SÛR] Ce défaut concerne l’état présenté et le nombre d’actions, pas une preuve de mauvaise priorité de la recommandation.

### Classement final des défauts établis

1. [SÛR] F01 — rapport ancien restauré et actionnable sans revalidation de la reprise ; risque de pause sur une décision périmée.
2. [SÛR] F02 — métriques inconnues/CPM absent présentés à zéro ; proposition de pause possible sur pub mature sans mesure disponible.
3. [SÛR] F03 — période personnalisée perdue et CRM à fenêtre/périmètre différents ; données non comparables dans le même raisonnement.
4. [SÛR] F04 — échec d’audit transformé en score 50 et source réussie ; jugement configuration et fusion contaminables.
5. [SÛR] F05 — sélection « en pause »/« toutes » sans effet sur le périmètre effectivement actif ; metadata trompeur sur les objets analysés.
6. [SÛR] F06 — compteurs auto/manuels et certaines priorités non cohérents avec le plan final.
[SÛR] Constat secondaire : tendance modale faux zéro/+100/-100 en cas de donnée absente, sans preuve qu’elle entre dans le moteur Copilote actuel.
[À VÉRIFIER] Aucun score global réel arithmétiquement faux n’est prouvé ; la pondération n’est qu’une instruction au modèle, pas une formule exécutée.

### Vérifications effectuées et limites

| Vérification locale, sur fonctions pures | Résultat |
|---|---|
| Reprise fictive 24 h auparavant, proposition de pause nommée | [SÛR] Ancienneté 24 h ; proposition retirée par le garde-fou. |
| 222 impressions, 7 clics, dépense fictive 4 € | [SÛR] CTR 3,153… %, CPC 0,5714… €, CPL null sans lead ; ce 4 € est fictif. |
| Mesure indisponible sur une pub reprise depuis 100 h | [SÛR] Agrégat null, mais prompt « Leads générés : 0 » ; pause nommée conservée par le garde-fou. |
| Plage personnalisée septembre | [SÛR] Query sans date_preset ; extraction du Copilote retombe sur last_7d. |
| Une action executable_auto=true sans champ execution | [SÛR] Statistiques finales auto=0, manuel=1. |
| Lecture de source immuable | [SÛR] Fichiers lus aux SHA backend/frontend ci-dessus ; aucune modification applicative. |

[SÛR] La première tentative de simulation du helper complet a échoué parce que URLSearchParams n’est pas exposé dans le runtime d’analyse ; vérification reprise sur getPeriodParams puis extraction identique du preset, sans effet externe.
[SÛR] Aucun appel aux SDK IA, aucune Graph API, aucun test natif du dépôt, aucune base CRM réelle consultés.
[SÛR] Aucun diagnostic de conformité démographique, aucune solution technique, refonte ou instruction de correction fournis.
[SÛR] Livraison limitée à DIAGNOSTIC-003.md et à la boîte de sortie ; avancement du hub sans force après revérification du HEAD, puis relecture des deux fichiers au commit livré.

[SÛR] Réconciliation avant livraison : le hub a avancé sur `d0e3d6b3d2abfd77611202cac603e4cd02274089` avec des preuves CODE-029 ; mission DIAG-003 inchangée.
[SÛR] Le backend a avancé de `69d4411d43e0e471901c85b2780d35ae5a274e57` à `359225f3ba612118de298926f18cf32abced3556` ; comparaison exhaustive des commits : seul le module de périmètre et son test ont changé.
[SÛR] Nouveau garde-fou : périmètre vide → retrait des propositions lexicales de pause/budget ; les six constats de ce rapport ne reposent pas sur l’absence de ce garde-fou.
[SÛR] Module final relu au nouveau commit ; autres fichiers applicatifs inchangés ; frontend stable.

### Sources versionnées

| Fichier au commit inspecté | Blob Git |
|---|---|
| [facebook-ads-backend/services/ai-delivery-scope.js](https://github.com/seoettia-collab/facebook-ads-backend/blob/359225f3ba612118de298926f18cf32abced3556/services/ai-delivery-scope.js) | `69e4bb80556c2f6766f9c026a6e12549cbd007d5` |
| [facebook-ads-backend/services/claude-api.js](https://github.com/seoettia-collab/facebook-ads-backend/blob/359225f3ba612118de298926f18cf32abced3556/services/claude-api.js) | `760cfddef63349f93ebab4a24a5f273e160fe7d3` |
| [facebook-ads-backend/routes/ai.js](https://github.com/seoettia-collab/facebook-ads-backend/blob/359225f3ba612118de298926f18cf32abced3556/routes/ai.js) | `e3d93b28a95de653083a3baf35a0d8578fa1ad74` |
| [facebook-ads-backend/services/facebook-api.js](https://github.com/seoettia-collab/facebook-ads-backend/blob/359225f3ba612118de298926f18cf32abced3556/services/facebook-api.js) | `5bfb49e9619472a6dca8efa4a13c119f6ee777ad` |
| [facebook-ads-backend/services/graph-metrics.js](https://github.com/seoettia-collab/facebook-ads-backend/blob/359225f3ba612118de298926f18cf32abced3556/services/graph-metrics.js) | `04da8f74ccc6e5be0f51daa627fcf2fe8960ab72` |
| [facebook-ads-backend/services/database.js](https://github.com/seoettia-collab/facebook-ads-backend/blob/359225f3ba612118de298926f18cf32abced3556/services/database.js) | `05ddf639de233da7abeb46877116932cdcac3e3c` |
| [facebook-ads-frontend/js/ai-recommendations.js](https://github.com/seoettia-collab/facebook-ads-frontend/blob/f503aab2b691f4f9c6a03945da84981850c51d6c/js/ai-recommendations.js) | `7a0e0df049652cf01545f368afeaf4f833da7769` |
| [facebook-ads-frontend/js/state.js](https://github.com/seoettia-collab/facebook-ads-frontend/blob/f503aab2b691f4f9c6a03945da84981850c51d6c/js/state.js) | `0a2b7c444783b6c64809215a8f068b723e2a75b5` |
| [facebook-ads-frontend/js/api.js](https://github.com/seoettia-collab/facebook-ads-frontend/blob/f503aab2b691f4f9c6a03945da84981850c51d6c/js/api.js) | `9653cbddca3c866947b2c2a37bf444b97d609ed8` |
