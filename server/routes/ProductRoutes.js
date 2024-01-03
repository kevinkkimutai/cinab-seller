const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const uploadMiddleware = require("../middlewares/UploadingFiles");


/**
 * Get all products.
 */
router.get("/products", productController.getAllProducts);

/**
 * Get a product by ID.
 */
router.get("/products/:id", productController.getProductById);

/**
 * Create a new product with file upload.
 */
router.post("/products", uploadMiddleware.array('image', 3), productController.createProduct);

/**
 * Update a product using dynamic parameter.
 */
router.put("/products/:id", uploadMiddleware.array('image', 3), productController.updateProduct);

/**
 * Delete a product by ID.
 */
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
