// Importation de express
const express = require('express');
// Importation de Mongoose depuis db.js
const mongoose = require('./mongoDB/db');
mongoose.set('strictQuery', true)
// variable qui sera l'application d'express et permettra de l'utiliser
const app = express();
// appel de path
const path = require('path');
// appel de la route pour le user.js
const userRoutes = require('./routes/user');
// appel de la route sauces.js 
const sauceRoutes = require('./routes/Sauce');
// appel de helmet
const helmet = require('helmet');
// appel de morgan
const morgan = require('morgan');



// CORS(Cross-Origin Ressource Sharing || partage des ressource entre origines multiples)
  app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
  });
  
app.use(express.json());

// loguer les req et res dans le terminal
app.use(morgan('dev'));

// utilisation de helmet pour la sécurité des headers 
app.use(helmet({crossOriginResourcePolicy: false,}));



// route pour User
app.use('/api/auth', userRoutes);
// route pour Sauces
app.use('/api/sauces', sauceRoutes);
// route pour images
app.use('/images', express.static(path.join(__dirname,"images")))





// permet d'exporter l'application express
module.exports = app;