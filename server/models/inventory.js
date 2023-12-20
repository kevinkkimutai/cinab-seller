'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inventory.belongsTo(models.Vendor, { foreignKey: 'vendorId', as: 'vendor' });
    }
  }
  Inventory.init({
    productName: DataTypes.STRING,
    category: DataTypes.STRING,
    inStock: DataTypes.INTEGER,
    unitsLeft: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};