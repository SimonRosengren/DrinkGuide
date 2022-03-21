const express = require("express")
const router = express.Router()
const authHandler = require('../middleware/authHandler')
const User = require('../models/user')

router.post('/create', authHandler, async (req, res) => {
    const { firstName, surName, firebaseID } = req.body
    if (req.userId !== firebaseID) return res.send(401)
    const user = new User({ firstName, surName, firebaseID })
    await user.save()
    res.send(200)
});

router.get('/', authHandler, async (req, res) => {
    if (!req.userId) return req.send(401)
    const user = User.findOne({ firebaseId: req.userId })
    res.send(user)
});


module.exports = router;
