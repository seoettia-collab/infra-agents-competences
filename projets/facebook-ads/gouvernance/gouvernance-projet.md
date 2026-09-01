# Gouvernance — projet facebook-ads

## 1. Identité
- Projet : facebook-ads
- Dépôts : seoettia-collab/facebook-ads-backend, seoettia-collab/facebook-ads-frontend
- Objectif : acquisition et conversion via Facebook/Meta Ads (dashboard + backend).

## 2. Chaîne de commandement
Gérant -> Direction -> GPT Pilote facebook-ads -> agents du projet.
Le pilotage courant appartient au Pilote.

## 3. Agents activés
| Agent | ID | Rôle | Activé |
|---|---|---|---|
| GPT Pilote | gpt-pilote | pilote du projet | oui |
| Architecte concept | architecte-concept | concept, structure fonctionnelle | oui |
| Ingénieur-Développeur | ingenieur-developpeur | solution technique + code (exclusif) | oui |
| Documentation Technique | documentation-technique | référentiel, historique | oui |
| Auditeur | auditeur | audit code et concept (lecture seule) | oui |
| META | meta-ads | Growth & Conversion Meta — STRATÉGIE seule | oui |
| Historique | historique | mémoire longue du projet — CONSULTATION seule | oui |

META ne fait ni code ni technique : ses besoins techniques passent par le Pilote.
`historique` n'est pas dans le flux courant : on le consulte ponctuellement, en
cas de blocage. Ses souvenirs sont des pistes à vérifier, jamais une vérité.

## 4. Risque particulier du projet
Aucun spécifique.

## 5. Règles héritées
Applique `standards-communs/organisation-agents.md`. Ne rien recopier ici.

## 6. Référentiel
`projets/facebook-ads/agents/documentation-technique/referentiel-initial.md`
Source de contexte du projet, tenue à jour par documentation-technique.
