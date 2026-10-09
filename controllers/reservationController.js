/**
 * @file Contrôleur des réservations liées aux catways.
 * Les routes sont montées sur /catways/:id/reservations,
 * où :id est le numéro du catway.
 */

const Catway = require('../models/catway');
const Reservation = require('../models/reservation');

/**
 * Convertit le paramètre d'URL :id en numéro de catway.
 * @param {string} param - Valeur brute de req.params.id
 * @returns {number|null} Le numéro (entier >= 1), ou null s'il est invalide
 */
function parseCatwayNumber(param) {
  const number = Number(param);
  return Number.isInteger(number) && number >= 1 ? number : null;
}

/**
 * Transforme une erreur en réponse HTTP claire.
 * @param {Error} err - Erreur capturée
 * @param {import('express').Response} res - Réponse Express
 * @returns {import('express').Response} La réponse envoyée (400 ou 500)
 */
function handleError(err, res) {
  // Erreur de validation du modèle (champ manquant, date invalide...)
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({
      message: 'Données invalides',
      errors: messages
    });
  }

  // Valeur impossible à convertir (identifiant mal formé, par exemple)
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Identifiant ou valeur invalide'
    });
  }

  // Toute autre erreur : on ne montre pas les détails au client
  console.error(err);
  return res.status(500).json({
    message: 'Erreur interne du serveur'
  });
}

/**
 * Vérifie le numéro de catway de l'URL et charge le catway.
 * Si quelque chose ne va pas, envoie elle-même la réponse d'erreur.
 * @param {import('express').Request} req - Requête Express (req.params.id)
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<{number: number, catway: Object}|null>}
 *          Le numéro et le catway, ou null si une erreur a été envoyée
 */
async function loadCatway(req, res) {
  const number = parseCatwayNumber(req.params.id);

  if (number === null) {
    res.status(400).json({
      message: 'Le numéro de catway doit être un entier positif'
    });
    return null;
  }

  const catway = await Catway.findOne({ catwayNumber: number });

  if (!catway) {
    res.status(404).json({
      message: 'Catway introuvable'
    });
    return null;
  }

  return { number, catway };
}

/**
 * GET /catways/:id/reservations : liste les réservations d'un catway.
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express (200, 400 ou 404)
 * @returns {Promise<void>}
 */
exports.getReservations = async (req, res) => {
  try {
    const loaded = await loadCatway(req, res);
    if (!loaded) return;

    const reservations = await Reservation.find({
      catwayNumber: loaded.number
    }).sort({ startDate: 1 });

    return res.status(200).json(reservations);
  } catch (err) {
    return handleError(err, res);
  }
};

/**
 * GET /catways/:id/reservations/:idReservation : détails d'une réservation.
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express (200, 400 ou 404)
 * @returns {Promise<void>}
 */
exports.getReservation = async (req, res) => {
  try {
    const loaded = await loadCatway(req, res);
    if (!loaded) return;

    const reservation = await Reservation.findOne({
      _id: req.params.idReservation,
      catwayNumber: loaded.number
    });

    if (!reservation) {
      return res.status(404).json({
        message: 'Réservation introuvable pour ce catway'
      });
    }

    return res.status(200).json(reservation);
  } catch (err) {
    return handleError(err, res);
  }
};

/**
 * POST /catways/:id/reservations : crée une réservation.
 * Le numéro du catway vient de l'URL, jamais du body.
 * @param {import('express').Request} req - Requête Express (body : clientName, boatName, startDate, endDate)
 * @param {import('express').Response} res - Réponse Express (201, 400 ou 404)
 * @returns {Promise<void>}
 */
exports.createReservation = async (req, res) => {
  try {
    const loaded = await loadCatway(req, res);
    if (!loaded) return;

    const {
      clientName,
      boatName,
      startDate,
      endDate
    } = req.body;

    // La fin doit venir après le début
    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({
        message: 'La date de fin doit être postérieure à la date de début'
      });
    }

    const reservation = await Reservation.create({
      catwayNumber: loaded.number,
      clientName,
      boatName,
      startDate,
      endDate
    });

    return res.status(201).json(reservation);
  } catch (err) {
    return handleError(err, res);
  }
};

/**
 * PUT /catways/:id/reservations/:idReservation : modifie une réservation.
 * Modifiables : clientName, boatName, startDate, endDate.
 * Le numéro du catway ne peut pas changer.
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express (200, 400 ou 404)
 * @returns {Promise<void>}
 */
exports.updateReservation = async (req, res) => {
  try {
    const loaded = await loadCatway(req, res);
    if (!loaded) return;

    const reservation = await Reservation.findOne({
      _id: req.params.idReservation,
      catwayNumber: loaded.number
    });

    if (!reservation) {
      return res.status(404).json({
        message: 'Réservation introuvable pour ce catway'
      });
    }

    const {
      catwayNumber,
      clientName,
      boatName,
      startDate,
      endDate
    } = req.body;

    // Un numéro différent de celui de l'URL est refusé
    if (
      catwayNumber !== undefined &&
      Number(catwayNumber) !== loaded.number
    ) {
      return res.status(400).json({
        message: 'Le numéro du catway ne peut pas être modifié ici'
      });
    }

    // On ne change que les champs envoyés
    if (clientName !== undefined) reservation.clientName = clientName;
    if (boatName !== undefined) reservation.boatName = boatName;
    if (startDate !== undefined) reservation.startDate = startDate;
    if (endDate !== undefined) reservation.endDate = endDate;

    // La fin doit venir après le début
    if (reservation.endDate <= reservation.startDate) {
      return res.status(400).json({
        message: 'La date de fin doit être postérieure à la date de début'
      });
    }

    // save() applique la validation complète du modèle
    await reservation.save();

    return res.status(200).json(reservation);
  } catch (err) {
    return handleError(err, res);
  }
};

/**
 * DELETE /catways/:id/reservations/:idReservation : supprime une réservation.
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express (200, 400 ou 404)
 * @returns {Promise<void>}
 */
exports.deleteReservation = async (req, res) => {
  try {
    const loaded = await loadCatway(req, res);
    if (!loaded) return;

    const reservation = await Reservation.findOneAndDelete({
      _id: req.params.idReservation,
      catwayNumber: loaded.number
    });

    if (!reservation) {
      return res.status(404).json({
        message: 'Réservation introuvable pour ce catway'
      });
    }

    return res.status(200).json({
      message: 'Réservation supprimée'
    });
  } catch (err) {
    return handleError(err, res);
  }
};