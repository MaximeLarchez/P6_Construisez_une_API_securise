// Importation du modèle de la base de données mongoDB
const Sauce = require('../models/Sauce');

exports.likeSauce = (req,res,next) => {
    //contenu de la requête like dislike envoyé par le navigateur
    const sauceLikeObject = req.body;
    
    // allez chercher la sauce dans la base de donnée
    Sauce
    .findOne({_id: req.params.id})
    .then((sauce) => {
        console.log(sauce)
        // like = 1 (likes +1)
        // Si le usersliked est false et si like === 1 
        if((!sauce.usersLiked.includes(req.body.userId)) && (req.body.like === 1)){
            // mise à jour de la sauce dans la base de donnée
            Sauce.updateOne(
                {_id: req.params.id},
                {
                    $inc: {likes: 1},
                    $push: {usersLiked: req.body.userId}
                }
            )
            .then(() => res.status(201).json({message : "Sauce like +1"}))
            .catch(error => res.status(400).json({ error }));
        };

         // like = 0 (likes = 0, pas de vote)
        //  Si userId est dans le usersLiked et like = 0
         if((sauce.usersLiked.includes(req.body.userId)) && (req.body.like === 0)){
            // mise à jour de la sauce dans la base de donnée
            Sauce.updateOne(
                {_id: req.params.id},
                {
                    $inc: {likes: -1},
                    $pull: {usersLiked: req.body.userId}
                }
            )
            .then(() => res.status(201).json({message : "Sauce like 0"}))
            .catch(error => res.status(400).json({ error }));
        };

        // like = -1 (dislikes = +1)
        //Si userId est dans usersDisliked et disliked = 1
       if((!sauce.usersDisliked.includes(req.body.userId)) && (req.body.like === -1)){
        // mise à jour de la sauce dans la base de donnée
        Sauce.updateOne(
            {_id: req.params.id},
            {
                $inc: {dislikes: 1},
                $push: {usersDisliked: req.body.userId}
            }
        )
        .then(() => res.status(201).json({message : "Sauce dislike +1"}))
        .catch(error => res.status(400).json({ error }));
    };

        // Apres un like = -1 on met un like = 0 (likes = 0, pas de vote, on enleve le dislike)
        // userId est dans userDisliked et like = 0 
        if((sauce.usersDisliked.includes(req.body.userId)) && (req.body.like === 0)){
            // mise à jour de la sauce dans la base de donnée
            Sauce.updateOne(
                {_id: req.params.id},
                {
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