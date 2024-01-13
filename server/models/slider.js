'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class slider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  slider.init({
    photo: DataTypes.STRING,
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    logo: DataTypes.STRING,
    details: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    home_page: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'slider',
  });
  return slider;
};