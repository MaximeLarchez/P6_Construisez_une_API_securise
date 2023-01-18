// Appel de Express
const express = require('express');
// Appel du middelware pour le token 
const auth = require('../middleware/auth');
// creation du router
const router = express.Router();



// controller qui associe les fonctions au differentes routes 
const userCtrl = require('../controllers/user');

// creation de la route Signup 
router.post('/signup', auth, userCtrl.signup);
// creation de la route login
router.post('/login', auth, userCtrl.login);

module.exports = router;