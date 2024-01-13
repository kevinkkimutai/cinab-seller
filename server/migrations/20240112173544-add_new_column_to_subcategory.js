'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('subcategories', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: true, // Modify this based on your requirements
    });

    await queryInterface.addColumn('subcategories', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: true, // Modify this based on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('subcategories', 'createdAt');
    await queryInterface.removeColumn('subcategories', 'updatedAt');
  },
};
