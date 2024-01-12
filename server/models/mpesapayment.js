'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mpesapayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mpesapayment.init({
    userID: DataTypes.STRING,
    transaction_number: DataTypes.STRING,
    MerchantRequestID: DataTypes.STRING,
    CheckoutRequestID: DataTypes.STRING,
    ResultCode: DataTypes.STRING,
    paidPhoneNo: DataTypes.STRING,
    Amount: DataTypes.STRING,
    MpesaReceiptNumber: DataTypes.STRING,
    ResultDesc: DataTypes.STRING,
    TransactionDate: DataTypes.STRING,
    isVerified: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'mpesapayment',
  });
  return mpesapayment;
};