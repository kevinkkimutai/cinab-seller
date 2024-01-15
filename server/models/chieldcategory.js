'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chield_category extends Model {
    static associate(models) {
      chield_category.belongsTo(models.subcategory, {
        as: "subcategory",
        foreignKey: "subcategory_id",
      });
    }
  }
  chield_category.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    subcategory_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'chield_category',
    
  });
  return chield_category;
};
