const express = require("express");
const router = express.Router();
const offerController = require("../controllers/OfferController");
const uploadMiddleware = require("../middlewares/UploadingFiles");

/**
 * Get all offers.
 */
router.get("/offers", offerController.getAllOffers);

module.exports = router;
