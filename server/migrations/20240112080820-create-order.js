'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      cart: {
        type: Sequelize.TEXT
      },
      currency_sign: {
        type: Sequelize.STRING
      },
      currency_value: {
        type: Sequelize.STRING
      },
      discount: {
        type: Sequelize.TEXT
      },
      shipping: {
        type: Sequelize.TEXT
      },
      payment_method: {
        type: Sequelize.STRING
      },
      txnid: {
        type: Sequelize.STRING
      },
      tax: {
        type: Sequelize.DOUBLE
      },
      charge_id: {
        type: Sequelize.STRING
      },
      transaction_number: {
        type: Sequelize.STRING
      },
      order_status: {
        type: Sequelize.STRING
      },
      shipping_info: {
        type: Sequelize.TEXT
      },
      billing_info: {
        type: Sequelize.TEXT
      },
      payment_status: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      state_price: {
        type: Sequelize.DOUBLE
      },
      state: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('orders');
  }
};