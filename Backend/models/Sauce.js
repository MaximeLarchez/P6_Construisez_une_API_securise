// appel de mongoose
const mongoose = require('mongoose');

// schema mongoose pour le model des Sauces 
const sauceSchema = mongoose.Schema({
    userId :{type: String, required:true},
    name:{type: String, required: true},
    manufacturer:{type: String, required: true},
    description:{type: String, required: true},
    mainPepper:{type:String, required: true},
    imageUrl:{type:String, required: true},
    heat:{type:Number,required: true},
    likes:{type:Number, default:0},
    dislikes:{type:Number,default:0},
    usersLiked:{type:[String]},
    usersDisliked:{type:[String]}
});

// Exportation du model mongoose userSchema
module.exports = mongoose.model('Sauce', sauceSchema);