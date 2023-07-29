const model = require("../models/RecipeManager");

const browse = (req, res) => {
  const { userId, owned } = req.query;
  model
    .getAllRecipes(userId, owned)
    .then((result) => {
      res.send(result).status(201);
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
    });
};

const add = (req, res) => {
  const recipe = req.body;

  // TODO validations (length, format...)
  console.log(recipe);

  model
    .insertRecipe(recipe)
    .then((recipeInserted) => {
      // const recipeInserted = dataValues;
      console.log(recipeInserted);
      res.send(recipeInserted).status(201);
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
    .then(({ dataValues }) => {
      console.log(dataValues, "dataValues");
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
      console.log(result);
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
