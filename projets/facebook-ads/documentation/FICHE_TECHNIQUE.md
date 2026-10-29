# Fiche technique — Marketing Dashboard

Révision documentaire : 29 octobre 2026. Aucun secret dans ce fichier.

## Dépôts et environnements

| Élément | Référence |
|---|---|
| Backend | https://github.com/seoettia-collab/facebook-ads-backend |
| Frontend | https://github.com/seoettia-collab/facebook-ads-frontend |
| Site officiel | https://github.com/seoettia-collab/MistralPro-Reno |
| Backend production | https://facebook-ads-backend-s20a.onrender.com |
| Dashboard production | https://mistral-fb-ads-dashboard.netlify.app |
| Destination publique | https://www.mistralpro-reno.fr/devis-travaux/ |
| Runtime déclaré | Node 20.x ; recette historique Node 20.11.1 |
| Démarrage / tests backend | `npm start` / `npm test` |
| Base | SQLite via `better-sqlite3`, disque Render |

## Routes utiles

| Route | Usage |
|---|---|
| `GET /devis-travaux` | Page de formulaire servie aussi par le backend |
| `POST /public/lead-requests` | Réception publique JSON sans secret navigateur |
| `GET /api/facebook/site-intake-status` | Diagnostic authentifié du circuit de demande |
| `GET /api/facebook/leads` | Leads et présentation dans Conversions |
| `GET /api/chatgpt-ads/status` | Configuration du module, pas preuve de vérification du compte |
| `GET /api/chatgpt-ads/account` | Lecture réelle du compte |
| `GET /api/chatgpt-ads/campaigns` | Campagnes |
| `GET /api/chatgpt-ads/insights` | Résultats par période |
| `/api/mobile/*` via `/mobile-api/*` Netlify | Circuit mobile distinct avec session |

## Configuration à identifier, sans valeurs

- `OPENAI_ADS_API_KEY` : clé Advertiser API serveur, distincte de `OPENAI_API_KEY`.
- `GERANT_ALERT_PHONE_E164`, sinon `AGENT_PHONE_NUMBER` : destinataire d'alerte.
- `SMS_GATEWAY_PHONE` : à comparer au destinataire ; un numéro identique bloque l'alerte.
- `SMS_GATEWAY_TOKEN`, `SMS_GATEWAY_DEVICE_ID` : configuration SMSGate.
- `MARKETING_ADMIN_TOKEN` : fonctions qui l'utilisent encore ; plus de saisie requise pour les quatre lectures Ads desktop.
- Variables mobile/Push : voir `docs/MOBILE-PUSH.md` du backend.

Ne pas recopier les valeurs de clés, cookies, mots de passe ou téléphones privés.
Le téléphone public validé dans le suivi est le 06 09 10 90 69 ; ce n'est pas une validation du destinataire privé des alertes.

## Contrat formulaire

Six choix multiples : Cuisine, Salle de bain, Peinture, Rénovation, Extension, Maison.
Prénom, téléphone français et code postal IDF requis ; précision facultative.
Confirmer seulement après `success:true`, `stored:true` et reçu attendu.
Les UTM décrivent une provenance déclarée ; elles ne prouvent pas l'attribution OpenAI.

## Contrôles d'exploitation

Vérifier séparément les erreurs de collecte, l'apparition dans Conversions, la remise des alertes et les résultats publicitaires.
Ne jamais assimiler configuration présente, envoi accepté et livraison réelle.
Voir `REFERENTIEL.md` pour les limites et `SUIVI-GPT-ADS-CENTRALISE.md` pour les identifiants et preuves datées des objets publicitaires.
