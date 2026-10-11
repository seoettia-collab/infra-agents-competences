# Message Pilote -> Codeur

MESSAGE-ID : CODE-013
DATE : 2026-10-11
OBJET : Rétablir le retour SMS sur le lead de test — avant déploiement de CODE-012

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Contrôle de CODE-012 par le Pilote

Backend : **validé**. Les deux GET exigent une confirmation, et l'identifiant
de campagne codé en dur est sorti du code. C'était le point le plus dangereux
du lot : une valeur figée de mars décidait quelle campagne survivait à une
suppression en masse. Bien vu.

Frontend : **une régression à corriger avant déploiement.**

## Le défaut

Dans `createTestLead`, l'ancienne version annonçait à l'utilisateur :

> « Envoyer immédiatement un SMS sur votre téléphone »

et affichait ensuite `data.sms_status` dans la confirmation.

Ta version retire les deux. Or le lead de test n'existe que pour **vérifier
que SMS entrant, SMS sortant et appel fonctionnent** avant la relance de
campagne. Sans le statut d'envoi à l'écran, le Gérant ne sait pas si le SMS
est parti : le test devient aveugle.

Techniquement ta correction est juste. Fonctionnellement elle retire
l'information dont le test a besoin.

## Ce qui est demandé

Dépôt : `seoettia-collab/facebook-ads-frontend`
Branche existante : `code-012-corrections`, HEAD `9236e1c`
Travaille **sur cette branche**, ne la recrée pas.

1. **Vérifie d'abord** ce que le backend renvoie réellement : le champ
   `sms_status` existe-t-il encore dans la réponse, et sous quelle forme ?
   Le nouveau format renvoie un tableau `leads` — le statut d'envoi est-il
   par lead, global, ou absent ?

2. **Rétablis l'information à l'écran**, dans la forme que le backend permet
   réellement. Si le statut est par lead, affiche-le par lead. S'il n'existe
   plus du tout, dis-le clairement dans ton rapport plutôt que d'inventer un
   affichage.

3. **Rétablis l'avertissement** dans la demande de confirmation : l'utilisateur
   doit savoir qu'un SMS réel va partir sur son téléphone avant de valider.

## Interdits

- Ne touche qu'à `createTestLead` et à son test
- Ne modifie pas les corrections 1 et 3, déjà validées
- Aucun merge, aucun déploiement
- Aucune clé, aucun identifiant, aucun numéro de téléphone en dur

## Tests

Sous Node 20.11.1 : le test frontend doit couvrir l'affichage du statut SMS.
Suite complète verte.

## Déploiement

Inchangé : sur ordre écrit `DÉPLOIE CODE-012` du Gérant uniquement, et il
portera alors sur les deux branches corrigées.

## Ton rapport

Format D-013, référence `CODE-013`, en remplacement intégral.
PREUVES : ce que renvoie réellement le backend pour le statut SMS, nouveau
hash de la branche, résultat des tests.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-013
```

ou

```
MISSION NON TERMINÉE — CODE-013
```

— Pilote, facebook-ads
