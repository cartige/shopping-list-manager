const { UserHasRecipes, User } = require("./model");

class UserRecipeManager {
  static insertRecipeUser(userId, recipeId) {
    return UserHasRecipes.create({
      UserId: userId,
      RecipeId: recipeId,
    });
  }

  static deleteRecipeUser(userId, recipeId) {
    return UserHasRecipes.destroy({
      where: { userId, recipeId },
    });
  }
}

module.exports = UserRecipeManager;
