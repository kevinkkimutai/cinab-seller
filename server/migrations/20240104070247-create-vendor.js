"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Vendors", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      companyEMail: {
        type: Sequelize.STRING,
      },
      companyName: {
        type: Sequelize.STRING,
      },
      Kra: {
        type: Sequelize.STRING,
      },
      licence: {
        type: Sequelize.STRING,
      },
      AddressOne: {
        type: Sequelize.STRING,
      },
      AddressTwo: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      services: {
        type: Sequelize.STRING,
      },
      BankName: {
        type: Sequelize.STRING,
      },
      AccountNumber: {
        type: Sequelize.STRING,
      },
      MpesaNumber: {
        type: Sequelize.STRING,
      },
      MpesaName: {
        type: Sequelize.STRING,
      },
      SAddressOne: {
        type: Sequelize.STRING,
      },
      SAddressTwo: {
        type: Sequelize.STRING,
      },
      Scity: {
        type: Sequelize.STRING,
      },
      Sstate: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      Postal_Address: {
        type: Sequelize.STRING,
      },
      businessType: {
        type: Sequelize.STRING,
      },
      shopName: {
        type: Sequelize.STRING,
      },
      shopZone: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Vendors");
  },
};
