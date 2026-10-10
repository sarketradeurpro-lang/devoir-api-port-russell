/**
 * @file Routes d'authentification des utilisateurs.
 */

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authRoutesController');

router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;