/**
 * @file Routes des catways.
 * Ce routeur est monté sur /catways dans app.js.
 */

const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

// GET /catways : liste de tous les catways
router.get('/', catwayController.getCatways);

// GET /catways/:id : détails d'un catway (id = numéro du catway)
router.get('/:id', catwayController.getCatway);

// POST /catways : création d'un catway
router.post('/', catwayController.createCatway);

// PUT /catways/:id : modification de l'état d'un catway
router.put('/:id', catwayController.updateCatway);

// DELETE /catways/:id : suppression d'un catway
router.delete('/:id', catwayController.deleteCatway);

module.exports = router;