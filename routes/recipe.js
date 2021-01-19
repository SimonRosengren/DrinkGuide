const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const Ingredient = require('../models/ingredient')
const Joi = require("joi");
const ApiError = require("../utils/ApiError");

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  instructions: Joi.string().required(),
  ingredients: Joi.array().items(Ingredient)
});

router.post('/', async (req, res, next) => {
  try {
    const { name, description, instructions, ingredients } = req.body;
    const validation = await schema.validateAsync(
      { name, description, instructions, ingredients }
    );
    if (validation.error)
      throw new ApiError(400, "Wrong parameters", validation.error);
    const recipe = new Recipe({ name, description, instructions, ingredients });
    const result = await recipe.save();
    res.send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
