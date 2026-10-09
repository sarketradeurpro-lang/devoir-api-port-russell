# Étape E — Création de l'API REST des réservations

## 1. Objectif

Créer une API REST permettant de consulter, créer, modifier et supprimer les réservations associées aux catways du port Russell.

L'API utilise Express pour gérer les requêtes HTTP et Mongoose pour accéder aux données stockées dans MongoDB.

## 2. Organisation des fichiers

Les fichiers principaux de cette étape sont :

* `routes/reservationRoutes.js` : définit les routes HTTP des réservations.
* `controllers/reservationController.js` : contient la logique de traitement des requêtes.
* `models/reservation.js` : définit la structure des données d'une réservation.
* `models/catway.js` : permet de vérifier l'existence du catway concerné.
* `app.js` : monte les routes sur l'application Express.

Les routes des réservations sont accessibles sous le chemin `/catways`.

## 3. Structure d'une réservation

Une réservation contient les champs suivants :

* `catwayNumber` : numéro du catway réservé ;
* `clientName` : nom du client ;
* `boatName` : nom du bateau ;
* `startDate` : date de début de la réservation ;
* `endDate` : date de fin de la réservation.

Le champ `boatName` fait partie de la réservation. Il ne correspond pas à une ressource `Boat` indépendante.

## 4. Les routes de l'API

### GET /catways/:id/reservations

Récupère la liste des réservations associées à un catway.

Les réservations sont triées par date de début.

### GET /catways/:id/reservations/:idReservation

Récupère une réservation précise associée au catway demandé.

### POST /catways/:id/reservations

Crée une nouvelle réservation pour le catway indiqué.

### PUT /catways/:id/reservations/:idReservation

Modifie une réservation existante sans permettre de la rattacher à un autre catway par cette opération.

### DELETE /catways/:id/reservations/:idReservation

Supprime une réservation précise.

## 5. Signification des paramètres

Dans les routes :

* `:id` représente le numéro du catway ;
* `:idReservation` représente l'identifiant MongoDB `_id` de la réservation.

Cette distinction permet de rechercher une réservation au sein du catway concerné.

## 6. Contrôles et validations

Les contrôleurs vérifient notamment :

* que le numéro du catway est un entier positif ;
* que le catway existe dans MongoDB ;
* que la réservation demandée existe ;
* que les données envoyées respectent les validations prévues ;
* que la date de fin est postérieure à la date de début.

Ces contrôles permettent de limiter les requêtes invalides et de renvoyer des réponses adaptées.

## 7. Gestion des erreurs HTTP

L'API utilise notamment les codes suivants :

* `200 OK` : opération réussie ;
* `201 Created` : réservation créée ;
* `400 Bad Request` : paramètre ou données invalides ;
* `404 Not Found` : catway ou réservation introuvable ;
* `500 Internal Server Error` : erreur interne du serveur.

## 8. Tests réalisés

Les principales opérations ont été testées :

* récupération des réservations d'un catway ;
* consultation d'une réservation précise ;
* création d'une réservation temporaire ;
* modification de cette réservation ;
* suppression de la réservation temporaire ;
* vérification de son absence après suppression.

Les tests ont confirmé le fonctionnement des principales routes de l'API.

## 9. Bilan

L'API REST des réservations est opérationnelle.

Elle permet de gérer les réservations associées aux catways tout en vérifiant l'existence du catway et la cohérence des données.

Les étapes A à E couvrent maintenant l'initialisation du projet, les modèles Mongoose, l'importation des données et les API REST des catways et des réservations.

## 10. Git

* **Commit :** `4e1c26a`
* **Message :** `Étape E : API REST des réservations`
