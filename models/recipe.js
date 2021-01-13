const mongoose = require('mongoose')
const Ingredient = require('./ingredient')

const schema = mongoose.Schema({
    name: String,
    description: String,
    instructions: String,
    ingredients: [{type: Ingredient}]
})
const Ingredient = mongoose.model('Humidity', schema);
module.exports = Ingredient;