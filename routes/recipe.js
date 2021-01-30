const express = require("express");
const ObjectId = require('mongoose').Types.ObjectId;
const router = express.Router();
const Recipe = require("../models/recipe");
const Ingredient = require('../models/ingredient')
const Joi = require("joi");
const ApiError = require("../utils/ApiError");
const shutterStockClient = require('../utils/shutterstockClient');

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  instructions: Joi.string().required(),
  ingredients: Joi.array().required()
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)

    const { name, description, instructions, ingredients } = req.body;
    const validation = await schema.validateAsync(
      { name, description, instructions, ingredients }
    );
    if (validation.error) 
      throw new ApiError(400, "Wrong parameters", validation.error);
    if (!checkIfIngredientsExist(ingredients))
      throw new ApiError(400, "One or more ingredients does not exist"); // TODO: Why is not message returned?

    const recipe = new Recipe({ name, description, instructions, ingredients });
    const result = await recipe.save();
    res.send(result);
  } catch (error) {
    next(error);
  }
});

const checkIfIngredientsExist = (ingredients) => {
  let ingredientsNotFound = [];
  (ingredients || []).forEach(async ingredient => {
    const result = await Ingredient.findById(new ObjectId(ingredient._id)).exec();
    if (!result) ingredientsNotFound.push(ingredient.name)
  })
  if (ingredientsNotFound.length) return false;
  return true;
}


router.get('/batch', async (req, res, next) => {
  let ingredients = req.query.ingredients;
  if (!Array.isArray(ingredients)) {
    const temp = [];
    temp.push(ingredients);
    ingredients = temp;
  }
  const maxMissing = req.params.maxMissing || 0;

  if (!ingredients) {
    // return random recipes
  }


  // Find the recipes where there is an intersection of ingredients. Go through all these recipes and take the totalingredients - intersection.length inte större än max saknade ingredienser

  let acceptedRecipes = [];
  const ingredientsFormatted = ingredients.map(i => {
    return {
      _id: new ObjectId(i)
    }
  })
  const recipes = await Recipe.find({ ingredients: { "$in": ingredientsFormatted } }).exec(); // Get intersecting recipes. Returns empty array?

  for (const recipe of recipes) {
    const intersection = ingredients.filter(value => recipe.ingredients.includes(value));  // get the intersection
    if (recipe.ingredients.length - intersection.length > maxMissing) {  // only add those where the missing ingredients are ok in number
      const image = await shutterStockClient.getImage(`${recipe.name}`);
      const recipeWithImage = {
        image,
        ...recipe._doc
      }
      acceptedRecipes.push(recipeWithImage);
    }
  }


  res.send(acceptedRecipes);
})

module.exports = router;
