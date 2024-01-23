const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const uploadMiddleware = require("../middlewares/UploadingFiles");


/**
 * Get all orders.
 */
router.get("/orders", orderController.getAllOrders);
router.get("/order", orderController.getAllOrder);

/**
 * Get a order by ID.
 */
router.get("/orders/:id", orderController.getOrderById);


module.exports = router;
