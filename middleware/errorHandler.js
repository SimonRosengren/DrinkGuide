module.exports = (err, req, res, next) => {
    // Log the error.message somewhere
    res.status(err.status || 500).send(err.publicMessage || 'An unknown error occured')
}