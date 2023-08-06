const model = require("../models/IngredientManager");

const browse = (req, res) => {
  model
    .getIngredients()
    .then((ingredients) => {
      res.send(ingredients);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const ingredient = req.body;

  // TODO validations (length, format...)

  model
    .insertIngredient(ingredient)
    .then((ingredientAdded) => {
      res.send(ingredientAdded).status(200);
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
