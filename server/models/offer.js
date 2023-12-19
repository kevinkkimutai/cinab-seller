'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Offer.init({
    productName: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    inStock: DataTypes.INTEGER,
    previousPrice: DataTypes.FLOAT,
    offerPrice: DataTypes.FLOAT,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Offer',
  });
  return Offer;
};