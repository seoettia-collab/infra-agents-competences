# CODE-046 — Maquette du formulaire backend

25 octobre 2026 — Maquette seule, soumise à validation conformément à D-025.

## Livrable

Ouvrir `projets/facebook-ads/documentation/maquettes/code-046-formulaire.html` dans un navigateur. Le document est autonome : HTML, CSS, logique de démonstration et instantané de contexte métier embarqués, sans police distante ni ressource à télécharger. La barre « MAQUETTE — Aucun envoi réel » reste visible. Le formulaire simule une confirmation sans enregistrement, appel HTTP, SMS ou conversion.

Pré-vol du hub : c29874a8728a1d01c0fb14032f28140e4bd36a33. Mission corrigée relue après fetch/reset ; travail sur une branche isolée code-046. Aucun fichier des dépôts applicatifs ou du site n’est modifié par cette mission.

## Contenu strict

- Trois champs d’identité : Nom, Téléphone, Adresse ou code postal.
- Exactement six cases, dans cet ordre : **Cuisine · Salle de bain · Peinture · Rénovation · Extension · Maison**.
- Tous les choix peuvent être cochés ensemble ; aucun septième choix, aucun « Autres » ajouté.
- Un champ libre facultatif pour toutes les précisions ou les travaux non couverts.
- Aucun email, budget, photo, date de chantier ou questionnaire supplémentaire.

La grille des travaux comporte deux colonnes. Les contrôles font au moins 48 px de haut, les champs utilisent une police de 16 px et le document possède un viewport mobile. Sous 760 px, introduction et formulaire s’empilent. Les couleurs reprennent les tokens du Dashboard actuel : fond #0b0c10, carte #14151b, accent #6e7bff, orange #f5b041. Le texte sombre du bouton sur fond violet donne un contraste calculé de 5,53:1.

## Démonstration fonctionnelle

Choisir plusieurs travaux et remplir les champs permet d’afficher la confirmation. Elle reprend **tous** les travaux cochés, le délai de rappel présenté pour validation et le téléphone de l’entreprise. « Revoir ma demande » ramène au formulaire en conservant les saisies et les cases. Une absence de choix ou un téléphone de format incorrect donne une erreur locale. Le message de confirmation indique expressément qu’aucune demande n’a été enregistrée dans cette démonstration.

Le numéro n’est pas écrit dans la logique JavaScript : celle-ci lit le bloc de données `business-context`. Ce bloc a été généré à partir du contexte enregistré dans `facebook-ads-backend/config/business-context.json`, blob Git 51f0cf797cc6eb2a71a840ce86dd0db40a0dcf61. Il est embarqué pour l’autonomie de la maquette ; il ne se met pas à jour tout seul. La future page backend devra injecter le contexte métier au rendu, sans recopier le numéro dans son code.

Le délai affiché est « sous 48 heures », soumis à validation de ce texte par le Gérant avant construction. Aucun engagement réel n’est créé par la maquette.

## Provenance

La démonstration lit les mêmes paramètres que le socle CODE-045 : UTM source, medium, campaign, content, ainsi que les identifiants déclarés campagne/groupe/annonce. Valeurs bornées à 150 caractères, conservées uniquement en mémoire de page. Le classement reproduit la distinction de CODE-045 : ChatGPT Ads déclaré lorsque source et medium payant correspondent ; autre origine déclarée ; visite directe ou origine inconnue. Il apparaît dans les notes de validation, sans ajouter de champ au prospect.

Exemple pour vérifier la démonstration après ouverture : ajouter `?utm_source=chatgpt&utm_medium=paid&utm_campaign=controle` au chemin du fichier. Cela ne contacte aucun service publicitaire. Aucun pixel, CAPI, événement analytique ou appel OpenAI.

## Crédibilité et justificatif décennal

Nom de l’entreprise, activité, zone et téléphone sont issus du contexte métier. Aucun argument commercial, label ou certification inventé. Un emplacement explicitement provisoire est réservé à l’attestation décennale : aucun assureur, numéro de contrat ou lien de justificatif non vérifié n’est affiché. Le document devra être fourni et contrôlé avant publication de la vraie page. Ce manque ne doit pas être masqué par une promesse de couverture.

## Choix concernant l’alerte SMS

L’alerte est abandonnée par décision du Gérant et ne figure pas dans le parcours maquetté. **Option retenue pour la construction : conserver les tables d’historique CODE-045, mais rendre inactifs la création et le traitement des alertes.** Aucun destinataire ne doit être demandé pour cette page.

Cette mission ne modifie ni le worker ni la configuration de production : le lot courant impose maquette d’abord et aucun déploiement. La désactivation applicative effective devra faire partie de la construction autorisée après validation ; elle n’est pas présentée comme déjà livrée.

## Construction ultérieure — non exécutée

Après validation du Pilote puis du Gérant : servir la page depuis le backend et réutiliser la transaction de réception CODE-045 ; élargir sa validation aux six libellés exacts et à l’adresse ou code postal ; conserver tous les travaux, la précision et la provenance dans Conversions ; injecter le contexte métier ; supprimer tout déclenchement SMS pour ces demandes. Le récepteur actuel accepte encore les cinq anciens libellés et un code postal strict : la maquette n’est donc pas branchée sur lui et n’annonce pas une compatibilité déjà livrée.

La limite de déduplication multicanale de CODE-045 reste connue et acceptée ; aucune fusion supplémentaire n’est maquettée ni réalisée. Aucun changement du site MistralPro-Reno ou de sa PR, aucun déploiement, aucune modification Meta ou SaaS, aucune écriture de prospect réelle.

## Vérifications

Sous Node 20.11.1 : syntaxe du script extrait validée ; contrôles statiques du HTML validant les six cases exactes, les trois champs d’identité, l’absence d’email, de transport réseau et de stockage ; simulation DOM des erreurs, des six sélections simultanées, de la confirmation, du retour avec saisies intactes, du téléphone chargé depuis le contexte et des trois cas de provenance. `git diff --check` valide.

Contrôle visuel dans un navigateur non réalisé pendant ce lot. Les dimensions mobiles et les styles ont été contrôlés dans le code ; aucune capture ni recette visuelle inexistante n’est annoncée. La validation visuelle de la maquette reste précisément l’étape demandée au Pilote et au Gérant.
