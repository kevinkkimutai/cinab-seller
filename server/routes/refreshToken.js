/**
 * This code is written in JavaScript and is stored in the file refreshToken.js.
 * It defines a router for handling the "/refresh" endpoint in an Express application.
 * The router imports a controller from refreshTokenController.js and assigns the getRefreshToken function to handle the GET request to "/refresh".
 * Finally, the router is exported to be used in other parts of the application.
 */
const express = require("express");
const router = express.Router();
const refreshController = require("../controllers/refershTokenController");

router.get("/refresh", refreshController.getRefreshToken);

module.exports = router;