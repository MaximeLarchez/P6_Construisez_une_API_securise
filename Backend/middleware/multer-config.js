// Importation de la bibliotheque multer
const multer = require('multer');
// determine l'extension du fichier téléchargé
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
// Configuration de stockage pour les fichiers téléchargés, diskStorage stock les fichier sur le disque dur du serveur
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // images sera la destination pour les fichiers téléchargés 
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    // variable qui remplace les espaces du nom d'origine par des "_"
    const name = file.originalname.split(' ').join('_');
    // variable qui récupere l'extension associée au type MIME du fichier a partir du fichier "MIMES_TYPES"
    const extension = MIME_TYPES[file.mimetype];
    // callback qui renvoie le noms du fichier généré en concatenant "name", la date actuelle et l'extension. (null indique qu'il n'y a pas d'erreur)
    callback(null, name + Date.now() + '.' + extension);
  }
});

// permet d'exporter multer 
module.exports = multer({storage: storage}).single('image');