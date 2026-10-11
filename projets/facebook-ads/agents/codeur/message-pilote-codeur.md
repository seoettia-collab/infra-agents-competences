# Message Pilote -> Codeur

MESSAGE-ID : CODE-014
DATE : 2026-10-11
OBJET : Exécution de la purge totale en production

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## ⚠ ORDRE DU GÉRANT — OPÉRATION DÉFINITIVE

Ricardo ETTIA a validé l'exécution de la purge le 11/10/2026.
Effacement **définitif**, **sans archivage**. Décision prise en connaissance
de cause, le Pilote ayant recommandé un archivage préalable.

**Rien de ce qui sera effacé ne pourra être récupéré.**

## État de départ

- Purge codée et testée en local : branche `code-010-purge-leads`,
  HEAD `0da3dce`, **non fusionnée**.
- Backend `main` est maintenant à `3fc0af6` (CODE-012 déployé).
- La branche a été créée depuis `873e367` : **elle est en retard sur `main`**.

## Ce qui est demandé, dans cet ordre

**Étape 1 — remettre la branche à jour**
Rebase `code-010-purge-leads` sur `origin/main` (`3fc0af6`). Rejoue les tests :
suite complète verte, et les 4 tests de purge toujours verts.

**Étape 2 — compter en production, sans rien modifier**
Exécute le script de comptage sur la base de production. Consigne les chiffres
exacts : leads actifs, archivés, supprimés, communications entrantes,
sortantes, notes, conversations, messages.

**Ces chiffres sont la seule trace qui restera de ce qui a été effacé.**
Reporte-les intégralement dans ton rapport.

**Étape 3 — fusionner et déployer**
Merge vers `main`, laisse Render déployer, vérifie `/health`.

**Étape 4 — exécuter la purge**
Avec la confirmation exacte `PURGE-TOTALE-11-10-2026`.

**Étape 5 — compter après**
Même script. Les tables visées doivent être à zéro, les autres inchangées.
Vérifie nommément que campagnes, contexte métier, configuration et journaux
applicatifs sont intacts.

**Étape 6 — vérifier le dashboard**
Ouvre la liste des leads : elle doit être vide, sans erreur à l'écran.

## Interdits

- **Aucune suppression côté Facebook.** Les leads restent chez Meta. On ne
  vide que notre base locale.
- Ne touche à aucune table hors périmètre.
- Aucune donnée personnelle dans les logs ni dans le rapport : des nombres,
  jamais des noms ni des numéros.
- Si une étape échoue, **arrête-toi** et rapporte. Ne force rien, ne répare
  rien dans l'urgence.

## Ton rapport

Format D-013, référence `CODE-014`, en remplacement intégral.

PREUVES obligatoires : les chiffres avant et après ligne par ligne, le hash du
merge, le résultat de `/health`, et l'état du dashboard après purge.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-014
```

ou

```
MISSION NON TERMINÉE — CODE-014
```

— Pilote, facebook-ads
