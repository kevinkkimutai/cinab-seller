
const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");


/**
 * Get all products.
 */
router.get("/products", productController.getAllProducts);

// post create product
router.post("/products", productController.createProduct);

module.exports = router;
