
/**
 * Documentation OpenAPI des routes de l'API Port de Plaisance Russell.
 * Ce fichier est lu par swagger-jsdoc.
 */

/**
 * @swagger
 * /catways:
 *   get:
 *     tags:
 *       - Catways
 *     summary: Liste tous les catways
 *     responses:
 *       '200':
 *         description: Liste des catways récupérée avec succès.
 *   post:
 *     tags:
 *       - Catways
 *     summary: Crée un catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catwayNumber
 *               - catwayType
 *               - catwayState
 *             properties:
 *               catwayNumber:
 *                 type: integer
 *                 example: 25
 *               catwayType:
 *                 type: string
 *                 enum:
 *                   - long
 *                   - short
 *                 example: long
 *               catwayState:
 *                 type: string
 *                 example: Disponible
 *     responses:
 *       '201':
 *         description: Catway créé.
 *       '400':
 *         description: Données invalides.
 *       '409':
 *         description: Ce numéro de catway existe déjà.
 *
 * /catways/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: Numéro du catway.
 *       schema:
 *         type: integer
 *   get:
 *     tags:
 *       - Catways
 *     summary: Récupère un catway
 *     responses:
 *       '200':
 *         description: Catway récupéré.
 *       '400':
 *         description: Numéro invalide.
 *       '404':
 *         description: Catway introuvable.
 *   put:
 *     tags:
 *       - Catways
 *     summary: Modifie l'état d'un catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catwayState
 *             properties:
 *               catwayState:
 *                 type: string
 *                 example: Disponible
 *     responses:
 *       '200':
 *         description: État du catway modifié.
 *       '400':
 *         description: Données invalides.
 *       '404':
 *         description: Catway introuvable.
 *   delete:
 *     tags:
 *       - Catways
 *     summary: Supprime un catway
 *     responses:
 *       '200':
 *         description: Catway supprimé.
 *       '400':
 *         description: Numéro invalide.
 *       '404':
 *         description: Catway introuvable.
 */

/**
 * @swagger
 * /catways/{id}/reservations:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: Numéro du catway.
 *       schema:
 *         type: integer
 *   get:
 *     tags:
 *       - Réservations
 *     summary: Liste les réservations d'un catway
 *     responses:
 *       '200':
 *         description: Liste des réservations récupérée.
 *       '404':
 *         description: Catway introuvable.
 *   post:
 *     tags:
 *       - Réservations
 *     summary: Crée une réservation pour un catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientName
 *               - boatName
 *               - startDate
 *               - endDate
 *             properties:
 *               clientName:
 *                 type: string
 *                 example: Jean Dupont
 *               boatName:
 *                 type: string
 *                 example: Le Marin
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: '2026-11-01'
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: '2026-11-07'
 *     responses:
 *       '201':
 *         description: Réservation créée.
 *       '400':
 *         description: Données invalides ou dates incorrectes.
 *       '404':
 *         description: Catway introuvable.
 *
 * /catways/{id}/reservations/{idReservation}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: Numéro du catway.
 *       schema:
 *         type: integer
 *     - in: path
 *       name: idReservation
 *       required: true
 *       description: Identifiant de la réservation.
 *       schema:
 *         type: string
 *   get:
 *     tags:
 *       - Réservations
 *     summary: Récupère une réservation d'un catway
 *     responses:
 *       '200':
 *         description: Réservation récupérée.
 *       '404':
 *         description: Catway ou réservation introuvable.
 *   put:
 *     tags:
 *       - Réservations
 *     summary: Modifie une réservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientName:
 *                 type: string
 *               boatName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       '200':
 *         description: Réservation modifiée.
 *       '400':
 *         description: Données invalides.
 *       '404':
 *         description: Catway ou réservation introuvable.
 *   delete:
 *     tags:
 *       - Réservations
 *     summary: Supprime une réservation
 *     responses:
 *       '200':
 *         description: Réservation supprimée.
 *       '404':
 *         description: Catway ou réservation introuvable.
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Utilisateurs
 *     summary: Liste les utilisateurs
 *     responses:
 *       '200':
 *         description: Liste des utilisateurs récupérée. Les mots de passe ne sont pas exposés.
 *   post:
 *     tags:
 *       - Utilisateurs
 *     summary: Crée un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: Jean Dupont
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jean@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: MotDePasse123
 *     responses:
 *       '201':
 *         description: Utilisateur créé. La réponse ne contient pas le mot de passe.
 *       '400':
 *         description: Données invalides.
 *       '409':
 *         description: Cette adresse e-mail existe déjà.
 *
 * /users/{email}:
 *   parameters:
 *     - in: path
 *       name: email
 *       required: true
 *       description: Adresse e-mail de l'utilisateur, encodée dans l'URL.
 *       schema:
 *         type: string
 *         format: email
 *   get:
 *     tags:
 *       - Utilisateurs
 *     summary: Récupère un utilisateur par son e-mail
 *     responses:
 *       '200':
 *         description: Utilisateur récupéré sans son mot de passe.
 *       '404':
 *         description: Utilisateur introuvable.
 *   put:
 *     tags:
 *       - Utilisateurs
 *     summary: Modifie un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *     responses:
 *       '200':
 *         description: Utilisateur modifié sans exposer son mot de passe.
 *       '400':
 *         description: Données invalides.
 *       '404':
 *         description: Utilisateur introuvable.
 *       '409':
 *         description: Cette adresse e-mail existe déjà.
 *   delete:
 *     tags:
 *       - Utilisateurs
 *     summary: Supprime un utilisateur
 *     responses:
 *       '200':
 *         description: Utilisateur supprimé.
 *       '404':
 *         description: Utilisateur introuvable.
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Authentification
 *     summary: Connecte un utilisateur
 *     description: Authentifie un utilisateur à partir de son adresse e-mail et de son mot de passe.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jean@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: MotDePasse123
 *     responses:
 *       '200':
 *         description: Connexion réussie.
 *       '400':
 *         description: Données de connexion manquantes ou invalides.
 *       '401':
 *         description: Identifiants incorrects.
 *
 * /logout:
 *   get:
 *     tags:
 *       - Authentification
 *     summary: Déconnecte l'utilisateur
 *     description: Termine la session de l'utilisateur connecté.
 *     responses:
 *       '200':
 *         description: Déconnexion effectuée.
 */
