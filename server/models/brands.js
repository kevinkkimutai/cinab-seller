"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      brand.belongsTo(models.Vendor, {
        foreignKey: "vendorId",
        as: "vendor",
      });
    }
  }

  brand.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      photo: DataTypes.STRING,
      status: DataTypes.INTEGER,
      vendorId: DataTypes.INTEGER,
      is_popular: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "brand",
      timestamps: true,
    }
  );

  return brand;
};
