'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init({
    user_id: DataTypes.INTEGER,
    cart: DataTypes.TEXT,
    currency_sign: DataTypes.STRING,
    currency_value: DataTypes.STRING,
    discount: DataTypes.TEXT,
    shipping: DataTypes.TEXT,
    payment_method: DataTypes.STRING,
    txnid: DataTypes.STRING,
    tax: DataTypes.DOUBLE,
    charge_id: DataTypes.STRING,
    transaction_number: DataTypes.STRING,
    order_status: DataTypes.STRING,
    shipping_info: DataTypes.TEXT,
    billing_info: DataTypes.TEXT,
    payment_status: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    state_price: DataTypes.DOUBLE,
    state: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};