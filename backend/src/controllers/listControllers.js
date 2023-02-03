const model = require("../models/ListManager");

const browse = (req, res) => {
  const { userId } = req.query;
  model
    .getLists(userId)
    .then((lists) => {
      res.send(lists);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const list = req.body;

  // TODO validations (length, format...)

  model
    .insertList(list)
    .then((result) => {
      res.location(`/items/${result.insertId}`).sendStatus(201);
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
