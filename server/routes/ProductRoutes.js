
const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");


/**
 * Get all products.
 */
router.get("/products", productController.getAllProducts);

// post create product
router.post("/products", productController.createProduct);

// update products using dynamic parameter
router.put("/products/:id", productController.updateProduct);

module.exports = router;
