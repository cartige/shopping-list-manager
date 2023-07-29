const argon2 = require("argon2");
const model = require("../models/UserManager");

const browse = (req, res) => {
  model
    .getUsers()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = async (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  // user.password = await argon2.hash(user.password, {
  //   type: argon2.argon2id,
  //   timeCost: 2,
  //   memoryCost: 2 ** 16,
  //   parallelism: 1,
  // });

  model
    .insertUser(user)
    .then((result) => {
      const userCreated = result;
      delete userCreated.password;
      res.location(`/items/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyUser = (req, res) => {
  const { email, password } = req.body;
  model
    .getUserByEmail(email)
    .then(async ({ dataValues }) => {
      const user = dataValues;
      const isPasswordOK = await argon2.verify(user.password, password);
      delete user.password;
      if (isPasswordOK) {
        res.send(user).status(200);
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  browse,
  add,
  verifyUser,
};
