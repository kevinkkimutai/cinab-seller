const { Administrator } = require("../models");

const administratorController = {
  create: async (req, res) => {
    const { name, location, gender, contact, email } = req.body;

    try {
      const createdAdmin = await Administrator.create({
        name,
        location,
        gender,
        contact,
        email,
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
