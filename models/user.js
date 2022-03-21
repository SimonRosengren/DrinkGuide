const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    firstName: String,
    surName: String,
    firebaseID: { type: String, required: true, unique: true },
    likedDrinks: [{ id: String }],
    bar: [{ id: String }]
})
const User = mongoose.model('User', schema);
module.exports = User;