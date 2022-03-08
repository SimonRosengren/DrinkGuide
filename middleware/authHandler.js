const firebase = require('../utils/firebase')
const { getAuth } = require('firebase-admin/auth')
module.exports = async (req, res, next) => {
    let idToken = req.headers.authorization
    if (idToken.split(' ')[0] !== 'Bearer') return res.redirect(401, '/login')
    idToken = idToken.split(' ')[1]
    let decodedToken;
    try {
        const app = firebase.app()
        decodedToken = await getAuth(app).verifyIdToken(idToken)
    } catch (error) {
        return res.redirect(401, '/signin')
    }
    if (!decodedToken.email) return res.redirect(401, '/login')
    next()
}