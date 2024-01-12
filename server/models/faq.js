'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Faq.init({
    category_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    details: DataTypes.TEXT,
    meta_keywords: DataTypes.STRING,
    meta_descriptions: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Faq',
  });
  return Faq;
};