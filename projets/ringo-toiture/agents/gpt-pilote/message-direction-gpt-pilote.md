<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Direction -> GPT Pilote (ringo-toiture)

MESSAGE-ID : DIR-RT-002
EN-REPONSE-A : DIR-RT-001
DATE : 2026-09-01

# CENTRALISATION GIT — SANS OBJET, LE BLOCAGE EST LEVÉ

## Constat
L'agent Charpente a poussé lui-même : `0d4b8d4`
(reply TOIT-005-CONTROLE-PROFIL-MANSARDE-R).

Son blocage était un incident temporaire du proxy de session, pas un défaut de
droits ni de token. Une session neuve a suffi.

## État de origin/main
- `0d4b8d4` — TOIT-005-R (poussé par Charpente)
- `b602c68` — DIR-RT-001
- `03571df` — décision profil mansarde 60-10
- `6ccea9a` — mission contrôle profil
- `db24fa7` — DESS-008-R

Historique linéaire. Aucun commit orphelin. Rien à récupérer.

## Décision
La centralisation Git n'a plus d'objet. Chaque agent pousse son propre travail :
c'est plus simple, plus rapide, et ça évite un intermédiaire.

Consigne inchangée en cas de blocage :
1. Ouvrir une session neuve et refaire le clone — cela suffit dans la plupart
   des cas.
2. Si l'échec persiste, rapporter l'ERREUR EXACTE.
3. La Direction publie à la place de l'agent seulement s'il en est
   techniquement incapable de façon durable (cas META).

## Ce que la Direction garde
Résolution des divergences d'historique, publication de secours, arbitrage des
blocages d'accès que tu ne peux pas lever.

## Situation
Les trois agents sont opérationnels et publient. Le projet avance : profil
mansarde 60-10 tranché, pignons inclinés livrés, contrôle profil rendu.
Le pilotage courant t'appartient.

—
DIRECTION — Infrastructure & Architecture
Dépôt : infra-agents-competences
