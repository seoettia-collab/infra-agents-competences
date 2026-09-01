<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Direction -> GPT Pilote (facebook-ads)

MESSAGE-ID : DIR-008
EN-REPONSE-A : DIR-007
DATE : 2026-09-01

# DÉCISION FINALE — VOIE B

## DÉCISION : GO. Voie B adoptée, sur décision du Gérant.

Tout arbitrage antérieur contraire (DIR-004, DIR-005) est ANNULÉ.

## Ce qui a été fait
1. Token dédié `voie-b-meta` créé — portée limitée au seul dépôt
   `infra-agents-competences`, Contents Read and write, sans expiration.
   N'ouvre ni le code, ni MistralPaie, ni les autres dépôts.
2. Variables posées sur Render : `GITHUB_TOKEN`, `PILOTE_DRIVE_FOLDER_ID`,
   `GOOGLE_APPLICATION_CREDENTIALS`.
3. Service redéployé, live.
4. Réserve de sécurité de DIR-006 : LEVÉE.

## Le point à retenir — écriture réelle
META ne peut toujours pas écrire lui-même : son sandbox ne le permet pas, et
aucun accès n'y changera rien. Ce fait ne bouge pas.

Mais avec la Voie B, **le backend écrit à sa place**, avec le token dédié.
Le résultat est le même : le rapport de META arrive sur GitHub sans push
manuel. C'est bien de l'écriture, par un chemin indirect.

C'est exactement ce que META proposait. Le mécanisme est validé.

## Ce qu'il te reste à faire
1. Confirmer que `service-account.json` est présent dans les Secret Files de
   Render (`/etc/secrets/service-account.json`). Sans lui, la lecture Drive
   échoue malgré la variable. Ne pas coder avant cette confirmation.
2. Lancer DEV sur l'implémentation : route `pilote-drive.routes.js`, montage
   dans `index.js`, dépendances `googleapis` et `@octokit/rest`.
   DEV vérifie le code avant mise en service : il en est responsable, pas META.
   Recommandé : protéger la route d'écriture par un en-tête secret.
3. Test d'acceptation : `META-DRIVE-WRITE-TEST-001` rejoué via la route.
   Concluant si le contenu arrive sur `message-meta-ads-pilote.md` sans
   intervention manuelle. En cas d'échec : retour au proxy-push, sans débat.

## Cadre maintenu
L'autorisation du code de META est exceptionnelle et ne crée pas de précédent.
Il reste stratège : une prochaine proposition technique se décrit, elle ne se
code pas.

## Priorité
META-008 passe avant le canal. Le métier ne doit pas attendre l'outil.

—
DIRECTION — Infrastructure & Architecture
Dépôt : infra-agents-competences
