// appel de sauce dans le dossier models 
const Sauce = require('../models/Sauce');
const fs = require('fs')

// Controller pour la Creation d'une nouvelle sauce
exports.createSauce = (req, res) => {
  // crée une variable qui contient le body de sauce
  const sauceObject = JSON.parse(req.body.sauce)
  // supprime l'Id qui est generer automatiquement par mongodb
  delete sauceObject._userId;
  
// création d'une nouvelle sauce avec les informations récuperer dans SauceObject
    const sauce = new Sauce({
     ...sauceObject,
     userId: req.auth.userId,
     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // enregistre la sauce avec les informations saisies
    sauce.save()
        .then(() => res.status(201).json({message:'sauce enregistrée'}))
        .catch((error) => res.status(400).json({ error }))
};

//Controller pour l'affichage de toutes les sauces 
exports.getAllSauce = (req, res) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

// Controller pour l'affichage d'une sauce grace a son ID
exports.getOneSauce = (req, res) => {
  // utilisation de la method findOne() pour trouver une sauce en utilisant l'id fournis dans la req 
  Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};


//Controller pour modifier une sauce
exports.modifySauce = (req, res) => {
  // Création nouvel objeten combinant les données JSON décodée du(req.body.sauce) avec l'url de l'image
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body }
// suppression de l'attribut User_Id de "sauceObject"
  delete sauceObject._userId
  // Recherche de la sauce à modifier par l'id qui est fournit dans la requête
  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      // permet de verifier si la personne qui veut modifier la sauce est bien celle qui la poster 
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Non-autorisé' })
      } else {
        // permet de mettre a jour la sauce avec les nouvelles informations (sauceObject)
        Sauce.updateOne({ _id: req.params.id}, {...sauceObject, _id: req.params.id})
          .then(() => res.status(200).json({message: 'Sauce modifié'}))
          .catch(error => res.status(401).json({ error }))
      }
    })
    .catch(error => {res.status(400).json({ error })})
}

// Controller qui permet de supprimer la sauce par rapport a son ID
exports.deleteSauce = (req, res) => {
  // recherche de la sauce par son id fournit dans les params de la requête
  Sauce.findOne({ _id: req.params.id})
  //Si la sauce est trouvé
    .then(sauce => {
      // mais que le userId de la sauce ne correspond pas avec celui dans l'objet d'authentification de la req
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({message: 'Non-autorisé'})
      } else {
        // permet d'obtenir le nom de fichier de l'image associée à la sauce
        const filename = sauce.imageUrl.split('/images/')[1]
        // permet de supprimer l'image associé à la sauce 
        fs.unlink(`images/${filename}`, () => {
          // supprime le document sauce de la base de données 
          Sauce.deleteOne({_id: req.params.id})
            .then(() => {res.status(200).json({message: 'Objet supprimé'})})
            .catch(error => res.status(401).json({ error }))
        })
      }
    })
    .catch(error => {res.status(500).json({ error })})
};


