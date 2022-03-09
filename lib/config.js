module.exports = {
    db: {
        name: process.env.DATABASE,
        password: process.env.DB_PASSWORD
    },
    unsplashed: {
        key: process.env.UNSPLASHED_CONSUMER_KEY,
        secret: process.env.UNSPLASHED_CONSUMER_SECRET
    },
    firebase: {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT
    }
}
