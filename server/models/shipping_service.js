'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shipping_service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  shipping_service.init({
    title: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    minimum_price: DataTypes.DOUBLE,
    is_condition: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'shipping_service',
  });
  return shipping_service;
};