# Étape B — Création des modèles Mongoose

## 1. Objectif

Créer les modèles Mongoose nécessaires pour représenter les données du projet Port Russell dans MongoDB.

Un modèle Mongoose définit la structure des documents, leurs types de données et les règles de validation.

## 2. Organisation des fichiers

Les modèles sont regroupés dans le dossier `models/`.

* `models/catway.js` : modèle des catways.
* `models/reservation.js` : modèle des réservations.
* `models/user.js` : modèle des utilisateurs.

## 3. Modèle Catway

Le fichier `models/catway.js` définit les caractéristiques d'un catway.

Les champs sont :

* `catwayNumber` : numéro du catway, obligatoire, entier positif et unique.
* `catwayType` : type du catway, limité aux valeurs `long` et `short`.
* `catwayState` : description de l'état du catway, obligatoire.

Le numéro du catway permet d'identifier le catway dans les routes de l'API.

## 4. Modèle Reservation

Le fichier `models/reservation.js` définit les informations d'une réservation.

Les champs sont :

* `catwayNumber` : numéro du catway réservé.
* `clientName` : nom du client.
* `boatName` : nom du bateau.
* `startDate` : date de début de la réservation.
* `endDate` : date de fin de la réservation.

Le champ `boatName` est directement intégré à la réservation. Aucun modèle `Boat` indépendant n'est nécessaire dans l'implémentation actuelle.

Le contrôle de cohérence entre les dates, notamment la vérification que la date de fin est postérieure à la date de début, est également effectué dans l'API des réservations.

## 5. Modèle User

Le fichier `models/user.js` définit la structure des utilisateurs.

Les champs comprennent :

* `username` : nom d'utilisateur.
* `email` : adresse électronique, obligatoire et unique après normalisation.
* `password` : mot de passe soumis à une longueur minimale de huit caractères.

Le modèle prépare la structure des données utilisateur. Il ne constitue pas, à lui seul, un système complet d'inscription ou d'authentification.

## 6. Rôle de Mongoose

Mongoose permet notamment :

* de définir les champs des documents ;
* de préciser leurs types ;
* de rendre certains champs obligatoires ;
* de définir des valeurs autorisées ;
* d'appliquer des validations ;
* d'interagir avec les collections MongoDB à travers les modèles.

Les modèles sont utilisés par les contrôleurs pour lire, créer, modifier et supprimer les données.

## 7. Tests et vérifications

Les modèles ont été vérifiés au cours du développement.

Les contrôles portent notamment sur :

* la structure des données ;
* les champs obligatoires ;
* les valeurs autorisées pour le type de catway ;
* l'unicité du numéro de catway ;
* l'unicité de l'adresse électronique ;
* la longueur minimale du mot de passe.

Les validations propres aux requêtes HTTP sont également traitées dans les contrôleurs de l'API.

## 8. Bilan

Les trois modèles Mongoose sont en place : `Catway`, `Reservation` et `User`.

Ils définissent les structures de données nécessaires à la suite du projet. L'étape suivante consiste à préparer les données initiales et à les importer dans MongoDB.
