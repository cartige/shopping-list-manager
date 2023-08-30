const { UserHasRecipe, User } = require("./model");

class UserRecipeManager {
  static insertRecipeUser(userId, recipeId) {
    return UserHasRecipe.create({
      UserId: userId,
      RecipeId: recipeId,
    });
  }

  static deleteRecipeUser(userId, recipeId) {
    return UserHasRecipe.destroy({
      where: { userId, recipeId },
    });
  }
}

module.exports = UserRecipeManager;
