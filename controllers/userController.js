/**
 * @file Contrôleur de gestion des utilisateurs.
 */

const bcrypt = require('bcrypt');
const User = require('../models/user');

/**
 * Liste tous les utilisateurs sans leurs mots de passe.
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
  }
};

/**
 * Récupère un utilisateur à partir de son adresse e-mail.
 */
exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    const user = await User.findOne({ email }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération de l’utilisateur.' });
  }
};

/**
 * Crée un utilisateur en hachant son mot de passe.
 */
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !username.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return res.status(400).json({
        message: 'Le nom, l’e-mail et le mot de passe doivent être renseignés avec des valeurs valides.'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: 'Le mot de passe doit contenir au moins 8 caractères.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({ message: 'Cette adresse e-mail est déjà utilisée.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email: normalizedEmail,
      password: hashedPassword
    });

    await user.save();

    return res.status(201).json({
      message: 'Utilisateur créé avec succès.',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Cette adresse e-mail est déjà utilisée.' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur.' });
  }
};

/**
 * Modifie les informations d’un utilisateur.
 * Hache le mot de passe uniquement s’il est fourni.
 */
exports.updateUser = async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    const { username, email: newEmail, password } = req.body;

    if (
      username !== undefined &&
      (typeof username !== 'string' || !username.trim())
    ) {
      return res.status(400).json({
        message: 'Le nom doit être une chaîne de caractères non vide.'
      });
    }

    if (
      newEmail !== undefined &&
      (typeof newEmail !== 'string' || !newEmail.trim())
    ) {
      return res.status(400).json({
        message: 'L’adresse e-mail doit être une chaîne de caractères non vide.'
      });
    }

    if (password !== undefined && password !== '') {
      if (typeof password !== 'string' || password.trim().length < 8) {
        return res.status(400).json({
          message: 'Le mot de passe doit contenir au moins 8 caractères.'
        });
      }

      user.password = await bcrypt.hash(password, 10);
    }

    if (username !== undefined) {
      user.username = username;
    }

    if (newEmail !== undefined) {
      user.email = newEmail.trim().toLowerCase();
    }

    await user.save();

    return res.status(200).json({
      message: 'Utilisateur modifié avec succès.',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Cette adresse e-mail est déjà utilisée.'
      });
    }

    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({
      message: 'Erreur lors de la modification de l’utilisateur.'
    });
  }
};

/**
 * Supprime un utilisateur à partir de son adresse e-mail.
 */
exports.deleteUser = async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    return res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la suppression de l’utilisateur.' });
  }
};