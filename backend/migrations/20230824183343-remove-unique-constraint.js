"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.removeIndex("IngredientId");
    const response = await queryInterface.removeIndex(
      "list_has_ingredient",
      ["IngredientId"],
      {
        unique: false,
        name: "IngredientId",
      }
    );

    console.log(response);

    await queryInterface.removeIndex(
      "list_has_ingredient",
      ["ListId", "IngredientId"],
      {
        unique: true,
        name: "list_has_ingredient_IngredientId_ListId_unique",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.addIndex("list_has_ingredient", ["IngredientId"], {
      unique: true,
      name: "IngredientId",
    });
    await queryInterface.addIndex(
      "list_has_ingredient",
      ["ListId", "IngredientId", "unit", "quantity"],
      {
        unique: true,
        name: "list_has_ingredient_IngredientId_ListId_unique",
      }
    );
  },
};
