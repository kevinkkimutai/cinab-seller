const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const uploadMiddleware = require("../middlewares/UploadingFiles");


/**
 * Get all orders.
 */
router.get("/orders", orderController.getAllOrders);

/**
 * Get a order by ID.
 */
router.get("/orders/:id", orderController.getOrderById);


module.exports = router;
