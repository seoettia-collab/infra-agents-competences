# Gouvernance — projet facebook-ads

## 1. Identité
- Projet : facebook-ads
- Dépôts : seoettia-collab/facebook-ads-backend, seoettia-collab/facebook-ads-frontend
- Objectif : acquisition et conversion via Facebook/Meta Ads (dashboard + backend).

## 2. Chaîne de commandement
Gérant -> Direction (standard) -> GPT Pilote facebook-ads -> agents du projet.

## 3. Agents activés
| Agent | ID | Rôle | Activé |
|---|---|---|---|
| GPT Pilote | gpt-pilote | pilote du projet | oui |
| Architecte concept | architecte-concept | concept, vision, structure fonctionnelle | oui |
| Ingénieur-Développeur | ingenieur-developpeur | solution technique + code (EXCLUSIF) | oui |
| Documentation Technique | documentation-technique | référentiel, historique, évolutions | oui |
| Auditeur | auditeur | audit code et concept (lecture seule) | oui |
| META | meta-ads | META — Growth & Conversion Facebook (stratégie seule) | oui |

### Règles clés
- Seul `ingenieur-developpeur` écrit du code (socle règle 9).
- `documentation-technique` est obligatoire (socle règle 10).
- `auditeur` est en lecture seule (socle règle 11).
- Tous les agents Claude tournent sur Opus 5 (socle règle 12).
- META reste sur la STRATÉGIE Meta/Facebook : pas de code, pas de technique.

## 4. Règles héritées
Applique standards-communs/ (protocole, droits, lots, sources, pré-vol,
confidentialité). Ne pas recopier ici : y renvoyer.

## 5. VARIANTE DE NOMMAGE ACCEPTÉE (agent meta-ads)
Par décision du Gérant, l'agent META utilise un nommage propre, dérogatoire
au socle, déclaré ici :
- Chemin : projets/facebook-ads/agents/meta-ads/
- Pilote -> META : message-pilote-meta-ads.md
- META -> Pilote : message-meta-ads-pilote.md
- Fiche métier : fiche-meta-ads.md
Les NOUVEAUX agents suivent le socle standard, sauf dérogation déclarée ici.
