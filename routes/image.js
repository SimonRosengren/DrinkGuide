const express = require("express");
const router = express.Router();
const ApiError = require("../utils/ApiError");
const config = require('../lib/config');
const shutterStockClient = require('../utils/shutterstockClient');  

router.get('/', async (req, res, next) => {
    const image = await shutterStockClient.getImage(req.query.query);
    // Cache iamge in db?
    return image;
})

module.exports = router;
