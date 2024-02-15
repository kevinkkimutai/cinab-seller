const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendorController");
const uploadMiddleware = require("../middlewares/UploadingFiles");

// Define routes for vendors
router.get("/vendors", vendorController.getVendors);

router.put("/approve/:id", vendorController.approveVendor);
router.put("/reject/:id", vendorController.rejectVendor);
router.get("/vendors/:id", vendorController.getVendorById);
router.post("/self-register", vendorController.selfRegistration);
router.put(
  "/vendor/:id",
  uploadMiddleware.single("image"),
  vendorController.updateVendor
);
router.put(
  "/vendors",
  uploadMiddleware.single("image"),
  vendorController.updateDetails
);
router.delete("/vendors/:id", vendorController.deleteVendor);

module.exports = router;
