// Importation de express
const express = require('express');


// Importation de Mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);



// cluster mongodbAtlas
mongoose.connect('mongodb+srv://Maxime:pepee.10@cluster0.6uxglzi.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  // variable qui sera l'application d'express et permettra de l'utiliser
  const app = express();
  app.use(express.json());

  app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
  });





// creation de la route pour le user.js
const userRoutes = require('./routes/user');

// route pour User
app.use('/api/auth', userRoutes);


// // // // localhost:3000
app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' }); 
    next();
});





// permet d'exporter l'application express
module.exports = app;