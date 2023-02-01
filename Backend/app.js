// Importation de express
const express = require('express');
// Importation de Mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// variable qui sera l'application d'express et permettra de l'utiliser
const app = express();
// appel de path
const path = require('path');
// creation de la route pour le user.js
const userRoutes = require('./routes/user');
// appel du modele de sauces.js 
const sauceRoutes = require('./routes/Sauce');



// cluster mongodbAtlas
mongoose.connect('mongodb+srv://Maxime:pepee.10@cluster0.6uxglzi.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
  });
  app.use(express.json());





// route pour User
app.use('/api/auth', userRoutes);
// route pour Sauces
app.use('/api/sauces', sauceRoutes);
// route pour images
app.use('/images', express.static(path.join(__dirname,"images")))





// permet d'exporter l'application express
module.exports = app;