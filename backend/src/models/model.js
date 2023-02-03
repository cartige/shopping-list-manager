const Sequelize = require("sequelize");
const db = require("../db");

const { DataTypes } = Sequelize;

const Recipe = db.define(
  "Recipe",
  {
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    picture: DataTypes.STRING,
  },
  { tableName: "recipe" }
);

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

User.hasMany(Recipe);
Recipe.belongsTo(User);

User.hasMany(List);
List.belongsTo(User);

const RecipeHasIngredients = db.define(
  "RecipeHasIngredients",
  {},
  { tableName: "recipe_has_ingredient" }
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
  {},
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

IngredientType.hasMany(Ingredient);
Ingredient.belongsTo(IngredientType);

module.exports = {
  User,
  Recipe,
  List,
  Ingredient,
  IngredientType,
  RecipeHasIngredients,
  ListHasIngredients,
};
