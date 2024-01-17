"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("brands", "createdAt", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      })
      .then(() =>
        queryInterface.addColumn("brands", "updatedAt", {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        })
      )
      ;
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn("brands", "createdAt")
      .then(() => queryInterface.removeColumn("brands", "updatedAt"))
     
  },
};
