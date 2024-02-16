/*
Summary: This code defines the routes for user-related operations such as forgetting password, verifying OTP, resetting password, and authentication.

Language: JavaScript
*/

const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const vendorController =  require("../controllers/vendorController");

router.post("/vendors", vendorController.createVendor);
router.post("/register/vendors", vendorController.register);
router.post("/forget", userController.forgetPassword);
router.post("/register", userController.create);
router.post("/verify-otp", userController.VerifyOtp);
router.put("/forget-password", userController.ResetPassword);
router.post("/login", userController.authenticate);
router.get('/verify-email/:id/:token', userController.verifyEmail)


module.exports = router;
