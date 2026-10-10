/**
 * @file Modèle User.
 */
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Le nom d'utilisateur est obligatoire"],
    trim: true,
    minlength: [2, "Le nom d'utilisateur doit contenir au moins 2 caractères"]
  },
  email: {
    type: String,
    required: [true, "L'email est obligatoire"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "L'email doit être valide"]
  },
  password: {
    type: String,
    select: false,
    required: [true, "Le mot de passe est obligatoire"],
    minlength: [8, "Le mot de passe doit contenir au moins 8 caractères"]
  }
});
module.exports = mongoose.model('User', userSchema);
