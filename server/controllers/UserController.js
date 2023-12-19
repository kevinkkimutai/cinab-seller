/*
Summary:
This is a JavaScript file named UserController.js that contains the implementation of various user-related functionalities such as OTP verification, password reset, user update, user deletion, authentication, and logout. It uses libraries like bcrypt, jwt, cookie-parser, sequelize, and crypto for different purposes. The code defines a userController object that exports all the implemented functions.

Programming Language: JavaScript
*/

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { Op } = require("sequelize"); // Import the Op object from Sequelize
require("dotenv").config();
const { User, Token, UserProfile } = require("../models");
const crypto = require("crypto");
const { sendingEmails } = require("../middleware/Verification");

// Function to generate a 4-digit OTP
function generateOTP() {
  const min = 1000; // Minimum 4-digit number
  const max = 9999; // Maximum 4-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const userController = {
  // Function to verify OTP
  VerifyOtp: async (req, res) => {
    try {
      const { otp } = req.body;
      if (!otp) {
        return res.status(400).json({ error: "Email is required" });
      }
      const user = await User.findOne({ where: { otp } });
      if (!user) {
        return res.status(404).json({ error: "OTP not found" });
      }
      return res.status(200).json({ message: "OTP verified successfully." });
    } catch (error) {
      return res.status(500).send({ error: "Failed to verify OTP" });
    }
  },

  //Function to get all users
  getUsers: async (req, res) =>{
try{
  const response= await User.findAll()
  if(!response)return  res.status(404).json({error:"not found"})
  else{
return res.status(201).json({response})}
  
}
catch (error)
{return res.status(500).send({error:"failed"})}
  },

  // Function to reset password using OTP
  ResetPassword: async (req, res) => {
    try {
      const { otp, newPassword } = req.body;
      if (!otp) {
        return res.status(400).json({ error: "OTP is required" });
      }
      if (!newPassword) {
        return res.status(400).json({ error: "Enter New Password" });
      }
      const user = await User.findOne({ where: { otp } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.otp = null;
      await user.save();
      return res.status(200).json({ message: "Password successfully reset." });
    } catch (error) {
      return res.status(500).send({ error: "Failed to reset the password" });
    }
  },

  // Function to send OTP for password reset
  forgetPassword: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: "Email not found" });
      }
      const otp = generateOTP();
      user.otp = otp;
      await user.save();
      sendingEmails({
        from: "no-reply@example.com",
        to: email,
        subject: "OTP for Password Reset",
        text: `Hello, ${user.name} Your OTP is: ${otp}`,
      });
      return res.status(200).json({ message: "OTP sent successfully." });
    } catch (error) {
      return res.status(500).send({ error: "Failed to send OTP" });
    }
  },

  // Function to update user information
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await user.update({ name, email });
      res.json({ message: "User updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Function to delete a user
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await user.destroy();
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Function for user authentication
  authenticate: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        return res.status(404).send({ error: "Email Not Found." });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      } else {
        const accessToken = jwt.sign(
          {
            email: user.email,
            id: user.id,
            name: user.name,
          },
          process.env.SECRET_KEY,
          { algorithm: "HS256", expiresIn: "20m" }
        );
        const refreshToken = jwt.sign(
          {
            email: user.email,
            id: user.id,
            name: user.name,
          },
          process.env.REFRESH_KEY,
          { algorithm: "HS256", expiresIn: "1d" }
        );
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("jwt", refreshToken, {
          maxAge: 24 * 60 * 60 * 1000,
          secure: true,
          httpOnly: true,
          sameSite: "none",
        });
        const { id, email, name, role } = user;
        return res.status(201).json({
          token: accessToken,
          refreshToken: refreshToken,
          user: {
            id,
            email,
            name,
            role,
          },
        });
      }
    } catch (error) {
      return res.status(400).send({ error: "Login failed" });
    }
  },

  // Function to logout a user
  logout: async (req, res) => {
    try {
      const id = req.user.id;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      user.refreshToken = null;
      await user.save();
      res.clearCookie("jwt");
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to logout" });
    }
  },
};

module.exports = userController;
