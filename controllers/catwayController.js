/**
 * @file Controller des catways : logique des opérations CRUD.
 */

const Catway = require('../models/catway');

/**
 * Convertit le paramètre d'URL :id en numéro de catway.
 * @param {string} param - Valeur brute de req.params.id
 * @returns {number|null} Le numéro, ou null s'il n'est pas un entier valide
 */
function parseCatwayNumber(param) {
  const number = Number(param);
  return Number.isInteger(number) ? number : null;
}

/**
 * Transforme une erreur (validation, doublon...) en réponse HTTP claire.
 * @param {Error} err - Erreur capturée
 * @param {import('express').Response} res - Réponse Express
 * @returns {import('express').Response}
 */
function handleError(err, res) {
  // Erreur de validation du modèle (type invalide, champ manquant...)
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: 'Données invalides', errors: messages });
  }
  // Doublon sur un champ unique (code 11000 de MongoDB)
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Ce numéro de catway existe déjà' });
  }
  // Toute autre erreur : on ne montre pas les détails au client
  console.error(err);
  return res.status(500).json({ message: 'Erreur interne du serveur' });
}

/**
 * GET /catways : liste tous les catways, triés par numéro.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getCatways = async (req, res) => {
  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    return res.status(200).json(catways);
  } catch (err) {
    return handleError(err, res);
  }
};

/**
 * GET /catways/:id : détails d'un catway (id = numéro du catway).
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getCatway = async (req, res) => {
  try {
    const number = parseCatwayNumber(req.params.id);
    if (number === null) {
      return res.status(400).json({ message: 'Le numéro de catway doit être un entier' });
    }

    const catway = await Catway.findOne({ catwayNumber: number });
    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }
    return res.status(200).json(catway);
  } catch (err) {
    return handleError(err, res);
  }
};

/**
 * POST /catways : crée un catway.
 * Seuls les 3 champs autorisés sont lus (protection contre les champs en trop).
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;
    const catway = await Catway.create({ catwayNumber, catwayType, catwayState });
    return res.status(201).json(catway);
  } catch (err) {
    return handleError(err, res);
  }
};

/**
 * PUT /catways/:id : modifie UNIQUEMENT l'état du catway.
 * Le numéro et le type ne sont pas modifiables : on refuse la requête.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.updateCatway = async (req, res) => {
  try {
    const number = parseCatwayNumber(req.params.id);
    if (number === null) {
      return res.status(400).json({ message: 'Le numéro de catway doit être un entier' });
    }

    // Refuse toute tentative de modifier le numéro ou le type
    if (req.body.catwayNumber !== undefined || req.body.catwayType !== undefined) {
      return res.status(400).json({
        message: 'Le numéro et le type du catway ne sont pas modifiables'
      });
    }

    const catway = await Catway.findOneAndUpdate(
      { catwayNumber: number },
      { catwayState: req.body.catwayState },
      { new: true, runValidators: true } // renvoie le document modifié + valide
    );

    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }
    return res.status(200).json(catway);
  } catch (err) {
    return handleError(err, res);
  }
};

/**
 * DELETE /catways/:id : supprime un catway.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.deleteCatway = async (req, res) => {
  try {
    const number = parseCatwayNumber(req.params.id);
    if (number === null) {
      return res.status(400).json({ message: 'Le numéro de catway doit être un entier' });
    }

    const catway = await Catway.findOneAndDelete({ catwayNumber: number });
    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    return res.status(200).json({ message: 'Catway supprimé' });
  } catch (err) {
    return handleError(err, res);
  }
};