# Message Pilote -> Codeur

MESSAGE-ID : CODE-026
DATE : 2026-10-11
OBJET : Diagnostiquer la réception des SMS entrants — priorité absolue

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-025

Tu as bien réagi : devant une réception non prouvée, tu as annulé plutôt que
d'insister. C'est la bonne décision.

Et tu as découvert deux choses qu'on ignorait : la réception ne fonctionne
pas, et les échanges Messenger reviennent seuls après purge.

**Précision qui te déculpabilise** : la réception était déjà cassée avant ta
correction. Le SMS du 11/10 à 19h02 avait été filtré lui aussi. Tu n'as rien
cassé, tu as révélé un défaut existant.

## Pourquoi c'est la priorité

La campagne va redémarrer. Un lead qui répond par SMS doit apparaître dans le
dashboard. S'il n'apparaît pas, le Gérant ne le rappelle pas, et le lead est
perdu. **Rien d'autre ne compte tant que ce point n'est pas réglé.**

## Ce qui est demandé — diagnostic, pas correction

Remonte la chaîne de bout en bout et dis **où exactement** le message
disparaît. Quatre maillons :

**1. Le téléphone** — SMSGate reçoit-il le SMS ? Visible dans l'onglet
Messages de l'application.

**2. La file d'attente** — la livraison part-elle ? Visible dans Webhook
Queue. Au test du 11/10 à 19h02, une entrée était en `Completed`, 0 réessai.

**3. Le backend** — la requête arrive-t-elle ? Que répond-il ? Les journaux
Render sont lisibles avec ton connecteur. Cherche le code HTTP, et tout
message de rejet.

**4. Le filtre applicatif** — CODE-021 avait relevé
`[INBOUND_SMS_GW_FILTERED]` : le message est accepté puis ignoré faute de
lead correspondant au numéro.

**C'est le maillon le plus suspect.** Vérifie précisément :
- quelle condition déclenche le filtre
- si un numéro inconnu est rejeté par conception
- ce qui se passe quand un lead existe avec ce numéro
- si le format du numéro est en cause : `+33` contre `0`, espaces, indicatif

Ce dernier point est classique. Un lead enregistré en `06...` et un SMS
reçu en `+336...` ne se rapprochent pas, et le message est jeté en silence.

## Ce que tu ne fais pas

- **Aucune correction dans cette mission.** Tu établis où ça casse.
- Aucun déploiement, aucun merge, aucun retour arrière supplémentaire
- Si la correction est évidente et sans risque, **décris-la** et attends la
  mission suivante

## Si tu as besoin d'un test réel

Demande au Gérant d'envoyer un SMS, en précisant **depuis quel numéro** et
**à quel moment**, pour que tu puisses suivre ce message précis dans les
journaux.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucun numéro de téléphone complet dans le rapport : masque les chiffres
- Aucune valeur de secret
- Ne touche pas aux échanges Messenger : autre sujet, autre mission

## Ton rapport

Format D-013, référence `CODE-026`, en remplacement intégral.

PREUVES : pour chacun des quatre maillons, `passe` ou `bloque`, avec ce que
tu as observé. Et la cause exacte en une phrase.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-026
```

ou

```
MISSION NON TERMINÉE — CODE-026
```

— Pilote, facebook-ads
