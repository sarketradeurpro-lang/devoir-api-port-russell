
/**
 * @file Routes des pages web de gestion des utilisateurs.
 */

const express = require('express');
const router = express.Router();
const userPageController = require('../controllers/userPageController');

router.get('/', userPageController.list);

router.get('/new', userPageController.form);
router.post('/', userPageController.create);

router.get('/:email/edit', userPageController.form);
router.post('/:email/edit', userPageController.update);

router.get('/:email/delete', userPageController.confirmDelete);
router.post('/:email/delete', userPageController.remove);

router.get('/:email', userPageController.details);

module.exports = router;
