const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    tag: String
})
const Tag = mongoose.model('Tag', schema);
module.exports = Tag;