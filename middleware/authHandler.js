const firebase = require('../utils/firebase')
const { getAuth } = require('firebase-admin/auth')
module.exports = async (req, res, next) => {
    let idToken = req.headers.authorization
    if (idToken.split(' ')[0] !== 'Bearer') return res.send(401)
    idToken = idToken.split(' ')[1]
    let decodedToken;
    try {
        const app = firebase.app()
        decodedToken = await getAuth(app).verifyIdToken(idToken)
    } catch (error) {
        return res.send(401)
    }
    if (!decodedToken.email) return res.send(401)
    req.userId = decodedToken.uid
    next()
}