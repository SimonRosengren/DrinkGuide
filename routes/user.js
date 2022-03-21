const express = require("express")
const router = express.Router()
const authHandler = require('../middleware/authHandler')
const User = require('../models/user')

router.post('/create', authHandler, async (req, res) => {
    const { firstName, surName, firebaseID } = req.body
    if (req.firebaseID !== firebaseID) return res.send(401)
    const user = new User({ firstName, surName, firebaseID })
    await user.save()
    res.send(200)
});

router.get('/', authHandler, async (req, res) => {
    if (!req.firebaseID) return req.send(401)
    const user = await User.findOne({ firebaseID: req.firebaseID }).exec()
    res.send(user)
});


module.exports = router;
