// appel de bcrypt
const bcrypt = require('bcrypt')
// appel de jsonwebtoken
const jwt = require('jsonwebtoken')
// appel du modele user 
const User = require('../models/user')

// Controller pour la route d'inscription de l'utilisateur
exports.signup = (req, res, next) => {
    // Utilisation de bcrypt pour hasher le mdp avec 10 tours de hashages ce qui augmente la sécurité
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // cree le nouvel utilisateur avec un mdp hasher 
            const user = new User({
                email: req.body.email,
                password: hash
            })
            // enregistrement et envoie des info dans la base de données 
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur crée' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error })) 
}

// controller pour la route d'authentification de l'utilisateur 
exports.login = (req, res, next) => {
    // utilisation de la méthode "findOne" de mongoose pour trouvé un utilisateur dans le corps de la requête
    User.findOne({email: req.body.email})
        .then(user => {
            // si aucun user n'a été trouvé renvoi status 401 avec un message
            if (!user) {
                res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'})
            // Si un utilisateur a été trouvé, utilisation de bcrypt pour comparer le mdp fourni dans la req et celui de la base de donnée
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        // si la comparaison n'est pas valide , renvoi status 401 avec un message
                        if (!valid) {
                            res.status(401).json({message : 'Paire identifiant/mot de passe incorrecte'})
                        // Si la comparaison est valide, renvoi status 200 et inclut l'id et un token
                        } else {
                            const {_id: userId} = user;
                            res.status(200).json({
                                // assigne le token au userId avec une validité de 24h
                                userId,
                                token: jwt.sign(
                                    { userId },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            })
                        }
                    })
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }))
}