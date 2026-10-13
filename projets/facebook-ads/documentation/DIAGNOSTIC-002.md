# DIAGNOSTIC-002 — Données et fiabilité du Copilote
DIAG-002 | 2026-10-13 | v1.0
EN-RÉPONSE-À : DIAG-002
HEAD de lecture du hub : `d272eb0617178850b8d3a33eecea7d17cd442410`

[SÛR] Périmètre : sources documentaires du hub et incident transmis par le Pilote ; aucun code applicatif lu, aucun appel au backend, aucune action Meta.
[SÛR] Les faits du 13/10 viennent de la mission, sans payload brut, identifiant de publicité, capture ni horaire précis ; ils ne constituent pas un contrôle indépendant de production.
[SÛR] Les inventaires portent sur les bases backend `873e367` et frontend `7975a80`, antérieures à l’incident ; leur description ne certifie pas l’implémentation déployée le 13/10.
[SÛR] L’examen couvre les quatre points demandés ; une information non décrite est signalée, jamais remplacée par une hypothèse de code.

## 1. Quelles données entrent dans l’analyse ?

### Chaîne documentée

| Étape | Données ou paramètres décrits | Source | Limite |
|---|---|---|---|
| Lancement Copilote | `date_preset`, `campaign_id`, `status_filter` | BACKEND L50 ; FRONTEND L157 | [SÛR] Paramètres acceptés ; valeurs choisies, valeur par défaut et période réellement exécutée non décrites. |
| Analyse performance | Performances Meta enrichies par le contexte local ; mêmes trois filtres | BACKEND L10 | [SÛR] Services `facebook-api`, `database`, `claude-api.analyzeWithClaude` ; champs exacts envoyés à l’IA non décrits. |
| Audit configuration | Campagnes, adsets et publicités ; contexte business et CRM ; `date_preset`, `campaign_id` | BACKEND L18 | [SÛR] Graph API, base locale et IA ; `status_filter` n’est pas nommé dans cette entrée. |
| Fusion | Rapports d’analyse et d’audit réunis par IA puis sauvegardés | BACKEND L50 | [SÛR] Le Copilote fusionne deux rapports ; transmission éventuelle des données brutes et conservation de leur provenance non décrites. |
| Restauration | Dernier rapport sauvegardé dans la base locale | BACKEND L51 ; FRONTEND L158 | [SÛR] Restauration, pas nouvelle analyse ; date de génération, expiration et règles d’affichage non décrites. |
| Conversation sur le rapport | Question, contexte d’audit et historique | BACKEND L48 ; FRONTEND L156/L162 | [SÛR] Le chat utilise du contexte fourni ; actualisation automatique de ce contexte non décrite. |
| Vérification d’une recommandation | Type d’action, données d’action, titre, source ; constat côté Meta | BACKEND L49 ; FRONTEND L159 | [SÛR] Vérifie l’application ou son résultat visible ; validation préalable du raisonnement et de l’urgence non décrite. |

[SÛR] Le référentiel §2 Acquisition, L56–58, décrit les métriques disponibles dans le système : dépense, impressions, clics, CTR, CPC, CPL, portée et fréquence, aux niveaux campagne, publicité et jour.
[À VÉRIFIER] Cette disponibilité n’établit pas que chacun de ces champs est transmis au Copilote, avec le même périmètre et la même fraîcheur.
[SÛR] Le référentiel §2 décrit des contextes campagne/publicité injectés dans les prompts, notamment le mode réduction de budget.
[À VÉRIFIER] Le contenu exact de ces contextes et le respect du mode réduction par la fusion ne sont pas montrés.
[SÛR] Le référentiel §5 indique des conversions lues côté Meta et un suivi Graph API Lead Ads ; aucune remontée CAPI n’est décrite, conformément à D5.
[À VÉRIFIER] La mission n’établit pas si « lead généré » désigne un résultat attribué par Meta, un lead CRM synchronisé ou une autre valeur dans le raisonnement.

### Informations nécessaires pour juger le cas, non établies par les inventaires

| Information | Ce qui est établi |
|---|---|
| Identité de la publicité et de sa version | [À VÉRIFIER] Aucun identifiant, lien entre ancienne/nouvelle version, ni conservation d’historique par identifiant ne sont décrits dans les entrées IA. |
| Création, pause, reprise et durée réellement diffusée | [À VÉRIFIER] Aucun champ nommé ni historique de transitions n’est décrit pour le Copilote ; absence de description ne prouve pas absence de donnée. |
| Dates exactes des métriques | [À VÉRIFIER] Période sélectionnée, bornes, fuseau, comparaison avant/après reprise et alignement des deux rapports non décrits. |
| Statut effectif et état des parents | [À VÉRIFIER] Présence dans le payload IA du statut effectif, du calendrier campagne/adset et de l’éligibilité réelle de diffusion non décrite. |
| Résultats et attribution | [À VÉRIFIER] Définition du résultat, fenêtre d’attribution, délai de remontée et distinction zéro/absent/erreur non décrits. |
| Fraîcheur et complétude | [À VÉRIFIER] Horodatage de collecte, erreurs de lecture, couverture des objets et dépendance aux caches non décrits dans les rapports IA. |

[SÛR] La tâche front de vidage cache appelle `POST /api/cache/clear`, absent de l’inventaire backend, constat déjà documenté en DIAGNOSTIC-001 §2.
[À VÉRIFIER] Cet écart est documentaire sur des bases anciennes ; ni une panne actuelle du vidage ni un lien causal avec les 42 jours ne sont démontrés.
[SÛR] Les sources viennent du backend/Graph API et de la base locale, pas d’un accès privilégié du consultant META ; DECISIONS D-005 est cohérente avec les routes décrites.

## 2. Quels calculs sont faits sur ces données ?

### Cas avéré, selon le terrain transmis

[SÛR] La mission situe la remise en ligne au 12/10 et la recommandation au 13/10 ; elle attribue les 42 jours à l’ancienne version en pause depuis le 01/09.
[SÛR] La recommandation a qualifié ce délai de « diffusion mature » sans résultat pour justifier une pause ; cette durée ne représente pas la diffusion récente décrite par le Pilote.
[SÛR] Défaut A — la durée historique a servi à qualifier la maturité de la reprise récente ; le raisonnement sur la durée est faux dans le cas transmis.
[À VÉRIFIER] La cause exacte reste inconnue : formule depuis création ou mise à jour, confusion de version, durée calendaire, contexte conservé ou rapport restauré ; aucune de ces causes n’est démontrée par l’inventaire.
[SÛR] « La veille » ne donne pas une durée exacte de 24 heures ; l’heure de reprise et celle de génération manquent.

| Calcul / jugement | Ce que les sources établissent | Peut-il être faux ? |
|---|---|---|
| Ancienneté / maturité de diffusion | [SÛR] Confusion démontrée dans la mission DIAG-002 ; formule non décrite. | [SÛR] Oui dans ce cas ; [À VÉRIFIER] le point de départ et le traitement des pauses restent inconnus. |
| Absence de résultat | [SÛR] Le texte rapporté annonce zéro lead ; aucune série de résultats ni définition n’est fournie. | [À VÉRIFIER] Le zéro peut être exact ; sa transformation en échec mature est injustifiée par la durée du cas. |
| CTR comparé | [SÛR] Les chiffres transmis permettent 7/222 × 100 = 3,15 % pour la première pub et 0/64 × 100 = 0 % pour l’autre. | [SÛR] C’est un calcul du présent diagnostic, pas une formule observée dans le Copilote ; périodes comparables non confirmées. |
| CPC / CPL | [SÛR] Métriques disponibles selon le référentiel ; dépense et résultats détaillés absents du cas. | [À VÉRIFIER] Formules, traitement du zéro, attribution et valeurs ne sont pas décrits ; aucun CPC ou CPL erroné démontré. |
| Tendance | [SÛR] Données quotidiennes et snapshots existent dans le système selon le référentiel. | [À VÉRIFIER] Leur transmission au Copilote, périodes comparées et traitement d’une pause ne sont pas décrits ; aucune tendance fausse démontrée. |
| Score de qualité lead | [SÛR] Le référentiel §5, L172–175, indique `leads.score` à 50 pour tous, sans alimentation. | [SÛR] Selon ce document daté, il ne distingue pas la qualité ; [À VÉRIFIER] son utilisation effective par le Copilote n’est pas établie. |
| Score d’analyse / urgence | [SÛR] Une urgence erronée est rapportée dans la mission. | [À VÉRIFIER] Aucun algorithme de score, pondération, seuil ou règle de tri n’est décrit ; aucun score de lead ne doit lui être assimilé. |
| Gains estimés | [SÛR] Le référentiel §6, L229–230, les qualifie d’estimations. | [SÛR] Ils ne prouvent pas un gain réalisé ; [À VÉRIFIER] formule et utilisation dans la priorité non décrites. |

[SÛR] Sept clics contre zéro établissent l’avantage de clics rapporté pour les deux publicités, pas la rentabilité, la qualité des leads ou une supériorité statistique.
[SÛR] La mission ne fournit ni dépense, ni égalité de période, ni budget comparable ; aucune conclusion de conversion ou de rentabilité n’en est tirée.
[SÛR] Le référentiel D6, L150, prévoit de ne pas juger une publicité de moins de 24 h.
[À VÉRIFIER] Le délai exact manque pour conclure à une violation de ce seuil précis ; indépendamment du seuil, la qualification « 42 jours de diffusion mature » est contredite par le terrain.

## 3. Les statuts sont-ils correctement distingués ?

[SÛR] Le référentiel §6, L218–223, distingue explicitement statut configuré `ACTIVE` et diffusion effective : un ensemble peut être « Finalisé » par dépassement de date tout en restant configuré actif.
[SÛR] Le filtre `status_filter` est décrit pour l’analyse et l’orchestrateur ; un filtre courant ne constitue pas, à lui seul, un historique de diffusion.
[À VÉRIFIER] L’inventaire ne dit pas quels états ce filtre accepte, quels objets il filtre ni s’il utilise le statut configuré ou effectif.

| État à distinguer | Conclusion permise par les sources |
|---|---|
| Configurée active et réellement diffusée | [À VÉRIFIER] L’inventaire ne décrit pas le diagnostic de diffusion utilisé par le Copilote. |
| Configurée active mais sans diffusion effective | [SÛR] Cas possible et documenté pour un adset dans le référentiel ; [À VÉRIFIER] reconnaissance par le Copilote non décrite. |
| En pause depuis hier | [À VÉRIFIER] Date de pause et durée sans diffusion non décrites dans les entrées IA. |
| En pause depuis plusieurs mois | [À VÉRIFIER] Aucune distinction temporelle documentée par rapport à une pause récente. |
| Remise en ligne récemment après une longue pause | [SÛR] La recommandation du cas DIAG-002 ne respecte pas cette distinction : elle qualifie la reprise récente de diffusion mature sur 42 jours. |
| Filtrée ou non renvoyée par une lecture | [SÛR] Le référentiel avertit que zéro publicité renvoyée ne prouve pas une suppression ; [À VÉRIFIER] traitement par le Copilote non décrit. |

[SÛR] Une différence d’entrée est documentée : analyse/orchestrateur acceptent `status_filter`, audit-config ne le nomme pas.
[À VÉRIFIER] L’alignement des objets entre les deux rapports et la propagation du filtre ne sont pas décrits ; une divergence effective ne peut pas être affirmée.
[SÛR] Il est démontré que le raisonnement final a mal traité la reprise dans ce cas ; il n’est pas démontré que le Copilote traite tous les états de la même façon.
[SÛR] Les statuts CRM des leads sont un autre objet ; le référentiel L227–228 avertit qu’ils ne sont pas tenus à jour en temps réel.
[À VÉRIFIER] Si l’audit utilise zéro rendez-vous ou ces statuts pour juger la performance, l’état commercial peut être incomplet ; aucun usage ni résultat faux précis de cette nature n’est montré.

## 4. La priorisation est-elle fiable ?

[SÛR] Défaut B — la recommandation fondée sur la mauvaise maturité a été classée urgente et placée en tête, selon la mission DIAG-002.
[SÛR] Le classement a donc amplifié une prémisse fausse dans un cas observé ; la priorité urgente ne constitue pas une preuve de validité.
[SÛR] Suivre cette recommandation aurait coupé la publicité ayant les seuls clics des deux dans les chiffres transmis ; aucun élément n’établit qu’une pause ait effectivement été exécutée.
[À VÉRIFIER] Qui attribue l’urgence, qui trie les recommandations, selon quels seuils, données et éventuels garde-fous : l’inventaire ne le dit pas.
[SÛR] L’orchestrateur fusionne par IA deux rapports ; cette description n’établit ni une validation indépendante des prémisses, ni un recalcul de leur priorité.
[À VÉRIFIER] Le mauvais classement peut venir d’une branche d’analyse, d’audit, de fusion, de restauration ou de présentation ; sa localisation n’est pas établie.
[SÛR] `verify-reco-done` est décrit comme un constat d’application ; il n’établit pas la pertinence de la recommandation avant son exécution.
[À VÉRIFIER] Le frontend expose des actions individuelles et groupées du Copilote avec chemins neutralisés ; confirmation, blocage d’une recommandation périmée et accessibilité actuelle non décrits.
[SÛR] Rien dans les sources ne prouve un arrêt autonome de cette publicité par le Copilote ; la mission rapporte une recommandation.
[SÛR] DECISIONS D-009, « réduire avant d’ajouter », ne justifie pas à elle seule une pause urgente de la pub aux seuls clics ; elle ne valide pas une durée historique fausse.

### Défauts établis, classés par risque de mauvaise décision

1. [SÛR] Défaut A — jugement de diffusion mature fondé sur une durée historique inapplicable à la reprise récente ; preuve : mission DIAG-002, incident du 13/10.
2. [SÛR] Défaut B — urgence et première place accordées à cette recommandation malgré la prémisse fausse ; preuve : même incident.
[SÛR] Ce sont deux défauts du même incident, pas deux incidents indépendants ; les autres calculs ne sont pas déclarés faux sans preuve.

### Informations manquantes, sans solution technique proposée

| Point de mission | Information non établie |
|---|---|
| 1 | Payload réellement transmis, périodes exactes, identités/version, données de reprise, fraîcheur et définition du lead. |
| 2 | Formule de durée, traitement des pauses, dénominateurs, zéro/absent/erreur, périodes de tendance et score réellement utilisé. |
| 3 | Statuts configuré/effectif, historique des transitions et alignement des objets entre analyse et audit. |
| 4 | Provenance de l’urgence, seuils et tri, validité du rapport restauré et garde-fous avant action. |

[SÛR] Partie cohérente : performances Meta, contexte local, audit business/CRM, fusion et restauration sont identifiés ; les métriques agrégées disponibles sont documentées.
[SÛR] Limite : les inventaires de routes ne sont ni un inventaire des champs de payload, ni une spécification des formules, ni une preuve de fraîcheur au 13/10.
[SÛR] Verdict sur la fiabilité : NON pour le cas transmis ; aucun diagnostic général de fausseté de toutes les métriques ni de tous les calculs n’est justifié.

### Sources et livraison

[SÛR] Sources immuables lues au HEAD `d272eb0617178850b8d3a33eecea7d17cd442410` ; référence de mission DIAG-002 vérifiée avant exécution.
[SÛR] BACKEND = `projets/facebook-ads/documentation/INVENTAIRE-BACKEND.md` ; FRONTEND = `projets/facebook-ads/documentation/INVENTAIRE-FRONTEND.md`.
[SÛR] Les numéros L renvoient aux lignes des fichiers à ce HEAD.
[SÛR] Travail exclusivement documentaire, sans solution technique, refonte, correction ni déploiement.
[SÛR] Livraison atomique prévue sur le HEAD distant revérifié ; deux fichiers autorisés seulement ; mise à jour sans force et relecture par commit.

| Source | Blob Git lu |
|---|---|
| INVENTAIRE-BACKEND.md | `4fabbd85e636939ad219fa4edebd976432c3d951` |
| INVENTAIRE-FRONTEND.md | `ece238033b999f62795cc0c12a0e829278cdefe3` |
| REFERENTIEL.md | `e3389bf272639e346402b9f0ee9a6593b1987c82` |
| DECISIONS.md | `20af0e954b56783c74c15ba17856ac65d2a859ef` |
| DIAGNOSTIC-001.md | `4c822674dd031d3aff0e32f52d57751ad3520915` |
