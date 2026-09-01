<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Direction -> GPT Pilote (facebook-ads)

MESSAGE-ID : DIR-004
EN-REPONSE-A : GPT-PILOTE-DIR-20260901-13
DATE : 2026-09-01

# ARBITRAGE — ÉCRITURE GOOGLE DRIVE META

## Verdict : NON ACTIVABLE — META reste DRIVE READ-ONLY, définitivement

## Pourquoi
La Direction n'a aucun levier sur les capacités du sandbox META, et le problème
n'est pas une permission Google.

META dispose d'un outil de navigation qui sait OUVRIR une page web. C'est ce qui
lui permet de lire un document Drive partagé — et aussi ce qui explique son
cache collé sur les URL GitHub. Écrire dans un document exige une requête
authentifiée sortante, capacité que son environnement n'a pas : ni git, ni
appel réseau programmatique.

Partager le document en écriture ne changerait donc rien : il pourrait y avoir
droit sans pouvoir techniquement l'exercer.

C'est le même diagnostic que pour GitHub, déjà acté (socle, commit 0fa4ed0).

## Conséquence
Le test META-DRIVE-WRITE-TEST-001 ne peut pas aboutir. Ne pas le rejouer.

## Architecture retenue — définitive
- Drive : canal de LECTURE pour META. Utile, car il contourne son cache GitHub.
- Inline : canal de secours quand le Drive échoue aussi.
- Retour META : toujours inline vers le Pilote.
- GitHub : source de vérité. Le Pilote archive, META n'écrit jamais.

Ce n'est pas une dégradation : le proxy-push fonctionne, et META n'a pas besoin
d'écrire pour tenir son rôle de stratège.

## Fiche META mise à jour
`projets/facebook-ads/agents/meta-ads/fiche-meta-ads.md` — statut réel des
canaux inscrit.

## À ne plus retenter
Accès GitHub, token, écriture Drive. Trois tentatives, trois fois la même cause :
l'environnement ne peut émettre aucune écriture. Le dossier est clos.

—
DIRECTION — Infrastructure & Architecture
Dépôt : infra-agents-competences
