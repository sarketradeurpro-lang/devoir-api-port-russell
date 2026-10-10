# Étape F — API REST des utilisateurs

## 1. Objectif

Cette étape consiste à développer l’API REST permettant de gérer les utilisateurs du projet Port Russell avec Express.js et MongoDB via Mongoose.

## 2. Fichiers concernés

* `app.js` : activation des routes utilisateurs.
* `routes/users.js` : définition des routes REST.
* `controllers/userController.js` : logique de gestion des utilisateurs.
* `models/user.js` : schéma Mongoose des utilisateurs.
* `package.json` et `package-lock.json` : ajout de la dépendance `bcrypt`.

## 3. Routes disponibles

| Méthode | Route           | Fonction                            |
| ------- | --------------- | ----------------------------------- |
| GET     | `/users`        | Récupérer la liste des utilisateurs |
| POST    | `/users`        | Créer un utilisateur                |
| GET     | `/users/:email` | Récupérer un utilisateur par e-mail |
| PUT     | `/users/:email` | Modifier un utilisateur             |
| DELETE  | `/users/:email` | Supprimer un utilisateur            |

## 4. Modèle utilisateur

Le modèle `User` contient les champs suivants :

* `username` : obligatoire, au moins 2 caractères, espaces extérieurs supprimés.
* `email` : obligatoire, format contrôlé, converti en minuscules et unique.
* `password` : obligatoire, au moins 8 caractères et exclu des résultats Mongoose par défaut grâce à `select: false`.

## 5. Validations et sécurité

Le contrôleur vérifie les données reçues lors de la création et de la modification d’un utilisateur.

Les mots de passe sont hachés avec `bcrypt` avant leur enregistrement dans MongoDB. Un mot de passe en clair n’est donc pas enregistré par le contrôleur.

Les réponses de création, de consultation et de modification ne renvoient pas le mot de passe.

Les erreurs sont gérées avec des codes HTTP adaptés, notamment :

* `200` : opération réussie.
* `201` : utilisateur créé.
* `400` : données invalides.
* `404` : utilisateur introuvable.
* `409` : adresse e-mail déjà utilisée.
* `500` : erreur interne du serveur.

## 6. Tests effectués

Les vérifications suivantes ont été réalisées :

* Vérification syntaxique de `app.js`, `models/user.js`, `routes/users.js` et `controllers/userController.js` avec `node --check`.
* Vérification de l’installation de `bcrypt` avec `npm ls bcrypt`.
* Récupération de la liste des utilisateurs.
* Modification du nom et de l’adresse e-mail d’un utilisateur.
* Rejet d’un mot de passe trop court lors d’une modification.
* Création d’un deuxième utilisateur.
* Rejet d’une adresse e-mail déjà utilisée.
* Suppression d’un utilisateur.
* Vérification des réponses `404` pour un utilisateur inexistant.

Les tests réalisés ont confirmé le fonctionnement de ces opérations et de leurs principales validations.

## 7. Conclusion

L’API REST des utilisateurs est intégrée à l’application Express sous le préfixe `/users`. Les principales opérations CRUD, les validations de données et le hachage des mots de passe sont implémentés.

**Statut :** étape F réalisée et vérifications principales effectuées. La documentation est créée avant l’enregistrement final de l’étape dans Git.
