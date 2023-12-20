const { Vendor } = require("../models");

// start of the controller
const vendorController = {
  getVendors: async (req, res) => {
    try {
      const vendors = await Vendor.findAll();
      if (!vendors)
        return res
          .status(404)
          .send({ error: "Not Vendors Found at the moment" });
      else {
        return res.status(201).json(vendors);
      }
    } catch (error) {
        console.log(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },
};
module.exports = vendorController;
