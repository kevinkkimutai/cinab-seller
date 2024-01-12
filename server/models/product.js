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
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
      },
      category_id: { type: DataTypes.INTEGER, allowNull: true },
      subcategory_id: { type: DataTypes.INTEGER, allowNull: true },
      childcategory_id: { type: DataTypes.INTEGER, allowNull: true },
      tax_id: { type: DataTypes.INTEGER, allowNull: true },
      brand_id: { type: DataTypes.INTEGER, allowNull: true },
      name: { type: DataTypes.TEXT, allowNull: true },
      slug: { type: DataTypes.TEXT, allowNull: true },
      sku: { type: DataTypes.STRING, allowNull: true },
      tags: { type: DataTypes.TEXT, allowNull: true },
      video: { type: DataTypes.TEXT, allowNull: true },
      sort_details: { type: DataTypes.TEXT, allowNull: true },
      specification_name: { type: DataTypes.TEXT, allowNull: true },
      specification_description: { type: DataTypes.TEXT, allowNull: true },
      is_specification: { type: DataTypes.INTEGER, allowNull: true },
      details: { type: DataTypes.TEXT, allowNull: true },
      photo: { type: DataTypes.STRING, allowNull: true },
      discount_price: { type: DataTypes.DOUBLE, allowNull: true },
      previous_price: { type: DataTypes.DOUBLE, allowNull: true },
      stock: { type: DataTypes.INTEGER, allowNull: true },
      meta_keywords: { type: DataTypes.TEXT, allowNull: true },
      meta_description: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.INTEGER, allowNull: true },
      is_type: { type: DataTypes.STRING, allowNull: true },
      date: { type: DataTypes.STRING, allowNull: true },
      file: { type: DataTypes.STRING, allowNull: true },
      link: { type: DataTypes.TEXT, allowNull: true },
      file_type: { type: DataTypes.STRING, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: true },
      updated_at: { type: DataTypes.DATE, allowNull: true },
      license_name: { type: DataTypes.TEXT, allowNull: true },
      license_key: { type: DataTypes.TEXT, allowNull: true },
      item_type: { type: DataTypes.STRING, allowNull: true },
      thumbnail: { type: DataTypes.STRING, allowNull: true },
      affiliate_link: { type: DataTypes.TEXT, allowNull: true },
      createdAt: { type: DataTypes.DATE, allowNull: true },
      updatedAt: { type: DataTypes.DATE, allowNull: true }
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  return Product;
};
