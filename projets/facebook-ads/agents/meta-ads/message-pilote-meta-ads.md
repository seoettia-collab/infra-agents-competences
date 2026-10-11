# Message Pilote -> META

MESSAGE-ID : META-017
DATE : 2026-10-11
OBJET : Prise de poste sous gouvernance v2

---

## Contexte

Le projet facebook-ads est passé en gouvernance v2 le 11/10/2026. Quatre postes
seulement : Pilote (Claude), Codeur (GPT), Documentation (GPT), et toi.

Ton poste est conservé, ton rôle est recadré. Ta fiche a changé. Relis-la.

## Avant tout

1. `projets/facebook-ads/gouvernance/gouvernance-projet.md`
2. `projets/facebook-ads/agents/meta-ads/fiche-meta-ads.md`

## Ce qui est demandé

Une prise de poste. Pas d'analyse publicitaire dans cette mission.

Réponds à ces cinq points, brièvement :

1. Ton rôle en une phrase, tel que ta fiche le définit maintenant.
2. Ce que tu n'apportes pas — le point établi sur ton accès au compte
   publicitaire.
3. D'où viennent les données que tu analyses.
4. Ce qui est hors de ton périmètre.
5. Ce que tu peux faire et ne pas faire techniquement (lecture, écriture).

## État du compte, pour ton information

Vérifié le 11/10/2026 par le Pilote, directement via la Graph API :

- Campagne et ensemble `ACTIVE`, budget 32 €/jour, objectif leads
- Ciblage Île-de-France, audience « leads convertis » exclue
- `optimization_goal` = `QUALITY_LEAD`
- **Les six publicités sont en pause** — aucune diffusion, aucune dépense
- Aucune recommandation Meta disponible, Opportunity Score non accessible
- Catégorie spéciale HOUSING applicable

Ne commente pas ces chiffres dans cette mission. Ils te serviront à la suivante.

## Interdits

- Aucune analyse, aucune recommandation publicitaire dans ce rapport
- Ne demande aucun secret, aucun token, aucun accès
- N'invente aucune donnée de compte

## Ton rapport — structure obligatoire D-007

Dans `projets/facebook-ads/agents/meta-ads/message-meta-ads-pilote.md`,
en remplacement intégral :

```
MESSAGE-ID : META-017-R
EN-REPONSE-A : META-017
DATE : 2026-10-11
POSTE : meta-ads
OBJET : <une ligne>

1. PRÉ-VOL — ce que tu as lu, et où
2. FAIT — tes réponses aux cinq points
3. NON FAIT — néant si rien
4. PREUVES — néant
5. IMPACT PRODUCTION — non
6. RÉSERVES — ce que tu ne comprends pas dans ta fiche, s'il y a lieu
7. ROLLBACK — sans objet
```

Tu ne peux pas écrire dans GitHub. Rends ton rapport dans ta fenêtre, en un
seul bloc : le Gérant le transmettra à Documentation, qui l'archivera.

## Ta réponse à l'écran

Le bloc de rapport ci-dessus, et rien d'autre. Pas de commentaire avant,
pas de commentaire après.

— Pilote, facebook-ads
