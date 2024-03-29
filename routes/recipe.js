const express = require('express')
const ObjectId = require('mongoose').Types.ObjectId
const router = express.Router()
const Recipe = require('../models/recipe')
const Ingredient = require('../models/ingredient')
const Joi = require('joi')
const ApiError = require('../utils/ApiError')
const fetch = require('node-fetch')
const config = require('../lib/config')

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  instructions: Joi.string().required(),
  ingredients: Joi.array().required(),
})

router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      tagLine,
      info,
      description,
      instructions,
      tags,
      ingredients,
    } = req.body
    const validation = await schema.validateAsync({
      name,
      description,
      instructions,
      ingredients,
    })
    if (validation.error)
      throw new ApiError(400, 'Wrong parameters', validation.error)
    if (!checkIfIngredientsExist(ingredients))
      throw new ApiError(400, 'One or more ingredients does not exist') // TODO: Why is not message returned?

    const recipe = new Recipe({
      name,
      description,
      instructions,
      ingredients,
      tags,
      tagLine,
      info,
    })
    const result = await recipe.save()
    res.send(result)
  } catch (error) {
    next(error)
  }
})

const checkIfIngredientsExist = (ingredients) => {
  let ingredientsNotFound = []
  ;(ingredients || []).forEach(async (ingredient) => {
    const result = await Ingredient.findById(
      new ObjectId(ingredient._id)
    ).exec()
    if (!result) ingredientsNotFound.push(ingredient.name)
  })
  if (ingredientsNotFound.length) return false
  return true
}

const getRecipeWithImage = async (recipe) => {
  let image = await fetch(
    `https://api.unsplash.com/search/photos?orientation=portrait&query=${recipe.name} drink&client_id=${config.unsplashed.key}&page=1&per_page=1`
  )
  image = await image.json()
  return {
    image,
    ...recipe._doc,
  }
}

router.get('/batch', async (req, res, next) => {
  let ingredients = req.query.ingredients
  if (!Array.isArray(ingredients)) {
    const temp = []
    if (ingredients) temp.push(ingredients)
    ingredients = temp
  }
  const maxMissing = req.params.maxMissing || 0

  let recipes
  let acceptedRecipes = []

  if (!ingredients.length) {
    recipes = await Recipe.find().limit(10).exec()
    for (const recipe of recipes) {
      acceptedRecipes.push(await getRecipeWithImage(recipe))
    }
  } else {
    recipes = await Recipe.find({
      'ingredients._id': { $in: ingredients },
    }).exec()

    for (const recipe of recipes) {
      const intersection = ingredients.filter((value) =>
        recipe.ingredients.includes(value)
      ) // get the intersection
      if (recipe.ingredients.length - intersection.length > maxMissing) {
        acceptedRecipes.push(await getRecipeWithImage(recipe))
      }
    }
  }

  res.send(acceptedRecipes)
})

router.get('/', async (req, res) => {
  const recipeDoc = await Recipe.findById(req.query.uuid).exec()
  let ingredients = []
  for (let i = 0; i < recipeDoc.ingredients.length; i++) {
    const ingredient = await Ingredient.findById(
      recipeDoc.ingredients[i]._id
    ).exec()
    ingredients.push({
      qty: recipeDoc.ingredients[i].qty,
      unit: recipeDoc.ingredients[i].unit,
      name: ingredient.name,
      id: ingredient._id,
    })
  }
  res.json({
    name: recipeDoc.name,
    description: recipeDoc.description,
    instructions: recipeDoc.instructions,
    ingredients,
  })
})

router.post('/manybyids', async (req, res) => {
  const ids = req.body.ids || []
  const result = await Recipe.find({ _id: { $in: ids } }).exec()
  const response = result.map((d) => {
    return {
      name: d.name,
      score: d.score,
    }
  })
  res.json(response)
})

module.exports = router
