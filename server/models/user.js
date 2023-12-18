const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Insert here Associations
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp: {
        type: DataTypes.STRING,
      },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },

      role: {
        type: DataTypes.STRING,
      },
      refreshToken: {
        type: DataTypes.TEXT,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 100],
            msg: "Password must be at least 6 characters long",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
