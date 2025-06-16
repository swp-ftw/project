const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');
const Recipe = require('../models/Recipe');

router.get('/', recipesController.getIndex);
router.get('/recipe/:id', recipesController.getRecipe);
router.get('/add-recipe', recipesController.getAddRecipe);
router.post('/add-recipe', recipesController.postAddRecipe);

router.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

router.post('/create', async (req, res) => {
  const newRecipe = new Recipe(req.body);
  await newRecipe.save();
  res.status(201).send('Recipe created');
});

module.exports = router;
