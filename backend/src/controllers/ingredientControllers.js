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
      res.location(`/items/${ingredientAdded.insertId}`).sendStatus(201);
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
