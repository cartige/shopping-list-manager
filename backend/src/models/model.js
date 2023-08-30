const Sequelize = require("sequelize");
const db = require("../db");

const { DataTypes } = Sequelize;

const Recipe = db.define(
  "Recipe",
  {
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    picture: DataTypes.STRING,
    isPublic: { type: DataTypes.BOOLEAN, unique: false, allowNull: false },
    UserId: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false,
    },
    description: { type: DataTypes.STRING, unique: false, allowNull: true },
  },
  { tableName: "recipe" }
);

const RecipeStep = db.define(
  "RecipeStep",
  {
    stepNumber: { type: DataTypes.INTEGER, unique: false, allowNull: false },
    description: { type: DataTypes.STRING, unique: false, allowNull: false },
  },
  { tableName: "recipe_step" }
);

Recipe.hasMany(RecipeStep);
RecipeStep.belongsTo(Recipe);

const User = db.define(
  "User",
  {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "user" }
);

const List = db.define(
  "List",
  {
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "list" }
);

const Ingredient = db.define(
  "Ingredient",
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { tableName: "ingredient" }
);

const IngredientType = db.define(
  "IngredientType",
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { tableName: "ingredient_type" }
);

IngredientType.hasMany(Ingredient);
Ingredient.belongsTo(IngredientType);

User.hasMany(List);
List.belongsTo(User);

const RecipeHasIngredient = db.define(
  "RecipeHasIngredient",
  {
    quantity: { type: DataTypes.INTEGER, allowNull: false, unique: false },
    unit: { type: DataTypes.STRING, allowNull: true, unique: false },
  },
  { tableName: "recipe_has_ingredient" }
);

const UserHasRecipe = db.define(
  "UserHasRecipe",
  {},
  { tableName: "user_has_recipe" }
);

Recipe.belongsToMany(Ingredient, {
  through: RecipeHasIngredient,
  foreignKey: "RecipeId",
});
Ingredient.belongsToMany(Recipe, {
  through: RecipeHasIngredient,
  foreignKey: "IngredientId",
});

Recipe.hasMany(RecipeHasIngredient, { foreignKey: "RecipeId" });
Ingredient.hasMany(RecipeHasIngredient, { foreignKey: "IngredientId" });
RecipeHasIngredient.belongsTo(Recipe);
RecipeHasIngredient.belongsTo(Ingredient);

const ListHasIngredient = db.define(
  "ListHasIngredient",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ListId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // unique: "list_unique",
      unique: false,
    },
    IngredientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // unique: "list_unique",
      unique: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
      // unique: "list_unique",
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
  },
  {
    tableName: "list_has_ingredient",
    // list_unique: {
    //   fields: ["ListId", "IngredientId", "quantity", "unit"],
    // },
    // indexes: [
    //   {
    //     unique: false,
    //     fields: ["ListId", "IngredientId"],
    //   },
    // ],
  }
);

List.belongsToMany(Ingredient, {
  through: ListHasIngredient,
  // foreignKey: "ListId",
});
Ingredient.belongsToMany(List, {
  through: ListHasIngredient,
  // foreignKey: "IngredientId",
});

List.hasMany(ListHasIngredient);
Ingredient.hasMany(ListHasIngredient);
// IngredientType.hasMany(Ingredient);
// Ingredient.belongsTo(IngredientType);

// User.hasMany(Recipe);
// Recipe.belongsTo(User);
// UserHasRecipe.belongsToMany(User);
// Recipe.hasMany(UserHasRecipe);
// UserHasRecipe.belongsToMany(Recipe);

User.belongsToMany(Recipe, {
  through: UserHasRecipe,
});
Recipe.belongsToMany(User, {
  through: UserHasRecipe,
  // foreignKey: "ownerId",
  // as: "User",
});

User.hasMany(UserHasRecipe);
UserHasRecipe.belongsTo(User);
Recipe.hasMany(UserHasRecipe);
UserHasRecipe.belongsTo(Recipe);

// ListHasIngredient.sync();
// User.hasMany(UserHasRecipe, { foreignKey: "UserId" });
// Recipe.hasMany(UserHasRecipe, { foreignKey: "RecipeId" });

// UserHasRecipe.hasMany(Recipe);
// UserHasRecipe.belongsTo(User, { foreignKey: "ownerId", as: "recipeOwner" });
// Recipe.belongsTo(UserHasRecipe);
// User.hasMany(Recipe);
// Recipe.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

// UserHasRecipe.belongsToMany(User, {
//   through: Recipe,
//   foreignKey: "ownerId",
//   as: "owner",
// });
// User.belongsToMany(UserHasRecipe, {
//   through: Recipe,
// });

// Recipe.hasMany(UserHasRecipe, { foreignKey: "RecipeId" });
// User.hasMany(UserHasRecipe, { foreignKey: "UserId" });

module.exports = {
  User,
  Recipe,
  RecipeStep,
  List,
  Ingredient,
  IngredientType,
  RecipeHasIngredient,
  ListHasIngredient,
  UserHasRecipe,
};
