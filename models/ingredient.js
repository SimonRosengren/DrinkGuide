const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    color: String,
    description: String,
    alcohol: Number
})
const Ingredient = mongoose.model('Ingredient', schema);
module.exports = Ingredient;