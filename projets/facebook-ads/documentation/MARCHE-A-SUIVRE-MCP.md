DIAG-005 | 2026-10-13 | v1.0
# Brancher Meta Ads MCP dans ChatGPT

Pré-vol [SÛR] : hub main, HEAD db0a95c07a4af54597d3644ddec0bc82aa161c2e.
Guide documentaire ; aucun branchement réalisé.
Libellés anglais conservés pour identifier les boutons.

**Choix A/B dès le départ : [SÛR] aucun test immédiat d’éligibilité A/B n’est documenté ; essayer A sans identifiant personnel, passer à B si un identifiant d’application est exigé, arrêter si Meta refuse l’accès au compte.**

## Chemin A — sans application Meta personnelle

1. **ChatGPT web — https://chatgpt.com/plugins** → cliquer **+**, puis **Add custom MCP server**.
   **Résultat attendu :** formulaire de création du connecteur.
   **Si le bouton manque :** voir les blocages ; ne pas créer d’application Meta pour résoudre une restriction ChatGPT.

2. **Formulaire — nom et Connection** → saisir le nom `Mistral Pro Reno — Meta Ads` ; dans **Server URL**, coller `https://mcp.facebook.com/ads`.
   **Résultat attendu :** nom et adresse affichés ; ne pas ajouter `/mcp` à l’adresse Meta.

3. **Formulaire — Authentication** → sélectionner **OAuth** ; ne pas renseigner un App ID personnel.
   **Résultat attendu :** OAuth sélectionné.
   **[À VÉRIFIER]** Meta confirme le parcours sans application, mais ne décrit ni son identifiant client partagé ni son enregistrement automatique spécifique à ChatGPT.
   **Si un identifiant est obligatoire ou si l’enregistrement OAuth échoue :** passer au chemin B ; ne pas inventer un identifiant client.

4. **Formulaire — avertissement** → sélectionner **I understand and want to continue**, puis **Create as a plugin**.
   **Résultat attendu :** fiche du connecteur et outils découverts.
   **[À VÉRIFIER]** si l’authentification Meta est demandée à ce stade, effectuer l’étape 6 ; sinon continuer à l’étape 5.

5. **ChatGPT — fiche du plugin créé** → installer le plugin ; ouvrir une nouvelle conversation, taper **@**, sélectionner le plugin.
   **Résultat attendu :** plugin sélectionné dans le message.
   **[SÛR]** l’installation est requise par OpenAI ; le libellé exact de son bouton n’est pas indiqué dans les pages consultées.
   Saisir : `Liste uniquement mes comptes publicitaires accessibles ; ne crée et ne modifie rien.`
   **Résultat attendu :** demande d’authentification si elle n’a pas déjà eu lieu.

6. **Fenêtre Meta — Facebook Login for Business** → se connecter avec le compte Facebook ou Meta Managed Account qui a accès aux actifs Mistral Pro Reno ; contrôler les sept autorisations ci-dessous et les actifs proposés ; approuver les permissions demandées.
   **Résultat attendu :** retour dans ChatGPT, puis liste des comptes accessibles.
   **[SÛR]** Meta documente l’identification et le consentement, mais pas tous les libellés de boutons de cette fenêtre.
   **Si Meta déclare le compte non éligible :** arrêter ; B n’est pas documenté comme contournement.

7. **Fin du chemin A** → conserver le connecteur et le compte correct.
   **Résultat attendu :** compte Mistral Pro Reno reconnu ; aucun App ID personnel, aucune redirection à déclarer dans une application personnelle.

## Chemin B — avec application Meta

1. **Meta for Developers — https://developers.facebook.com/apps** → ouvrir une application compatible existante ; sinon aller directement à **https://developers.facebook.com/apps/creation/**.
   **Résultat attendu :** tableau de bord existant ou écran **App details**.
   **Si Meta demande l’inscription développeur :** arrêter ce parcours jusqu’à son achèvement ; les écrans d’inscription ne sont pas décrits dans la documentation MCP.

2. **Création — App details** → saisir `Mistral Pro Reno Ads MCP` et l’adresse électronique de contact du Gérant ; cliquer **Next**.
   **Résultat attendu :** écran **Use cases**.

3. **Use cases** → sélectionner exactement **Create & manage ads with ads MCP server**, puis **Next**.
   **Résultat attendu :** cas d’usage sélectionné et écran **Business**.
   **Si application existante :** ajouter ce même cas d’usage ; Meta ne documente pas le libellé exact du bouton d’ajout spécifique au MCP.
   **Si le cas manque ou est grisé :** voir les blocages ; ne pas le remplacer par un autre.

4. **Business** → sélectionner le portefeuille Mistral Pro Reno proposé ; cliquer **Next**.
   **Résultat attendu :** écran **Requirements**.
   Si aucun portefeuille n’est à associer à ce stade, Meta propose **I don't want to connect a business portfolio yet** ; cette option ne garantit pas l’accès ultérieur aux actifs.

5. **Requirements**, puis **Overview** → lire les exigences affichées ; cliquer **Next** ; vérifier nom, cas d’usage et entreprise ; cliquer **Go to dashboard**.
   **Résultat attendu :** tableau de bord de l’application créée.
   **Si une exigence bloque :** relever son intitulé ; ne pas supposer qu’App Review ou la vérification d’entreprise est toujours obligatoire pour ses propres actifs.

6. **Application Meta — Basic settings** → copier la valeur **App ID** ; conserver uniquement cet identifiant pour l’étape 8.
   **Résultat attendu :** identifiant numérique relevé.
   **[SÛR]** l’App ID figure dans le tableau de bord et les paramètres de base ; le chemin de menus traduit peut varier.

7. **ChatGPT web — https://chatgpt.com/plugins** → cliquer **+** → **Add custom MCP server** ; saisir le nom du connecteur et **Server URL** = `https://mcp.facebook.com/ads` ; sélectionner **OAuth**.
   **Résultat attendu :** paramètres OAuth disponibles.

8. **ChatGPT — Advanced OAuth Settings** → coller l’**App ID** Meta dans **OAuth Client ID**.
   **Résultat attendu :** identifiant numérique identique à celui de l’étape 6.
   **[SÛR]** le guide MCP Meta demande cet identifiant, sans demander d’App Secret pour ChatGPT.
   **Si un secret devient obligatoire :** arrêter et relever ce blocage ; aucune valeur de secret n’est prescrite par ce guide.

9. **ChatGPT — fiche de gestion du serveur MCP** → copier l’URL de redirection de production qui y est affichée.
   **Résultat attendu :** URL réelle copiée, propre à cette connexion.
   **[SÛR]** formes possibles : `https://chatgpt.com/connector_platform_oauth_redirect` ou `https://chatgpt.com/connector/oauth/{callback_id}`.
   Ne jamais coller littéralement `{callback_id}` ; ne jamais choisir arbitrairement entre ces deux formes.
   **[À VÉRIFIER]** OpenAI indique la fiche de gestion comme emplacement, mais ne décrit pas le bouton de copie ni comment obtenir cette fiche si la création exige déjà une authentification réussie.
   Si nécessaire, terminer la création avec **I understand and want to continue** → **Create as a plugin**, puis ouvrir la fiche ; si elle reste inaccessible, arrêter et relever le blocage, sans fabriquer la redirection.

10. **Application Meta — Facebook Login for Business → Settings** → dans **Client OAuth Settings**, coller l’URL copiée dans **Valid OAuth redirect URIs** ; enregistrer avec le contrôle de sauvegarde affiché.
    **Résultat attendu :** URL conservée à l’identique dans la liste.
    **[SÛR]** Meta documente les paramètres Facebook Login for Business et le champ de redirection OAuth ; le guide MCP ne décrit pas les clics d’accès propres à son nouveau cas d’usage.
    **Si menu ou champ absent :** arrêter et relever l’écran ; ne pas créer de configuration supplémentaire au hasard.

11. **ChatGPT — connecteur créé** → reprendre les étapes A5 et A6 pour l’installation et le consentement Meta.
    **Résultat attendu :** retour dans ChatGPT et liste des comptes accessibles.
    Aucun token à générer, copier ou saisir manuellement.

## Mode développeur ChatGPT

[SÛR] Le lien « developer-mode » fourni par Meta renvoie actuellement 404.
[SÛR] Les pages OpenAI actuelles prescrivent **Plugins → + → Add custom MCP server** ; elles ne demandent plus explicitement un interrupteur « Developer mode » dans ce parcours.
[À VÉRIFIER] Si votre interface affiche encore un préalable « Developer mode », son chemin exact n’est pas établi par ces pages actuelles : relever l’écran et faire vérifier l’accès par l’administrateur, sans appliquer un ancien menu supposé.
Résultat à obtenir : formulaire d’ajout du serveur MCP accessible.

## Les sept autorisations — noms exacts et droits

Liste documentée par Meta dans le parcours token ; vérifier le consentement OAuth effectivement affiché.

| Autorisation | À quoi elle sert | Écriture |
|---|---|---|
| `ads_mcp_management` | Utiliser le serveur MCP pour gérer les publicités et actifs autorisés. | **ÉCRITURE**, avec les autres droits nécessaires. |
| `ads_read` | Lire les résultats publicitaires ; peut aussi autoriser l’envoi d’événements serveur sous prérequis. | **ÉCRITURE de mesure possible** ; ne modifie pas les publicités. |
| `ads_management` | Lire, créer et modifier les publicités, leurs paramètres et budgets. | **ÉCRITURE sur les publicités**. |
| `catalog_management` | Créer, modifier et supprimer les catalogues et leurs produits. | **ÉCRITURE sur les catalogues**. |
| `business_management` | Lire et gérer les actifs de l’entreprise via les fonctions Business Manager autorisées. | **ÉCRITURE sur les actifs d’entreprise**. |
| `pages_show_list` | Voir la liste des Pages gérées. | Lecture ; pas de publication accordée par ce seul droit. |
| `instagram_basic` | Lire le profil et les médias des comptes Instagram professionnels. | Lecture ; pas de publication accordée par ce seul droit. |

## Blocages — réponse à appliquer

| Blocage visible | Action | Résultat attendu / arrêt |
|---|---|---|
| Compte Meta non éligible / accès indisponible | Relever le message exact et le compte concerné ; arrêter et transmettre au Pilote pour contrôle de disponibilité auprès de Meta. | Aucun contournement documenté par création d’application. |
| **Ads MCP server** absent dans Meta Business Suite → **Settings → Integrations** | Signaler l’absence. | Meta dit que la fonction de règles n’est pas encore disponible ; cela ne suffit pas à prouver que le branchement OAuth A est impossible. |
| Cas d’usage MCP absent dans une application existante | Revenir au parcours de création B1 et vérifier la liste des cas d’usage ; seuls les cas compatibles apparaissent dans une app existante. | Si absent même en nouvelle création : arrêt ; aucune procédure de déblocage MCP documentée. |
| Consentement refusé par l’utilisateur | Reprendre le consentement si ChatGPT le propose et accorder les permissions nécessaires. | Si la permission refusée ne réapparaît pas : arrêt ; la relance d’une permission refusée doit être gérée par le connecteur, pas par un token manuel. |
| Permission ou actif refusé malgré consentement | Vérifier le compte de connexion et ses droits sur l’actif ; faire contrôler les exigences affichées de l’application et, si présents, les blocages de règles Meta. | Consentement seul ne donne pas un accès absent ; arrêter si le refus persiste. |
| Redirection rejetée | Recopier l’URL actuelle depuis la fiche ChatGPT ; rouvrir Meta **Facebook Login for Business → Settings → Valid OAuth redirect URIs**, remplacer l’entrée erronée et enregistrer ; reprendre OAuth. | Correspondance exacte, sans espace, variante de domaine, barre finale ajoutée ou identifiant de callback fictif. |
| **Add custom MCP server** absent ou création interdite | Faire vérifier par l’administrateur les droits du workspace et les restrictions ChatGPT. | Formulaire accessible ; créer une app Meta ne corrige pas ces restrictions. |

## Traçabilité — réservée au Pilote, aucune lecture demandée au Gérant

Sources officielles consultées le 2026-10-13 ; aucun écran authentifié inspecté.
Meta : aide Business « Manage ads from an AI agent with Meta ads AI connectors », article 1456422242197840.
Meta Developers : « Get started » Ads MCP server ; « Create an App with Meta » ; « Basic Settings » ; « Facebook Login for Business » ; « Manually Build a Login Flow » ; « Permissions ».
OpenAI Developers : « Add custom MCP server » (`/api/docs/guides/custom-mcp-server`) ; « Connect and test your plugin » (`/plugins/deploy/connect-chatgpt`) ; « Authentication » (`/plugins/build/auth`).
Écart documentaire [SÛR] : le guide Meta renvoie aussi aux redirections de GPT Actions ; celles-ci ne remplacent pas la redirection MCP effective affichée par ChatGPT.
Limites [À VÉRIFIER] : éligibilité personnelle, parcours sans App ID, anciens écrans développeur, ordre de disponibilité de la redirection, libellés Meta spécifiques au cas MCP.
