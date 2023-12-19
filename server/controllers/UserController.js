const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { Op } = require("sequelize"); // Import the Op object from Sequelize
require("dotenv").config();
const { User, Token, UserProfile } = require("../models");

const crypto = require("crypto");
const { sendEmails, sendingEmails } = require("../middlewares/Verification");
function generateOTP() {
  const min = 1000; // Minimum 4-digit number
  const max = 9999; // Maximum 4-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const userController = {
  create: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!password) {
        return res.status(422).json({ error: "Password is required" });
      }

      if (!name) {
        return res.status(422).json({ error: "Name is required" });
      }

      if (!email) {
        return res.status(422).json({ error: "Email is required" });
      }
      const duplicateUser = await User.findOne({ where: { email } });
      if (duplicateUser) {
        return res.status(409).json({ error: "Email already used" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const expirationTime = new Date();
      expirationTime.setMinutes(expirationTime.getMinutes() + 5);

      const user = await User.create({
        email,
        name,
        password: hashedPassword,
        refreshToken: null,
        role: "Supplier",
      });
      return res.status(201).send(user);
    } catch (error) {
      return res.status(500).send({ error: "Failed to create user" });
    }
  },

  resendVerificationLink: async (req, res) => {
    try {
      // Retrieve the user ID from the cookie
      const userId = req.cookies.userId;

      if (!userId) {
        return res.status(404).json({ error: "User not found" });
      }

      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Generate a new verification token and set it in the database
      const verificationToken = crypto.randomBytes(16).toString("hex");

      // Calculate the new expiration time (12 minutes from now)
      const tokenExpiration = new Date();
      tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 12);

      // Find the existing token and update it or delete it
      let existingToken = await Token.findOne({ where: { userId } });
      if (existingToken) {
        await existingToken.update({
          token: verificationToken,
          expiresAt: tokenExpiration,
        });
      } else {
        await Token.create({
          userId,
          token: verificationToken,
          expiresAt: tokenExpiration,
        });
      }
      const username = user.name;
      const to = user.email;
      const subject = "Resend Account Verification Link";
      const verificationLink = `https://e-procurement.onrender.com/v1/verify-email/${userId}/${verificationToken}`;
      // Send the new verification link to the user's email

      sendEmails(to, verificationLink, subject, username);

      // Pass the success message to the EJS template
      const successMessage = "Verification link resent successfully.";

      // Render the EJS template with the success message
      return res.render("resend-verifications", { successMessage });
    } catch (error) {
      return res.status(500).send("Failed to resend verification link");
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const { id, token } = req.params;
      const now = new Date();

      const usertoken = await Token.findOne({
        where: {
          userId: id,
          token,
          expiresAt: { [Op.gt]: now }, // Check if the token has not expired (greater than current time)
        },
      });
      // Set the user ID in a cookie
      res.cookie("userId", id, { maxAge: 86400000, httpOnly: true });

      if (!usertoken) {
        return res.render("resend-verification");
      } else {
        const user = await User.findOne({ where: { id } });
        if (!user) {
          return res
            .status(401)
            .redirect("https://mightyflexs.vercel.app/register");
        } else if (user.isVerified) {
          return res
            .status(200)
            .redirect("https://mightyflexs.vercel.app/login");
        } else {
          user.isVerified = true;
          await user.save();

          // Remove the verification token from the database after successful verification
          await usertoken.destroy();

          return res
            .status(200)
            .redirect("https://mightyflexs.vercel.app/login");
        }
      }
    } catch (error) {
      return res.status(500).send({ error: "Failed to verify email" });
    }
  },
  //
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
      return res.status(500).send({ error: "Failed to verified OTP" });
    }
  },

  //
  ResetPassword: async (req, res) => {
    try {
      const { otp, newPassword } = req.body;

      if (!otp) {
        return res.status(400).json({ error: "OTP is required" }); // Changed "Email is required" to "OTP is required"
      }
      if (!newPassword) {
        return res.status(400).json({ error: "Enter New Password" }); // Changed "Email is required" to "OTP is required"
      }
      // const user = await User.findOne({ where: { otp } );
      const user = await User.findOne({ where: { otp } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // hash the newPassword before storing it in your database for security

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password attribute with the hashed password
      user.password = hashedPassword;

      // Set the OTP attribute to null
      user.otp = null;

      // Save the changes to the user
      await user.save();

      return res.status(200).json({ message: "Password successfully reset." });
    } catch (error) {
      return res.status(500).send({ error: "Failed to reset the password" });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      // Use the User model to find all users
      const users = await User.findAll({
        order: [["id", "ASC"]],
      });

      // Return the list of users in a JSON response
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Failed to retrieve users" });
    }
  },

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

      // Generate a new 4-digit OTP
      const otp = generateOTP(); // You need to implement the `generateOTP` function

      user.otp = otp; // Update the 'otp' field with the new OTP
      await user.save();

      // Send the OTP to the user's email
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

  // Update User
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

  // AUTHETICATION
  authenticate: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
      });
      // Chech if user Exists
      if (!user) {
        return res.status(404).send({ error: "Email Not Found." });
      }

      // Validate Password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      } else {
        // Assighn Accecc Key
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
          maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
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
      console.log(error);
      return res.status(400).send({ error: "Login failed" });
    }
  },
  
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      if (!users) {
        return res.status(400).json({ users });
      }
    } catch (error) {
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },

  logout: async (req, res) => {
    try {
      const id = req.user.id;
      console.log(id);
      // Assuming you store the user's information in the request object
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      // Invalidate the user's refresh token
      user.refreshToken = null;
      await user.save();
      // Clear the refresh token cookie on the client side
      res.clearCookie("jwt");
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to logout" });
    }
  },
};

module.exports = userController;
