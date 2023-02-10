// appel d'express (permet d'utiliser express)
const express = require('express');
// appel de Router ( permet de créer des groupes de routes indépendants)
const router = express.Router();
// appel de auth (qui permet de verifier l'authentification)
const auth = require('../middleware/auth');
// appel de multer (pour gerer les ajouts d'image)
const multer = require ('../middleware/multer-config');
// appel controller sauce (pour avoir acces au controller de sauce)
const sauceCtrl = require('../controllers/Sauce');
// appel controller like (pour avoir acces au controller de like)
const likeCtrl = require('../controllers/like');


// route pour crée une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);

// route get pour tout les produits 
router.get('/', auth, sauceCtrl.getAllSauce);

// route get avec l'id  
router.get('/:id', auth, sauceCtrl.getOneSauce);

// route put pour modifier l'id 
router.put('/:id', auth, sauceCtrl.modifySauce);

// route delete avec l'id 
router.delete('/:id',auth, sauceCtrl.deleteSauce);

// route post pour le like et dislike ( id + like )
router.post('/:id/like', auth, likeCtrl.likeSauce);

module.exports = router;