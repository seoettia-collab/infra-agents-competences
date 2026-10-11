EXTRACTION DE MÉMOIRE — ANCIEN PILOTE FACEBOOK-ADS
Date : 11/10/2026
Source : échanges historiques de ce fil, principalement mars-avril 2026. Ceci n'est pas un état actuel du dépôt.

1. DÉCISIONS ET LEUR MOTIF

[SÛR] Mars 2026 — Ricardo a fixé l'équilibre éditorial des SMS à environ 75 % d'échange humain et 25 % de présentation du simulateur, en fin de message. Motif : certains clients, notamment peu familiers du numérique, doivent pouvoir avancer par échange direct sans utiliser un outil en ligne.

[SÛR] Mars 2026 — L'IA rédige librement le corps personnalisé, tandis que le système ajoute séparément le lien du simulateur, la signature et la mention STOP. Motif : garantir les éléments obligatoires sans rigidifier le dialogue.

[SÛR] Mars 2026 — Le simulateur est une option, pas un passage obligé. Motif : ne pas perdre les clients qui préfèrent téléphoner, répondre au SMS ou échanger avec un interlocuteur.

[SÛR] Mars 2026 — Les SMS doivent être rédigés au nom de l'entreprise (« nous » et non « je »). Motif : cohérence de l'identité de Mistral Pro Reno, indépendamment du modèle génératif.

[SÛR] Mars 2026 — Les SMS ne doivent pas être artificiellement raccourcis au détriment de la politesse, des paragraphes et de la clarté. Motif : l'ancienne recherche d'économie de caractères provenait d'un service payant ; la priorité commerciale est la qualité du contact.

[SÛR] Mars 2026 — Les prompts trop détaillés ont été assouplis. Motif : les exemples et interdictions explicites faisaient produire des messages stéréotypés ; Ricardo a préféré la liberté rédactionnelle encadrée par l'intention (professionnel, humain, accessible, incitant à répondre).

[SÛR] Mars 2026 — La formulation commerciale du simulateur met en avant une estimation en cinq minutes et un document utile aux démarches administratives. Motif : communiquer un bénéfice concret plutôt qu'un vocabulaire technique (« logiciel automatique », « algorithme »).

[SÛR] Mars 2026 — Le nom de lien court /devis-travaux a été préféré à /devis. Motif : rendre la destination immédiatement compréhensible. [INCERTAIN] La création effective de la redirection n'est pas établie par ces seuls échanges.

[SÛR] Mars 2026 — Ricardo a abandonné le mot de passe individuel pour le simulateur. Motif : l'accès réservé pouvait valoriser le service, mais ajoutait une friction excessive à l'entrée.

[SÛR] Mars 2026 — Ricardo souhaite des résumés très courts pour lui, mais autorise des instructions détaillées à l'ingénieur. Motif : décider vite sans priver l'exécutant des détails utiles.

[SÛR] Mars-avril 2026 — Une mission doit viser un objectif concret et déboucher sur une exécution, pas une chaîne de diagnostics réciproques GPT/Claude. Motif : les échanges répétitifs ont fait perdre du temps sans résoudre le problème.

[SÛR] Avril 2026 — Avant de dupliquer ou reconstruire une campagne, vérifier l'état réel de diffusion dans Ads Manager et le calendrier. Motif : un incident attribué à un blocage Meta provenait simplement d'une date de fin dépassée ; préserver autant que possible l'historique existant.

[SÛR] Avril 2026 — Réduire d'abord le nombre de publicités actives avant d'en ajouter une nouvelle, avec un budget limité. Motif : éviter de multiplier les variantes et pouvoir attribuer les changements de performance à une action identifiable. Claude a contesté l'ajout immédiat d'une sixième publicité et son objection a été acceptée.

[SÛR] Mars 2026 — Séparer les phases : les améliorations du site et du PDF généré par le simulateur ne doivent pas être mêlées à la mission SMS. Motif : limiter la dispersion et terminer les sujets un par un.

2. CE QUI A ÉTÉ ESSAYÉ PUIS ABANDONNÉ

[SÛR] Mars 2026 — Call Gateway Android pour les appels, abandonné au profit de Twilio Voice. Motif : fiabilité insuffisante de la passerelle Android d'appels. Cette décision ne concernait pas la passerelle Android des SMS.

[SÛR] Mars 2026 — MMS avec image du simulateur : Ricardo a d'abord demandé une image systématique, puis la solution a été annulée. Motif rapporté par Claude : l'intégration SMSGate ne prenait pas en charge l'envoi MMS. Ne pas réactiver cette piste sans vérifier une capacité réelle de bout en bout.

[SÛR] Mars 2026 — Prompts avec phrases modèles, listes d'interdictions, plafonds de mots et structures ligne par ligne, abandonnés. Motif : l'IA copiait les exemples et produisait des messages trop rigides ou artificiels.

[SÛR] Mars 2026 — SMS réduits à deux phrases ou à des limites très courtes, abandonnés. Motif : dégradation de la qualité commerciale pour satisfaire une ancienne contrainte de coût.

[SÛR] Mars 2026 — Login par nom de famille et mot de passe envoyé par SMS, abandonné. Motif : difficulté d'utilisation et risque de réduire la conversion.

[SÛR] Avril 2026 — Duplication de campagne et création d'une campagne test proposées comme première réponse à zéro impression, mais non nécessaires après découverte du calendrier expiré. Motif de l'abandon : correction plus simple dans l'ensemble existant.

[SÛR] Avril 2026 — Ajout immédiat d'une sixième publicité, remplacé par la proposition de mettre en pause deux publicités faibles avant un nouveau test. Motif : limiter la dispersion des expérimentations et des dépenses.

[INCERTAIN] Avril 2026 — La « cannibalisation » entre cinq publicités a été avancée comme explication du CPL. Elle n'a pas été prouvée causalement ; l'affirmation selon laquelle chaque publicité reçoit exactement un cinquième du budget est incorrecte comme règle générale.

3. PIÈGES ET SURPRISES

[SÛR] Avril 2026 — Meta Graph API pouvait afficher campagne et adset ACTIVE alors qu'Ads Manager indiquait « Finalisé ». La date de fin de l'adset était dépassée et le bouton ON restait affiché. Le statut configuré n'est pas l'état effectif de diffusion.

[SÛR] Avril 2026 — Zéro publicité renvoyée par l'endpoint du dashboard n'a pas signifié que les publicités avaient été supprimées. Après correction du calendrier, deux publicités sont redevenues actives. Examiner les filtres et les statuts effectifs avant de conclure à une disparition.

[SÛR] Mars 2026 — Des logs d'envoi SMS/MMS indiquaient OK et state=Pending. Ils prouvaient l'acceptation de la requête, pas la livraison finale au téléphone ; les premières interprétations de GPT ont été trop affirmatives.

[SÛR] Avril 2026 — Le Copilote proposait simultanément de nouvelles créations et une réduction du nombre de publicités. Les recommandations IA doivent être arbitrées et séquencées, pas exécutées en bloc.

[SÛR] Avril 2026 — Les gains annoncés par le Copilote (par exemple baisse du CPL de 20 à 30 %) étaient des estimations non démontrées par un test. Ne pas les convertir en résultats garantis.

[SÛR] Mars 2026 — Le dashboard affichait zéro rendez-vous alors que deux rendez-vous avaient été rapportés. Ricardo a précisé que les données CRM n'étaient pas suivies en temps réel pendant les tests. Ne pas confondre défaut de mise à jour des statuts et absence de résultats commerciaux.

[SÛR] Mars 2026 — Une variation mineure du ton d'un SMS n'est pas forcément un défaut nécessitant une nouvelle version du prompt. Ricardo a fini par accepter un message naturel et n'a demandé que le remplacement de « j'ai » par « nous ».

[SÛR] Mars-avril 2026 — Le principal coût caché de certains diagnostics était la répétition des échanges entre GPT et Claude sans exécution. Ricardo a expressément demandé des instructions exécutables et un retour unique, sauf blocage réel.

4. SUJETS RESTÉS OUVERTS

[INCERTAIN] Avril 2026 — La directive de réduction de cinq à trois publicités et de simplification du formulaire avait été validée, mais aucun rapport d'exécution ultérieur n'apparaît dans ce fil. Je ne sais pas si elle a été appliquée.

[INCERTAIN] Avril 2026 — L'objectif de CPL de 15 € et la surveillance après changement étaient discutés, sans mesure ultérieure suffisante dans ce fil pour confirmer l'amélioration.

[INCERTAIN] Mars 2026 — La création effective de la redirection /devis-travaux n'est pas démontrée ici. Je ne sais pas si le lien fonctionne aujourd'hui.

[SÛR] Mars 2026 — Une amélioration du PDF généré par le simulateur (mention d'estimation automatique, lisibilité et avertissement de caractère indicatif) a été expressément reportée à une phase site web. Je ne sais pas si elle a été reprise ailleurs.

[INCERTAIN] Mars 2026 — L'idée d'une IA conversationnelle répondant automatiquement aux clients avait été présentée comme phase suivante après la mise en place des canaux. Ce fil ne démontre pas son achèvement.

[INCERTAIN] Avril 2026 — Le diagnostic de cannibalisation budgétaire et l'intérêt d'un deuxième adset n'ont pas été validés par un protocole de test contrôlé dans les échanges visibles.

5. CONTRAINTES EXTÉRIEURES VÉCUES

[SÛR] Mars 2026 — La passerelle Android d'appels a été jugée non fiable en exploitation ; Twilio Voice a été conservé.

[SÛR] Mars 2026 — L'intégration SMSGate utilisée ne permettait pas de livrer le MMS avec image, malgré des traces d'acceptation de requêtes. La confirmation de livraison au destinataire doit être distinguée de la réponse API.

[SÛR] Avril 2026 — Meta Ads Manager et Graph API pouvaient présenter des états différents : un ensemble « ACTIVE » dans l'API pouvait être « Finalisé » en livraison à cause de son calendrier.

[SÛR] Avril 2026 — Les contraintes de catégorie spéciale HOUSING étaient explicitement prises en compte dans les campagnes de rénovation. Elles limitent les choix de ciblage disponibles ; les recommandations d'audience doivent les respecter.

[SÛR] Mars 2026 — L'ancienne solution d'envoi de SMS payante avait conduit à des consignes éditoriales trop courtes. Le changement de fournisseur a permis de réexaminer ces contraintes, mais ne prouve pas une absence totale de coûts ou de limites opérateur.

[INCERTAIN] Mars-avril 2026 — Les durées de déploiement Render annoncées autour de 90 secondes provenaient de rapports d'exécution, pas d'une garantie de la plateforme.

[INCERTAIN] Avril 2026 — Aucun élément conservé ne prouve l'existence d'une restriction invisible du compte Meta. L'incident de zéro impression a finalement eu une explication de calendrier.

FIN DE L'EXTRACTION — Les points incertains ne doivent pas être présentés comme décisions ou états de production confirmés.
