# Étape D — Création de l'API REST des catways

## 1. Objectif

Créer une API REST permettant de consulter, créer, modifier et supprimer les catways du port Russell.

L'API utilise Express pour gérer les requêtes HTTP et Mongoose pour interagir avec MongoDB.

## 2. Organisation des fichiers

Les fichiers principaux de cette étape sont :

* `routes/catwayRoutes.js` : définit les routes HTTP des catways.
* `controllers/catwayController.js` : contient la logique de traitement des requêtes.
* `models/catway.js` : définit la structure des données d'un catway.
* `app.js` : monte les routes sur l'application Express.

Les routes des catways sont accessibles à partir du chemin `/catways`.

## 3. Les routes de l'API

### GET /catways

Récupère la liste des catways enregistrés dans MongoDB.

### GET /catways/:id

Récupère un catway à partir de son numéro.

Le paramètre `:id` correspond au champ `catwayNumber`, et non à l'identifiant MongoDB `_id`.

### POST /catways

Crée un nouveau catway.

Les données envoyées doivent respecter la structure et les validations du modèle `Catway`.

### PUT /catways/:id

Modifie l'état d'un catway existant.

Cette route permet de mettre à jour le champ `catwayState` du catway identifié par son numéro.

### DELETE /catways/:id

Supprime un catway à partir de son numéro.

## 4. Fonctionnement des contrôleurs

Le contrôleur `catwayController.js` traite les requêtes reçues par les routes.

Il utilise le modèle `Catway` pour effectuer les opérations sur MongoDB.

Les principales opérations sont :

* lecture de tous les catways ;
* recherche d'un catway par son numéro ;
* création d'un catway ;
* modification de son état ;
* suppression d'un catway.

Les contrôleurs renvoient des réponses HTTP adaptées au résultat de l'opération.

## 5. Gestion des erreurs

L'API prend notamment en compte les situations suivantes :

* numéro de catway invalide ;
* catway inexistant ;
* données envoyées invalides ;
* erreur lors d'une opération sur MongoDB.

Les réponses utilisent notamment les codes HTTP suivants :

* `200 OK` : requête exécutée avec succès ;
* `201 Created` : catway créé ;
* `400 Bad Request` : données ou paramètre invalide ;
* `404 Not Found` : catway introuvable ;
* `500 Internal Server Error` : erreur interne du serveur.

## 6. Tests réalisés

Les opérations principales ont été testées :

* récupération de la liste des catways ;
* récupération d'un catway par son numéro ;
* création d'un catway temporaire ;
* modification de son état ;
* suppression du catway temporaire.

Le catway de test portant le numéro `9999` a été créé, modifié puis supprimé.

Après les tests, la base contenait toujours les **24 catways initiaux**.

## 7. Bilan

L'API REST des catways permet d'effectuer les opérations CRUD :

* **Create** : créer ;
* **Read** : lire ;
* **Update** : modifier ;
* **Delete** : supprimer.

Les routes et contrôleurs sont opérationnels et les tests réalisés ont confirmé le bon fonctionnement des principales opérations.

## 8. Git

* **Commit :** `fb5cb00`
* **Message :** `Étape D : API REST des catways`
