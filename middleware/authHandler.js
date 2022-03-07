const { initializeApp, cert } = require('firebase-admin/app')
const { getAuth } = require('firebase-admin/auth')
const config = require('../lib/config')


module.exports = async (req, res, next) => {
    const idToken = req.headers.authorization
    const app = initializeApp({ credential: cert(config.firebase) })
    const decodedToken = await getAuth(app).verifyIdToken(idToken)
    const tets = decodedToken
    next()
}