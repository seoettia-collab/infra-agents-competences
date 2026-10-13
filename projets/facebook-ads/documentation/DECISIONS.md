# DÉCISIONS — facebook-ads

Décisions engageantes et leur motif, pour ne pas les rejouer.

Format :
## D-XXX — titre
- Décision :
- Motif :
- Date / qui a tranché :
- Statut : en vigueur / amendée / annulée

---

## D-001 — Restructuration en quatre postes (gouvernance v2)
- Décision : passer de sept postes à quatre — Pilote (Claude), Codeur (GPT),
  Documentation (GPT), META (consultant). Retrait de `architecte-concept`,
  `auditeur`, `documentation-technique`, `ingenieur-developpeur`, `historique`,
  `gpt-pilote`.
- Motif : sept postes produisaient plus de messages que de travail livré, et la
  connaissance se dispersait entre les boîtes. La v2 concentre la connaissance
  sur un seul poste et confie l'exécution à des postes étroits.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-002 — Le Pilote ne code pas, le Codeur GPT pousse lui-même
- Décision : tout le code est écrit et poussé sur GitHub par le Codeur GPT.
  Le Pilote spécifie et contrôle, il n'écrit ni ne pousse de code.
- Motif : économiser l'usage côté Pilote et concentrer son temps sur la
  spécification et le contrôle.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-003 — Contrôle ciblé, pas systématique
- Décision : le Pilote relit uniquement ce qui touche la production, la
  sécurité ou les secrets. Le reste passe sans relecture. L'autorisation de
  merge et de déploiement reste au Gérant.
- Motif : le poste d'auditeur est retiré ; une relecture systématique
  consommerait trop pour le bénéfice attendu sur les changements courants.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-004 — Documentation écrite par GPT sous la dictée du Pilote
- Décision : le Pilote décide du contenu de la documentation ; le poste
  Documentation (GPT) l'écrit dans le dépôt. Il recopie, il ne reformule pas.
- Motif : garder un gardien de mémoire unique tout en déportant l'écriture.
  Un scribe qui réécrit avec ses mots ferait dériver la mémoire du projet.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-005 — META est un consultant, pas une source de données
- Décision : META conseille sur les pratiques Meta Ads. Il n'a aucun accès au
  compte publicitaire et n'exécute aucune action. Les données viennent du
  backend Mistral via la Graph API.
- Motif : l'appartenance de META à Meta ne lui confère aucun accès privilégié —
  établi par ARCH-002-R. Le supposer conduirait à lui demander ce qu'il ne peut
  pas fournir.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-006 — Réponse à l'écran réduite à l'état de la mission
- Décision : en fin de mission, tout poste répond à l'écran un bloc unique —
  `MISSION TERMINÉE — <RÉFÉRENCE>` ou `MISSION NON TERMINÉE — <RÉFÉRENCE>` —
  sans résumé, liste, commentaire ni hash. Le détail va dans le fichier de
  sortie du poste, dans le hub. S'applique à tous les postes, Claude comme GPT.
- Motif : l'écran du Gérant n'est pas un rapport. Un agent qui déverse son
  détail à l'écran fait relire deux fois la même chose et déplace la mémoire
  du projet hors de GitHub.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-007 — Structure de rapport figée pour tous les postes
- AMENDÉE le 11/10/2026 par D-013. Voir ci-dessous.
- Décision : tout rapport suit une structure fixe — en-tête de cinq lignes,
  puis sept points numérotés : pré-vol, fait, non fait, preuves, impact
  production, réserves, rollback. Un point vide s'écrit `néant`.
- Motif : un rapport est lu par un autre poste que celui qui l'écrit. Une
  structure variable oblige le lecteur à trier, et ce qu'on doit chercher
  finit par être oublié.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : amendée par D-013

## D-008 — Doctrine éditoriale des SMS envoyés aux leads
- Décision : les SMS automatiques suivent six règles — environ 75 % d'échange
  humain et 25 % de présentation du simulateur, placée en fin de message ;
  rédaction au nom de l'entreprise (« nous », jamais « je ») ; le simulateur
  est une option, pas un passage obligé ; pas de raccourcissement au détriment
  de la politesse et de la clarté ; l'IA rédige librement le corps, le système
  ajoute séparément le lien, la signature et la mention STOP ; les prompts
  restent souples, encadrés par l'intention et non par des phrases modèles.
- Motif : certains clients doivent pouvoir avancer par échange direct sans
  outil en ligne. Les prompts trop détaillés faisaient produire des messages
  stéréotypés. L'ancienne recherche d'économie de caractères venait d'un
  service payant abandonné depuis.
- Date / qui a tranché : mars 2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-009 — Réduire avant d'ajouter
- Décision : avant d'ajouter une publicité, réduire d'abord le nombre de
  publicités actives, et travailler à budget limité.
- Motif : éviter de multiplier les variantes et pouvoir attribuer un changement
  de performance à une action identifiable.
- Date / qui a tranché : avril 2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-010 — Une mission vise une exécution
- Décision : une mission doit viser un objectif concret et déboucher sur une
  exécution, pas sur une chaîne de diagnostics réciproques entre agents.
- Motif : les échanges répétitifs ont fait perdre du temps sans résoudre le
  problème.
- Date / qui a tranché : mars-avril 2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-011 — Clé d'API du dashboard : on n'y touche pas
- Décision : la clé d'API du dashboard reste en l'état, y compris sa présence
  en clair dans le dépôt frontend public. Aucune rotation, aucun changement de
  modèle d'authentification.
- Motif : les clés fonctionnent, le travail doit avancer sans arrêt à chaque
  question de secret. Le risque reste théorique tant que le dashboard n'a pas
  de trafic extérieur.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur
- Réserve du Pilote : le risque cesse d'être théorique le jour où des leads
  réels circulent. À rouvrir à ce moment-là, pas avant.

## D-012 — Rien ne se lance avant que la liste soit terminée
- Décision : la campagne ne redémarre pas tant que l'ensemble des tâches
  d'optimisation n'est pas terminé et que les quatre postes ne sont pas en
  place et éprouvés.
- Motif : éviter de relancer sur une base non consolidée.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-013 — Format de rapport définitif
- Décision : le format de rapport de D-007 est remplacé. Nouveau modèle, dans
  cet ordre : en-tête d'une ligne (référence, date, version) ; verdict d'une
  ligne OK / NON / ARRÊT avec sa raison ; tableau à cinq colonnes dont les
  numéros sont ceux de la mission ; défauts à corriger, du plus grave au moins
  grave ; non fait ; fichiers ; ligne de fin. Une idée par ligne, aucun
  paragraphe, une page au plus. Le détail va dans une annexe à côté du rapport.
- Motif : le format de D-007 n'était pas appliqué malgré trois rappels, tandis
  que ce modèle l'était spontanément et se lit mieux. Une règle non appliquée
  affaiblit toutes les autres.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-014 — Création du poste Diagnostic
- Décision : cinquième poste, tenu par GPT, préfixe DIAG. Il juge les
  redondances, incohérences et inutilités à partir des inventaires du hub.
  Il ne lit pas le code, ne propose aucune solution technique, ne décide rien.
- Motif : depuis la suppression de l'auditeur, personne ne regarde le projet
  avec un œil neuf. Le lui interdire de lire le code est volontaire : son
  regard doit porter sur la logique d'ensemble, pas sur l'implémentation.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-015 — Clé d'API du dashboard : décision maintenue
- Décision : la clé reste en l'état, y compris en clair dans le dépôt frontend
  public. Confirmée après l'audit du 11/10/2026.
- Motif : les clés fonctionnent, le travail doit avancer. Le risque reste
  théorique tant que le dashboard n'a pas de trafic extérieur.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur
- Réserve du Pilote : à rouvrir le jour où des leads réels circulent.

## D-016 — Pas de renommage des services Render sans domaine stable
- Décision : les services Render ne sont pas renommés. Reporté jusqu'à ce
  qu'un domaine personnalisé soit posé sur chacun.
- Motif : renommer change le sous-domaine onrender.com, et aucun des services
  n'a de domaine personnalisé. L'URL facebook-ads-backend-s20a.onrender.com
  est câblée dans le frontend et chez Meta.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-017 — Suppression de l'envoi automatique de SMS
- Décision : plus d'envoi automatique de SMS à la création d'un lead. Le
  bouton Auto-SMS et la variable AUTO_SMS_ENABLED sont retirés. La rédaction
  assistée, l'envoi manuel et le Rédacteur IA restent en place.
- Motif : les destinataires repèrent les réponses automatiques, et c'est
  contre-productif en rénovation.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur — mise en œuvre en cours (CODE-023)

## D-018 — Webhook SMS entrant signé
- Décision : le webhook SMS exige une signature. Le même token figure dans la
  Signing Key de SMSGate sur le téléphone et dans SMS_GATEWAY_TOKEN du service
  de production. Sans token configuré, le webhook doit refuser.
- Motif : la validation acceptait toute requête en l'absence de token.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur — le refus par défaut reste à implémenter (CODE-023)
- À savoir : après une réinstallation de l'application ou un changement de
  téléphone, remettre le token côté téléphone, sinon les SMS entrants
  s'arrêtent sans message d'erreur.

## D-019 — Le poste Diagnostic peut lire le code
- Décision : la règle interdisant au poste Diagnostic de lire le code des
  dépôts est levée. Il lit en lecture seule, sans jamais rien modifier ni
  pousser, et continue de ne proposer aucune solution technique.
- Motif : DIAG-002 a montré la limite — les formules de calcul sont dans le
  code et ne figurent dans aucun inventaire. Un diagnostic qui ne peut pas
  voir les calculs ne peut pas les juger, et fait perdre du temps.
- Date / qui a tranché : 13/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-020 — Relance en gros œuvre, Advantage+ complet
- Décision : la campagne est repositionnée sur le gros œuvre — construction,
  extension, surélévation. Deux publicités seulement. Advantage+ complet :
  Meta pilote le ciblage, les placements et la répartition du budget.
- Motif : à 32 €/jour, deux campagnes ou six publicités ne sortiraient jamais
  de la phase d'apprentissage. L'automatisation fait mieux qu'un ciblage
  manuel à ce budget.
- Date / qui a tranché : 12/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-021 — Répartition des rôles avec Meta
- Décision : Meta pilote Facebook. META conseille le dashboard. Le Gérant
  valide. Le budget, l'optimisation et les publicités se décident dans le
  dashboard.
- Motif : garder la décision à l'intérieur de l'outil plutôt que de la
  déléguer à un conseil extérieur sans accès au compte.
- Date / qui a tranché : 12/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-022 — L'IA Reco n'analyse que les publicités en diffusion
- Décision : les publicités en pause sont exclues du contexte envoyé à l'IA,
  avant ou après 72 heures, sans exception. L'IA peut recommander de pauser
  une publicité ; elle ne commente pas celles qui le sont déjà.
- Motif : une publicité en pause n'est pas le sujet de l'analyse, et les
  données périmées produisent de mauvaises recommandations.
- Date / qui a tranché : 13/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-023 — Recommandations courtes, détail à la demande
- Décision : une recommandation du Copilote tient en une ligne. Le détail
  technique n'apparaît que si le Gérant demande à le voir.
- Motif : les recommandations doivent s'appliquer, pas se lire. Le détail
  fait perdre du temps à chaque consultation.
- Date / qui a tranché : 13/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-024 — Livraison continue, rien en attente
- Décision : toute amélioration ou mission prête et testée est fusionnée sur
  `main` et déployée sans attendre. L'autorisation de déploiement reste du
  Gérant, mais elle est donnée au fil de l'eau, pas par lots.
- Motif : accumuler des branches prêtes crée un gros chantier de fusion plus
  tard et fait vivre le projet avec du travail fait mais inutilisé.
- Date / qui a tranché : 13/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-025 — Les maquettes sont produites par le Codeur
- Décision : le Pilote ne produit aucune maquette, aucun HTML, aucun CSS, même
  à titre d'illustration pour validation. Il décrit ce qu'il veut, le Codeur
  maquette, le Pilote contrôle et le Gérant valide.
- Motif : le Pilote avait produit lui-même une maquette de l'IA Reco en
  arguant qu'une maquette n'est pas du code de production. La règle « le
  Pilote ne code pas » ne fait pas cette distinction, et le Gérant a tranché
  qu'elle ne doit pas la faire.
- Date / qui a tranché : 13/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-026 — Mention « Image générée par IA » sur toute créa publicitaire
- Décision : toute image publicitaire générée porte, en bas à droite, en petit
  et discret : « Image générée par IA — à titre indicatif ». Sans exception,
  sur toutes les créas, présentes et futures.
- Motif : honnêteté envers le prospect, et protection de l'entreprise. Une
  image montrant une transformation que le prospect prendrait pour une photo
  de chantier réel expose à une contestation.
- Date / qui a tranché : 13/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur
- À faire : les créas déjà en ligne au 13/10/2026 ne la portent pas encore.
