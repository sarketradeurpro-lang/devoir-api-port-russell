# Étape J — Déploiement et validation en production

## 1. Objectif

Cette étape consiste à déployer l'application Port de Plaisance Russell sur un hébergement en ligne et à vérifier son fonctionnement en environnement de production.

## 2. Hébergement

L'application est hébergée sur Render.

- **Nom du service :** `devoir-api-port-russell`
- **Région :** Frankfurt
- **Commande de démarrage :** `node app.js`
- **Commande d'installation :** `npm install`
- **Statut :** déploiement réussi lors des vérifications.

### URL de l'application

https://devoir-api-port-russell-mum2.onrender.com

### Documentation Swagger

https://devoir-api-port-russell-mum2.onrender.com/api-docs

### Dépôt GitHub

https://github.com/sarketradeurpro-lang/devoir-api-port-russell

## 3. Variables d'environnement

Les variables nécessaires au fonctionnement de l'application sont configurées dans Render :

- `MONGO_URI` : chaîne de connexion à MongoDB Atlas.
- `SESSION_SECRET` : secret utilisé pour sécuriser les sessions.
- `NODE_ENV` : environnement de production.

L'application utilise également la variable `PORT` fournie par l'environnement d'hébergement.

Les valeurs confidentielles ne doivent pas être publiées dans le dépôt GitHub ni dans cette documentation.

## 4. Base de données MongoDB Atlas

La base de données de production est hébergée sur MongoDB Atlas.

Après les ajustements de configuration et d'accès réseau, la connexion entre Render et MongoDB Atlas a été vérifiée.

### Restriction de l'accès réseau

Les deux plages d'adresses IP indiquées dans Render ont été ajoutées à la liste d'accès réseau de MongoDB Atlas :

- `74.220.51.0/24`
- `74.220.59.0/24`

La règle générale `0.0.0.0/0`, qui autorisait les connexions depuis toutes les adresses IPv4, a été supprimée.

L'adresse IP personnelle peut être conservée pour les connexions directes depuis l'ordinateur de développement, si nécessaire.

**Point de vigilance :** les deux autorisations Render ont une durée maximale configurée d'une semaine. Il faut surveiller leur expiration et les renouveler si nécessaire. Les plages d'adresses doivent être vérifiées dans les informations actuelles de Render avant toute modification.

## 5. Tests effectués en production

Les vérifications suivantes ont été réalisées sur le site hébergé :

- [x] Le déploiement Render est réussi.
- [x] L'application en ligne est accessible.
- [x] La connexion avec le compte de test fonctionne.
- [x] Le tableau de bord s'affiche.
- [x] Les pages Catways, Réservations et Utilisateurs fonctionnent.
- [x] La documentation Swagger est accessible.
- [x] La connexion à MongoDB Atlas fonctionne après restriction de l'accès réseau.
- [x] L'application fonctionne toujours après la suppression de la règle `0.0.0.0/0`.

Ces tests valident les fonctionnalités vérifiées, sans constituer un test exhaustif de toutes les routes de l'API.

## 6. Sécurité

Les mesures suivantes sont appliquées :

- Les secrets de production sont stockés dans les variables d'environnement de Render.
- Les mots de passe des utilisateurs ne doivent pas être affichés dans les interfaces.
- Les pages privées nécessitent une session authentifiée.
- L'accès réseau à MongoDB Atlas est limité aux plages autorisées.
- La règle générale `0.0.0.0/0` a été supprimée.

## 7. Conclusion

L'application Port de Plaisance Russell a été déployée sur Render. Les principaux parcours de l'interface, l'authentification, l'accès au tableau de bord, la documentation Swagger et la connexion à MongoDB Atlas ont été vérifiés en production.

La surveillance et le renouvellement des autorisations réseau Render restent nécessaires avant leur expiration.

**Statut de l'étape J : déploiement réalisé et vérifications principales validées.**