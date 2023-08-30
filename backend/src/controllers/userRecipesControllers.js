const model = require("../models/UserRecipeManager");

const add = (req, res) => {
  const { userId, recipeId } = req.params;

  model
    .insertRecipeUser(userId, recipeId)
    .then(({ dataValues }) => {
      const recipeInserted = dataValues;
      res.send(recipeInserted).status(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const del = (req, res) => {
  const { userId, recipeId } = req.params;

  model
    .deleteRecipeUser(userId, recipeId)
    .then(({ dataValues }) => {
      const recipeDeleted = dataValues;
      res.send(recipeDeleted).status(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  add,
  del,
};
