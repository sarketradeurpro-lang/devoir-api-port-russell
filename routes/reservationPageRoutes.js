const express = require('express');
const router = express.Router();
const reservationPageController = require('../controllers/reservationPageController');

router.get('/', reservationPageController.list);
router.get('/new', reservationPageController.form);
router.post('/', reservationPageController.create);
router.get('/:id/edit', reservationPageController.form);
router.post('/:id/edit', reservationPageController.update);
router.post('/:id/delete', reservationPageController.remove);
router.get('/:id', reservationPageController.details);

module.exports = router;
