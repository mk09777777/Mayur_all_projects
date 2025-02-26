const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://mayurvicky01234:Mayur2305@cookbook.6ij88.mongodb.net/recipe_app_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Define Mongoose Schemas & Models
const RecipeSchema = new mongoose.Schema({
  title: String,
  title1:String,
  description: String,
  ingredients: [String],
  steps: [String],
  cuisine: String,
  time: String,
  type: String,
  price: Number,
  photo_url: String,
});

const PopularRecipeSchema = new mongoose.Schema({
  title: String,
  title1:String,
  description: String,
  ingredients: [String],
  steps: [String],
  cuisine: String,
  time: String,
  type: String,
  price: Number,
  photo_url: String,
  type_url: String, // Extra field in popular recipes
});

const Recipe = mongoose.model("Recipe", RecipeSchema, "recipes");
const PopularRecipe = mongoose.model("PopularRecipe", PopularRecipeSchema, "popularrecipes");

// Fetch general recipes
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch popular recipes
app.get("/popular-recipes", async (req, res) => {
  try {
    const popularRecipes = await PopularRecipe.find();
    res.json(popularRecipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
