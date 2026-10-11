# Message Pilote -> Codeur

MESSAGE-ID : CODE-021
DATE : 2026-10-11
OBJET : Test de bout en bout des communications avant relance

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Contexte

Le Gérant a changé de téléphone. La passerelle SMSGate a été réinstallée, même
compte, même numéro, **nouveau Device ID**.

Fait par le Pilote :
- `SMS_GATEWAY_DEVICE_ID` mis à jour sur `srv-d6cq3hi4d50c73aa1rkg`
- base purgée, 0 lead, 0 communication
- `/health` répond, `sms_gateway: configured`

Constaté sur le téléphone : webhook actif, une livraison vers
`facebook-ads-backend-s20a.onrender.com` en statut **Completed**, 0 réessai,
à 19h02.

Donc la passerelle parle au backend. **Reste à vérifier que le message arrive
jusqu'en base et s'affiche.**

## Ce qui est demandé

### Partie A — SMS entrant

1. Trouve la route qui expose les SMS entrants. Le Pilote a essayé
   `/api/comms/inbound`, `/flux`, `/all`, `/messages`, `/timeline` : toutes en
   404. Consulte ton propre inventaire, section `routes/comms.js`.
2. Vérifie si le message reçu à 19h02 est bien en base.
3. Si oui : chaîne entrante validée. Si non : dis **où** elle casse —
   webhook reçu mais rejeté, reçu mais non enregistré, ou jamais reçu.

Un point à vérifier en particulier : `SMS_GATEWAY_TOKEN` est absente du
service. Ton audit CODE-019 indiquait que la validation devient permissive.
Confirme si le message passe à cause de ça, ou si la validation se fait
autrement.

### Partie B — SMS sortant

Envoie un SMS de test depuis le backend vers le numéro du Gérant.
Vérifie qu'il part, qu'il arrive, et qu'il est enregistré en base.

Le nouveau Device ID vient d'être posé : c'est lui qu'on teste.

### Partie C — appel

Vérifie la configuration Twilio pour l'appel sortant et la ligne entrante.
**N'appelle pas** sans accord : rapporte ce qui est configuré et ce qui
manque. Le plugin Twilio Developer Kit est à ta disposition.

### Partie D — verdict

Pour chacun des trois canaux : `fonctionne`, `cassé`, ou `non testable`,
avec la raison.

## Interdits

- Aucune modification de code sans nécessité : cette mission observe d'abord
- Si une correction s'impose, **signale-la** et attends la mission suivante,
  sauf si elle est triviale et sans risque — dans ce cas, explique-toi
- Aucun appel vocal réel sans accord du Gérant
- Aucun numéro de téléphone complet dans le rapport : masque les chiffres
- Ne touche jamais à ` fb-ads-saas`

## Ton rapport

Format D-013, référence `CODE-021`, en remplacement intégral.
PREUVES : la route réelle des SMS entrants, l'état du message de 19h02, le
résultat de l'envoi test, et le verdict par canal.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-021
```

ou

```
MISSION NON TERMINÉE — CODE-021
```

— Pilote, facebook-ads
