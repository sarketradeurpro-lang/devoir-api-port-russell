/**
 * @file Contrôleur des pages EJS de gestion des utilisateurs.
 */

const bcrypt = require('bcrypt');
const User = require('../models/user');

const PAGE = '/users-page';

/**
 * Normalise une adresse e-mail.
 * @param {string} email
 * @returns {string}
 */
function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

/**
 * Vérifie si l'utilisateur demandé correspond au compte connecté.
 * @param {import('express').Request} req
 * @param {import('mongoose').Document} user
 * @returns {boolean}
 */
function isCurrentUser(req, user) {
  return Boolean(
    req.session?.user?.id &&
    user._id.toString() === req.session.user.id
  );
}

/**
 * Affiche la liste des utilisateurs sans leurs mots de passe.
 */
exports.list = async (req, res, next) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ username: 1 });

    return res.render('users', {
      mode: 'list',
      users,
      user: null,
      formData: {},
      currentUserId: req.session.user.id,
      error: req.query.error || null,
      success: req.query.success || null
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Affiche les détails d'un utilisateur.
 */
exports.details = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: normalizeEmail(req.params.email)
    }).select('-password');

    if (!user) {
      return res.redirect(
        `${PAGE}?error=${encodeURIComponent('Utilisateur introuvable.')}`
      );
    }

    return res.render('users', {
      mode: 'details',
      users: [],
      user,
      formData: {},
      currentUserId: req.session.user.id,
      isCurrentUser: isCurrentUser(req, user),
      error: null,
      success: null
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Affiche le formulaire de création ou de modification.
 */
exports.form = async (req, res, next) => {
  try {
    const isEdit = Boolean(req.params.email);
    let user = null;

    if (isEdit) {
      user = await User.findOne({
        email: normalizeEmail(req.params.email)
      }).select('-password');

      if (!user) {
        return res.redirect(
          `${PAGE}?error=${encodeURIComponent('Utilisateur introuvable.')}`
        );
      }
    }

    return res.render('users', {
      mode: isEdit ? 'edit' : 'create',
      users: [],
      user,
      formData: user
        ? { username: user.username, email: user.email }
        : {},
      currentUserId: req.session.user.id,
      isCurrentUser: user ? isCurrentUser(req, user) : false,
      error: req.query.error || null,
      success: null
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Crée un utilisateur et hache son mot de passe.
 */
exports.create = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !username.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.redirect(
        `${PAGE}/new?error=${encodeURIComponent('Tous les champs sont obligatoires.')}`
      );
    }

    if (username.trim().length < 2 || password.length < 8) {
      return res.redirect(
        `${PAGE}/new?error=${encodeURIComponent('Le nom doit contenir au moins 2 caractères et le mot de passe au moins 8 caractères.')}`
      );
    }

    const normalizedEmail = normalizeEmail(email);
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.redirect(
        `${PAGE}/new?error=${encodeURIComponent('Cette adresse e-mail est déjà utilisée.')}`
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username: username.trim(),
      email: normalizedEmail,
      password: hashedPassword
    });

    return res.redirect(
      `${PAGE}?success=${encodeURIComponent('Utilisateur créé avec succès.')}`
    );
  } catch (error) {
    if (error.code === 11000) {
      return res.redirect(
        `${PAGE}/new?error=${encodeURIComponent('Cette adresse e-mail est déjà utilisée.')}`
      );
    }

    if (error.name === 'ValidationError') {
      return res.redirect(
        `${PAGE}/new?error=${encodeURIComponent(error.message)}`
      );
    }

    return next(error);
  }
};

/**
 * Modifie un utilisateur. Un mot de passe vide reste inchangé.
 */
exports.update = async (req, res, next) => {
  try {
    const originalEmail = normalizeEmail(req.params.email);
    const user = await User.findOne({ email: originalEmail });

    if (!user) {
      return res.redirect(
        `${PAGE}?error=${encodeURIComponent('Utilisateur introuvable.')}`
      );
    }

    const { username, email, password } = req.body;

    if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      !username.trim() ||
      !email.trim()
    ) {
      return res.redirect(
        `${PAGE}/${encodeURIComponent(originalEmail)}/edit?error=${encodeURIComponent('Le nom et l’adresse e-mail sont obligatoires.')}`
      );
    }

    if (username.trim().length < 2) {
      return res.redirect(
        `${PAGE}/${encodeURIComponent(originalEmail)}/edit?error=${encodeURIComponent('Le nom doit contenir au moins 2 caractères.')}`
      );
    }

    if (password !== undefined && password !== '') {
      if (typeof password !== 'string' || password.length < 8) {
        return res.redirect(
          `${PAGE}/${encodeURIComponent(originalEmail)}/edit?error=${encodeURIComponent('Le nouveau mot de passe doit contenir au moins 8 caractères.')}`
        );
      }

      user.password = await bcrypt.hash(password, 10);
    }

    const normalizedEmail = normalizeEmail(email);
    const existingUser = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: user._id }
    });

    if (existingUser) {
      return res.redirect(
        `${PAGE}/${encodeURIComponent(originalEmail)}/edit?error=${encodeURIComponent('Cette adresse e-mail est déjà utilisée.')}`
      );
    }

    user.username = username.trim();
    user.email = normalizedEmail;

    await user.save();

    if (isCurrentUser(req, user)) {
      req.session.user.username = user.username;
      req.session.user.email = user.email;
    }

    return res.redirect(
      `${PAGE}?success=${encodeURIComponent('Utilisateur modifié avec succès.')}`
    );
  } catch (error) {
    if (error.code === 11000) {
      return res.redirect(
        `${PAGE}/${encodeURIComponent(req.params.email)}/edit?error=${encodeURIComponent('Cette adresse e-mail est déjà utilisée.')}`
      );
    }

    if (error.name === 'ValidationError') {
      return res.redirect(
        `${PAGE}/${encodeURIComponent(req.params.email)}/edit?error=${encodeURIComponent(error.message)}`
      );
    }

    return next(error);
  }
};

/**
 * Affiche la confirmation de suppression.
 */
exports.confirmDelete = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: normalizeEmail(req.params.email)
    }).select('-password');

    if (!user) {
      return res.redirect(
        `${PAGE}?error=${encodeURIComponent('Utilisateur introuvable.')}`
      );
    }

    if (isCurrentUser(req, user)) {
      return res.redirect(
        `${PAGE}?error=${encodeURIComponent('Vous ne pouvez pas supprimer votre propre compte.')}`
      );
    }

    return res.render('users', {
      mode: 'delete',
      users: [],
      user,
      formData: {},
      currentUserId: req.session.user.id,
      isCurrentUser: false,
      error: null,
      success: null
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Supprime un utilisateur après vérification des protections.
 */
exports.remove = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: normalizeEmail(req.params.email)
    });

    if (!user) {
      return res.redirect(
        `${PAGE}?error=${encodeURIComponent('Utilisateur introuvable.')}`
      );
    }

    if (isCurrentUser(req, user)) {
      return res.redirect(
        `${PAGE}?error=${encodeURIComponent('Vous ne pouvez pas supprimer votre propre compte.')}`
      );
    }

    const userCount = await User.countDocuments();

    if (userCount <= 1) {
      return res.redirect(
        `${PAGE}?error=${encodeURIComponent('Impossible de supprimer le dernier compte utilisateur.')}`
      );
    }

    await User.deleteOne({ _id: user._id });

    return res.redirect(
      `${PAGE}?success=${encodeURIComponent('Utilisateur supprimé avec succès.')}`
    );
  } catch (error) {
    return next(error);
  }
};
