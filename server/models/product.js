const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Product extends Model {
    static associate(models) {
      // Define Associations
      Product.belongsTo(models.Vendor, {
        foreignKey: "vendorId",
        as: "vendor",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Product.hasMany(models.Offer, {
        foreignKey: "productId",
        as: "offers",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Product.init(
    {
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
      vendorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "vendors", key: "id" },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Rprice: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      approval: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      stock: {
        type: DataTypes.STRING,
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
