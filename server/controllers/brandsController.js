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
  
  
  const API = "https://server.cinab.co.ke";
  
  const itemsController = {
    // get items for the logged in getVendors
    create: async (req, res) => {
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
 
  
  
  };
  module.exports = itemsController;
  