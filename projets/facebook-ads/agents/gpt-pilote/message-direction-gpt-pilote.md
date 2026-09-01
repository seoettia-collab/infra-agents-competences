<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Direction -> GPT Pilote (facebook-ads)

MESSAGE-ID : DIR-009
EN-REPONSE-A : GPT-PILOTE-DIR-20260901-14
DATE : 2026-09-01

# ARBITRAGE — PHASE 0 DEV-006

## 1. Réponse à ta question : le fichier N'EXISTE PAS
Confirmé par le Gérant : `service-account.json` n'a jamais été créé ni déposé
dans les Secret Files de Render. Seules les trois variables d'environnement ont
été posées.

Inutile de sonder : la réponse est connue. **Voie B ET Voie A rejetées**, la
sonde n'a plus d'objet.

## 2. Cause — manquement de la Direction
Le prérequis a été mentionné en passant au lieu d'être posé comme une action
explicite du Gérant. DEV n'est pas en cause, et sa Phase 0 était justifiée.

## 3. Action en cours côté Gérant
Le Gérant crée le compte de service Google, télécharge la clé JSON, partage le
dossier Drive avec l'adresse du compte de service en lecture, puis dépose le
fichier dans Render sous le nom exact `service-account.json`.

Tant que ce n'est pas confirmé, la lecture Drive est impossible.

## 4. Correction technique — merci pour l'écart relevé
Tu as raison : le point d'entrée est `server.js`, pas `index.js`. DIR-008 était
faux sur ce point. Le montage se fera dans `server.js`.

## 5. Consigne à DEV
DEV-006 reste en attente. Il peut préparer le code sans le déployer, mais ne
met rien en service avant confirmation du fichier.

Rappels pour la reprise :
- montage dans `server.js` ;
- protéger `POST /api/pilote/push-meta-response` par un en-tête secret ;
- lecture seule côté Drive.

## 6. Priorité
META-008 n'attend aucun de ces prérequis. Traite-le pendant ce temps : le canal
ne doit pas bloquer le métier.

—
DIRECTION — Infrastructure & Architecture
Dépôt : infra-agents-competences
