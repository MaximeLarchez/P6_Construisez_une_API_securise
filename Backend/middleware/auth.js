// Imporation du module jsonwebtoken qui permet de travailler avec les tokens 
const jwt = require('jsonwebtoken');

//Importation de dotenv pour les variables d'environement :
const dotenv = require("dotenv").config();

// Creer une fonction d'authentification qui pourra être exportée dans d'autres fichiers
module.exports = (req, res, next) => {
   try {
    // Permet d'extraire le token dans l'en tête de la requete http
       const token = req.headers.authorization.split(' ')[1];
    //Permet de verifier la signature du token en utilisant une clé secrete qui est stocker sur le fichier .env
       const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);
    //Recupere l'id de l'utilisateur du token décodé
       const userId = decodedToken.userId;
    //Ajoute l'identifiant de l'utilisateur à l'objet req, qui pourra être utiliser par les autres middleware et routes
       req.auth = {
           userId: userId
       };
	next();
    // Sinon renvoi status 401 avec le message error 
   } catch(error) {
       res.status(401).json({ error });
   }
};