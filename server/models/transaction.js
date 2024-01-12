'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction.init({
    order_id: DataTypes.STRING,
    txn_id: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    user_email: DataTypes.STRING,
    currency_sign: DataTypes.STRING,
    currency_value: DataTypes.DOUBLE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};