/**
 * @file Contrôleur d'authentification des utilisateurs.
 */

const bcrypt = require('bcrypt');
const User = require('../models/user');

/**
 * Connecte un utilisateur et crée sa session.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      if (req.is('application/x-www-form-urlencoded')) {
        return res.redirect('/?error=champs');
      }

      return res.status(400).json({
        message: 'Adresse e-mail et mot de passe obligatoires.'
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase()
    }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      if (req.is('application/x-www-form-urlencoded')) {
        return res.redirect('/?error=identifiants');
      }

      return res.status(401).json({
        message: 'Adresse e-mail ou mot de passe incorrect.'
      });
    }

    await new Promise((resolve, reject) => {
      req.session.regenerate((error) => {
        if (error) {
          return reject(error);
        }

        resolve();
      });
    });

    req.session.user = {
      id: user._id.toString(),
      username: user.username,
      email: user.email
    };

    await new Promise((resolve, reject) => {
      req.session.save((error) => {
        if (error) {
          return reject(error);
        }

        resolve();
      });
    });

    return res.redirect('/dashboard');
  } catch (error) {
    return next(error);
  }
};

/**
 * Déconnecte l'utilisateur et détruit sa session.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.logout = (req, res, next) => {
  if (!req.session) {
    return res.redirect('/');
  }

  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }

    res.clearCookie('connect.sid', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    });

    return res.redirect('/');
  });
};