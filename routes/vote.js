const express = require("express")
const router = express.Router()
const authHandler = require('../middleware/authHandler')
const Recipe = require('../models/recipe')
const User = require('../models/user')

router.post('/', authHandler, async (req, res, next) => {
    let { id, vote } = req.body
    if (vote === 'up') vote = 1
    else if (vote === 'down') vote = -1

    let drink = await Recipe.findById(id)
    let user = await User.findOne({ firebaseID: req.firebaseID }).exec()
    switch (vote) {
        case 1:
            if (!user.likedDrinks.find(drink => drink === id)) {
                user.likedDrinks.push(id)
                user.dislikedDrinks = user.dislikedDrinks.filter(drink => drink !== id)
                drink.score += vote
            }
            break;
        case -1:
            if (!user.dislikedDrinks.find(drink => drink === id)) {
                user.dislikedDrinks.push(id)
                user.likedDrinks = user.likedDrinks.filter(drink => drink !== id)
                drink.score += vote
            }
        default:
            break;

    }
    drink.save()
    user.save()
    res.send(200)
});


module.exports = router;
