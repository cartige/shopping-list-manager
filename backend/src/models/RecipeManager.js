const {
  Recipe,
  Ingredient,
  IngredientType,
  RecipeHasIngredients,
  User,
  UserHasRecipes,
} = require("./model");

class RecipeManager {
  static getAllRecipes(userId, owned = false) {
    const isOwned = JSON.parse(owned)
      ? { model: User }
      : { model: UserHasRecipes, where: userId ? { userId } : {} };

    const hasUserId = userId ? {} : { isPublic: true };

    const include = [
      userId ? isOwned : { model: User },
      { model: Ingredient, include: [IngredientType] },
    ];

    const where = JSON.parse(owned) ? { userId } : hasUserId;

    return Recipe.findAll({
      where,
      include,
    }).then((recipes) =>
      recipes.map((recipe) => {
        const Ingredients = recipe.Ingredients.length
          ? recipe.Ingredients.map((i) => ({
              id: i.id,
              name: i.name,
              type: { ...i.IngredientType.dataValues },
            }))
          : [];
        return {
          id: recipe.id,
          name: recipe.name,
          img: recipe.picture,
          isPublic: recipe.isPublic,
          Ingredients,
        };
      })
    );
  }

  static async getById(id) {
    const { dataValues: recipe } = await Recipe.findOne({
      where: { id },
      include: [{ model: Ingredient, include: [IngredientType] }],
    });

    const Ingredients = recipe.Ingredients.length
      ? recipe.Ingredients.map((i) => ({
          id: i.id,
          name: i.name,
          type: { ...i.IngredientType.dataValues },
        }))
      : [];

    return { ...recipe, Ingredients };
  }

  static async insertRecipe(recipe) {
    // const result = await Recipe.create(
    //   {
    //     name: recipe.name,
    //     picture: recipe.picture,
    //     UserId: recipe.UserId,
    //     // RecipeHasIngredients: recipe.ingredients,
    //     isPublic: recipe.isPublic,
    //   }
    // {
    //   include: [
    //     {
    //       model: Ingredient,
    //       include: [RecipeHasIngredients],
    //     },
    //   ],
    // }
    // )
    //   .then(({ dataValues }) => {
    //     recipe.ingredients.forEach((ingredient) => {
    //       console.log(ingredient);
    //       RecipeHasIngredients.create({
    //         RecipeId: dataValues.id,
    //         IngredientId: ingredient.ingredientId,
    //       });
    //     });
    //     return dataValues;
    //   })
    //   .catch();
    // let recipeAdded = null;
    try {
      const { dataValues: recipeAdded } = await Recipe.create({
        name: recipe.name,
        picture: recipe.picture,
        UserId: recipe.UserId,
        isPublic: recipe.isPublic,
      });
      console.log(recipeAdded, "recipeAdded");
      // recipeAdded = dataValues;

      // recipe.ingredients.forEach(async (ingredient) => {
      // console.log(ingredient, "ingredient");
      const ingredientAdded = await Promise.all(
        recipe.ingredients.map((ingredient) =>
          RecipeHasIngredients.create({
            RecipeId: recipeAdded.id,
            IngredientId: ingredient.ingredientId,
          })
        )
      );
      // recipe.ingredients.map((ingredient) =>
      //   RecipeHasIngredients.create({
      //     RecipeId: recipeAdded.id,
      //     IngredientId: ingredient.ingredientId,
      //   })
      // );
      console.log(ingredientAdded, "ingredientAdded");
      // });
      return recipeAdded;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  static updateRecipe(id, recipe) {
    return Recipe.update(
      {
        name: recipe.name,
        picture: recipe.picture,
        RecipeHasIngredients: recipe.ingredients,
        isPublic: recipe.isPublic,
      },
      {
        where: { id },
      },
      {
        include: [{ model: RecipeHasIngredients, include: [IngredientType] }],
      }
    );
  }

  static deleteRecipe(id) {
    return Recipe.destroy({ where: { id } });
  }
}

module.exports = RecipeManager;
