# Message Pilote -> Diagnostic

MESSAGE-ID : DIAG-001
DATE : 2026-10-11
OBJET : Premier diagnostic — redondances, incohérences, inutilités

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013, en tête de ta fiche.

## Pourquoi tu existes

Le Gérant soupçonne des redondances dans le dashboard. Personne ne regarde ce
projet avec un œil neuf depuis la suppression du poste d'auditeur.

Ton travail est de **juger**. Les autres postes décrivent ou exécutent. Toi,
tu dis ce qui ne va pas, et dans quel ordre.

## Ta matière — et elle seule

Deux inventaires, établis par lecture directe du code, terminés ce jour :

| Fichier | Contenu |
|---|---|
| `documentation/INVENTAIRE-BACKEND.md` | 155 routes, 14 fichiers |
| `documentation/INVENTAIRE-FRONTEND.md` | 160 appels, 9 fichiers |

Compléments utiles : `documentation/REFERENTIEL.md` et
`documentation/DECISIONS.md`.

Tu ne lis **pas** le code des dépôts. C'est volontaire.

## Ce qui est demandé

Quatre questions, dans cet ordre.

**1. Routes mortes.** Lesquelles des 155 routes backend ne sont appelées par
aucun des 160 appels frontend ? C'est un rapprochement mécanique entre les
deux inventaires. Donne-en le nombre et la liste.

**2. Appels orphelins.** Lesquels des appels frontend visent une route qui
n'existe pas côté backend ? L'inventaire frontend porte déjà une colonne pour
cela. Une fonction cassée en production est plus grave qu'une route inutile :
hiérarchise en conséquence.

**3. Redondances réelles.** Deux routes qui font la même chose **et** dont les
deux sont appelées. Cite les deux chemins. Distingue :
   - le vrai doublon, où une seule suffirait ;
   - le faux doublon, où les deux usages diffèrent réellement.

Repère déjà fait par le Codeur, à reprendre et compléter : la paire
Messenger et la paire relance lead sont toutes deux utilisées des deux côtés ;
la paire de suppression de campagne n'est utilisée ni d'un côté ni de l'autre.

**4. Incohérences.** Deux chemins pour le même résultat avec des
comportements différents, une règle appliquée à un endroit et pas à un autre,
une fonction qui contredit sa propre documentation.

## Ce que tu ne fais pas

- **Aucune solution technique.** Tu dis « ces deux routes font la même
  chose », jamais « il faut supprimer la seconde et rediriger l'appel ».
  Le comment appartient au `codeur`.
- Tu ne juges ni le style, ni le nommage, ni la performance.
- Tu ne décides rien. Tu signales, le Pilote arbitre, le Gérant tranche.
- Tu n'inventes rien. Si l'inventaire ne dit pas, écris que l'inventaire ne
  dit pas.

## Règle de hiérarchisation

Classe tes constats du plus grave au moins grave, selon cet ordre :

1. ce qui est cassé pour l'utilisateur
2. ce qui est dangereux — une action destructrice atteignable par accident
3. ce qui est redondant et coûte à maintenir
4. ce qui est mort et encombre

**Ne force pas le résultat.** Un diagnostic honnête qui trouve peu vaut mieux
qu'une liste gonflée. Si une partie est saine, dis-le.

## Où écrire

Crée :

```
projets/facebook-ads/documentation/DIAGNOSTIC-001.md
```

Une section par question. Marque chaque constat `[SÛR]` ou `[À VÉRIFIER]`.

## Protocole

Pré-vol anti-cache sur le hub, citer le HEAD. Push après rebase.

## Ton rapport

Format D-013, référence `DIAG-001`, dans `message-diagnostic-pilote.md`,
en remplacement intégral. Le détail va dans `DIAGNOSTIC-001.md`, pas dans le
rapport : une page au plus.

## Ta réponse à l'écran

```
MISSION TERMINÉE — DIAG-001
```

ou

```
MISSION NON TERMINÉE — DIAG-001
```

— Pilote, facebook-ads
