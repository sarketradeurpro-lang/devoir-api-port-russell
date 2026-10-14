/**
 * @file Contrôleur des pages EJS de gestion des réservations.
 */

const Catway = require('../models/catway');
const Reservation = require('../models/reservation');

const PAGE = '/reservations-page';

/**
 * Convertit un identifiant MongoDB en chaîne valide.
 */
function isValidObjectId(value) {
  return /^[a-f\d]{24}$/i.test(value);
}

/**
 * Affiche la liste des réservations et des catways.
 *
 * @param {import('express').Request} req - Requête HTTP Express.
 * @param {import('express').Response} res - Réponse HTTP Express.
 * @param {import('express').NextFunction} next - Gestionnaire d'erreurs Express.
 * @returns {Promise<void>} Affiche la page ou transmet l'erreur.
 */
exports.list = async (req, res, next) => {
  try {
    const [reservations, catways] = await Promise.all([
      Reservation.find().sort({ startDate: 1 }),
      Catway.find().sort({ catwayNumber: 1 })
    ]);

    return res.render('reservations', {
      mode: 'list',
      reservations,
      catways,
      reservation: null,
      error: req.query.error || null,
      success: req.query.success || null,
      selectedCatway: req.query.catway || ''
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Affiche les détails d'une réservation après validation de son identifiant.
 *
 * @param {import('express').Request} req - Requête contenant l'identifiant.
 * @param {import('express').Response} res - Réponse HTTP Express.
 * @param {import('express').NextFunction} next - Gestionnaire d'erreurs Express.
 * @returns {Promise<void>} Affiche les détails ou transmet l'erreur.
 */
exports.details = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.redirect(`${PAGE}?error=Identifiant%20invalide`);
    }

    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.redirect(`${PAGE}?error=Réservation%20introuvable`);
    }

    const catway = await Catway.findOne({
      catwayNumber: reservation.catwayNumber
    });

    return res.render('reservations', {
      mode: 'details',
      reservations: [],
      catways: [],
      reservation,
      catway,
      error: null,
      success: null,
      selectedCatway: ''
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Affiche le formulaire de création ou de modification d'une réservation.
 *
 * @param {import('express').Request} req - Requête contenant éventuellement l'identifiant.
 * @param {import('express').Response} res - Réponse HTTP Express.
 * @param {import('express').NextFunction} next - Gestionnaire d'erreurs Express.
 * @returns {Promise<void>} Affiche le formulaire ou transmet l'erreur.
 */
exports.form = async (req, res, next) => {
  try {
    const isEdit = Boolean(req.params.id);
    let reservation = null;

    if (isEdit) {
      if (!isValidObjectId(req.params.id)) {
        return res.redirect(`${PAGE}?error=Identifiant%20invalide`);
      }

      reservation = await Reservation.findById(req.params.id);

      if (!reservation) {
        return res.redirect(`${PAGE}?error=Réservation%20introuvable`);
      }
    }

    const catways = await Catway.find({
      catwayNumber: { $ne: 6 }
    }).sort({ catwayNumber: 1 });

    return res.render('reservations', {
      mode: isEdit ? 'edit' : 'create',
      reservations: [],
      catways,
      reservation,
      error: null,
      success: null,
      selectedCatway: ''
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Crée une réservation après validation des données reçues.
 *
 * @param {import('express').Request} req - Requête contenant les données de réservation.
 * @param {import('express').Response} res - Réponse HTTP Express.
 * @param {import('express').NextFunction} next - Gestionnaire d'erreurs Express.
 * @returns {Promise<void>} Redirige selon le résultat ou transmet l'erreur.
 */
exports.create = async (req, res, next) => {
  try {
    const catwayNumber = Number(req.body.catwayNumber);
    const { clientName, boatName, startDate, endDate } = req.body;

    if (
      !Number.isInteger(catwayNumber) ||
      catwayNumber < 1 ||
      catwayNumber === 6
    ) {
      return res.redirect(
        `${PAGE}/new?error=Catway%20invalide%20ou%20indisponible`
      );
    }

    if (
      !clientName?.trim() ||
      !boatName?.trim() ||
      !startDate ||
      !endDate ||
      new Date(endDate) <= new Date(startDate)
    ) {
      return res.redirect(
        `${PAGE}/new?error=Vérifiez%20les%20champs%20et%20les%20dates`
      );
    }

    const catway = await Catway.findOne({ catwayNumber });

    if (!catway) {
      return res.redirect(`${PAGE}/new?error=Catway%20introuvable`);
    }

    await Reservation.create({
      catwayNumber,
      clientName: clientName.trim(),
      boatName: boatName.trim(),
      startDate,
      endDate
    });

    return res.redirect(
      `${PAGE}?success=Réservation%20créée%20avec%20succès`
    );
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.redirect(`${PAGE}/new?error=Données%20invalides`);
    }

    return next(error);
  }
};

/**
 * Modifie les informations d'une réservation existante sans changer son catway.
 *
 * @param {import('express').Request} req - Requête contenant l'identifiant et les données.
 * @param {import('express').Response} res - Réponse HTTP Express.
 * @param {import('express').NextFunction} next - Gestionnaire d'erreurs Express.
 * @returns {Promise<void>} Redirige selon le résultat ou transmet l'erreur.
 */
exports.update = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.redirect(`${PAGE}?error=Identifiant%20invalide`);
    }

    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.redirect(`${PAGE}?error=Réservation%20introuvable`);
    }

    const { clientName, boatName, startDate, endDate } = req.body;

    if (
      !clientName?.trim() ||
      !boatName?.trim() ||
      !startDate ||
      !endDate ||
      new Date(endDate) <= new Date(startDate)
    ) {
      return res.redirect(
        `${PAGE}/${reservation._id}/edit?error=Vérifiez%20les%20champs%20et%20les%20dates`
      );
    }

    reservation.clientName = clientName.trim();
    reservation.boatName = boatName.trim();
    reservation.startDate = startDate;
    reservation.endDate = endDate;

    await reservation.save();

    return res.redirect(
      `${PAGE}?success=Réservation%20modifiée%20avec%20succès`
    );
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.redirect(`${PAGE}?error=Données%20invalides`);
    }

    return next(error);
  }
};

/**
 * Supprime une réservation existante après validation de son identifiant.
 *
 * @param {import('express').Request} req - Requête contenant l'identifiant de la réservation.
 * @param {import('express').Response} res - Réponse HTTP Express.
 * @param {import('express').NextFunction} next - Gestionnaire d'erreurs Express.
 * @returns {Promise<void>} Redirige selon le résultat ou transmet l'erreur.
 */
exports.remove = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.redirect(`${PAGE}?error=Identifiant%20invalide`);
    }

    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation) {
      return res.redirect(`${PAGE}?error=Réservation%20introuvable`);
    }

    return res.redirect(
      `${PAGE}?success=Réservation%20supprimée%20avec%20succès`
    );
  } catch (error) {
    return next(error);
  }
};
