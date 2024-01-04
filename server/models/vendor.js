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
      companyName: {
        type: DataTypes.STRING,
      },
      companyEMail: {
        type: DataTypes.STRING,
      },
      Kra: {
        type: DataTypes.STRING,
      },
      licence: {
        type: DataTypes.STRING,
      },
      AddressOne: {
        type: DataTypes.STRING,
      },
      AddressTwo: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      website: {
        type: DataTypes.STRING,
      },
      services: {
        type: DataTypes.STRING,
      },
      BankName: {
        type: DataTypes.STRING,
      },
      AccountNumber: {
        type: DataTypes.STRING,
      },
      MpesaNumber: {
        type: DataTypes.STRING,
      },
      MpesaName: {
        type: DataTypes.STRING,
      },
      SAddressOne: {
        type: DataTypes.STRING,
      },
      SAddressTwo: {
        type: DataTypes.STRING,
      },
      Scity: {
        type: DataTypes.STRING,
      },
      Sstate: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      Postal_Address: {
        type: DataTypes.STRING,
      },
      businessType: {
        type: DataTypes.STRING,
      },
      shopName: {
        type: DataTypes.STRING,
      },
      shopZone: {
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
