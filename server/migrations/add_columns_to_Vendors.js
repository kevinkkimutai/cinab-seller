"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Vendors", "status", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Pending",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn("Vendors", "status")
      .then(() => queryInterface.removeColumn("Vendors", "status"));
  },
};
