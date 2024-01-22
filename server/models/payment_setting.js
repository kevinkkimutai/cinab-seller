'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment_setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payment_setting.init({
    name: DataTypes.STRING,
    information: DataTypes.TEXT,
    unique_keyword: DataTypes.STRING,
    photo: DataTypes.STRING,
    text: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'payment_setting',
  });
  return payment_setting;
};