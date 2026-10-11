# Message Pilote -> Documentation

MESSAGE-ID : DOC-001
DATE : 2026-10-11
OBJET : Recopie brute de l'extraction de mémoire de l'ancien Pilote

---

## Avant tout

Lis ta fiche : `projets/facebook-ads/agents/documentation/fiche-documentation.md`
Puis la gouvernance : `projets/facebook-ads/gouvernance/gouvernance-projet.md`

Tu es le poste Documentation du projet facebook-ads. Gouvernance v2.
Ta règle unique : **tu recopies, tu ne reformules pas.**

## Ce qui est demandé

Le Gérant va te coller un texte dans ta fenêtre : l'extraction de mémoire de
l'ancien Pilote GPT, dont le poste est clos.

Crée le fichier :

```
projets/facebook-ads/archives/2026-10-11-extraction-ancien-pilote.md
```

Dépôt `seoettia-collab/infra-agents-competences`, branche `main`.
Contenu : le texte qui t'a été collé, **recopié à l'identique**.

## Interdits

- Ne résume pas, ne réécris pas, ne réorganise pas, n'ajoute rien
- **Ne corrige pas le fond**, même si quelque chose te paraît faux ou daté.
  Le jugement appartient au Pilote, pas à toi.
- Ne commente pas dans le fichier

## Deux règles particulières à cette mission

1. **Envois multiples** : si le texte arrive en plusieurs fois, **ajoute à la
   fin du fichier existant**, ne remplace pas ce qui est déjà écrit.
   C'est une exception à la règle de remplacement intégral, valable pour ce
   seul fichier.
2. **Secrets** : si tu vois un token, une clé ou un mot de passe, remplace-le
   par `[SECRET RETIRÉ]` et signale-le dans ton rapport.

## Protocole

Pré-vol anti-cache obligatoire avant d'écrire.
Commit et push après rebase.

## Ton rapport

Dans `projets/facebook-ads/agents/documentation/message-documentation-pilote.md`,
en remplacement intégral. Court, numéroté :

1. HEAD du hub lu au pré-vol
2. Chemin du fichier créé
3. Nombre de lignes écrites
4. Nombre d'envois reçus
5. Secrets retirés : oui / non, et combien
6. Hash du commit poussé

## Ta réponse à l'écran

Un bloc, rien d'autre :

```
MISSION TERMINÉE — DOC-001
```

ou

```
MISSION NON TERMINÉE — DOC-001
```

— Pilote, facebook-ads
