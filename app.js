/**
 * @file Point d'entrée de l'application Port de Plaisance Russell.
 * Configure Express, la session, le moteur EJS et la base MongoDB.
 */

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const Reservation = require('./models/reservation');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Charge les variables du fichier .env (doit être fait en premier)
dotenv.config();

const app = express();

/* -------------------------------------------------------------------------- */
/*  Middlewares                                                               */
/* -------------------------------------------------------------------------- */

// Derrière un proxy (Render, etc.), nécessaire pour les cookies sécurisés
app.set('trust proxy', 1);

// Lit le JSON et les formulaires HTML
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Autorise les appels depuis un autre domaine
app.use(cors());

// Fichiers statiques : CSS, images, JS côté navigateur
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Sessions : gardent l'utilisateur connecté entre deux pages.
 * La session est stockée dans MongoDB (pas en mémoire du serveur).
 */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,             // ne réenregistre pas si rien n'a changé
    saveUninitialized: false,  // pas de session pour un visiteur non connecté
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      httpOnly: true,                                // le JS du navigateur ne peut pas lire le cookie
      secure: process.env.NODE_ENV === 'production', // HTTPS seulement en ligne
      maxAge: 1000 * 60 * 60 * 2                     // 2 heures
    }
  })
);

/* -------------------------------------------------------------------------- */
/*  Moteur de vues EJS                                                        */
/* -------------------------------------------------------------------------- */

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* -------------------------------------------------------------------------- */
/*  Connexion à MongoDB                                                       */
/* -------------------------------------------------------------------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connecté à MongoDB avec succès !'))
  .catch((err) => console.error('Erreur de connexion MongoDB :', err));

/* Routes publiques */
app.use('/', require('./routes/authRoutes'));

// Affiche la page d'accueil et les éventuels messages d'erreur de connexion.
app.get('/', (req, res) => {
  res.render('index', {
    error: req.query.error || null
  });
});

/* Protection des routes privées */
/* Documentation interactive de l'API Swagger */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const isAuthenticated = require('./middlewares/auth');
app.use(isAuthenticated);
app.use('/catways-page', require('./routes/catwayPageRoutes'));
app.use('/reservations-page', require('./routes/reservationPageRoutes'));
app.use('/users-page', require('./routes/userPageRoutes'));

/**
 * Affiche le tableau de bord de l'utilisateur connecté.
 * Les réservations affichées sont celles dont la période
 * comprend la date actuelle.
 */
app.get('/dashboard', async (req, res, next) => {
  try {
    const now = new Date();

    const reservations = await Reservation.find({
      startDate: { $lte: now },
      endDate: { $gte: now }
    }).sort({ startDate: 1 });

    return res.render('dashboard', {
      user: req.session.user,
      reservations
    });
  } catch (error) {
    return next(error);
  }
});

/* Routes privées */
app.use('/catways', require('./routes/catwayRoutes'));
app.use('/catways', require('./routes/reservationRoutes'));
app.use('/users', require('./routes/users'));

/* -------------------------------------------------------------------------- */
/*  Démarrage du serveur                                                      */
/* -------------------------------------------------------------------------- */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
