'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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

    //     productId: DataTypes.STRING,
    // offerPrice: DataTypes.FLOAT,
    // fromDate: DataTypes.DATE,
    // toDate: DataTypes.DATE,

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Offers');
  }
};