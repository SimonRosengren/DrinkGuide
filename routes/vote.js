const express = require("express")
const router = express.Router()
const authHandler = require('../middleware/authHandler')
const Recipe = require('../models/recipe')

router.post('/', authHandler, async (req, res, next) => {
    let { id, vote } = req.body
    if (vote === 'up') vote = 1
    else if (vote === 'down') vote = -1 
    const result = await Recipe.findOneAndUpdate({id}, { $inc: { score: vote } }).exec()
    res.send(200)
});


module.exports = router;
