const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Product extends Model {
    static associate(models) {
      // Define Associations
      Product.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  return Product;
};