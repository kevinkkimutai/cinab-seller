'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PromoCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PromoCode.init({
    title: DataTypes.STRING,
    code_name: DataTypes.STRING,
    no_of_times: DataTypes.INTEGER,
    discount: DataTypes.DOUBLE,
    status: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PromoCode',
  });
  return PromoCode;
};