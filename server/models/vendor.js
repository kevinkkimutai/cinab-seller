"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vendor.init(
    {
      businessName: {
        type: DataTypes.STRING,
      },
      kraPin: {
        type: DataTypes.STRING,
      },
      tradingLicense: {
        type: DataTypes.STRING,
      },
      companyAddress: {
        type: DataTypes.STRING,
      },
      streetAddress: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      companyEmail: {
        type: DataTypes.STRING,
      },
      website: {
        type: DataTypes.STRING,
      },
      serviceDetails: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Vendor",
    }
  );
  return Vendor;
};
