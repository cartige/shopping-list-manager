const model = require("../models/ListManager");

const browse = (req, res) => {
  const { id } = req.params;
  model
    .getLists(id)
    .then((lists) => {
      console.log(lists, "lists controller");
      res.send(lists).status(200);
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
    .then((listInserted) => {
      res.send(listInserted).status(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const update = (req, res) => {
  const list = req.body;
  const { id } = req.params;
  model
    .updateList(id, list)
    .then((listUpdated) => {
      res.send(listUpdated).status(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
module.exports = {
  browse,
  add,
  update,
};
