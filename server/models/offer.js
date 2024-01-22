"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    static associate(models) {
      Offer.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }

  Offer.init(
    {
      productId: {
        type: DataTypes.INTEGER,
      },
      offerPrice: {
        type: DataTypes.FLOAT,
      },
      fromDate: {
        type: DataTypes.DATEONLY,
      },
      status: {
        type: DataTypes.STRING,
      },
      toDate: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      sequelize,
      modelName: "Offer",
    }
  );

  return Offer;
};
