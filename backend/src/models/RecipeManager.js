const {
  Recipe,
  Ingredient,
  IngredientType,
  RecipeHasIngredients,
} = require("./model");

class RecipeManager {
  static getRecipes(userId) {
    return Recipe.findAll({
      where: { UserId: userId },
      include: [
        {
          model: Ingredient,
          include: [IngredientType],
        },
      ],
    }).then((recipies) =>
      recipies.map((recipie) => ({
        id: recipie.id,
        name: recipie.name,
        img: recipie.picture,
        ingredients: recipie.Ingredients
          ? recipie.Ingredients.map((i) => ({
              id: i.id,
              name: i.name,
              type: i.IngredientType.name,
            }))
          : [],
      }))
    );
  }

  static insertRecipe(recipe) {
    return Recipe.create(
      {
        name: recipe.name,
        picture: recipe.picture,
        UserId: recipe.UserId,
        RecipeHasIngredients: recipe.ingredients,
      },
      {
        include: [RecipeHasIngredients],
      }
    );
  }
}

module.exports = RecipeManager;
