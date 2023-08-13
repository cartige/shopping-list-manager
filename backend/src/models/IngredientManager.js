const { Ingredient, IngredientType } = require("./model");

class IngredientManager {
  static getIngredients() {
    return Ingredient.findAll({
      include: [
        {
          model: IngredientType,
        },
      ],
    }).then((ingredients) => {
      const setIngredientSelect = ingredients.map((ingredient) => {
        return {
          name: ingredient.name,
          id: ingredient.id,
          IngredientType: ingredient.IngredientType,
          isSelected: false,
        };
      });

      const ingredientTypes = [];

      const ingredientTypesAndIds = setIngredientSelect.reduce((acc, curr) => {
        if (!ingredientTypes.includes(curr.IngredientType.name)) {
          acc.push({
            id: curr.IngredientType.id,
            name: curr.IngredientType.name,
          });
          ingredientTypes.push(curr.IngredientType.name);
        }
        return acc;
      }, []);

      const ingredientsMapped = ingredientTypesAndIds.map((type) => {
        const ingredientsFiltered = setIngredientSelect.filter((i) => {
          return i.IngredientType.id === type.id;
        });
        return {
          name: type.name,
          id: type.id,
          ingredients: ingredientsFiltered,
        };
      });

      return ingredientsMapped.sort((a, b) => {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
      });
    });
  }

  static insertIngredient(ingredient) {
    return Ingredient.create(ingredient);
  }
}

module.exports = IngredientManager;
