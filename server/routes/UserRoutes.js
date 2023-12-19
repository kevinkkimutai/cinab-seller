// JavaScript code for UserRoutes.js

/**
 * This file contains the routes for user-related operations.
 */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

/**
 * Delete user by ID.
 */
router.delete("/users/:id", userController.deleteUser);

/**
 * Update user by ID.
 */
router.put("/users/:id", userController.updateUser);

/**
 * Logout user.
 */
router.delete("/logout", userController.logout);

/**
 * Get user.
 */
router.get("/user", userController.getUsers);

module.exports = router;
