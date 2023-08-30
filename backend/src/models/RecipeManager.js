const sequelize = require("../db");
const {
  Recipe,
  RecipeStep,
  Ingredient,
  IngredientType,
  RecipeHasIngredient,
  User,
  UserHasRecipe,
} = require("./model");

const { ingredientMapping } = require("../services/IngredientService");

class RecipeManager {
  // static ingredientMapping = (ingredients) => {
  //   return ingredients.map((ingredient) => {
  //     const {
  //       id,
  //       name,
  //       IngredientType: { dataValues: type },
  //       RecipeHasIngredient: {
  //         dataValues: { quantity, unit },
  //       },
  //     } = ingredient;
  //     return {
  //       id,
  //       name,
  //       quantity,
  //       unit,
  //       type: { ...type },
  //     };
  //   });
  // };

  static async getAllRecipes(userId, owned = false) {
    const isOwned = JSON.parse(owned)
      ? { model: User }
      : {
          model: UserHasRecipe,
          where: userId ? { userId } : {},
        };

    const hasUserId = userId ? {} : { isPublic: true };

    const include = [
      userId ? isOwned : { model: User },
      { model: Ingredient, include: [IngredientType] },
      { model: RecipeStep },
    ];

    const where = JSON.parse(owned) ? { userId } : hasUserId;

    try {
      const recipes = await Recipe.findAll({
        where,
        include,
      });
      return recipes.map((recipe) => {
        const Ingredients = recipe.Ingredients.length
          ? ingredientMapping(recipe.Ingredients)
          : [];
        return {
          id: recipe.id,
          name: recipe.name,
          img: recipe.picture,
          UserId: recipe.UserId,
          isPublic: recipe.isPublic,
          description: recipe.description,
          Ingredients,
          steps: recipe.RecipeStep,
        };
      });
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  static async getById(id) {
    const recipe = await Recipe.findOne({
      where: { id },
      include: [
        { model: Ingredient, include: [IngredientType] },
        { model: RecipeStep },
      ],
    });

    if (recipe) {
      const Ingredients = recipe.Ingredients.length
        ? ingredientMapping(recipe.Ingredients)
        : [];
      return { ...recipe.dataValues, Ingredients };
    }
    return null;
  }

  static async insertRecipe(recipe) {
    const ingredients = recipe.ingredients.map((ingredient) => {
      return { ...ingredient, IngredientId: ingredient.id };
    });
    try {
      const { dataValues: recipeAdded } = await Recipe.create(
        {
          ...recipe,
          RecipeHasIngredient: ingredients,
        },
        {
          include: [{ model: RecipeHasIngredient }, { model: RecipeStep }],
        }
      );
      if (recipeAdded) {
        await UserHasRecipe.create({
          UserId: recipe.UserId,
          RecipeId: recipeAdded.id,
        });
      }
      return recipeAdded;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  static async updateRecipe(id, recipe) {
    try {
      const currentRecipe = await this.getById(id);
      let recipeUpdated = {};

      if (currentRecipe) {
        const areIngredientsDifferent =
          currentRecipe.Ingredients.length !== recipe.ingredients.length ||
          recipe.ingredients.some((ingredient) => {
            const foundIngredient = currentRecipe.Ingredients.find(
              (currentRecipeIngredient) =>
                currentRecipeIngredient.id === ingredient.id &&
                ingredient.quantity === currentRecipeIngredient.quantity
            );
            return foundIngredient === undefined;
          });

        const areStepsDifferent =
          currentRecipe.RecipeStep.length !== recipe.RecipeStep.length ||
          recipe.RecipeStep.some((step) => {
            const foundStep = currentRecipe.RecipeStep.find(
              (currentStep) =>
                currentStep.stepNumber === step.stepNumber &&
                currentStep.description === step.description
            );
            return foundStep === undefined;
          });
        await sequelize.transaction(async (t) => {
          if (areIngredientsDifferent) {
            await RecipeHasIngredient.destroy({
              where: { RecipeId: id },
              transaction: t,
            });
            await Promise.all(
              recipe.ingredients.map((ingredient) =>
                RecipeHasIngredient.create(
                  {
                    RecipeId: id,
                    IngredientId: ingredient.id,
                    quantity: ingredient.quantity,
                    unit: ingredient.unit,
                  },
                  { transaction: t }
                )
              )
            );
          }
          if (areStepsDifferent) {
            await RecipeStep.destroy({
              where: { RecipeId: id },
              transaction: t,
            });
            await Promise.all(
              recipe.RecipeStep.map((step) =>
                RecipeStep.create({ ...step }, { transaction: t })
              )
            );
          }
          recipeUpdated = await Recipe.update(
            {
              name: recipe.name,
              picture: recipe.picture,
              description: recipe.description,
              isPublic: recipe.isPublic,
            },
            {
              where: { id },
              transaction: t,
            }
          );
        });
      } else {
        return "Recipe not found";
      }
      return recipeUpdated;
    } catch (err) {
      return err;
    }
  }

  static deleteRecipe(id) {
    return Recipe.destroy({ where: { id } });
  }
}

module.exports = RecipeManager;
