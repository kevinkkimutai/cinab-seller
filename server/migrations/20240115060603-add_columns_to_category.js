"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("categories", "createdAt", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      })
      .then(() =>
        queryInterface.addColumn("categories", "updatedAt", {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        })
      )
      .then(() =>
        queryInterface.addColumn("subcategories", "createdAt", {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        })
      )
      .then(() =>
        queryInterface.addColumn("subcategories", "updatedAt", {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        })
      )
      .then(() =>
        queryInterface.addColumn("chield_categories", "createdAt", {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        })
      )
      .then(() =>
        queryInterface.addColumn("chield_categories", "updatedAt", {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        })
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn("categories", "createdAt")
      .then(() => queryInterface.removeColumn("categories", "updatedAt"))
      .then(() => queryInterface.removeColumn("subcategories", "createdAt"))
      .then(() => queryInterface.removeColumn("subcategories", "updatedAt"))
      .then(() => queryInterface.removeColumn("chield_categories", "createdAt"))
      .then(() => queryInterface.removeColumn("chield_categories", "updatedAt"));
  },
};
