const express = require("express");
const airtelMoneyController = require("../controllers/AirtelMoneyController");

const router = express.Router();

router.post("/authorize", airtelMoneyController.authorize);
router.get("/authorize", airtelMoneyController.getAuthToken)
router.post("/collectMoney", airtelMoneyController.collectMoney);
router.get("/checkCollectionStatus/:accessToken/:id", airtelMoneyController.checkCollectionStatus);

module.exports = router;
