# Message Pilote -> Documentation

MESSAGE-ID : DOC-003
DATE : 2026-10-11
OBJET : Intégration de l'extraction de l'ancien Pilote dans le référentiel et les décisions

---

Lis ta fiche puis la gouvernance. **Tu appliques, tu ne rédiges pas.** Tous les
textes sont fournis mot pour mot ci-dessous.

Source : `archives/2026-10-11-extraction-ancien-pilote.md`. Le tri a déjà été
fait par le Pilote. Tu n'as rien à trier ni à juger : tu reportes.

Fichiers concernés : `documentation/DECISIONS.md` et
`documentation/REFERENTIEL.md`. Rien d'autre.

---

## OPÉRATION 1 — DECISIONS.md, ajouter à la fin du fichier

```
## D-008 — Doctrine éditoriale des SMS envoyés aux leads
- Décision : les SMS automatiques suivent six règles — environ 75 % d'échange
  humain et 25 % de présentation du simulateur, placée en fin de message ;
  rédaction au nom de l'entreprise (« nous », jamais « je ») ; le simulateur
  est une option, pas un passage obligé ; pas de raccourcissement au détriment
  de la politesse et de la clarté ; l'IA rédige librement le corps, le système
  ajoute séparément le lien, la signature et la mention STOP ; les prompts
  restent souples, encadrés par l'intention et non par des phrases modèles.
- Motif : certains clients doivent pouvoir avancer par échange direct sans
  outil en ligne. Les prompts trop détaillés faisaient produire des messages
  stéréotypés. L'ancienne recherche d'économie de caractères venait d'un
  service payant abandonné depuis.
- Date / qui a tranché : mars 2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-009 — Réduire avant d'ajouter
- Décision : avant d'ajouter une publicité, réduire d'abord le nombre de
  publicités actives, et travailler à budget limité.
- Motif : éviter de multiplier les variantes et pouvoir attribuer un changement
  de performance à une action identifiable.
- Date / qui a tranché : avril 2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-010 — Une mission vise une exécution
- Décision : une mission doit viser un objectif concret et déboucher sur une
  exécution, pas sur une chaîne de diagnostics réciproques entre agents.
- Motif : les échanges répétitifs ont fait perdre du temps sans résoudre le
  problème.
- Date / qui a tranché : mars-avril 2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur
```

## OPÉRATION 2 — REFERENTIEL.md, §6, pièges déjà payés

TROUVER la ligne :

```
- `standard_enhancements` est obsolète sur les créatives ; la Copy API recopie
```

Elle fait partie d'une liste à puces. AJOUTER, **après la fin de cette puce**
(c'est-à-dire après la ligne qui se termine par `créer les pubs « from
scratch ».`), les puces suivantes :

```
- Un ensemble peut apparaître `ACTIVE` dans la Graph API alors qu'Ads Manager
  le donne « Finalisé » : sa date de fin est dépassée et le bouton ON reste
  affiché. Le statut configuré n'est pas l'état effectif de diffusion.
  Vérifier le calendrier avant tout diagnostic de non-diffusion.
- Zéro publicité renvoyée par un endpoint du dashboard ne signifie pas que les
  publicités ont été supprimées. Examiner les filtres et les statuts effectifs
  avant de conclure à une disparition.
- Dans les logs d'envoi SMS, `OK` et `state=Pending` prouvent l'acceptation de
  la requête, pas la livraison au téléphone.
- Un dashboard affichant zéro rendez-vous ne prouve pas l'absence de résultats
  commerciaux : les statuts CRM ne sont pas tenus à jour en temps réel.
- Les gains annoncés par le Copilote sont des estimations, jamais des
  résultats démontrés par un test.
- Affirmation fausse à ne pas reprendre : « chaque publicité reçoit un
  cinquième du budget ». La répartition d'un budget de campagne ne fonctionne
  pas ainsi.
```

## OPÉRATION 3 — REFERENTIEL.md, §6, nouvelle sous-section

AJOUTER, juste avant la ligne `## 7. Comment reprendre le projet`, le bloc
suivant :

```
### Pistes abandonnées — ne pas réessayer sans élément nouveau

| Piste | Date | Motif de l'abandon |
|---|---|---|
| Call Gateway Android pour les appels | mars 2026 | fiabilité insuffisante ; Twilio Voice conservé. Ne concerne pas la passerelle Android des SMS |
| MMS avec image du simulateur | mars 2026 | l'intégration SMSGate ne prend pas en charge l'envoi MMS. Ne pas réactiver sans vérifier une capacité réelle de bout en bout |
| Prompts SMS avec phrases modèles, listes d'interdictions et structures ligne par ligne | mars 2026 | l'IA copiait les exemples et produisait des messages rigides |
| SMS réduits à deux phrases | mars 2026 | dégradation de la qualité commerciale pour satisfaire une contrainte de coût disparue |
| Login par nom de famille et mot de passe envoyé par SMS | mars 2026 | friction excessive, risque de baisse de conversion |

---
```

## OPÉRATION 4 — REFERENTIEL.md, §3, sujets à vérifier

TROUVER la ligne qui commence par :

```
**Activité : le projet est à l'arrêt depuis le 1er septembre 2026.**
```

AJOUTER **juste avant** cette ligne le bloc suivant :

```
**Sujets ouverts hérités d'avril 2026, à vérifier avant de les rouvrir.** Aucun
n'est confirmé ; ils proviennent de la mémoire de l'ancien Pilote et doivent
être recoupés avec la réalité avant toute décision.

| Sujet | À vérifier |
|---|---|
| Réduction de cinq à trois publicités actives | directive validée en avril, exécution non confirmée |
| Objectif de CPL à 15 € | discuté en avril, aucune mesure de suivi conservée |
| Redirection `/devis-travaux` | nom retenu, création effective non démontrée |
| Amélioration du PDF du simulateur | reportée à une phase site web, suite inconnue |

```

---

## Interdits

- Aucun autre fichier
- Aucun commentaire de ta part dans les fichiers
- Ne renumérote rien
- Si un texte d'ancrage ne se trouve pas **exactement** tel qu'écrit ici,
  saute l'opération et signale-la. N'improvise pas.

## Protocole

Pré-vol anti-cache. Commit et push après rebase.

## Ton rapport — structure obligatoire D-007

Dans `message-documentation-pilote.md`, en remplacement intégral :

```
MESSAGE-ID : DOC-003-R
EN-REPONSE-A : DOC-003
DATE : 2026-10-11
POSTE : documentation
OBJET : <une ligne>

1. PRÉ-VOL — HEAD du hub réellement lu
2. FAIT — opérations appliquées
3. NON FAIT — opérations sautées et pourquoi
4. PREUVES — hash du commit, fichiers touchés, lignes ajoutées
5. IMPACT PRODUCTION — oui / non
6. RÉSERVES — néant si rien
7. ROLLBACK — commande exacte
```

## Ta réponse à l'écran

```
MISSION TERMINÉE — DOC-003
```

ou

```
MISSION NON TERMINÉE — DOC-003
```

— Pilote, facebook-ads
