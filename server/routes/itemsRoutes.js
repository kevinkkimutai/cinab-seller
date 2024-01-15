const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/ItemsController");
const uploadMiddleware = require("../middlewares/UploadingFiles");

/**
 * Get all orders.
 */
router.get("/items", itemsController.getAllitems);
router.get("/category", itemsController.getData);
router.post("/items", itemsController.createitems);
router.delete("/items/:itemsId", itemsController.deleteitems);

/**
 * Get a order by ID.
 */

module.exports = router;
