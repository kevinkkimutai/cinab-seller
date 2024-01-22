// controllers/itemsController.js
const {
  item,
  Vendor,
  category,
  brand,
  order,
  subcategory,
  chield_category,
} = require("../models");

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const API = "https://cinab-seller-2m51.onrender.com";

const itemsController = {
  // get items for the logged in getVendors
  getAllitem: async (req, res) => {
    console.log(id);
    try {
      const items = await item.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllitems: async (req, res) => {
    try {
      const orders = await order.findAll({
        order: [["id", "ASC"]],
      });

      // Extracting only the "cart" information from each order
      const carts = orders.map((order) => {
        return {
          cart: JSON.parse(order.cart), // Parse the cart string to convert it into an object
        };
      });

      // Extract and flatten product IDs
      const productIDs = carts.flatMap((item) => Object.keys(item.cart));

      res.status(200).json(productIDs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBrands: async (req, res) => {
    try {
      const brands = await brand.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(brands);
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
      const fileData = req.files;
      // console.log(fileData);
      const imageFile = fileData.image[0];
      const imagePath = imageFile
        ? `${API}/uploads/${imageFile.filename}`
        : null;
      console.log(imagePath);
      // Handle gallery upload
      const galleryFiles = fileData.gallery || [];
      const galleryPaths = galleryFiles.map(
        (file) => `${API}/uploads/${file.filename}`
      );
      const galleryPathsString = galleryPaths.join(",");
      // Generate a random SKU of 5 characters
      const randomSku = generateRandomString(4);
      // const randomSku = `#${randomSkuWithoutHash}`;

      const newitems = {
        ...createdData,
        item_type: "normal",
        gallery: galleryPathsString,
        image: imagePath,
        slug: createdData.name.replace(/\s+/g, "-"),
        sku: randomSku,
        is_type: "undefine",
        specification_description: JSON.stringify(
          [createdData.specification_description].filter(Boolean)
        ),
        is_specification: 1,
        specification_name: JSON.stringify(
          [createdData.name, createdData.brand].filter(Boolean)
        ),
      };

      try {
        await item.create(newitems);
        res.status(201).json(newitems);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  getitemsById: async (req, res) => {
    const { itemsId } = req.params;

    try {
      const items = await item.findByPk(itemsId);

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
    const updateditemsData = req.body;
    console.log(updateditemsData);
    try {
      // Check if the items with the given ID exists
      const items = await item.findByPk(id);

      if (!items) {
        return res.status(404).json({ error: "items Not Found" });
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
