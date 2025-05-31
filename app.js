const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
// CREATE NEW RECIPE 
app.post("/recipes", (req, res) => {

  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  })
    .then((createdRecipe) => {
      // Respond with the new created recipe and a 201 status
      res.status(201).json(createdRecipe);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while creating a new recipe" });
    });
});

//  Iteration 4 - Get All Recipes
// READ ALL RECIPES
app.get('/recipes', (req, res) => {

  // Get all recipes from the database
  Recipe.find()
    .then((allRecipes) => {
      // Respond with recipe data and 200 status
      res.status(200).json(allRecipes);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while getting all recipes" });
    });

});

//  Iteration 5 - Get a Single Recipe
// READ SINGLE RECIPE BY ID
app.get("/recipes/:id", (req, res) => {
  // Get the recipe from the database using the query param `id` from the URL
  Recipe.findById(req.params.id)
    .then((recipe) => {
      // Respond with the recipe data and a 200 status code
      res.status(200).json(recipe);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while getting a single recipe" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  UPDATE RECIPE BY ID
app.put('/recipes/:id', (req, res) => {

  // Update the recipe using the `id` from the URL and the data from `req.body`
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedRecipe) => {
      // Respond with the updated recipe and a 200 status code
      res.status(200).json(updatedRecipe);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while updating a single recipe" });
    });

});

//  Iteration 7 - Delete a Single Recipe
//  DELETE RECIPE BY ID
app.delete("/recipes/:id", (req, res) => {
  // Delete the recipe using the query param `id` from the URL
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
      // Once the document has been deleted, respond with 204 and no content
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while deleting a single recipe" });
    });
});


// Start the server
app.listen(3000, () => console.log('My first app listening on port http://localhost:3000/'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
