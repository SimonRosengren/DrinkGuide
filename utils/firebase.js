const { initializeApp, getApps, cert } = require('firebase-admin/app')
const config = require('../lib/config')

const app = () => {
    return getApps().length ? getApps()[0] : initializeApp({ credential: cert(config.firebase) })
}

module.exports = {
    app
}