// Importation du modèle de la base de données mongoDB
const Sauce = require('../models/Sauce');

// Fonction qui va gerer les likes et dislikes 
exports.likeSauce = (req,res,next) => {
   
    // allez chercher la sauce dans la base de donnée
    Sauce
    .findOne({_id: req.params.id})
    .then((sauce) => {
        //verifie si l'utilisateur actuel a déja aimé la sauce et si la req actuelle est une "like"
        if((!sauce.usersLiked.includes(req.body.userId)) && (req.body.like === 1)){
            // mise à jour de la sauce dans la base de donnée
            Sauce.updateOne(
                {_id: req.params.id},
                {
                    // met a jour la sauce en l'incrémentant de 1 et ajoute l'id utilisateur dans la liste de ceux qui ont aimé (userLiked)
                    $inc: {likes: 1},
                    $push: {usersLiked: req.body.userId}
                }
            )
            .then(() => res.status(201).json({message : "Sauce like +1"}))
            .catch(error => res.status(400).json({ error }));
        };
        // verifie si l'utilisateur actuel à deja aimé et si la requête est un dislike
         if((sauce.usersLiked.includes(req.body.userId)) && (req.body.like === 0)){
            // mise à jour de la sauce dans la base de donnée 
            Sauce.updateOne(
                {_id: req.params.id},
                {
                    // met a jour la sauce en décrémentant son nombre de like de 1 et enlève l'id utilisateur de ceux qui ont aimé (userLiked)
                    $inc: {likes: -1},
                    $pull: {usersLiked: req.body.userId}
                }
            )
            .then(() => res.status(201).json({message : "Sauce like 0"}))
            .catch(error => res.status(400).json({ error }));
        };

    //    Vérifie si l'utilisateur actuel n'a pas encore disliked la sauce et si la req est un disliked
       if((!sauce.usersDisliked.includes(req.body.userId)) && (req.body.like === -1)){
        // mise à jour de la sauce dans la base de donnée
        Sauce.updateOne(
            {_id: req.params.id},
            {
                // met a jour la sauce en incrémentant de 1 son nombre de disliked et ajoute l'id utilisateur à la liste de ceux qui n'ont pas aimé 
                $inc: {dislikes: 1},
                $push: {usersDisliked: req.body.userId}
            }
        )
        .then(() => res.status(201).json({message : "Sauce dislike +1"}))
        .catch(error => res.status(400).json({ error }));
    };
        // Vérifie si l'utilisateur disliked déja la sauce et si la req actuelle est sur neutre 
        if((sauce.usersDisliked.includes(req.body.userId)) && (req.body.like === 0)){
            // mise à jour de la sauce dans la base de donnée
            Sauce.updateOne(
                {_id: req.params.id},
                {
                    // met a jour la sauce en décrémentant son nombre de disliked de 1 et enlève l'id de l'utilisateur de la liste de ceux qui n'ont pas aimé 
                    $inc: {dislikes: -1},
                    $pull: {usersDisliked: req.body.userId}
                }
            )
            .then(() => res.status(201).json({message : "Sauce dislike 0"}))
            .catch(error => res.status(400).json({ error }));
        };
    })
    .catch(error => res.status(404).json({ error }));
};