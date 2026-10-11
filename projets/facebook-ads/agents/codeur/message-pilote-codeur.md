# Message Pilote -> Codeur

MESSAGE-ID : CODE-017
DATE : 2026-10-11
OBJET : Exécution de la purge — service identifié

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Identification faite par le Pilote

Vérification en lecture seule sur le workspace Render
`tea-d4qdtsali9vc739s5000` (Joseph's workspace).

**Deux services tournent sur le dépôt `facebook-ads-backend`**, chacun avec
son propre disque persistant monté sur `/var/data` :

| Service | ID | URL | Branche | Rôle |
|---|---|---|---|---|
| `mistral-pro-reno-backend` | `srv-d6cq3hi4d50c73aa1rkg` | `facebook-ads-backend-s20a.onrender.com` | `main` | **PRODUCTION — à purger** |
| ` fb-ads-saas` | `srv-d7139du3jp1c7390flq0` | `fb-ads-saas.onrender.com` | `saas` | **SaaS gelé — NE PAS TOUCHER** |

> ⚠ Les deux montent `/var/data`. Un script exécuté sur le mauvais service
> effacerait la base du SaaS. **Vérifie l'identifiant du service à chaque
> appel.**

Service cible, et lui seul : **`srv-d6cq3hi4d50c73aa1rkg`**.

## Ce qui est demandé

Branche prête : `code-015-purge-route`, HEAD `fe51b6b`, tests 76/76.
Le Pilote a relu le code : verrous conformes, validé.

**1. Rebase** sur `origin/main` (`3fc0af6`), rejoue la suite complète.

**2. Merge vers `main`.** L'auto-déploiement est actif sur le service cible :
le push suffit, **ne déclenche pas de déploiement manuel**. Attends la fin du
déploiement et vérifie `/health`.

**3. Active `PURGE_ENABLED=true`** sur `srv-d6cq3hi4d50c73aa1rkg`
**uniquement**. Pas sur ` fb-ads-saas`. Attends le redémarrage.

**4. Compte**, via `POST /api/admin/purge/count`. Consigne les huit chiffres :
ils sont la seule trace de ce qui va disparaître.

**5. Purge**, via `POST /api/admin/purge/execute` avec la confirmation
`PURGE-TOTALE-11-10-2026`.

**6. Recompte.** Tables visées à zéro, tables protégées inchangées.

**7. Vérifie le dashboard** : liste des leads vide, aucune erreur à l'écran.

**8. Retire immédiatement**, sans attendre d'ordre :
   - `PURGE_ENABLED` supprimée du service
   - fichier `routes/purge-temp.js` supprimé, son montage retiré de
     `server.js`, merge et déploiement
   - vérifie que les deux routes répondent 404

## Interdits

- **Ne touche jamais à ` fb-ads-saas`** (`srv-d7139du3jp1c7390flq0`), ni à sa
  base, ni à ses variables, ni à son déploiement
- Aucune suppression côté Facebook : les leads restent chez Meta
- Aucune table hors périmètre
- Aucune donnée personnelle dans les logs ni le rapport : des nombres
- Si une étape échoue : arrêt, rapport, aucune réparation dans l'urgence

## Ton rapport

Format D-013, référence `CODE-017`, en remplacement intégral.

PREUVES : les huit chiffres avant et après, l'identifiant du service touché,
le hash des deux merges, et la confirmation que les routes répondent 404 à la
fin.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-017
```

ou

```
MISSION NON TERMINÉE — CODE-017
```

— Pilote, facebook-ads
