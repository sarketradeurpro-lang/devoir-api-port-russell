# Étape A — Initialisation du projet Port Russell

## 1. Objectif

Préparer l'environnement du projet afin de pouvoir développer une API REST avec Node.js, Express et MongoDB.

Cette étape comprend la configuration du serveur, l'installation des dépendances, la connexion à la base de données et le nettoyage des anciens fichiers.

## 2. Technologies utilisées

* **Node.js** : exécution du JavaScript côté serveur.
* **Express** : création du serveur HTTP et gestion des routes.
* **Mongoose** : communication avec MongoDB et gestion des modèles.
* **MongoDB Atlas** : base de données distante.
* **dotenv** : chargement des variables d'environnement.
* **CORS** : gestion des requêtes entre origines différentes.
* **EJS** : moteur de rendu des pages HTML.
* **express-session** : gestion des sessions utilisateur.
* **connect-mongo** : stockage des sessions dans MongoDB.
* **bcrypt** : bibliothèque destinée au hachage des mots de passe.
* **nodemon** : redémarrage automatique du serveur pendant le développement.
* **swagger-ui-express** : dépendance prévue pour afficher une documentation Swagger.

## 3. Configuration du projet

Le fichier `app.js` constitue le point d'entrée de l'application Express.

La configuration comprend notamment :

* `express.json()` pour recevoir les données au format JSON ;
* `express.urlencoded({ extended: true })` pour traiter les données de formulaires ;
* `express.static()` pour servir les fichiers statiques ;
* EJS comme moteur de rendu ;
* CORS ;
* les sessions avec `express-session` et `connect-mongo` ;
* la connexion à MongoDB avec Mongoose.

## 4. Variables d'environnement

Le fichier `.env` contient les paramètres de configuration sensibles, notamment :

* `MONGO_URI` : chaîne de connexion à MongoDB ;
* la clé utilisée pour les sessions.

Ces informations doivent rester privées.

Le fichier `.gitignore` contient notamment :

```
node_modules/
.env
```

Cela permet d'éviter d'ajouter les dépendances installées et les variables sensibles au dépôt Git.

## 5. Installation des dépendances complémentaires

Les dépendances ajoutées pendant cette étape sont :

```
npm install bcrypt express-session connect-mongo swagger-ui-express
```

Les autres dépendances du projet sont déclarées dans `package.json`.

## 6. Connexion à MongoDB

L'application utilise Mongoose pour se connecter à MongoDB grâce à la variable d'environnement `MONGO_URI`.

La connexion a été testée avec succès. Le message obtenu était :

```
Connecté à MongoDB avec succès !
```

## 7. Démarrage du serveur

Le serveur de développement est lancé avec la commande :

```
npm run dev
```

Le serveur démarre avec la configuration du port définie dans le projet.

## 8. Nettoyage de l'ancienne ressource Boat

Les anciens fichiers associés à une ressource indépendante `Boat` ont été supprimés :

* `controllers/boatController.js`
* `models/boatModel.js`
* `routes/boatRoutes.js`

Le champ `boatName` reste présent dans le modèle `Reservation`. Il représente le nom du bateau associé à une réservation et ne nécessite pas de modèle `Boat` indépendant dans l'implémentation actuelle.

## 9. Git

Les modifications de cette étape ont été enregistrées dans Git.

* **Commit :** `a9ad33d`
* **Message :** `Initialisation du projet Port Russell`

## 10. Bilan

L'environnement du projet est initialisé. Les dépendances sont installées, la configuration du serveur est en place et la connexion à MongoDB a été vérifiée.

Le projet est prêt pour la création des modèles Mongoose à l'étape B.
