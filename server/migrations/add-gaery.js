
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('items', 'gallery', {
      type: Sequelize.TEXT,
      allowNull: true, // Modify this based on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('items', 'gallery');
  },
};
