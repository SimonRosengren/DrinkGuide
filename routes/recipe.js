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
  ingredients: Joi.array().required()
});

router.post('/', async (req, res, next) => {
  try {
    console.log(JSON.stringify(req.body));

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
  if (!(ingredients || []).forEach(async ingredient => {
    const result = await Ingredient.findById(ingredient.id).exec();
    if (!result) return false;
  })) {
    return false;
  };
  return true;
}


router.get('/batch', async (req, res, next) => {
  const ingredients = req.query.ingredient;
  const maxMissing = req.params.maxMissing || 0;

  if (!ingredients) {
    // return random recipes
  }


  // Find the recipes where there is an intersection of ingredients. Go through all these recipes and take the totalingredients - intersection.length inte större än max saknade ingredienser

  let acceptedRecipes = [];
  const recipes = await Recipe.find({ ingredients: { "$in": ingredients } }).exec(); // Get intersecting recipes. Returns empty array?
  recipes.forEach(r => {
    const intersection = ingredients.filter(value => r.ingredients.includes(value));  // get the intersection
    if (r.ingredients.length() - intersection.length() > maxMissing) {  // only add those where the missing ingredients are ok in number
      acceptedRecipes.push(r);
    }
  })


  res.send(acceptedRecipes);
})

module.exports = router;
