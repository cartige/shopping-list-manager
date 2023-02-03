const {
  List,
  Ingredient,
  IngredientType,
  ListHasIngredients,
} = require("./model");

class ListManager {
  static getLists(userId) {
    return List.findAll({
      where: { UserId: userId },
      include: [
        {
          model: Ingredient,
          include: [IngredientType],
        },
      ],
    }).then((lists) =>
      lists.map((list) => ({
        id: list.id,
        name: list.name,
        ingredients: list.Ingredients
          ? list.Ingredients.map((i) => ({
              id: i.id,
              name: i.name,
              type: i.IngredientType.name,
            }))
          : [],
      }))
    );
  }

  static insertList(list) {
    return List.create(
      {
        name: list.name,
        UserId: list.UserId,
        ListHasIngredients: list.ingredients,
      },
      {
        include: [ListHasIngredients],
      }
    );
  }
}

module.exports = ListManager;
