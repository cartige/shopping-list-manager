const ingredientMapping = (ingredients) => {
  return ingredients.map((ingredient) => {
    const {
      id,
      name,
      IngredientType: { dataValues: type },
      RecipeHasIngredient: {
        dataValues: { quantity, unit },
      },
    } = ingredient;
    return {
      id,
      name,
      quantity,
      unit,
      type: { ...type },
    };
  });
};

const mapIngredientsByType = (ingredientsToMap) => {
  const ingredientByTypes = [];
  let currentType = { id: undefined, name: "", ingredients: [] };
  ingredientsToMap.sort((a, b) => a.type.id - b.type.id);
  ingredientsToMap.forEach((ingredient, index) => {
    const {
      type: { id },
    } = ingredient;
    if (
      ingredientsToMap[index + 1] &&
      ingredientsToMap[index + 1].type.id === id
    ) {
      currentType.name = ingredient.type.name;
      currentType.id = ingredient.type.id;
      currentType.ingredients.push(ingredient);
      // currentType = { ...currentType, ingredients };
    } else {
      currentType.name = ingredient.type.name;
      currentType.id = ingredient.type.id;
      currentType.ingredients.push(ingredient);
      ingredientByTypes.push(currentType);
      currentType = { id: undefined, name: "", ingredients: [] };
    }
  });
  return ingredientByTypes;
};

module.exports = {
  ingredientMapping,
  mapIngredientsByType,
};
