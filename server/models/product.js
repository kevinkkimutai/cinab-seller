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
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
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
      stock: {
        type: DataTypes.STRING,
        allowNull: false,
      }
     
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  return Product;
};
