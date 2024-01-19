const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendorController");
const uploadMiddleware = require("../middlewares/UploadingFiles");

// Define routes for vendors
router.get("/vendors", vendorController.getVendors);
router.get("/vendors/:id", vendorController.getVendorById);
router.post("/vendors", vendorController.createVendor);
router.post("/self-register", vendorController.selfRegistration);
router.put(
  "/vendors",
  uploadMiddleware.single("image"),
  vendorController.updateVendor
);
router.delete("/vendors/:id", vendorController.deleteVendor);

module.exports = router;
