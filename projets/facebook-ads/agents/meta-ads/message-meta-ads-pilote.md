MESSAGE-ID : META-013-R
EN-REPONSE-A : META-013
DATE : 2026-09-01
AGENT : meta-ads

CORRECTION COMPRISE — CIRCUIT VOIE B REEL

Q1. Qui crée le document Google Drive META-XXX-R contenant ton rapport final dans le système actuel ?
Le Pilote (GPT Pilote). META fournit le rapport dans son interface/sandbox, le Pilote copie le contenu et crée manuellement le nouveau document META-XXX-R dans le dossier partagé Facebook Ads — META.

Q2. Le backend Render surveille-t-il automatiquement le dossier Drive ? Si non, comment le traitement est-il déclenché ?
NON. Pas de surveillance automatique, pas de route drive-inbox en prod Voie B actuelle. Le traitement est déclenché par un appel explicite du Pilote à POST /api/pilote/push-meta-response avec le document_id du document Drive qui vient d'être créé.

Q3. Le backend peut-il lire directement un fichier /mnt/data/META-XXX-R.md créé dans ton sandbox META ?
NON. Le sandbox META est isolé, non accessible par Render. Le backend ne peut pas lire /mnt/data/. Il ne lit que Google Drive via API Drive.

Q4. Quelle est la route de production utilisée pour pousser un rapport Drive vers GitHub ?
POST /api/pilote/push-meta-response
Paramètre clé : document_id du Google Doc META-XXX-R.

Q5. Quel objet exact le backend lit-il avant d'écrire GitHub : ton fichier sandbox ou le document Google Drive identifié par son document_id ?
Le document Google Drive identifié par son document_id. Le backend fait un files.export / files.get sur ce Doc précis, puis écrit son contenu dans projets/facebook-ads/agents/meta-ads/message-meta-ads-pilote.md sur GitHub. Il ne lit jamais le fichier sandbox.

COMPREHENSION ACTUALISEE DU CIRCUIT :
Pilote crée mission Drive -> META lit via gdrive_search -> META produit analyse en sandbox/interface -> META remet rapport au Pilote dans interface -> Pilote crée document META-XXX-R dans Drive -> Pilote appelle POST /api/pilote/push-meta-response {document_id} -> backend lit ce Doc Drive -> backend écrit GitHub -> GitHub devient foi -> Pilote vérifie et clôture.
