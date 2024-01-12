'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class brands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  brands.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    photo: DataTypes.STRING,
    status: DataTypes.INTEGER,
    is_popular: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'brands',
  });
  return brands;
};