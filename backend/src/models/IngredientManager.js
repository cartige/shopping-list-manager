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
      const ingredientTypes = [];
      console.log(ingredients);
      const setIngredientSelect = ingredients.map((ingredient) => {
        return {
          name: ingredient.name,
          id: ingredient.id,
          IngredientType: ingredient.IngredientType,
          isSelected: false,
        };
      });

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
      console.log(ingredientsMapped);
      // console.log(ingredients.map((i) => console.log(i, "i")));
      // const ingredientByTypes = ingredients.reduce((acc, curr) => {
      //   acc[curr.IngredientType.name] = {
      //     id: curr.IngredientType.id,
      //     ingredients: [...acc[curr.IngredientType.name].ingredients],
      //   };
      //   acc[curr.IngredientType.name].ingredients.push({
      //     name: curr.name,
      //     id: curr.id,
      //   });
      //   console.log(acc[curr.IngredientType.name].ingredients, "acc");
      //   return acc;
      // }, {});

      // const ingredientTypes = Object.keys(ingredientByTypes);
      // const test = ingredientTypes.map((type) => {
      //   return {
      //     type,
      //     id: ingredientByTypes[type].id,
      //     ingredients: ingredientByTypes[type].ingredients,
      //   };
      // });
      // console.log(test, "test");
      // console.log(
      //   ingredients.reduce((acc, curr, prev) => {
      //     ingredientsByType.push({ name: curr.name, id: curr.id });
      //     console.log(ingredientsByType);
      //     console.log(curr.IngredientType.name);
      //     // acc[curr.IngredientType.name] = {};
      //     acc[curr.IngredientType.name] = {
      //       id: curr.IngredientType.id,
      //       ingredients: [],
      //     };
      //     acc[curr.IngredientType.name].ingredients.push({
      //       name: curr.name,
      //       id: curr.id,
      //     });
      //     console.log(acc);
      //     return acc;
      //     // console.log(acc.push({ type: , ingredients:  }));
      //   }, {}),
      //   "reduced"
      // );
      // const test = ingredients.reduce((i) => {

      // })
      return ingredientsMapped.sort((a, b) => {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
      });
      // return ingredients.reduce((acc, curr) => {
      //   // acc[curr.IngredientType.name] = {};
      //   acc[curr.IngredientType.name] = {
      //     id: curr.IngredientType.id,
      //     ingredients: [],
      //   };
      //   acc[curr.IngredientType.name].ingredients.push({
      //     name: curr.name,
      //     id: curr.id,
      //   });
      //   console.log(acc);
      //   return acc;
      // });
      // return ingredients
      //   .map((i) => ({
      //     id: i.id,
      //     name: i.name,
      //     type: i.IngredientType.name,
      //   }))
      //   .sort((a, b) => {
      //     return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
      //   });
    });
  }

  static insertIngredient(ingredient) {
    return Ingredient.create(ingredient);
  }
}

module.exports = IngredientManager;
