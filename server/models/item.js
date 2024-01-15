"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  item.init(
    {
      category_id: DataTypes.INTEGER,
      subcategory_id: DataTypes.INTEGER,
      childcategory_id: DataTypes.INTEGER,
      tax_id: DataTypes.INTEGER,
      brand_id: DataTypes.INTEGER,
      name: DataTypes.TEXT,
      slug: DataTypes.TEXT,
      image: DataTypes.STRING,
      sku: DataTypes.STRING,
      tags: DataTypes.TEXT,
      video: DataTypes.TEXT,
      sort_details: DataTypes.TEXT,
      specification_name: DataTypes.TEXT,
      specification_description: DataTypes.TEXT,
      is_specification: DataTypes.INTEGER,
      details: DataTypes.TEXT,
      photo: DataTypes.STRING,
      discount_price: DataTypes.DOUBLE,
      previous_price: DataTypes.DOUBLE,
      stock: DataTypes.INTEGER,
      meta_keywords: DataTypes.TEXT,
      meta_description: DataTypes.TEXT,
      status: DataTypes.INTEGER,
      is_type: DataTypes.STRING,
      date: DataTypes.STRING,
      file: DataTypes.STRING,
      link: DataTypes.TEXT,
      file_type: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      license_name: DataTypes.TEXT,
      license_key: DataTypes.TEXT,
      item_type: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      affiliate_link: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "item",
    }
  );
  return item;
};
