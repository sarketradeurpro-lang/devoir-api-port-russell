/**

* @file Routes des réservations associées aux catways.
  */

const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/:id/reservations', reservationController.getReservations);

router.get('/:id/reservations/:idReservation', reservationController.getReservation);

router.post('/:id/reservations', reservationController.createReservation);

router.put('/:id/reservations/:idReservation', reservationController.updateReservation);

router.delete('/:id/reservations/:idReservation', reservationController.deleteReservation);

module.exports = router;
