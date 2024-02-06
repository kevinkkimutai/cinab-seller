'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Administrator extends Model {

    static associate(models) {
      // define association here
    }
  }
  Administrator.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    gender: DataTypes.STRING,
    contact: DataTypes.STRING,
    image: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Administrator',
  });
  return Administrator;
};