const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendorController");

// Define routes for vendors
router.get("/vendors", vendorController.getVendors);
router.get("/vendors/:id", vendorController.getVendorById);
router.post("/vendors", vendorController.createVendor);
router.put("/vendors", vendorController.updateVendor);
router.delete("/vendors/:id", vendorController.deleteVendor);

module.exports = router;
