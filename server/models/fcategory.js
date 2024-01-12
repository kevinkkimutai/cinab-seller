'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Fcategory.init({
    name: DataTypes.STRING,
    text: DataTypes.STRING,
    slug: DataTypes.STRING,
    meta_keywords: DataTypes.STRING,
    meta_descriptions: DataTypes.TEXT,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Fcategory',
  });
  return Fcategory;
};