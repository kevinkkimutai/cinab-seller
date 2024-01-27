"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    static associate(models) {
      Vendor.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Vendor.hasMany(models.Product, {
        foreignKey: "vendorId",
        as: "products",
      });
      Vendor.hasMany(models.brand, {
        foreignKey: "vendorId",
        as: "brands",
      });
      Vendor.hasMany(models.category, {
        foreignKey: "vendorId",
        as: "categories",
      });
    }
  }
  Vendor.init(
    {
      companyName: {
        type: DataTypes.STRING,
      },
      secretCode: {
        type: DataTypes.STRING,
      },
      companyEMail: {
        type: DataTypes.STRING,
      },
      Kra: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      licence: {
        type: DataTypes.STRING,
      },
      AddressOne: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
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
      username: {
        type: DataTypes.STRING,
      },
      image: {
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
