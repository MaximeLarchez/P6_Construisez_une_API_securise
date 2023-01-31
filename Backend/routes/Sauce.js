const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');
const sauceCtrl = require('../controllers/Sauce');
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


module.exports = router;