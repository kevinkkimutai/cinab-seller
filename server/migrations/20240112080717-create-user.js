'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      email_token: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      ship_address1: {
        type: Sequelize.STRING
      },
      ship_address2: {
        type: Sequelize.STRING
      },
      ship_zip: {
        type: Sequelize.STRING
      },
      ship_city: {
        type: Sequelize.STRING
      },
      ship_country: {
        type: Sequelize.STRING
      },
      ship_company: {
        type: Sequelize.STRING
      },
      bill_address1: {
        type: Sequelize.STRING
      },
      bill_address2: {
        type: Sequelize.STRING
      },
      bill_zip: {
        type: Sequelize.STRING
      },
      bill_city: {
        type: Sequelize.STRING
      },
      bill_country: {
        type: Sequelize.STRING
      },
      bill_company: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      state_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};