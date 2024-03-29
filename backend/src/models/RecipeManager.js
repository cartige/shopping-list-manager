const {
  Recipe,
  RecipeSteps,
  Ingredient,
  IngredientType,
  RecipeHasIngredients,
  User,
  UserHasRecipes,
} = require("./model");

class RecipeManager {
  static ingredientMapping = (ingredients) => {
    return ingredients.map((ingredient) => {
      const {
        id,
        name,
        IngredientType: { dataValues: type },
        RecipeHasIngredients: {
          dataValues: { quantity, unit },
        },
      } = ingredient;
      console.log(ingredient.RecipeHasIngredients, "ingredient");
      return {
        id,
        name,
        quantity,
        unit,
        type: { ...type },
      };
    });
  };

  static async getAllRecipes(userId, owned = false) {
    const isOwned = JSON.parse(owned)
      ? { model: User }
      : {
          model: UserHasRecipes,
          where: userId ? { userId } : {},
        };

    const hasUserId = userId ? {} : { isPublic: true };

    const include = [
      userId ? isOwned : { model: User },
      { model: Ingredient, include: [IngredientType] },
      { model: RecipeSteps },
    ];

    const where = JSON.parse(owned) ? { userId } : hasUserId;
    console.log(include, "incluuuuuuuuuuuuuuuuudeeeeeeeeeeeeee");

    try {
      // const steps = await RecipeSteps.findAll({
      //   where: {recipeId: }
      // })
      const recipes = await Recipe.findAll({
        where,
        include,
      });
      return recipes.map((recipe) => {
        // const Ingredients = recipe.Ingredients.length
        //   ? recipe.Ingredients.map((i) => ({
        //       id: i.id,
        //       name: i.name,
        //       type: { ...i.IngredientType.dataValues },
        //     }))
        //   : [];
        // const steps = recipe.RecipeSteps.map((step) => {
        //   return
        // })
        const Ingredients = recipe.Ingredients.length
          ? this.ingredientMapping(recipe.Ingredients)
          : [];
        return {
          id: recipe.id,
          name: recipe.name,
          img: recipe.picture,
          UserId: recipe.UserId,
          isPublic: recipe.isPublic,
          description: recipe.description,
          Ingredients,
          steps: recipe.RecipeSteps,
        };
      });
    } catch (err) {
      console.error(err);
      return err;
    }

    // return Recipe.findAll({
    //   where,
    //   include,
    // }).then((recipes) =>
    //   recipes.map((recipe) => {
    //     // const Ingredients = recipe.Ingredients.length
    //     //   ? recipe.Ingredients.map((i) => ({
    //     //       id: i.id,
    //     //       name: i.name,
    //     //       type: { ...i.IngredientType.dataValues },
    //     //     }))
    //     //   : [];
    //     const Ingredients = recipe.Ingredients.length
    //       ? this.ingredientMapping(recipe.Ingredients)
    //       : [];
    //     return {
    //       id: recipe.id,
    //       name: recipe.name,
    //       img: recipe.picture,
    //       UserId: recipe.UserId,
    //       isPublic: recipe.isPublic,
    //       description: recipe.description,
    //       Ingredients,
    //     };
    //   })
    // );
  }

  static async getById(id) {
    const { dataValues: recipe } = await Recipe.findOne({
      where: { id },
      include: [
        { model: Ingredient, include: [IngredientType] },
        { model: RecipeSteps },
      ],
    });

    const Ingredients = recipe.Ingredients.length
      ? this.ingredientMapping(recipe.Ingredients)
      : [];

    return { ...recipe, Ingredients };
  }

  static async insertRecipe(recipe) {
    console.log(recipe, "recipe insertRecipe");
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
    const ingredients = recipe.ingredients.map((ingredient) => {
      return { ...ingredient, IngredientId: ingredient.id };
    });
    try {
      // const { dataValues: recipeAdded } = await Recipe.create({
      //   name: recipe.name,
      //   picture: recipe.picture,
      //   UserId: recipe.UserId,
      //   isPublic: recipe.isPublic,
      // });
      const { dataValues: recipeAdded } = await Recipe.create(
        {
          ...recipe,
          RecipeHasIngredients: ingredients,
        },
        {
          include: [{ model: RecipeHasIngredients }, { model: RecipeSteps }],
        }
      );
      console.log(recipeAdded, "recipeAdded");
      // recipeAdded = dataValues;

      // recipe.ingredients.forEach(async (ingredient) => {
      // console.log(ingredient, "ingredient");
      // const ingredientAdded = await Promise.all(
      //   recipe.ingredients.map((ingredient) =>
      //     RecipeHasIngredients.create({
      //       RecipeId: recipeAdded.id,
      //       IngredientId: ingredient.id,
      //       unit: ingredient.unit,
      //       quantity: ingredient.quantity,
      //     })
      //   )
      // );
      // recipe.ingredients.map((ingredient) =>
      //   RecipeHasIngredients.create({
      //     RecipeId: recipeAdded.id,
      //     IngredientId: ingredient.ingredientId,
      //   })
      // );
      // await UserHasRecipes.create({
      //   UserId: recipe.UserId,
      //   recipeId: recipeAdded.id,
      // });

      // UserHasRecipes.save();
      // });
      return recipeAdded;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  static async updateRecipe(id, recipe) {
    // const currentRecipe = await this.getById(id);
    const recipeIngredients = await RecipeHasIngredients.findAll({
      where: { RecipeId: id },
    });

    const ingredientIds = recipeIngredients.map((i) => {
      const {
        dataValues: { IngredientId },
      } = i;
      return IngredientId;
    });
    // console.log(ingredientIds);
    // console.log(recipe.ingredients);

    const isDifferent =
      ingredientIds.length !== recipe.ingredients.length ||
      recipe.ingredients.some((ingredient) => {
        console.log(ingredient.id, ingredientIds);
        const foundIngredient = ingredientIds.find(
          (ingredientId) => ingredientId === ingredient.id
        );
        console.log(foundIngredient, "found ingredient");
        return foundIngredient === undefined;
      });
    if (isDifferent) {
      console.log(isDifferent, "isDifferent");
      try {
        await RecipeHasIngredients.destroy({ where: { RecipeId: id } });
        await Promise.all(
          recipe.ingredients.map((ingredient) =>
            RecipeHasIngredients.create({
              RecipeId: id,
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
      dataValues: { recipeUpdated },
    } = await Recipe.update(
      {
        name: recipe.name,
        picture: recipe.picture,
        description: recipe.description,
        isPublic: recipe.isPublic,
      },
      {
        where: { id },
      }
    );

    return recipeUpdated;
    // console.log(recipeIngredients, "recipeIngredients");
    // return Recipe.update(
    //   {
    //     name: recipe.name,
    //     picture: recipe.picture,
    //     description: recipe.description,
    //     isPublic: recipe.isPublic,
    //   },
    //   {
    //     where: { id },
    //   }
    // );
  }

  static deleteRecipe(id) {
    return Recipe.destroy({ where: { id } });
  }
}

module.exports = RecipeManager;
