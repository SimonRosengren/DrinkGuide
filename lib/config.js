module.exports = {
    db: {
        name: process.env.DATABASE,
        password: process.env.DB_PASSWORD
    },
    unsplashed: {
        key: process.env.UNSPLASHED_CONSUMER_KEY,
        secret: process.env.UNSPLASHED_CONSUMER_SECRET
    }
}
