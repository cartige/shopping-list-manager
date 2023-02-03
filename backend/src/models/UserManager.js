const { User } = require("./model");

class UserManager {
  static getUsers() {
    return User.findAll();
  }

  static insertUser(user) {
    return User.create(user);
  }

  static getUserByEmail(email) {
    return User.findOne({ where: { email } });
  }
}

module.exports = UserManager;
