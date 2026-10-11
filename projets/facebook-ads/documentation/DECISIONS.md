# DÉCISIONS — facebook-ads

Décisions engageantes et leur motif, pour ne pas les rejouer.

Format :
## D-XXX — titre
- Décision :
- Motif :
- Date / qui a tranché :
- Statut : en vigueur / amendée / annulée

---

## D-001 — Restructuration en quatre postes (gouvernance v2)
- Décision : passer de sept postes à quatre — Pilote (Claude), Codeur (GPT),
  Documentation (GPT), META (consultant). Retrait de `architecte-concept`,
  `auditeur`, `documentation-technique`, `ingenieur-developpeur`, `historique`,
  `gpt-pilote`.
- Motif : sept postes produisaient plus de messages que de travail livré, et la
  connaissance se dispersait entre les boîtes. La v2 concentre la connaissance
  sur un seul poste et confie l'exécution à des postes étroits.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-002 — Le Pilote ne code pas, le Codeur GPT pousse lui-même
- Décision : tout le code est écrit et poussé sur GitHub par le Codeur GPT.
  Le Pilote spécifie et contrôle, il n'écrit ni ne pousse de code.
- Motif : économiser l'usage côté Pilote et concentrer son temps sur la
  spécification et le contrôle.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-003 — Contrôle ciblé, pas systématique
- Décision : le Pilote relit uniquement ce qui touche la production, la
  sécurité ou les secrets. Le reste passe sans relecture. L'autorisation de
  merge et de déploiement reste au Gérant.
- Motif : le poste d'auditeur est retiré ; une relecture systématique
  consommerait trop pour le bénéfice attendu sur les changements courants.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-004 — Documentation écrite par GPT sous la dictée du Pilote
- Décision : le Pilote décide du contenu de la documentation ; le poste
  Documentation (GPT) l'écrit dans le dépôt. Il recopie, il ne reformule pas.
- Motif : garder un gardien de mémoire unique tout en déportant l'écriture.
  Un scribe qui réécrit avec ses mots ferait dériver la mémoire du projet.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-005 — META est un consultant, pas une source de données
- Décision : META conseille sur les pratiques Meta Ads. Il n'a aucun accès au
  compte publicitaire et n'exécute aucune action. Les données viennent du
  backend Mistral via la Graph API.
- Motif : l'appartenance de META à Meta ne lui confère aucun accès privilégié —
  établi par ARCH-002-R. Le supposer conduirait à lui demander ce qu'il ne peut
  pas fournir.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur
