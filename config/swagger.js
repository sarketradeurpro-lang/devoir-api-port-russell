/**
 * @file Configuration de la documentation Swagger / OpenAPI.
 */

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Port de Plaisance Russell',
      version: '1.0.0',
      description:
        'Documentation de l’API REST de gestion des catways, des réservations et des utilisateurs du port de plaisance Russell.'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur local de développement'
      }
    ],
    tags: [
      { name: 'Authentification', description: 'Connexion et déconnexion' },
      { name: 'Catways', description: 'Gestion des catways' },
      { name: 'Réservations', description: 'Gestion des réservations associées aux catways' },
      { name: 'Utilisateurs', description: 'Gestion des utilisateurs' }
    ]
  },
  apis: [
    './routes/*.js',
    './controllers/*.js'
  ]
};

module.exports = swaggerJsdoc(options);
