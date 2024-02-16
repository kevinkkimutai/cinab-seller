'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('items', 'wholesale_price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });

    await queryInterface.addColumn('items', 'retail_price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('items', 'wholesale_price');
    await queryInterface.removeColumn('items', 'retail_price');
  }
};
