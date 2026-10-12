# Message Pilote -> Codeur

MESSAGE-ID : CODE-027
DATE : 2026-10-12
OBJET : Enregistrer tous les SMS entrants, y compris d'un numéro inconnu

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-026

Diagnostic juste et bien mené. Tu as trouvé la cause réelle —
`FILTRE-LEAD-01` jette par conception tout SMS sans lead correspondant, en
répondant quand même « reçu » — et tu as écarté la piste du format de numéro
en testant 28 variantes. C'est du travail propre.

Ton rapport était bloqué à la publication : tu l'as poussé sur
`code-026-rapport`, le Pilote l'a récupéré et archivé sur `main`. Bon
réflexe, garde-le quand le hub te refuse une écriture.

## Décision du Gérant — 12/10/2026

**Tous les SMS entrants sont enregistrés, même sans lead correspondant.**

Motif : un prospect qui écrit depuis un autre numéro que celui du formulaire,
ou avant de l'avoir rempli, est aujourd'hui perdu sans que personne ne le
sache. La campagne redémarre, ce cas va se produire.

## Partie A — lever le filtre

1. Modifie le comportement : un SMS entrant est **toujours enregistré**.
2. Quand un lead correspond : comportement actuel inchangé, rattachement au
   lead.
3. Quand aucun lead ne correspond : enregistre quand même, avec le numéro et
   le contenu, **sans rattachement**.
4. Conserve une trace claire de la distinction pour que le dashboard puisse
   les présenter différemment.

**Ne supprime pas le journal `FILTRE-LEAD-01`** : transforme-le. Il doit
maintenant dire qu'un message sans lead a été enregistré, pas ignoré.

## Partie B — les rendre visibles

Un message enregistré mais invisible ne sert à rien.

Vérifie comment le dashboard affiche aujourd'hui les SMS entrants, et
assure-toi que ceux sans lead apparaissent. Si le frontend les filtre aussi,
corrige-le.

Si la correction frontend dépasse ce que tu peux faire ici, **décris-la et
arrête-toi** : elle fera une mission séparée.

## Partie C — vérification réelle en production

C'est le point qui a manqué deux fois.

1. Après déploiement, demande au Gérant d'envoyer un SMS depuis un numéro
   **qui ne correspond à aucun lead**
2. Vérifie qu'il arrive en base
3. Vérifie qu'il est visible dans le dashboard
4. Si ça ne marche pas : **reviens en arrière et rapporte**

## Partie D — nettoyage

Il reste en base : 2 leads de test, 1 SMS de test, et 130 échanges Messenger
revenus après synchronisation.

Supprime les leads et le SMS de test. **Ne touche pas aux Messenger** : la
synchronisation les recharge, c'est un autre sujet, traité séparément.

## Déploiement

Autorisé pour cette mission. Rebase, tests, merge, auto-déploiement, et la
vérification de la partie C juste après.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Ne touche pas à la synchronisation Messenger
- Aucun numéro de téléphone complet dans le rapport
- Les journaux existants exposent numéro et contenu — tu l'as signalé en
  CODE-026. **N'aggrave pas** : n'ajoute aucun nouveau journal exposant un
  numéro ou un contenu en clair

## Ton rapport

Format D-013, référence `CODE-027`, en remplacement intégral.
Si le hub refuse la publication, pousse sur `code-027-rapport`.

PREUVES : hash des merges, résultat du test réel de la partie C, état de la
base après nettoyage.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-027
```

ou

```
MISSION NON TERMINÉE — CODE-027
```

— Pilote, facebook-ads
