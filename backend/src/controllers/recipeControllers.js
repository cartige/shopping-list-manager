const model = require("../models/RecipeManager");

const browse = (req, res) => {
  const { userId, owned } = req.query;
  model
    .getAllRecipes(userId, owned)
    .then((recipes) => {
      res.send(recipes).status(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const find = (req, res) => {
  const { id } = req.params;

  model
    .getById(id)
    .then((recipe) => {
      res.send(recipe).status(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
};

const add = (req, res) => {
  const recipe = req.body;

  model
    .insertRecipe(recipe)
    .then((recipeInserted) => {
      res.send(recipeInserted).status(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const update = (req, res) => {
  const fields = req.body;
  const { id } = req.params;

  model
    .updateRecipe(id, fields)
    .then((dataValues) => {
      const recipeInserted = dataValues;
      res.send(recipeInserted).status(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const del = (req, res) => {
  const { id } = req.params;

  model
    .deleteRecipe(id)
    .then((result) => {
      res.send(result).status(200);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  browse,
  find,
  add,
  update,
  del,
};
