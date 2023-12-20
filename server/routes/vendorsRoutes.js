const express = require("express")
const router = express.Router();
const vendorsController = require("../controllers/VendorController");

router.get("/vendors", vendorsController.getVendors)


module.exports = router