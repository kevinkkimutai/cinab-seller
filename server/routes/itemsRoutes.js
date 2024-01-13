const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/ItemsController");
const uploadMiddleware = require("../middlewares/UploadingFiles");


/**
 * Get all orders.
 */
router.get("/items", itemsController.getAllitems);

/**
 * Get a order by ID.
 */


module.exports = router;
