// controllers/productController.js
const { Product, User, item, tax } = require("../models");

const { Product, User, item , } = require("../models");
const API = "http://localhost:5000";

const productController = {
  // getAllProducts: async (req, res) => {
  //   try {
  //     const products = await Product.findAll({
  //       order: [["createdAt", "ASC"]],
  //     });
  //     res.status(200).json(products);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // },

  getAllProducts: async (req, res) => {
    try {
      const items = await item.findAll();
      res.status(200).json(items);

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  },

  createProduct: async (req, res) => {
    const {
      vendorId,
      category_id,
      subcategory_id,
      childcategory_id,
      tax_id,
      brand_id,
      name,
      slug,
      sku,
      tags,
      video,
      sort_details,
      specification_name,
      specification_description,
      is_specification,
      details,
      photo,
      discount_price,
      previous_price,
      stock,
      meta_keywords,
      meta_description,
      status,
      is_type,
      date,
      file,
      link,
      file_type,
      license_name,
      license_key,
      item_type,
      thumbnail,
      affiliate_link,
    } = req.body;

    try {
      // const user = await User.findByPk(vendorId);

      // if (!user) {
      //   return res.status(404).json({ message: "User not found" });
      // }

      // Check if files were uploaded
      const imageFile = req.file;
      const imagePath = `https://cinab-seller-2m51.onrender.com/uploads/file-1705133682452.png`;
      try {
        const newProduct = await item.create({
 
          vendorId: "1",
          category_id: "1",
          subcategory_id: "1",
          childcategory_id: "1",
          tax_id,
          brand_id,
          name,
          slug,
          sku,
          tags,
          video,
          sort_details,
          specification_name,
          specification_description,
          is_specification,
          details,
          photo: imagePath,
          discount_price,
          previous_price,
          stock,
          meta_keywords,
          meta_description,
          status,
          is_type,
          date,
          file,
          link,
          file_type,
          license_name,
          license_key,
          item_type,
          thumbnail,
          affiliate_link,
          image: imagePath, // Assuming image is a string field in the database
        });

        // await user.addProduct(newProduct);

        res.status(201).json(newProduct);
      } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  getProductById: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { pname, category, stock, brand, description, price, approval } =
      req.body;

    try {
      // Check if a file was uploaded
      const imageFile = req.file;
      const imagePath = imageFile
        ? `${API}/uploads/${imageFile.filename}`
        : null;

      // Check if the product with the given ID exists
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: "Product Not Found" });
      }

      // Update the product with the new information
      const updatedProduct = await product.update({
        pname,
        category,
        stock,
        brand,
        description,
        price,
        approval,
        image: imagePath,
      });

      return res.status(200).json(updatedProduct);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteProduct: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await product.destroy();

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = productController;
