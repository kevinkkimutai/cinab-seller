// controllers/productController.js
const { Product, User } = require("../models");

const API = "https://cinab-seller-2m51.onrender.com";

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(201).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createProduct: async (req, res) => {
    const {
      vendorId,
      pname,
      category,
      stock,
      brand,
      description,
      price,
      approval,
    } = req.body;

    try {
      const user = await User.findByPk(vendorId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if files were uploaded
      const imageFile = req.file;
      const imagePath = `${API}/uploads/${imageFile.filename}`;
      try {
        const newProduct = await Product.create({
          vendorId,
          pname,
          category,
          stock,
          brand,
          description,
          price,
          approval,
          image: imagePath, // Assuming image is a string field in the database
        });

        await user.addProduct(newProduct);

        res.status(201).json(newProduct);
      } catch (error) {
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

  // updateProduct: async (req, res) => {
  //   const productId = req.params.id;
  //   const { pname, price, stock, category, brand, approval, description, image } = req.body;

  //   try {
  //     const product = await Product.findByPk(productId);

  //     if (!product) {
  //       return res.status(404).json({ message: 'Product not found' });
  //     }


  //     await product.update({ pname, price, stock, category, brand, approval, description, image });

  //     res.json(product);
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // },
  updateProduct: async (req, res) => {
    const productId = req.params.id;
    const { pname, price, stock, category, brand, approval, description } =
      req.body;

    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Check if an image was uploaded
      const image = req.file ? req.file.filename : product.image;

      await product.update({
        pname,
        price,
        stock,
        category,
        brand,
        approval,
        description,
        image,
      });

      res.json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
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
