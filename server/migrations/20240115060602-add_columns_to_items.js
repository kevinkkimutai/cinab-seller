"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("items", "createdAt", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      })
      .then(() =>
        queryInterface.addColumn("items", "updatedAt", {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        })
      )
      .then(() =>
        queryInterface.addColumn("items", "image", {
          type: Sequelize.STRING, // Adjust the data type based on your requirements
          allowNull: true, // Adjust allowNull based on your requirements
        })
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn("items", "createdAt")
      .then(() => queryInterface.removeColumn("items", "updatedAt"))
      .then(() => queryInterface.removeColumn("items", "image"));
  },
};
