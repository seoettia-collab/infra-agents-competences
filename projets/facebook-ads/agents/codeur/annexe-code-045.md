# CODE-045 — Réception site dans Conversions

25 octobre 2026. Livraison du code autorisée côté Dashboard seulement. Site inchangé.

## État de livraison et réserves

Le récepteur et l’interface sont livrés. Le parcours complet n’est pas opérationnel : l’alerte interne n’a pas de configuration valide et le site attend un ordre de raccordement. La déduplication multicanale générale reste incomplète, comme explicitement permis de le signaler dans la mission plutôt que de prétendre à une fusion fiable.

La lecture de la PR nº 1 confirme son état ouvert/non fusionné et son HEAD e3a667f04a2694635b4c9c452d7d3014c1c96db4. Aucun fichier du site n’est modifié, aucune fusion demandée. n8n reste exclu : son URL doit être remplacée dans une mission ultérieure du site.

## 1. Persistance avant SMS

Nouveau `POST /public/lead-requests` sans clé administrative, limité au dépôt de demande. Le routeur est monté avant le CORS et le parseur administratifs. Deux origines HTTPS du site autorisées, JSON de 16 Ko maximum, quota de 10 POST/minute par IP vue par Express, contrôle de maintenance et validation serveur. CORS n’authentifie pas un expéditeur ; le récepteur ne permet ni lecture de prospect ni choix de destinataire SMS. Le quota peut être partagé derrière le proxy ; pas de CAPTCHA ni de service tiers ajouté.

Champs conservés : prénom, téléphone français normalisé, code postal IDF, tous les travaux choisis et précision intégrale dans les limites du formulaire. La chaîne de travaux de l’ancienne PR est acceptée, ainsi qu’un tableau. La précision facultative reste bornée à 1 500 caractères.

`services/site-leads.js::receive` enregistre dans une transaction SQLite : fiche prospect si nécessaire, demande dans `site_lead_requests`, alerte dans `site_lead_alerts`. Le reçu est retourné seulement après commit. Une panne de stockage annule la transaction, sans succès ni SMS. Aucun fournisseur SMS n’est appelé par la route HTTP.

Un UUID v4 stable identifie la soumission. Le même UUID et le même contenu normalisé donnent le même reçu, sans nouvelle fiche ni alerte, y compris après réouverture de la base. Un contenu différent sous la même clé donne HTTP 409. Le navigateur doit conserver cette clé pour les reprises et vérifier `success`, `stored` et `receipt` après HTTP 200. Un échec SMS ultérieur ne transforme jamais ce succès de stockage en échec de formulaire.

## 2. Alerte gérant distincte du prospect

La file interne ne passe pas par `POST /api/comms/sms` et n’insère aucune ligne de contact client dans `outbound_calls`. Elle ne force pas le statut « contacté ». La fiche et ses compteurs clients sont inchangés par l’alerte.

Le worker tourne toutes les 15 secondes. Destinataire : `GERANT_ALERT_PHONE_E164`, ou configuration agent existante `AGENT_PHONE_NUMBER`. Aucun numéro ajouté en dur. La passerelle doit être configurée ; le destinataire doit être valide et différent de la SIM d’envoi. Une configuration invalide donne `blocked_configuration`, visible dans la fiche, sans perdre la demande.

États conservés : pending, blocked_configuration, sending, accepted, failed et unknown. Le worker revendique une alerte avant l’appel ; une alerte acceptée n’est pas réémise. Le résultat `accepted` confirme uniquement l’acceptation fournisseur, jamais la remise. Un timeout ou une interruption pendant l’envoi reste ambigu et n’est pas réessayé aveuglément ; aucun secours Twilio automatique. Un refus explicite reste failed. Pas de bouton de renvoi manuel dans ce lot.

L’option `maxRetries: 0` est respectée par SMSGate grâce au remplacement de `||` par `??` ; le comportement par défaut des appels existants reste inchangé. Le worker interne n’utilise pas les anciennes reprises opaques.

**Constat production :** le diagnostic authentifié retourne CODE-045 et `alert_configured: false`, alors que la santé annonce SMSGate configuré. La configuration de l’alerte interne n’est donc pas valide. Aucun destinataire n’a été inventé ni modifié pour contourner ce manque ; aucun SMS réel de recette n’a été envoyé. Le Gérant/Pilote doit faire configurer son destinataire validé, distinct de la SIM, puis ordonner une recette réelle. Aucun numéro ni secret n’est reproduit ici.

Tous les chemins d’auto-SMS prospect (programmation, prise de contact et relance) ignorent les fiches associées à une demande site, y compris une demande liée à une fiche Facebook existante. Les contacts manuels existants restent disponibles.

## 3. Provenance et protection des chiffres Facebook

Chaque demande conserve son acquisition et ses paramètres, indépendamment des autres demandes du même contact. UTM source/medium/campaign/content et identifiants déclarés campagne/groupe/annonce acceptés et bornés. Aucun appel OpenAI et aucun suivi pixel/CAPI.

La combinaison source chatgpt/openai/chatgpt_ads et medium paid/cpc/paid_social/ads est affichée « ChatGPT Ads (déclaré) ». Sans marque : « Site — direct ou origine inconnue ». Une marque autre ou non payante n’est pas transformée en attribution ChatGPT Ads certaine. Les UTM sont modifiables par un visiteur : ils ne constituent pas une preuve d’attribution publicitaire.

Conversions reçoit `site_requests` pour les fiches actives et archivées. Une synthèse de provenance apparaît sur la ligne et toutes les demandes restent détaillées dans la fiche : date, CP, choix multiples, précision, campagne déclarée, état d’alerte et éventuel rapprochement à examiner. Un filtre permet de voir demandes site, ChatGPT déclaré, site direct/inconnu et formulaires Facebook. Aucun nouveau CRM.

Les fiches créées par ce récepteur ont un identifiant site_ ; elles ne participent plus au calcul du maximum de date pour la synchronisation Facebook, au complément de compteur local des Insights Facebook ni à la synthèse CRM publicitaire. Les traitements existants d’autres origines sont conservés. Une demande site liée à un prospect Facebook ne change pas sa date Facebook et ne crée aucun nouveau lead Facebook.

Test de non-régression : une demande site plus récente n’avance pas le delta ; un lead Facebook retardé reste insérable. Le compteur Facebook garde son résultat sans compter la fiche site. Aucun budget, ciblage, statut publicitaire, garde-fou, Studio ou module IA Reco modifié ; le filtrage de la synthèse commune exclut seulement les nouvelles fiches site.

## 4. Doublons — ce qui est fait, ce qui ne l’est pas

Fait : rejeu d’une même soumission dédoublonné durablement. Une nouvelle demande partage une fiche existante seulement si un candidat unique présente exactement le même téléphone normalisé ET le même nom complet normalisé ; chaque projet et son origine restent des lignes distinctes. Une nouvelle demande réaffiche une fiche archivée, sans modifier son statut CRM ni inventer de contact client.

**Non livré : identité multicanale générale.** Le formulaire ne collecte qu’un prénom ; celui-ci ne suffit pas à prouver une identité lorsqu’un nom complet différent ou un téléphone partagé est présent. Aucune fusion dans ces cas. Surtout, si Facebook reçoit un nouveau lead après la création d’une fiche site, sa réception existante reste intacte et peut laisser deux fiches. Cette limite est reproduite par un test ; un rapprochement potentiel est signalé dynamiquement sur la demande site lorsqu’un autre contact actif possède ce téléphone.

Aucun historique supprimé, aucun nouveau projet écrasé et aucune déduplication approximative présentée comme complète. Un lot d’identité multicanale devra traiter alias, historique et arbitrage des cas ambigus sans casser les identifiants Meta ni les échanges existants.

## 5. Changement à commander au site

Contrat détaillé dans `facebook-ads-backend/docs/CODE-045-SITE-INTAKE.md`.

Dans la PR nº 1, après nouvel ordre : remplacer la destination n8n par l’URL HTTPS du backend terminée par `/public/lead-requests` ; générer et conserver submission_id ; envoyer les champs existants et les marques d’origine ; vérifier le reçu JSON persistant ; ne jamais resoumettre à cause d’un échec d’alerte. Ne fournir aucune clé Dashboard au navigateur. Aucun pixel ou code publicitaire nécessaire.

Cette mission ne modifie pas le site et ne fusionne pas sa PR. Il n’existe donc pas encore de preuve de réception bout en bout depuis le formulaire de production.

## 6. Vérifications

Node 20.11.1 : 173/173 tests backend, 68/68 interface. Dix-huit tests backend et trois interface ajoutés. Syntaxe de chaque JavaScript changé et git diff --check validés. Bases temporaires et transport simulé ; journaux bruts non joints pour éviter toute donnée personnelle issue d’anciens tests.

Recette : transaction annulée sur panne de stockage ; demande toujours visible et nouveau sur refus SMS ; alerte acceptée une fois sans faux contact ; timeout non répété ; configuration invalide sans envoi ; reçu réutilisé après réouverture de la base ; multichoix et précision complets ; données actives/archivées ; origine déclarée ; code postal/téléphone/travaux invalides ; CORS, corps trop grand et quota ; delta et compteur Facebook protégés ; SMS automatiques prospect exclus ; rapprochement exact et limites multicanales.

Production : diagnostic authentifié HTTP 200, accès sans clé HTTP 401, prévol CORS du site HTTP 204, soumission invalide sans données HTTP 400. Aucune soumission valide de test en production. Chrome : filtre d’origine présent dans Conversions, sélection ChatGPT déclarée, zéro fiche affichée pour ce filtre au contrôle. Aucune fiche client modifiée. Pas de capture jointe : capture du navigateur échouée par timeout ; le contrôle de rendu détaillé sur données fictives est testé par les fonctions réelles.

Les fichiers JavaScript et CSS servis correspondent aux octets locaux. Le HTML est transformé par Netlify pour les liens ; la référence conversions.js?v=code045 est vérifiée dans le HTML servi. Détails dans assets-servis.json.

## 7. Commits et déploiement

Pré-vol hub : 3efc2efe16c84daa075a3291f9b40fb78dcda9f0.
Base backend : 78fa5535acf1e06618669863812d873e0952a121.
Base frontend : 2274e5d043e493f2e684a05b80ff55d2df22ff5c.
Les identités exactes des arbres et commits de base ont été reconstruites après refus d’authentification du Git CLI privé ; les lectures/publications utilisent le connecteur GitHub du compte projet, sans jeton dans les URL. Rebase local et contrôle de tête attendue, aucun force push.
Les références finales et le statut du déploiement figurent dans deploiement.json ; branches code-045 et main. Le service SaaS interdit n’a pas été touché.
