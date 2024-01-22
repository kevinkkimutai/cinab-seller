'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    details: DataTypes.TEXT,
    photo: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    tags: DataTypes.STRING,
    meta_keywords: DataTypes.STRING,
    meta_descriptions: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};