'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mpesapayments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.STRING
      },
      transaction_number: {
        type: Sequelize.STRING
      },
      MerchantRequestID: {
        type: Sequelize.STRING
      },
      CheckoutRequestID: {
        type: Sequelize.STRING
      },
      ResultCode: {
        type: Sequelize.STRING
      },
      paidPhoneNo: {
        type: Sequelize.STRING
      },
      Amount: {
        type: Sequelize.STRING
      },
      MpesaReceiptNumber: {
        type: Sequelize.STRING
      },
      ResultDesc: {
        type: Sequelize.STRING
      },
      TransactionDate: {
        type: Sequelize.STRING
      },
      isVerified: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('mpesapayments');
  }
};