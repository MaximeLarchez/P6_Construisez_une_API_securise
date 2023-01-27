// Importation de express
const express = require('express');
// Importation de Mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// variable qui sera l'application d'express et permettra de l'utiliser
const app = express();
app.use(express.json());
// creation de la route pour le user.js
const userRoutes = require('./routes/user');
// appel du modele de sauces.js 
const Sauce = require('./models/Sauce')


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





// route pour User
app.use('/api/auth', userRoutes);


// route pour crée une nouvelle sauce
app.post('/api/sauces', (req,res,next) => {
  delete req.body._id;
  const sauce = new Sauce({
    ...req.body
  });
  sauce.save()
  .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
  .catch(error => res.status(400).json({ error }));
});



// // route pour récuperer les sauces 
// app.use('/api/sauces', (req,res,next) =>{
//   Sauce.find()
// .then(sauces => res.status(200).json(sauces))
// .catch(error => res.status(400).json({ error }));
// }); 



// localhost:3000
app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' }); 
  next();
});








// permet d'exporter l'application express
module.exports = app;