'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('taxes', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: true, // Modify this based on your requirements
    });

    await queryInterface.addColumn('taxes', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: true, // Modify this based on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('taxes', 'createdAt');
    await queryInterface.removeColumn('taxes', 'updatedAt');
  },
};
