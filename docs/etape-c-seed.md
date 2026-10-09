# Étape C — Importation des données initiales (Seed)

## 1. Objectif

Préparer les données initiales du projet Port Russell et les importer dans MongoDB.

Cette étape permet de disposer de catways et de réservations pour tester le fonctionnement de l'API REST.

## 2. Organisation des fichiers

Les fichiers utilisés sont :

* `data/catways.json` : contient les données initiales des catways.
* `data/reservations.json` : contient les données initiales des réservations.
* `seed.js` : lit les fichiers JSON et importe les données dans MongoDB.

## 3. Données des catways

Le fichier `data/catways.json` contient **24 catways**.

Chaque catway possède les champs suivants :

* `catwayNumber` : numéro unique du catway.
* `catwayType` : type du catway, `long` ou `short`.
* `catwayState` : description de son état.

Ces données sont utilisées pour initialiser la collection des catways.

## 4. Données des réservations

Le fichier `data/reservations.json` contient **6 réservations initiales**.

Chaque réservation comporte les informations suivantes :

* `catwayNumber` : numéro du catway réservé.
* `clientName` : nom du client.
* `boatName` : nom du bateau.
* `startDate` : date de début.
* `endDate` : date de fin.

Le numéro du catway permet de rattacher la réservation au catway concerné.

## 5. Fonctionnement de seed.js

Le script `seed.js` utilise plusieurs modules :

* `mongoose` pour communiquer avec MongoDB ;
* `dotenv` pour charger les variables d'environnement ;
* `fs` pour lire les fichiers JSON ;
* `path` pour construire les chemins des fichiers.

Le script effectue les opérations suivantes :

1. Charge les variables d'environnement.
2. Vérifie la présence de la variable `MONGO_URI`.
3. Se connecte à MongoDB.
4. Lit les fichiers JSON.
5. Insère ou met à jour les catways à partir de leur numéro.
6. Ajoute les réservations initiales sans les réinsérer si elles existent déjà.
7. Ferme la connexion à la base de données.

L'utilisation d'une mise à jour par numéro pour les catways permet de réexécuter le script sans créer plusieurs documents pour un même numéro.

## 6. Exécution du script

Le script est exécuté avec la commande :

```
npm run seed
```

La commande utilise le script défini dans `package.json`.

## 7. Résultats des vérifications

L'importation a été exécutée avec succès.

Les vérifications effectuées ont confirmé les quantités suivantes :

* **24 catways** dans la base de données ;
* **6 réservations** dans la base de données.

Ces résultats confirment que les données initiales ont été importées.

## 8. Bilan

Les données initiales du projet sont disponibles dans MongoDB.

Le script `seed.js` permet de préparer la base de données avant les tests de l'API. Les collections disposent maintenant des données nécessaires à l'étape D, consacrée à l'API REST des catways.

## 9. Git

* **Commit :** `5ee9b51`
* **Message :** `Étape C : seed validé`
