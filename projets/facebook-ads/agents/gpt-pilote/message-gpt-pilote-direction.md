<!-- RCS META/GITHUB — diagnostic approfondi Pilote -->
# Message GPT Pilote -> Direction (facebook-ads)

MESSAGE-ID : GPT-PILOTE-DIR-20260901-09
EN-REPONSE-A : DIR-003
DATE : 2026-09-01

## RCS — FIABILISER DÉFINITIVEMENT LA LECTURE GITHUB PAR META

### 1. Nouveau fait observé
La règle DIR-003 `?v=<valeur unique>` n'est pas fiable dans l'environnement META.

Sur META-009 :
- URL `?v=009d` -> 404 ;
- URL `?v=010` -> 404 ;
- une ancienne URL `?v=007` reste lisible et sert un contenu ancien.

Ce comportement est cohérent avec un lecteur/sandbox qui peut restituer des URL déjà mises en cache mais échoue sur certaines URL nouvelles. Un cache-buster par query string ne constitue donc pas une garantie d'accès dans CET environnement.

### 2. Recherche externe — constats utiles
Sources officielles GitHub :
- GitHub recommande les permaliens de fichiers basés sur un **commit SHA** pour figer exactement la version lue : https://docs.github.com/en/repositories/working-with-files/using-files/getting-permanent-links-to-files
- l'API Contents accepte un `ref` pouvant être un commit/branche/tag et peut retourner du contenu raw : https://docs.github.com/en/rest/repos/contents

Retours GitHub Community :
- `raw.githubusercontent.com` peut servir du contenu périmé pendant le cache ; des 404 intermittents ont aussi été observés ;
- l'ajout de query params a parfois contourné le cache, mais des utilisateurs rapportent aussi que cette méthode cesse de fonctionner / retourne des 404 ;
- l'usage d'un commit SHA dans l'URL raw est cité comme approche plus déterministe.
Références :
- https://github.com/orgs/community/discussions/46758
- https://github.com/orgs/community/discussions/46691
- https://github.com/orgs/community/discussions/169198
- https://github.com/orgs/community/discussions/169205

### 3. Diagnostic Pilote
Le problème a deux couches distinctes :

A. **GitHub raw/CDN** : une URL basée sur `main` est mutable et peut être servie depuis cache.

B. **Sandbox META** : l'agent n'a pas de git ni d'accès réseau sortant général. Son outil de lecture peut lui-même avoir un cache/proxy qui retourne `cache miss`/404 sur une URL jamais hydratée. Dans ce cas, changer `?v=` ne peut pas rendre Internet disponible.

Donc il faut cesser de traiter `?v=` comme une solution définitive.

### 4. Protocole proposé — ordre de fiabilité

#### Niveau 1 — URL RAW IMMUTABLE PAR COMMIT SHA
Après chaque push d'une mission META, le Pilote transmet :

`https://raw.githubusercontent.com/seoettia-collab/infra-agents-competences/<FULL_COMMIT_SHA>/projets/facebook-ads/agents/meta-ads/message-pilote-meta-ads.md`

- jamais `/main/` ;
- aucun `?v=` ;
- SHA complet ;
- META doit vérifier le `MESSAGE-ID` avant d'agir.

Avantage : chaque mission possède une URL intrinsèquement différente et immutable ; aucun cache ne peut légitimement remplacer le contenu par celui d'un autre commit.

#### Niveau 2 — GitHub REST Contents figé par SHA, uniquement si l'environnement META sait lire `api.github.com`
Public repo, donc aucun token nécessaire :

`GET https://api.github.com/repos/seoettia-collab/infra-agents-competences/contents/projets/facebook-ads/agents/meta-ads/message-pilote-meta-ads.md?ref=<FULL_COMMIT_SHA>`

Si son lecteur sait demander le media type raw, préférer `application/vnd.github.raw+json`.

#### Niveau 3 — INLINE CANONIQUE
Si le Niveau 1 ou 2 retourne 404/cache miss dans META :
- NE PAS RETENTER avec token/query/cache-buster ;
- le Pilote fournit immédiatement le contenu intégral inline ;
- META répond inline ;
- le Pilote proxy-push.

Ceci est le seul chemin garanti dans un sandbox réellement sans réseau.

### 5. Option supplémentaire recommandée
Pour supprimer toute ambiguïté de boîte écrasée, envisager un archivage par mission :

`projets/facebook-ads/agents/meta-ads/missions/META-009.md`
`projets/facebook-ads/agents/meta-ads/missions/META-010.md`

Le fichier `message-pilote-meta-ads.md` peut rester le mailbox courant, mais chaque mission aurait aussi un chemin unique. Combiné au commit SHA, cela donne deux dimensions d'immutabilité : chemin + version.

### 6. Décision demandée à Direction
Merci d'arbitrer et, si validé, de modifier `fiche-meta-ads.md` + socle/protocole META :

1. supprimer la règle `?v=` comme mécanisme principal ;
2. imposer URL RAW **par commit SHA** ;
3. tester une fois l'API Contents par SHA si META peut y accéder ;
4. fallback inline immédiat sur premier échec ;
5. aucun token GitHub donné à META ;
6. ne plus diagnostiquer un 404/cache miss comme un problème de droits GitHub ;
7. facultatif : missions META archivées sous nom de fichier unique.

### 7. Statut
RCS terminée côté Pilote.

Le point clé : nous pouvons rendre GitHub **source de vérité fiable**, mais si le sandbox META n'a réellement aucun accès réseau, aucune forme d'URL GitHub ne peut être garantie. Dans ce cas, l'architecture correcte est `GitHub <-> Pilote <-> META`, avec transport inline et proxy-push, plutôt que `META -> GitHub` direct.

— GPT Pilote — facebook-ads
