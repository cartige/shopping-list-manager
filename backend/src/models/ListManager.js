const {
  List,
  Ingredient,
  IngredientType,
  ListHasIngredient,
} = require("./model");
const { mapIngredientsByType } = require("../services/IngredientService");

class ListManager {
  // static mapIngredientsByType = (ingredientsToMap) => {
  //   const ingredientByTypes = [];
  //   let currentType = { id: undefined, name: "", ingredients: [] };
  //   ingredientsToMap.sort((a, b) => a.type.id - b.type.id);
  //   ingredientsToMap.forEach((ingredient, index) => {
  //     const {
  //       type: { id },
  //     } = ingredient;
  //     if (
  //       ingredientsToMap[index + 1] &&
  //       ingredientsToMap[index + 1].type.id === id
  //     ) {
  //       currentType.name = ingredient.type.name;
  //       currentType.id = ingredient.type.id;
  //       currentType.ingredients.push(ingredient);
  //       // currentType = { ...currentType, ingredients };
  //     } else {
  //       currentType.name = ingredient.type.name;
  //       currentType.id = ingredient.type.id;
  //       currentType.ingredients.push(ingredient);
  //       ingredientByTypes.push(currentType);
  //       currentType = { id: undefined, name: "", ingredients: [] };
  //     }
  //   });
  //   return ingredientByTypes;
  // };

  static ingredientMapping = (ingredients, byType = false) => {
    const myIngredients = ingredients.map((ingredient) => {
      const {
        dataValues: {
          name,
          id,
          ListHasIngredient: {
            dataValues: { quantity, unit },
          },
          IngredientType: { dataValues: ingredientType },
        },
      } = ingredient;
      return {
        id,
        name,
        quantity,
        unit,
        type: { ...ingredientType },
      };
    });
    return byType ? mapIngredientsByType(myIngredients) : myIngredients;
  };

  static getLists(userId) {
    // return List.findAll({
    //   where: { UserId: userId },
    //   include: [
    //     {
    //       model: Ingredient,
    //       include: [{ model: IngredientType }],
    //     },
    //   ],
    // }).then((lists) =>
    //   lists.map((list) => {
    //     const {
    //       Ingredients: { ingredients },
    //     } = list;
    //     return {
    //       id: list.id,
    //       name: list.name,
    //       // ingredients: ingredients ? this.ingredientMapping(ingredients) : [],
    //       ingredients,
    //     };
    //   })
    // );
    return List.findAll({
      where: { UserId: userId },
      include: [
        {
          model: Ingredient,
          include: [{ model: IngredientType }],
        },
      ],
    })
      .then((lists) => {
        // return lists;
        return lists
          .map((list) => {
            console.log(
              list.Ingredients,
              "ingredientssssssssssssssssssssssssss"
            );
            return {
              name: list.name,
              id: list.id,
              ingredients: this.ingredientMapping(list.Ingredients, true),
              createdAt: list.createdAt,
              updatedAt: list.updatedAt,
            };
          })
          .sort((a, b) => b.updatedAt - a.updatedAt);
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  }

  static async getById(id) {
    const list = await List.findOne({
      where: { id },
      include: [{ model: Ingredient, include: [IngredientType] }],
    });

    if (list) {
      const Ingredients = list.Ingredients.length
        ? this.ingredientMapping(list.Ingredients)
        : [];
      return { ...list.dataValues, Ingredients };
    }
    return null;
  }

  static async insertList(list) {
    try {
      const { dataValues: listInserted } = await List.create(
        {
          name: list.name || "Test List",
          UserId: list.UserId,
          ListHasIngredient: list.ingredients,
        },
        {
          include: [ListHasIngredient],
        }
      );
      return { ...listInserted, ingredients: list.ingredients };
    } catch (err) {
      return err;
    }
  }

  static async updateList(id, list) {
    const listIngredients = await ListHasIngredient.findAll({
      where: { ListId: id },
    });
    const currentList = this.getById(id);

    const ingredientIds = listIngredients.map((i) => {
      const {
        dataValues: { IngredientId },
      } = i;
      return IngredientId;
    });

    const areIngredientsDifferent =
      currentList.Ingredients.length !== currentList.ingredients.length ||
      list.ingredients.some((ingredient) => {
        const foundIngredient = currentList.Ingredients.find(
          (currentListIngredient) =>
            currentListIngredient.id === ingredient.id &&
            ingredient.quantity === currentListIngredient.quantity
        );
        return foundIngredient === undefined;
      });

    // const isDifferent =
    //   ingredientIds.length !== list.ingredients.length ||
    //   list.ingredients.some((ingredient) => {
    //     console.log(ingredient.id, ingredientIds);
    //     const foundIngredient = ingredientIds.find(
    //       (ingredientId) => ingredientId === ingredient.id
    //     );
    //     console.log(foundIngredient, "found ingredient");
    //     return foundIngredient === undefined;
    //   });

    if (areIngredientsDifferent) {
      console.log("different");
      try {
        await ListHasIngredient.destroy({ where: { ListId: id } });
        await Promise.all(
          list.ingredients.map((ingredient) =>
            ListHasIngredient.create({
              ListId: id,
              IngredientId: ingredient.id,
              quantity: ingredient.quantity,
              unit: ingredient.unit,
            })
          )
        );
      } catch (err) {
        console.error(err);
        return err;
      }
    }

    const {
      dataValues: { listUpdated },
    } = await List.update(
      {
        name: list.name,
      },
      {
        where: { id },
      }
    );

    return listUpdated;
  }
}

module.exports = ListManager;
