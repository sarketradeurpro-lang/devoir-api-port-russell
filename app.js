/**
 * @file Point d'entrée de l'application Port de Plaisance Russell.
 * Configure Express, la session, le moteur EJS et la base MongoDB.
 */

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

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

/* -------------------------------------------------------------------------- */
/*  Routes                                                                    */
/* -------------------------------------------------------------------------- */

// À décommenter au fur et à mesure (étapes D à G) :
app.use('/catways', require('./routes/catwayRoutes'));
app.use('/catways', require('./routes/reservationRoutes'));
app.use('/users', require('./routes/users'));
// app.use('/', require('./routes/authRoutes'));

// Route temporaire : sera remplacée par la page d'accueil EJS (étape H)
app.get('/', (req, res) => {
  res.send("Bienvenue sur l'API Port Russell");
});

/* -------------------------------------------------------------------------- */
/*  Démarrage du serveur                                                      */
/* -------------------------------------------------------------------------- */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});