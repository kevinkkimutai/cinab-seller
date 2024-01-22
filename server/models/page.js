'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  page.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    details: DataTypes.TEXT,
    meta_keywords: DataTypes.STRING,
    meta_descriptions: DataTypes.TEXT,
    pos: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'page',
  });
  return page;
};