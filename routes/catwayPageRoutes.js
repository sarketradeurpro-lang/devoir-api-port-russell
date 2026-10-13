/**
 * @file Routes des pages EJS de gestion des catways.
 */

const express = require('express');
const router = express.Router();
const catwayPageController = require('../controllers/catwayPageController');

// La route /new doit être déclarée avant /:catwayNumber.
router.get('/', catwayPageController.list);
router.get('/new', catwayPageController.newForm);
router.post('/', catwayPageController.create);

router.get('/:catwayNumber/edit', catwayPageController.editForm);
router.post('/:catwayNumber/edit', catwayPageController.update);
router.post('/:catwayNumber/delete', catwayPageController.remove);
router.get('/:catwayNumber', catwayPageController.details);

module.exports = router;
