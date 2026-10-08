/**
 * @file Modèle Catway (appontement pour amarrer un bateau).
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} Catway
 * @property {number} catwayNumber - Numéro unique du catway (entier >= 1)
 * @property {'long'|'short'} catwayType - Type du catway
 * @property {string} catwayState - Description de l'état du catway
 */
const catwaySchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, 'Le numéro du catway est obligatoire'],
    unique: true,
    min: [1, 'Le numéro doit être supérieur ou égal à 1'],
    validate: {
      validator: Number.isInteger,
      message: 'Le numéro doit être un nombre entier'
    }
  },
  catwayType: {
    type: String,
    required: [true, 'Le type du catway est obligatoire'],
    enum: {
      values: ['long', 'short'],
      message: 'Le type doit être "long" ou "short"'
    }
  },
  catwayState: {
    type: String,
    required: [true, "L'état du catway est obligatoire"],
    trim: true,
    minlength: [3, "L'état doit contenir au moins 3 caractères"],
    maxlength: [500, "L'état ne doit pas dépasser 500 caractères"]
  }
});

module.exports = mongoose.model('Catway', catwaySchema);