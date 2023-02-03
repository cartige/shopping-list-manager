const { Ingredient, IngredientType } = require("./model");

class IngredientManager {
  static getIngredients() {
    return Ingredient.findAll({
      include: [
        {
          model: IngredientType,
        },
      ],
    }).then((ingredients) =>
      ingredients.map((i) => ({
        id: i.id,
        name: i.name,
        type: i.IngredientType.name,
      }))
    );
  }

  static insertIngredient(ingredient) {
    return Ingredient.create(ingredient);
  }
}

module.exports = IngredientManager;
