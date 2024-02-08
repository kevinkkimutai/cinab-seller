"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Administrator extends Model {
    static associate(models) {
      // define association here
      Administrator.belongsTo(models.User, {
        foreignKey: "userId",
        as: "users",
      });
    }
  }
  Administrator.init(
    {
      name: DataTypes.STRING,
      contact: DataTypes.STRING,
      image: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Administrator",
    }
  );
  return Administrator;
};
