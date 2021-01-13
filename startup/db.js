const mongoose = require('mongoose')
const dbPassword = process.env.DB_PASSWORD;
const db = process.env.DATABASE;

module.exports = async () => {
    try {
        await mongoose.connect(`mongodb+srv://admin:${dbPassword}@cluster0.ncvgh.mongodb.net/${db}?retryWrites=true&w=majority`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log("Connected to DB...")
        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                console.log('Connection to database has been closed.');
                process.exit(0);
            });
        });
    } catch (error) {
        console.log(`Could not connect to db: ${error}`)
    }

}