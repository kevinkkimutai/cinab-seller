"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("items", "gallery", {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("items", "gallery");
  },
};
