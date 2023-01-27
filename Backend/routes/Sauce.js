const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/Sauce')



// route post 
router.post('/', sauceCtrl.createSauce);

// route get pour tout les produits 

// route get avec l'id 

// route put pour modifier l'id 

// route delete avec l'id 

// route post pour le like et dislike ( id + like )


module.exports = router;