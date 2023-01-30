const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/Sauce')



// route pour crée une sauce
router.post('/sauces', sauceCtrl.createSauce);

// route delete avec l'id 
router.delete('/:id', sauceCtrl.deleteSauce);

// route get pour tout les produits 

// route get avec l'id 

// route put pour modifier l'id 


// route post pour le like et dislike ( id + like )


module.exports = router;