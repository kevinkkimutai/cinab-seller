'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class web_visitor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  web_visitor.init({
    ipAddress: DataTypes.STRING,
    countryName: DataTypes.STRING,
    countryCode: DataTypes.STRING,
    visitorID: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    accessedTime: DataTypes.STRING,
    deviceUsed: DataTypes.STRING,
    browser: DataTypes.STRING,
    pagevisited: DataTypes.STRING,
    fullPath: DataTypes.TEXT,
    pagePath: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'web_visitor',
  });
  return web_visitor;
};