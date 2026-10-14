# API Port de Plaisance Russell

## Présentation

Cette application permet de gérer les catways, les réservations et les utilisateurs du port de plaisance Russell.

Elle comprend une API REST développée avec Node.js, Express et MongoDB, ainsi qu'une interface web utilisant EJS.

## Technologies utilisées

- Node.js
- Express
- MongoDB et Mongoose
- EJS
- bcrypt pour le hachage des mots de passe
- express-session et connect-mongo pour la gestion des sessions
- Swagger pour la documentation de l'API

## Prérequis

- Node.js et npm
- Une base de données MongoDB accessible
- Un fichier `.env` configuré avec les variables nécessaires

## Installation

Cloner le dépôt Git, puis ouvrir un terminal dans le dossier du projet et exécuter :

```
npm install
```

Créer un fichier `.env` à la racine du projet avec les variables suivantes :

```
MONGO_URI=adresse_de_connexion_mongodb
SESSION_SECRET=remplacer_par_un_secret_long_et_aleatoire
NODE_ENV=development
PORT=3000
```
Remplacer les valeurs d'exemple par les valeurs adaptées à l'environnement. Ne jamais publier les véritables secrets sur GitHub.

## Lancement en développement

```
npm run dev
```

L'application est accessible à l'adresse :

[http://localhost:3000](http://localhost:3000/)

## Documentation de l'API

Lorsque le serveur est lancé, la documentation Swagger est accessible à l'adresse :

http://localhost:3000/api-docs

### Application en production

- **Application hébergée :** [https://devoir-api-port-russell-mum2.onrender.com](https://devoir-api-port-russell-mum2.onrender.com)
- **Documentation Swagger en production :** [https://devoir-api-port-russell-mum2.onrender.com/api-docs](https://devoir-api-port-russell-mum2.onrender.com/api-docs)
- **Dépôt GitHub :** [https://github.com/sarketradeurpro-lang/devoir-api-port-russell](https://github.com/sarketradeurpro-lang/devoir-api-port-russell)

## Fonctionnalités

- Authentification et déconnexion
- Gestion des catways
- Gestion des réservations
- Gestion des utilisateurs
- Protection des routes privées
- Interface web d'administration
- Documentation de l'API avec Swagger

## Sécurité

Les mots de passe sont hachés avant leur stockage. Les routes privées nécessitent une session authentifiée.

Le fichier `.env` contenant les paramètres sensibles ne doit jamais être publié sur GitHub.

## Tests et vérifications

### Vérifications réalisées en production

Les vérifications manuelles suivantes ont été effectuées sur l'application hébergée :

- Connexion au compte de test.
- Affichage du tableau de bord.
- Accès aux pages Catways, Réservations et Utilisateurs.
- Accès à la documentation Swagger.
- Vérification du fonctionnement de l'application après la restriction de l'accès réseau à MongoDB Atlas.

Ces vérifications confirment le fonctionnement des parcours testés. Elles ne constituent pas une preuve que toutes les routes de l'API ont été testées de manière exhaustive.

## Auteur

Projet réalisé dans le cadre d'une évaluation de développement d'API REST.
