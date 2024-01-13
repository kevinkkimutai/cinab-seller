// controllers/itemsController.js
const { item, Vendor } = require("../models");

const API = "http://localhost:5000";

const itemsController = {
  getAllitems: async (req, res) => {
    try {
      const items = await item.findAll({
        order: [["created_at", "ASC"]],
      });
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createitems: async (req, res) => {
    try {
      // const user = await User.findByPk(vendorId);

      // if (!user) {
      //   return res.status(404).json({ message: "User not found" });
      // }

      // Check if files were uploaded
      const imageFile = req.file;
      const imagePath = `${API}/uploads/${imageFile.filename}`;
      try {
        const newitems = await items.create({
          vendorId: 1,
          pname,
          category,
          stock,
          brand,
          description,
          price,
          approval,
          image: imagePath, // Assuming image is a string field in the database
        });

        await user.additems(newitems);

        res.status(201).json(newitems);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  createitems: async (req, res) => {
    const { pname, category, stock, brand, description, price, approval } =
      req.body;

    const vendorId = 1;

    const vendor = await Vendor.findByPk(vendorId);

    if (!vendor) {
      return res.status(404).json({ error: "Vendor Not Found" });
    }
    const imageFile = req.file;
    const imagePath = `${API}/uploads/${imageFile.filename}`;
    try {
      const newitems = await items.create({
        vendorId: vendor.id,
        pname,
        category,
        stock,
        brand,
        description,
        price,
        approval,
        image: imagePath,
      });

      return res.status(201).json(newitems);
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal Server Error");
    }
  },

  getitemsById: async (req, res) => {
    const itemsId = req.params.id;

    try {
      const items = await items.findByPk(itemsId);

      if (!items) {
        return res.status(404).json({ message: "items not found" });
      }

      res.json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateitems: async (req, res) => {
    const { id } = req.params;
    const { pname, category, stock, brand, description, price, approval } =
      req.body;

    try {
      // Check if a file was uploaded
      const imageFile = req.file;
      const imagePath = imageFile
        ? `${API}/uploads/${imageFile.filename}`
        : null;

      // Check if the items with the given ID exists
      const items = await items.findByPk(id);

      if (!items) {
        return res.status(404).json({ error: "items Not Found" });
      }

      // Update the items with the new information
      const updateditemsData = {
        pname,
        category,
        stock,
        brand,
        description,
        price,
        approval,
      };

      // Only update the image if a file was uploaded
      if (imageFile) {
        updateditemsData.image = imagePath;
      }

      const updateditems = await items.update(updateditemsData);

      return res.status(200).json(updateditems);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteitems: async (req, res) => {
    const itemsId = req.params.id;

    try {
      const items = await items.findByPk(itemsId);

      if (!items) {
        return res.status(404).json({ message: "items not found" });
      }

      await items.destroy();

      res.json({ message: "items deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = itemsController;
