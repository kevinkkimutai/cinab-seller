"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class subcategory extends Model {
    static associate(models) {
      subcategory.belongsTo(models.category, {
        as: "category",
        foreignKey: "category_id",
      });
      subcategory.hasMany(models.chield_category, {
        as: "childcategories",
        foreignKey: "subcategory_id",
      });
    }
  }
  subcategory.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "subcategory",
    }
  );
  return subcategory;
};
