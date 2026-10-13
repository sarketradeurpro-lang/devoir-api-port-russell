/**
 * @file Contrôleur des pages EJS de gestion des catways.
 */

const Catway = require('../models/catway');
const Reservation = require('../models/reservation');

/**
 * Convertit un numéro de catway en entier valide.
 * @param {string} value
 * @returns {number|null}
 */
function parseCatwayNumber(value) {
  const number = Number(value);
  return Number.isInteger(number) && number >= 1 ? number : null;
}

/**
 * Affiche la liste des catways.
 */
exports.list = async (req, res, next) => {
  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 });

    return res.render('catways', {
      catways,
      error: req.query.error || null,
      success: req.query.success || null
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Affiche le formulaire de création.
 */
exports.newForm = (req, res) => {
  return res.render('catway-form', {
    mode: 'create',
    catway: {},
    error: null
  });
};

/**
 * Crée un catway.
 */
exports.create = async (req, res, next) => {
  try {
    const catwayNumber = parseCatwayNumber(req.body.catwayNumber);
    const catwayType = req.body.catwayType;
    const catwayState = typeof req.body.catwayState === 'string'
      ? req.body.catwayState.trim()
      : '';

    if (catwayNumber === null) {
      return res.status(400).render('catway-form', {
        mode: 'create',
        catway: req.body,
        error: 'Le numéro doit être un entier supérieur ou égal à 1.'
      });
    }

    await Catway.create({ catwayNumber, catwayType, catwayState });

    return res.redirect('/catways-page?success=Catway%20créé%20avec%20succès');
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).render('catway-form', {
        mode: 'create',
        catway: req.body,
        error: 'Ce numéro de catway existe déjà.'
      });
    }

    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).render('catway-form', {
        mode: 'create',
        catway: req.body,
        error: error.message
      });
    }

    return next(error);
  }
};

/**
 * Affiche les détails d'un catway.
 */
exports.details = async (req, res, next) => {
  try {
    const number = parseCatwayNumber(req.params.catwayNumber);

    if (number === null) {
      return res.status(400).send('Numéro de catway invalide.');
    }

    const catway = await Catway.findOne({ catwayNumber: number });

    if (!catway) {
      return res.status(404).send('Catway introuvable.');
    }

    const reservations = await Reservation.find({
      catwayNumber: number
    }).sort({ startDate: 1 });

    return res.render('catway-detail', {
      catway,
      reservations
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Affiche le formulaire de modification de l'état.
 */
exports.editForm = async (req, res, next) => {
  try {
    const number = parseCatwayNumber(req.params.catwayNumber);

    if (number === null) {
      return res.status(400).send('Numéro de catway invalide.');
    }

    const catway = await Catway.findOne({ catwayNumber: number });

    if (!catway) {
      return res.status(404).send('Catway introuvable.');
    }

    return res.render('catway-form', {
      mode: 'edit',
      catway,
      error: null
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Modifie uniquement l'état du catway.
 */
exports.update = async (req, res, next) => {
  try {
    const number = parseCatwayNumber(req.params.catwayNumber);

    if (number === null) {
      return res.status(400).send('Numéro de catway invalide.');
    }

    const catway = await Catway.findOne({ catwayNumber: number });

    if (!catway) {
      return res.status(404).send('Catway introuvable.');
    }

    const catwayState = typeof req.body.catwayState === 'string'
      ? req.body.catwayState.trim()
      : '';

    catway.catwayState = catwayState;
    await catway.save();

    return res.redirect('/catways-page?success=État%20du%20catway%20modifié');
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send(error.message);
    }

    return next(error);
  }
};

/**
 * Supprime un catway uniquement s'il n'a aucune réservation.
 */
exports.remove = async (req, res, next) => {
  try {
    const number = parseCatwayNumber(req.params.catwayNumber);

    if (number === null) {
      return res.redirect('/catways-page?error=Numéro%20de%20catway%20invalide');
    }

    const catway = await Catway.findOne({ catwayNumber: number });

    if (!catway) {
      return res.redirect('/catways-page?error=Catway%20introuvable');
    }

    const hasReservations = await Reservation.exists({
      catwayNumber: number
    });

    if (hasReservations) {
      return res.redirect(
        '/catways-page?error=Suppression%20refusée%20%3A%20ce%20catway%20possède%20des%20réservations'
      );
    }

    await Catway.deleteOne({ catwayNumber: number });

    return res.redirect('/catways-page?success=Catway%20supprimé');
  } catch (error) {
    return next(error);
  }
};