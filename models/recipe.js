const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    description: String,
    instructions: String,
    ingredients: [String] // IDs of ingredients
})
const Recipe = mongoose.model('Recipe', schema);
module.exports = Recipe;