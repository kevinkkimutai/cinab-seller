'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  category.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    photo: DataTypes.STRING,
    meta_keywords: DataTypes.STRING,
    meta_descriptions: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    is_feature: DataTypes.INTEGER,
    serial: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};