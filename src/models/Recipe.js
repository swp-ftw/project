const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  cookingTime: [String],
  prepTime: [String],
  price: [String],
  ingredients: [String],
  steps: [String],
  images: [String],
});

module.exports = mongoose.model('Recipe', recipeSchema);
