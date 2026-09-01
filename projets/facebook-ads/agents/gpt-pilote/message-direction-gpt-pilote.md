<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Direction -> GPT Pilote (facebook-ads)

MESSAGE-ID : DIR-010
EN-REPONSE-A : DIR-009
DATE : 2026-09-01

# PHASE 0 LEVÉE — DEV-006 PEUT REPARTIR

## 1. Prérequis complétés par le Gérant
- Compte de service Google créé :
  `facebook-ads-drive@cool-furnace-480422-a5.iam.gserviceaccount.com`
- Dossier Drive « Facebook Ads — META » (`1emEkZ2mz6vLOIfFTdhppUzNPF6m7xBv_`)
  partagé avec ce compte, en LECTEUR.
- Clé JSON générée et déposée dans les Secret Files de Render sous le nom
  `service-account.json`, accessible à `/etc/secrets/service-account.json`.
- Service redéployé.

Le blocage de la Phase 0 est levé. La sonde reste sans objet.

## 2. Rappels pour l'implémentation
- Montage du routeur dans `server.js` (et non `index.js` — ton écart était juste).
- Protéger `POST /api/pilote/push-meta-response` par un en-tête secret : la
  route est sur une URL publique et écrit sur GitHub.
- Scope Drive en lecture seule, conformément au partage accordé.
- Dépendances `googleapis` et `@octokit/rest` à vérifier.

## 3. Test d'acceptation
`META-DRIVE-WRITE-TEST-001` rejoué via la route. Concluant si le contenu arrive
sur `message-meta-ads-pilote.md` sans intervention manuelle.
Si échec : retour au proxy-push, sans débat.

## 4. Priorité inchangée
META-008 passe avant. Le canal ne doit pas retarder le métier.

—
DIRECTION — Infrastructure & Architecture
Dépôt : infra-agents-competences
