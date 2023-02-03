const model = require("../models/RecipeManager");

const browse = (req, res) => {
  const { userId } = req.query;
  model
    .getRecipes(userId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const recipe = req.body;

  // TODO validations (length, format...)

  model
    .insertRecipe(recipe)
    .then(({ dataValues }) => {
      const recipeInserted = dataValues;
      res.send(recipeInserted).status(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  add,
};
