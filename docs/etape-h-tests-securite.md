# Étape H — Interfaces utilisateur, tests fonctionnels et sécurité

## 1. Objectif

Cette étape consiste à créer les interfaces web de l’application Port de Plaisance Russell avec EJS, à les relier aux contrôleurs et aux routes Express, à intégrer la documentation interactive de l’API et à assurer la protection des accès privés.

## 2. Interfaces utilisateur EJS

Les vues sont regroupées dans le dossier `views/`. Le moteur de rendu EJS est configuré dans `app.js`.

### 2.1 Page d’accueil et connexion

Fichier : `views/index.ejs`

La page d’accueil présente l’interface de connexion. Elle permet d’afficher un message d’erreur lorsqu’une tentative de connexion échoue.

### 2.2 Tableau de bord

Fichier : `views/dashboard.ejs`

La route `/dashboard` affiche le tableau de bord de l’utilisateur connecté. Les informations transmises à la vue comprennent les données de l’utilisateur et les réservations en cours récupérées dans MongoDB.

Le tableau de bord constitue le point d’entrée des principales fonctionnalités de gestion.

### 2.3 Gestion des Catways

Vues :
- `views/catways.ejs` : liste des catways.
- `views/catway-detail.ejs` : détail d’un catway.
- `views/catway-form.ejs` : formulaire de création ou de modification.

Fichiers associés :
- `controllers/catwayPageController.js`
- `routes/catwayPageRoutes.js`
- `public/css/catways.css`

Les interfaces web utilisent le préfixe `/catways-page`, distinct des routes de l’API REST sous `/catways`.

### 2.4 Gestion des réservations

Vue : `views/reservations.ejs`

Fichiers associés :
- `controllers/reservationPageController.js`
- `routes/reservationPageRoutes.js`
- `public/css/reservations.css`

Cette interface permet de consulter les réservations depuis l’application web.

### 2.5 Gestion des utilisateurs

Vue : `views/users.ejs`

Fichiers associés :
- `controllers/userPageController.js`
- `routes/userPageRoutes.js`
- `public/css/users.css`

L’interface de gestion des utilisateurs est accessible sous le préfixe `/users-page`, distinct de l’API REST `/users`.

## 3. Navigation et styles CSS

Les fichiers communs sont :
- `views/partials/header.ejs` : en-tête commun de navigation.
- `public/css/style.css` : styles généraux.
- `public/css/dashboard.css` : styles du tableau de bord.

Les fichiers `catways.css`, `reservations.css` et `users.css` regroupent les styles propres aux interfaces correspondantes.

Cette organisation sépare la structure des pages, la logique des contrôleurs et la présentation visuelle.

## 4. Séparation des routes web et REST

Les routes de l’interface web et celles de l’API REST ont des responsabilités distinctes.

Les routes web rendent les vues EJS et permettent la navigation dans l’application. Les routes REST exposent les opérations de gestion des ressources au format adapté à l’API.

Les routeurs des pages sont déclarés dans `app.js`. Leur protection dépend du middleware d’authentification et de l’ordre de montage des routes.

## 5. Authentification et sessions

L’authentification repose sur une session Express.

Les routes d’authentification comprennent :
- `POST /login` : authentification de l’utilisateur.
- `GET /logout` : déconnexion de l’utilisateur.

Le contrôleur d’authentification recherche le compte à partir de l’adresse e-mail et vérifie le mot de passe à l’aide de `bcrypt`.

Après une connexion réussie, la session est régénérée et les informations nécessaires à l’identification de l’utilisateur y sont enregistrées.

Lors de la déconnexion, la session est détruite et l’utilisateur est redirigé vers la page de connexion.

La configuration de session utilise `express-session` et le stockage MongoDB prévu dans l’application.

## 6. Protection des routes privées

Le middleware `middlewares/auth.js` vérifie la présence de `req.session.user`.

Les routes privées doivent être protégées afin qu’un utilisateur non authentifié ne puisse pas accéder aux pages de gestion ni aux ressources de l’API qui nécessitent une connexion.

Un utilisateur non connecté est redirigé vers la page d’accueil lorsqu’il tente d’accéder à une route web privée.

La protection des routes web et celle de l’API doivent être considérées séparément, car leurs réponses attendues peuvent différer.

## 7. Protection des mots de passe

La gestion des utilisateurs repose sur le contrôleur `controllers/userController.js`.

Les mots de passe sont hachés avec `bcrypt` lors de leur création ou de leur modification. Les réponses des opérations de gestion des utilisateurs ne doivent pas exposer les mots de passe ni leurs hachages.

Les données utilisateur doivent également être validées avant leur enregistrement.

## 8. Documentation interactive de l’API

Fichier de configuration : `config/swagger.js`

La documentation interactive est intégrée dans `app.js` à l’aide de `swagger-ui-express` et est accessible à l’adresse `/api-docs`.

La configuration OpenAPI décrit les routes documentées, leurs paramètres et les formats de données attendus.

La documentation Swagger complète la documentation écrite du projet et facilite la consultation de l’API pendant le développement et les tests.

## 9. Tests fonctionnels consignés

Les résultats suivants figuraient dans le suivi de l’étape H :

| Test | Résultat consigné |
|---|---|
| Connexion avec des identifiants valides | Réussi |
| Refus d’un mot de passe incorrect | Réussi |
| Redirection vers le tableau de bord après connexion | Réussi |
| Déconnexion et retour à la page de connexion | Réussi |
| Blocage de `/dashboard` après déconnexion | Réussi |
| Blocage de `/users` sans connexion | Réussi |
| Blocage de `/catways` sans connexion | Réussi |
| Blocage de `/catways/1/reservations` sans connexion | Réussi |

Ces résultats sont rapportés à partir du suivi existant du projet. Ils ne constituent pas, à eux seuls, une preuve que toutes les routes et toutes les situations possibles ont été testées.

## 10. Bilan de l’étape H

L’étape H regroupe les éléments suivants :

- Création des vues EJS de l’application.
- Création des contrôleurs dédiés aux interfaces web.
- Création des routeurs des pages Catways, réservations et utilisateurs.
- Mise en place des styles CSS généraux et spécifiques.
- Intégration de l’authentification et des sessions.
- Protection des accès privés par middleware.
- Intégration de la documentation interactive Swagger.
- Consignation des tests fonctionnels et de sécurité réalisés.

Les fichiers de cette étape sont organisés de manière à séparer les vues, les contrôleurs, les routes, les styles et la configuration de la documentation API.


### 10.1 Boutons de retour au tableau de bord

Un lien « ← Retour au tableau de bord » est intégré aux interfaces de gestion des Catways, des réservations et des utilisateurs.

Ce lien pointe vers `/dashboard` et permet à l’utilisateur de revenir directement au tableau de bord depuis chacune de ces pages.

Le bouton utilise les classes CSS communes `button` et `button-secondary`. Les styles de ce bouton sont harmonisés entre les interfaces afin de conserver une présentation cohérente.

Cette navigation complète le menu commun défini dans `views/partials/header.ejs`.

## 11. Conclusion

L’étape H porte sur les interfaces utilisateur, leur intégration à l’application Express, l’authentification, la protection des accès et la documentation interactive de l’API.

Ce document récapitule les éléments développés et les tests consignés pour cette étape. Il ne prétend pas constituer un audit de sécurité exhaustif.

La validation globale du projet et la préparation de sa livraison restent distinctes de la documentation de cette étape.
