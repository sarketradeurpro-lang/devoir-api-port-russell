# Étape G — Authentification et gestion des sessions

## 1. Objectif

Cette étape ajoute l'authentification des utilisateurs et la protection des routes privées de l'API Port Russell.

Elle permet de connecter un utilisateur avec son adresse e-mail et son mot de passe, de conserver son état de connexion dans une session et de le déconnecter.

## 2. Fichiers concernés

- `app.js` : configuration de l'application Express, du middleware de session et des routes.
- `controllers/authRoutesController.js` : logique de connexion et de déconnexion.
- `routes/authRoutes.js` : routes HTTP d'authentification.
- `middlewares/auth.js` : middleware de protection des routes privées.
- `package.json` et `package-lock.json` : dépendances du projet.

## 3. Dépendances

La gestion des sessions repose sur les packages suivants :

- `express-session` : gestion des sessions HTTP.
- `connect-mongo` : stockage des sessions dans MongoDB.
- `bcrypt` : comparaison du mot de passe fourni avec son empreinte enregistrée.

Les mots de passe ne doivent pas être stockés en clair dans la base de données.

## 4. Routes d'authentification

### POST /login

Cette route vérifie l'adresse e-mail et le mot de passe transmis par l'utilisateur.

- Si les champs sont absents ou invalides, la requête JSON reçoit une réponse HTTP 400.
- Si les identifiants sont incorrects, la requête JSON reçoit une réponse HTTP 401.
- Si les identifiants sont valides, une nouvelle session est créée, les informations utiles de l'utilisateur y sont enregistrées, puis le navigateur est redirigé vers `/dashboard`.

### GET /logout

Cette route détruit la session de l'utilisateur, supprime le cookie de session et redirige le navigateur vers la page d'accueil.

## 5. Protection des routes privées

Le middleware `middlewares/auth.js` vérifie la présence d'un utilisateur dans la session.

- Un utilisateur connecté peut accéder aux routes privées protégées par ce middleware.
- Un utilisateur non connecté est redirigé vers `/`.

Les routes de l'API des catways, des réservations et des utilisateurs sont montées après ce middleware dans `app.js`.

## 6. Sécurité des sessions

La configuration utilise un stockage MongoDB pour les sessions et des options de cookie adaptées, notamment `httpOnly` et l'option `secure` en environnement de production.

La session est régénérée lors d'une connexion réussie afin de limiter le risque de fixation de session.

La variable d'environnement `SESSION_SECRET` doit être définie dans le fichier `.env`. Ce fichier ne doit pas être ajouté au dépôt Git.

## 7. Tests effectués

Les tests suivants ont été réalisés manuellement :

- Vérification de la syntaxe des fichiers JavaScript concernés.
- Tentative d'accès à une route privée sans connexion : redirection HTTP 302 vers `/`.
- Connexion avec un compte de test valide : redirection HTTP 302 vers `/dashboard`.
- Accès à une route privée avec la session créée : réponse HTTP 200.
- Déconnexion : redirection HTTP 302 vers `/`.
- Nouvelle tentative d'accès à une route privée après déconnexion : redirection HTTP 302 vers `/`.
- Connexion avec un mot de passe incorrect : réponse HTTP 401 et message d'identifiants incorrects.

Ces tests valident le fonctionnement principal de l'authentification et des sessions. Ils ne constituent pas une suite de tests automatisés.

## 8. État à la fin de l'étape

L'authentification et la protection des routes privées sont implémentées et les tests manuels ci-dessus ont réussi.

La page d'accueil EJS et le tableau de bord `/dashboard` restent à réaliser à l'étape H.
