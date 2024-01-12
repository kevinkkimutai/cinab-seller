'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('home_customizes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      banner_first: {
        type: Sequelize.TEXT
      },
      banner_secend: {
        type: Sequelize.TEXT
      },
      banner_third: {
        type: Sequelize.TEXT
      },
      popular_category: {
        type: Sequelize.TEXT
      },
      two_column_category: {
        type: Sequelize.TEXT
      },
      feature_category: {
        type: Sequelize.TEXT
      },
      home_page4: {
        type: Sequelize.TEXT
      },
      home_4_popular_category: {
        type: Sequelize.TEXT
      },
      hero_banner: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('home_customizes');
  }
};