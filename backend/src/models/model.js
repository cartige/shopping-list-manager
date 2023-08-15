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

const RecipeSteps = db.define(
  "RecipeSteps",
  {
    stepNumber: { type: DataTypes.INTEGER, unique: false, allowNull: false },
    description: { type: DataTypes.STRING, unique: false, allowNull: false },
  },
  { tableName: "recipe_step" }
);

Recipe.hasMany(RecipeSteps);
RecipeSteps.belongsTo(Recipe);

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

const RecipeHasIngredients = db.define(
  "RecipeHasIngredients",
  {
    quantity: { type: DataTypes.INTEGER, allowNull: true, unique: false },
    unit: { type: DataTypes.STRING, allowNull: true, unique: false },
  },
  { tableName: "recipe_has_ingredient" }
);

const UserHasRecipes = db.define(
  "UserHasRecipes",
  {},
  { tableName: "user_has_recipe" }
);

Recipe.belongsToMany(Ingredient, {
  through: RecipeHasIngredients,
  foreignKey: "RecipeId",
});
Ingredient.belongsToMany(Recipe, {
  through: RecipeHasIngredients,
  foreignKey: "IngredientId",
});

Recipe.hasMany(RecipeHasIngredients, { foreignKey: "RecipeId" });
Ingredient.hasMany(RecipeHasIngredients, { foreignKey: "IngredientId" });

const ListHasIngredients = db.define(
  "ListHasIngredients",
  {
    quantity: { type: DataTypes.INTEGER, allowNull: true, unique: false },
    unit: { type: DataTypes.STRING, allowNull: true, unique: false },
  },
  { tableName: "list_has_ingredient" }
);

List.belongsToMany(Ingredient, {
  through: ListHasIngredients,
  foreignKey: "ListId",
});
Ingredient.belongsToMany(List, {
  through: ListHasIngredients,
  foreignKey: "IngredientId",
});

List.hasMany(ListHasIngredients, { foreignKey: "ListId" });
Ingredient.hasMany(ListHasIngredients, { foreignKey: "IngredientId" });

// IngredientType.hasMany(Ingredient);
// Ingredient.belongsTo(IngredientType);

// User.hasMany(Recipe);
// Recipe.belongsTo(User);
// UserHasRecipes.belongsToMany(User);
// Recipe.hasMany(UserHasRecipes);
// UserHasRecipes.belongsToMany(Recipe);

User.belongsToMany(Recipe, {
  through: UserHasRecipes,
});
Recipe.belongsToMany(User, {
  through: UserHasRecipes,
  // foreignKey: "ownerId",
  // as: "User",
});

User.hasMany(UserHasRecipes);
UserHasRecipes.belongsTo(User);
Recipe.hasMany(UserHasRecipes);
UserHasRecipes.belongsTo(Recipe);
// User.hasMany(UserHasRecipes, { foreignKey: "UserId" });
// Recipe.hasMany(UserHasRecipes, { foreignKey: "RecipeId" });

// UserHasRecipes.hasMany(Recipe);
// UserHasRecipes.belongsTo(User, { foreignKey: "ownerId", as: "recipeOwner" });
// Recipe.belongsTo(UserHasRecipes);
// User.hasMany(Recipe);
// Recipe.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

// UserHasRecipes.belongsToMany(User, {
//   through: Recipe,
//   foreignKey: "ownerId",
//   as: "owner",
// });
// User.belongsToMany(UserHasRecipes, {
//   through: Recipe,
// });

// Recipe.hasMany(UserHasRecipes, { foreignKey: "RecipeId" });
// User.hasMany(UserHasRecipes, { foreignKey: "UserId" });

module.exports = {
  User,
  Recipe,
  RecipeSteps,
  List,
  Ingredient,
  IngredientType,
  RecipeHasIngredients,
  ListHasIngredients,
  UserHasRecipes,
};
