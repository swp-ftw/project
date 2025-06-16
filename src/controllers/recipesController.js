const Recipe = require('../models/Recipe');

// Homepage – list all recipes
exports.getIndex = async (req, res) => {
  try {
    let allRecipes = await Recipe.find();

    // Filter by search keyword
    let userInput = req.query.search;
    if (userInput) {
      userInput = userInput.toLowerCase();
      allRecipes = allRecipes.filter(r =>
        r.title.toLowerCase().includes(userInput)
      );
    }

    // Format the data for the view
    const recipes = allRecipes.map(r => ({
      id: r._id.toString(),
      title: r.title,
      image: r.images[0],
      prepTime: r.prepTime,
      price: r.price,
      description: r.description
    }));

    res.render('index', { recipes, userInput });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while retrieving recipes.");
  }
};

// Render the form to add a new recipe
exports.getAddRecipe = (req, res) => {
  res.render('add-recipe');
};

// Save a new recipe to MongoDB
exports.postAddRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      cookingTime,
      prepTime,
      price,
      instructions,
      ingredients,
      images
    } = req.body;

    let imagesArray = [];

    try {
      imagesArray = JSON.parse(images);
    } catch (e) {
      console.error("Error parsing images field:", e);
    }

    const newRecipe = new Recipe({
      title,
      description,
      cookingTime,
      prepTime,
      price,
      steps: instructions.split('\n').map(s => s.trim()).filter(Boolean),
      ingredients: ingredients.split('\n').map(s => s.trim()).filter(Boolean),
      images: imagesArray
    });

    await newRecipe.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while saving recipe to MongoDB.");
  }
};

// Recipe detail page
exports.getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).send('Recipe not found.');
    }

    res.render('recipe', { recipe });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while retrieving the recipe.");
  }
};
