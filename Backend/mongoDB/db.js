// Importation de mongoose
const mongoose = require('mongoose');

// Importation du package dotenv pour les variables d'environnement
const dotenv = require('dotenv');
const result = dotenv.config();

// Connection à mongoDB grace a mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
// exportation de mongoose
  module.exports = mongoose;