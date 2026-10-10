/**
 * @file Routes REST de gestion des utilisateurs.
 */

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/**
 * GET /users
 * Liste les utilisateurs.
 */
router.get('/', userController.getUsers);

/**
 * POST /users
 * Crée un utilisateur.
 */
router.post('/', userController.createUser);

/**
 * GET /users/:email
 * Récupère un utilisateur par son adresse e-mail.
 */
router.get('/:email', userController.getUserByEmail);

/**
 * PUT /users/:email
 * Modifie un utilisateur identifié par son adresse e-mail.
 */
router.put('/:email', userController.updateUser);

/**
 * DELETE /users/:email
 * Supprime un utilisateur identifié par son adresse e-mail.
 */
router.delete('/:email', userController.deleteUser);

module.exports = router;