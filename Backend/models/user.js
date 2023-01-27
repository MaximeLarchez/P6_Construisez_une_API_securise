// appel de mongoose
const mongoose = require('mongoose');
// appel de mongoose-unique-validator(qui permet d'avoir une seule adresse email d'enregister)
const uniqueValidator = require('mongoose-unique-validator')

// Schema mongoose pour le model de l'utilisateur
const userSchema = mongoose.Schema({
    email:{type: String, required: true, unique: true },
    password: {type: String, required: true }
});
// plugin pour pouvoir enregistrer une seule adresse email
userSchema.plugin(uniqueValidator);

// Exportation du model mongoose userSchema
module.exports = mongoose.model('user', userSchema);


