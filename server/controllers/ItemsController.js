// controllers/itemsController.js
const {
  item,
  Vendor,
  category,
  subcategory,
  chield_category,
} = require("../models");

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

  // get brand tax, child category and subcategory at ones

  getData: async (req, res) => {
    try {
      const categories = await category.findAll({
        attributes: ["id", "name"],

        include: {
          model: subcategory,
          as: "subcategories",
          attributes: ["id", "name"],
          include: [
            {
              model: chield_category,
              as: "childcategories",
              attributes: ["id", "name"],
            },
          ],
        },
      });
      return res.status(200).send(categories);
    } catch (error) {
      console.log(error);
    }
  },

  createitems: async (req, res) => {
    const createdData = req.body;
    try {
      // Check if files were uploaded
      const imageFile = req.file;
      // const imagePath = `${API}/uploads/${imageFile.filename}`;
      const imagePath =
        "https://cinab-seller-2m51.onrender.com/uploads/file-1705133682452.png";
      try {
        const newitems = await item.create({
          ...createdData,
          image: imagePath, // Assuming image is a string field in the database
        });

        res.status(201).json(newitems);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
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
    const { itemsId } = req.params;

    try {
      const items = await item.findByPk(itemsId);

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
