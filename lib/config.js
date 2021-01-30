module.exports = {
    db: {
        name: process.env.DATABASE,
        password: process.env.DB_PASSWORD
    },
    shutterstock: {
        key: process.env.SHUTTERSTOCK_CONSUMER_KEY,
        secret: process.env.SHUTTERSTOCK_CONSUMER_SECRET
    }
}
