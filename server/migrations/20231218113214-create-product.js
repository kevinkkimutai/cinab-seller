"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pname: {
        type: Sequelize.STRING,
      },
      vendorId: {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "Vendors", key: "id" },
      },
      brand: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.FLOAT,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      Rprice: {
        type: Sequelize.FLOAT,
      },
      description: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      approval: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
