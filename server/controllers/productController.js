// controllers/productController.js
const { Product } = require('../models');

const productController = {

getAllProducts: async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},
createProduct: async (req, res) => {
  const { userId, name, description, price } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Use the file upload middleware
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const { filename } = req.file; // Assuming the file field is named 'image'

      try {
        const newProduct = await Product.create({
          name,
          description,
          price,
          image: filename, // Save the filename in the 'image' field of the product
        });

        await user.addProduct(newProduct);

        res.status(201).json(newProduct);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

getProductById: async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

updateProduct: async (req, res) => {
  const productId = req.params.id;
  const { name, price, description, image } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update({ name, price, description, image });

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
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

};
module.exports = productController;