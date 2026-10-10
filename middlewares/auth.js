/**
 * @file Middleware de vérification de l'authentification.
 */

/**
 * Autorise uniquement les utilisateurs connectés.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }

  return res.redirect('/');
};

module.exports = isAuthenticated;