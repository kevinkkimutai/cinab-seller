const { Administrator, User } = require("../models");
const { newUser } = require("./UserController");
const bcrypt = require("bcrypt");

const administratorController = {
  create: async (req, res) => {
    const { name, email, password, contact } = req.body;

    const imageFile = req.file;
    try {
      const existingUser = await User.findOne({
        where: { email: email },
      });
      if (existingUser) {
        return res.status(409).send({ error: "Email Already Exists" });
      }
      // Find the id of the last user
      const lastUser = await User.findOne({
        order: [["id", "DESC"]],
      });
      // Set a default password for the user
      const hashedPassword = await bcrypt.hash(password, 10);

      const imagePath = imageFile
        ? `${API}/uploads/${imageFile.filename}`
        : null;

      // Create a new user
      const userDataInfo = {
        name,
        email,
        role: "Admin",
        refreshToken: null,
        status: "Approved",
        password: hashedPassword,
        id: lastUser ? lastUser.id + 1 : 1,
      };
      const createdUser = await newUser(userDataInfo, password);

      const createdAdmin = await Administrator.create({
        name,
        email,
        contact,
        userId: createdUser.id,
        image: imagePath,
      });
      res.status(201).json(createdAdmin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  read: async (req, res) => {
    try {
      const admins = await Administrator.findAll();
      res.status(200).json(admins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  update: async (req, res) => {
    const adminId = req.params.id;
    const { name, location, gender, contact, email } = req.body;

    try {
      const adminToUpdate = await Administrator.findByPk(adminId);

      if (!adminToUpdate) {
        return res.status(404).json({ error: "Administrator not found" });
      }

      await adminToUpdate.update({
        name,
        location,
        gender,
        contact,
        email,
      });

      res.status(200).json(adminToUpdate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  
  delete: async (req, res) => {
    const adminId = req.params.id;

    try {
      const adminToDelete = await Administrator.findByPk(adminId);

      if (!adminToDelete) {
        return res.status(404).json({ error: "Administrator not found" });
      }

      await adminToDelete.destroy();

      res.status(204).send(); // No content for successful deletion
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = administratorController;
