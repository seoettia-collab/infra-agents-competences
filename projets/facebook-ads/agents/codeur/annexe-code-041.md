# CODE-041 — villes, Messenger et navigation

## Pré-vol et livraison

Hub : git fetch origin puis nouveau worktree détaché et reset --hard origin/main ; HEAD 69d8759558662c15b58cc268ce73236d1bf568f9, branche isolée code-041-rapport. Fiche et gouvernance relues. Frontend main distant de départ 88030b961537a120b46f1717dce9ed6c56c83489, arbre 3751b4e43f992c5c33741bebb92130cf326c1a86 ; base locale équivalente f28466e. Backend main bbeffdda3460c8e346b14a4a875a1b4a247955f5 inchangé.

Frontend : branche code-041, commit local initial 9461bd5, commit distant bf4fe77c4ab147c761a73c84fed27da1f66d1c65 ; compléments de tests c0818eb / e2c74ebe52b995e1dae43bee3acdc9aea99ce9e6. Arbre final ba33fb6a127542638d7dd652d612e1b6bbf4e741. Add/commit, nouvelle lecture du main distant inchangé, rebase sur la base locale équivalente puis publication par connecteur avec expected_sha ; arbres locaux et distants identiques. Main et code-041 publiés, Netlify livre les fichiers applicatifs testés.

Fichiers : index.html, js/navigation.js, js/conversions.js, js/postal-cities.js, data/POSTAL_CITIES.md, scripts/build-postal-cities.py et tests/code-041-leads-navigation.test.js. Aucun changement backend, IA Reco, Studio Pub ou garde-fou. Aucun accès au service SaaS.

## A — source et affichage

Producteur : La Poste — Service National de l’Adresse. Jeu officiel « Base officielle des codes postaux » publié sur data.gouv.fr : https://www.data.gouv.fr/datasets/base-officielle-des-codes-postaux ; portail producteur https://data.laposte.fr/datasets/laposte-hexasmal ; export https://data.laposte.fr/data-fair/api/v1/datasets/laposte-hexasmal/raw . Licence Ouverte / Open Licence 2.0. Téléchargement du 14/10/2026, SHA-256 brut f921ac020ca3b9efebd8f0d01782555fb70d63d1ae36535109c67e4a74bd6e22 ; 39 192 lignes ISO-8859-1, séparateur point-virgule. Sources, licence et commande de reproduction conservées dans data/POSTAL_CITIES.md. Le téléchargement public a été lu sans dépendre du rendu du portail.

Le générateur conserve les associations Code_postal / Nom_de_la_commune, déduplique les communes et retient jusqu’aux trois premières par ordre alphabétique. 6 328 codes, fichier JS de 261 595 octets ; affichage des communes possibles, aucune commune unique déduite arbitrairement. Exemple officiel : 78450 — Chavenay / Villepreux. La casse est adaptée à la lecture, sans inventer d’orthographe ou d’association. Code absent, inconnu ou non composé exactement de cinq chiffres : valeur inchangée, zéro initial conservé. Les champs usuels code_postal, Code Postal, cp, zip_code et postal_code sont reconnus.

La table est livrée depuis le même site avant conversions.js. La consultation de ville ne fait aucun appel extérieur. L’enrichissement intervient uniquement lors du rendu « Projet & demande », après quoi le texte est échappé comme auparavant ; aucune mutation de raw_fields, aucune écriture de ville dans le lead. En production, une ligne de code postal enrichie est constatée dans chacune des deux fiches contrôlées. Seuls ces nombres sont conservés dans les preuves.

## B — bouton fondé sur le rattachement existant

Le rendu ne pose plus un bouton systématique. Un emplacement initialement vide vérifie GET /api/facebook/leads/:id/conversation, déjà utilisé par le produit ; seule une réponse HTTP réussie, success=true et un conversation_id non vide autorise le bouton. Aucun nouvel algorithme de rapprochement : ni nom, ni téléphone, ni préfixe de lead ne servent à inventer un lien dans le frontend. Le lien externe Messenger Business des anciens leads msg_ est lui aussi conditionné au rattachement vérifié.

Les vérifications simultanées d’une même fiche partagent une requête en cours. Une réponse tardive ne peut pas poser le bouton sur une autre fiche : identité du nœud et data-lead-id revérifiés avant mise à jour. Une erreur réseau ou 404 laisse l’emplacement vide. Les éléments du panneau, brouillons et champs ne sont pas rerendus en bloc à l’arrivée de la réponse. L’action existante garde son ouverture de modale ; si le résolveur fournit une conversation sans PSID exposé, son conversation_id confirmé permet l’ouverture, au lieu du faux avertissement précédent. L’envoi conserve sa propre résolution backend existante.

Contrôle réel agrégé : 3 leads de formulaire ; 1 lien retourné par le résolveur existant, 2 réponses 404. Dans la fiche liée : 1 bouton, modale ouverte puis refermée sans saisie ni envoi. Dans une fiche non liée : 0 bouton après réponse, ville toujours affichée. L’API de rapprochement et les données associées ne sont pas modifiées. Les noms, coordonnées et identifiants de leads/conversations ne sont pas recopiés.

## C — cause reproduite et corrigée

Chaque bouton de navigation avait deux chemins : un onclick inline appelait switchToView, qui appelait tab.click(), tandis que l’écouteur de navigation traitait les deux événements. Le clic humain produisait donc un second clic synthétique : deux appels de loadViewData. Il ne s’agissait pas de deux copies des scripts ni de deux déclarations d’init.

Suppression des sept onclick inline de la barre latérale ; conservation du gestionnaire commun et de switchToView pour les autres liens programmatiques. initNavigation est rendu idempotent par nœud, afin qu’un second appel n’attache pas un second écouteur. Les moteurs IA et les actions métiers ne sont pas modifiés.

Preuve avant, sur la version publique précédente : 1 clic Conversions → 2 journaux Init onglet ; 1 clic Gestion Ads → 2 journaux Initialisation Gestion Ads. Preuve après, sur une session neuve : démarrage 1 ; premier clic Conversions 1 ; Gestion Ads 1, stratégie 1 ; IA Reco 1 restauration Copilot ; initialisation Cockpit 1 chargement période précédente et intraday, puis un clic Cockpit ajoute exactement 1 de chaque. Un second clic volontaire Conversions pour vérifier les fiches porte le total à 2 initialisations pour 2 clics, sans doublon. Zéro erreur Uncaught, SyntaxError ou ReferenceError. Les comptages et le nombre de clics sont explicités dans verification-navigateur.json ; aucun journal brut contenant des données personnelles conservé.

## Validation et limites

50 tests frontend réussis sous Node 20.11.1, glob explicite node --test tests/*.test.js. node --check sur les quatre JS modifiés, diff --check réussi. Cas nouveaux : table connue/inconnue/absente, zéro initial, affichage sans mutation ; absence de bouton après 404 ou panne, requête partagée, réponse périmée, bouton confirmé et ouverture de modale sans envoi ; navigation humaine/programmatique avec un seul écouteur même après deux initNavigation. Suites précédentes conservées.

Les trois JS applicatifs servis sont identiques aux fichiers testés par SHA-256. L’index servi présente une seule transformation par rapport au fichier source : le lien Corbeille devient /leads-deleted et sa sérialisation d’attributs change ; les sept suppressions de onclick et le script postal sont vérifiés dans le DOM. Aucun changement de ce lien dans notre source ; écart consigné séparément, sans modifier un élément hors périmètre.

Aucun test ne crée, reclasse ou supprime de lead réel. Aucun envoi Messenger/SMS/email, aucune écriture Meta Ads ou activation CAPI. Les preuves sont des nombres, des métadonnées techniques et des données postales publiques. Le canal Messenger et les protections HOUSING, réduction et 72 heures sont préservés.
