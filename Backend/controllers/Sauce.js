const Sauce = require('../models/Sauce');
const fs = require('fs')

// Creation sauce
exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce)
  delete sauceObject._userId;

    const sauce = new Sauce({
     ...sauceObject,
     userId: req.auth.userId,
     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({message:'sauce enregistrée'}))
        .catch((error) => res.status(400).json({ error }))
};

// affichage de toutes les sauces 
exports.getAllSauce = (req, res) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};




// modifier la sauce
exports.modifySauce = (req, res) => {
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body }

  delete sauceObject._userId
  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Non-autorisé' })
      } else {
        Sauce.updateOne({ _id: req.params.id}, {...sauceObject, _id: req.params.id})
          .then(() => res.status(200).json({message: 'Sauce modifié'}))
          .catch(error => res.status(401).json({ error }))
      }
    })
    .catch(error => {res.status(400).json({ error })})
}

// supprimer la sauce 
exports.deleteSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({message: 'Non-autorisé'})
      } else {
        const filename = sauce.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({_id: req.params.id})
            .then(() => {res.status(200).json({message: 'Objet supprimé'})})
            .catch(error => res.status(401).json({ error }))
        })
      }
    })
    .catch(error => {res.status(500).json({ error })})
};


// affichage d'une sauce en particulier
exports.getOneSauce = (req, res) => {
  Sauce.findOne({
    _id: req.params.id
  })
  .then(sauce =>  res.status(200).json(sauce))
  .catch(error => res.status(404).json({error}));
};