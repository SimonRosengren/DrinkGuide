const ApiError = require('../utils/ApiError')

module.exports = (err, req, res, next) => {
    if (err instanceof ApiError) {
        req.log.error(err.stack)
        res.status(err.status || 500).send(err.publicMessage)
    } else {
        res.status(err.status || 500).send('An unknown error occured')
    }
}