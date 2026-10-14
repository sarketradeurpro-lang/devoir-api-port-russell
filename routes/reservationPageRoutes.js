/**
 * Routes de l'interface web de gestion des réservations.
 *
 * Ces routes permettent d'afficher la liste et les détails des réservations,
 * de créer une réservation, de modifier une réservation existante
 * et de la supprimer.
 *
 * Les traitements sont délégués à reservationPageController.
 *
 * @module routes/reservationPageRoutes
 */
const express = require('express');
const router = express.Router();
const reservationPageController = require('../controllers/reservationPageController');

// Afficher la liste des réservations.
router.get('/', reservationPageController.list);

// Afficher le formulaire de création.
router.get('/new', reservationPageController.form);

// Créer une réservation.
router.post('/', reservationPageController.create);

// Afficher le formulaire de modification.
router.get('//edit', reservationPageController.form);

// Enregistrer les modifications d'une réservation.
router.post('//edit', reservationPageController.update);

// Supprimer une réservation.
router.post('//delete', reservationPageController.remove);

// Afficher les détails d'une réservation.
router.get('/', reservationPageController.details);

module.exports = router;
