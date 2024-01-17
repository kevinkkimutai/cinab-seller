const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/ItemsController");
const uploads = require("../middlewares/UploadingFiles");

/**
 * Get all orders.
 */
router.get("/items", itemsController.getAllitems);
router.get("/category", itemsController.getData);

router.post(
  "/items",
  uploads.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  itemsController.createitems
);
router.delete("/items/:itemsId", itemsController.deleteitems);
router.get("/items/:itemsId", itemsController.getitemsById);

/**
 * Get a order by ID.
 */

module.exports = router;
