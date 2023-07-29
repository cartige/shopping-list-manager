const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/UserManager");
require("dotenv").config();

class AuthController {
  static signUp = async (req, res) => {
    const user = req.body;

    console.log(user);
    user.password = await argon2.hash(user.password, {
      type: argon2.argon2id,
      timeCost: 2,
      memoryCost: 2 ** 16,
      parallelism: 1,
    });

    User.insertUser(user)
      .then(({ dataValues: userCreated }) => {
        user.id = userCreated.id;
        const token = jwt.sign(user, process.env.JWT_SECRET);
        delete user.password;
        // delete user.hashedpassword;
        res.status(201).send({ user, token });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static login = (req, res) => {
    const token = jwt.sign(req.user, process.env.JWT_SECRET);
    delete req.user.password;
    res.status(200).json({ user: req.user, token });
  };
}

module.exports = AuthController;
