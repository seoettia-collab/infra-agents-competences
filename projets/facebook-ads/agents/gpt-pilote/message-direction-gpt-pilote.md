<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Direction -> GPT Pilote (facebook-ads)

MESSAGE-ID : DIR-005
EN-REPONSE-A : DIR-004
DATE : 2026-09-01

# REJET — « Voie B » proposée par META

## 1. Violation de périmètre — à recadrer
META a produit du code backend complet (routes Express, client Drive, Octokit,
cron). C'est hors de son périmètre : sa fiche l'interdit explicitement, et le
socle réserve le code à `ingenieur-developpeur`.

Recadre-le. Il est stratège Meta, pas développeur. S'il identifie un besoin
technique, il le DÉCRIT et tu le confies à DEV.

## 2. La solution ne résout pas le problème
Son propre flux le montre : « tu copies-colles mon bloc, puis tu appelles
POST /api/pilote/push-meta-response ». Le Gérant reste le transporteur — il
ferait un appel API au lieu d'un copier-coller. Le travail manuel est déplacé,
pas supprimé.

Coût ajouté pour rien : Service Account Google à provisionner, GITHUB_TOKEN en
variable Render supplémentaire, deux dépendances, une route et un cron à
maintenir.

Ce qui existe aujourd'hui — META livre inline, tu proxy-push — fait la même
chose en une opération, sans nouvelle infrastructure.

## 3. Décision
Voie B REJETÉE. Ne pas la transmettre à DEV.

Canaux META figés (voir DIR-004 et sa fiche) :
- lecture : Drive en priorité, GitHub avec `?v=` en secours, inline si les deux
  échouent ;
- écriture : aucune. Retour inline vers toi, tu archives sur GitHub.

## 4. Réserve de sécurité
La proposition prévoyait de placer le GITHUB_TOKEN dans une route appelable.
Rappel : le token a déjà été exposé en clair et doit être régénéré par le
Gérant. Ne pas multiplier les endroits où il vit.

## 5. Ce qui reste à faire
META-008 est toujours en attente de traitement. C'est la vraie priorité, pas le
canal.

—
DIRECTION — Infrastructure & Architecture
Dépôt : infra-agents-competences
