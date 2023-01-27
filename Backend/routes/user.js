// Appel de Express
const express = require('express');

// creation du router
const router = express.Router();

// controler qui associe les fonctions au differentes routes
const userCtrl = require('../controllers/user');


// creation de la route Signup 
router.post('/signup', userCtrl.signup);
// creation de la route login
router.post('/login', userCtrl.login);



module.exports = router;