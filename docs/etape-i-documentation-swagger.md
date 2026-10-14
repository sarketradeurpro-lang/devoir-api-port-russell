# Étape I — Documentation de l'API avec Swagger

## 1. Objectif

L'objectif de cette étape est de documenter l'API REST du Port de Plaisance Russell avec Swagger et OpenAPI.

Cette documentation permet de consulter les routes de l'API, de comprendre leur fonctionnement, de connaître les paramètres attendus et de visualiser les réponses possibles.

L'interface Swagger est accessible à l'adresse locale :

`http://localhost:3000/api-docs`

## 2. Fichiers concernés

### `config/swagger.js`

Ce fichier configure la documentation OpenAPI à l'aide de `swagger-jsdoc`.

Il définit notamment :
- le titre de l'API ;
- la version de la documentation ;
- la description de l'API ;
- l'adresse du serveur local ;
- les catégories Authentification, Catways, Réservations et Utilisateurs ;
- les fichiers analysés pour générer la documentation.

Le fichier `docs/swagger.js` a été ajouté à la liste des fichiers analysés par Swagger.

### `docs/swagger.js`

Ce fichier contient les annotations OpenAPI qui décrivent les opérations REST de l'application.

Les opérations documentées sont réparties en quatre catégories.

## 3. Opérations documentées

La documentation générée contient 17 opérations HTTP réparties sur 8 chemins.

| Catégorie | Chemin | Méthodes |
|---|---|---|
| Catways | `/catways` | GET, POST |
| Catways | `/catways/{id}` | GET, PUT, DELETE |
| Réservations | `/catways/{id}/reservations` | GET, POST |
| Réservations | `/catways/{id}/reservations/{idReservation}` | GET, PUT, DELETE |
| Utilisateurs | `/users` | GET, POST |
| Utilisateurs | `/users/{email}` | GET, PUT, DELETE |
| Authentification | `/login` | POST |
| Authentification | `/logout` | GET |

## 4. Données décrites

Les annotations documentent notamment :

- les paramètres présents dans les chemins des routes ;
- les données attendues lors de la création d'un catway ;
- la modification de l'état d'un catway ;
- les informations nécessaires à la création et à la modification d'une réservation ;
- les informations d'un utilisateur et les contraintes de mot de passe ;
- les données nécessaires à la connexion ;
- les principaux codes de réponse HTTP.

Les mots de passe ne doivent pas être exposés dans les réponses des routes utilisateurs.

## 5. Vérifications effectuées

Les vérifications suivantes ont été réalisées :

- [x] Le fichier `docs/swagger.js` existe et contient les annotations.
- [x] `config/swagger.js` inclut `./docs/swagger.js`.
- [x] Swagger génère 17 opérations HTTP sur 8 chemins.
- [x] Les quatre catégories apparaissent dans l'interface Swagger.
- [x] Les opérations HTTP sont visibles dans le navigateur.
- [x] `node --check ./docs/swagger.js` ne signale aucune erreur.
- [x] `node --check ./config/swagger.js` ne signale aucune erreur.

## 6. Accès à la documentation

L'interface Swagger est accessible à l'adresse suivante en environnement local :

`http://localhost:3000/api-docs`

Elle permet de consulter les opérations documentées et leurs paramètres.

La présence d'une opération dans Swagger ne garantit pas, à elle seule, que tous les cas d'exécution de la route ont été testés.

## 7. Bilan

La documentation Swagger de l'API Port de Plaisance Russell est générée et visible dans le navigateur.

Les opérations des catways, des réservations, des utilisateurs et de l'authentification sont documentées.

Les prochaines vérifications porteront sur la cohérence détaillée entre les réponses réellement renvoyées par les contrôleurs et celles décrites dans OpenAPI, ainsi que sur les autres exigences de livraison du projet.


## 8. README et documentation du code

### README.md

Un fichier `README.md` a été créé à la racine du projet pour présenter :

- l'objectif et les fonctionnalités de l'application ;
- les technologies utilisées ;
- les prérequis et les instructions d'installation ;
- les variables d'environnement nécessaires ;
- la commande de lancement en développement ;
- l'adresse locale de l'application et de Swagger ;
- les principales mesures de sécurité.

Le README rappelle que le fichier `.env` contient des paramètres sensibles et ne doit pas être publié sur GitHub.

### Documentation JSDoc

Les commentaires JSDoc des contrôleurs et des routes ont été vérifiés et complétés progressivement.

Les modifications récentes concernent notamment :

- `controllers/reservationPageController.js` : documentation des fonctions de gestion des réservations dans l'interface EJS, avec les paramètres Express et les valeurs de retour ;
- `routes/reservationPageRoutes.js` : ajout d'une description du routeur des pages de gestion des réservations.

Ces annotations facilitent la compréhension du rôle des fonctions et de leurs paramètres sans modifier leur fonctionnement.

### Vérifications complémentaires

- [x] `README.md` existe à la racine du projet.
- [x] `node --check ./controllers/reservationPageController.js` ne signale aucune erreur de syntaxe.
- [x] `node --check ./routes/reservationPageRoutes.js` ne signale aucune erreur de syntaxe.

La présence de ces commentaires ne remplace pas les tests fonctionnels de l'application. La vérification globale de la couverture JSDoc et la validation finale du dépôt restent à effectuer.