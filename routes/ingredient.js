const express = require("express");
const router = express.Router();
const Ingredient = require("../models/ingredient");
const Joi = require("joi");
const ApiError = require("../utils/ApiError");

const schema = Joi.object({
  name: Joi.string().required(),
  color: Joi.string().required(),
  description: Joi.string().required(),
  alcohol: Joi.number().required()
});

router.post('/', async (req, res, next) => {
  try {
    const { name, color, description, alcohol } = req.body;
    const validation = await schema.validateAsync(
      { name, color, description, alcohol }
    );
    if (validation.error)
      throw new ApiError(400, "Wrong parameters", validation.error);
    const ingredient = new Ingredient({ name, color, description, alcohol });
    const result = await ingredient.save();
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get('/suggest', async (req, res, next) => {
  try {
    const phrase = req.query.phrase;
    const suggestions = await Ingredient.find({ name: new RegExp('^' + phrase ) }, 'name').exec(); // ID is always provided as _id
    res.send(suggestions);
  } catch (error) {
    next(error)
  }
})

module.exports = router;
