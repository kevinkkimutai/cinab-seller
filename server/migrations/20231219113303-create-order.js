'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      inStock: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.FLOAT
      },
      unitsBought: {
        type: Sequelize.INTEGER
      },
      purchaseDate: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};