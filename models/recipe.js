const mongoose = require('mongoose')
const Ingredient = require('./ingredient')

const schema = mongoose.Schema({
    name: String,
    description: String,
    instructions: String,
    ingredients: [{type: Ingredient}]
})
const Recipe = mongoose.model('Recipe', schema);
module.exports = Recipe;