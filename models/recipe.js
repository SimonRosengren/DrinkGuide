const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    tagline: String,
    info: String,
    description: String,
    instructions: String,
    score: { type: Number, default: 0 },
    tags: [{ id: String }],
    ingredients: [{
        id: String,
        qty: Number,
        unit: String
    }] // IDs of ingredients
})
const Recipe = mongoose.model('Recipe', schema);
module.exports = Recipe;