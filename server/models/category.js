"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    static associate(models) {
      category.hasMany(models.subcategory, {
        as: "subcategories",
        foreignKey: "category_id",
      });
    }
  }
  category.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      photo: DataTypes.STRING,
      // meta_keywords: DataTypes.STRING,
      // meta_description: DataTypes.TEXT,
      status: DataTypes.INTEGER,
      is_feature: DataTypes.INTEGER,
      serial: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "category",
    }
  );
  return category;
};
