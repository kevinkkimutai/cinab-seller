// In the generated migration file (e.g., xxxxxxxxx-alter-items-id-column.js)
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('items', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, you can define a rollback logic here
    // (e.g., revert the changes made in the 'up' function)
  },
};
