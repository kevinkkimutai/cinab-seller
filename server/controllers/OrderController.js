// controllers/orderController.js
const { Order, User, order, Vendor } = require("../models");

const API = "https://cinab-seller-2m51.onrender.com/v2";

const orderController = {
  getAllOrders: async (req, res) => {
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

  getAllOrder: async (req, res) => {
    // const id = req.user.id;
    const id = "2";
    try {
      const vendor = await Vendor.findOne({ where: { userId: id } });
      console.log(vendor);
      const orders = await order.findAll({
        order: [["id", "ASC"]],
      });

      // Parse the "cart" attribute for each order to extract product IDs without hyphens
      const products = orders.map((order) => {
        const cart = JSON.parse(order.cart);
        // const productIds = Object.keys(cart).map((id) => id.replace("-", ""));
        // return { orderId: order.id, productIds };
      });

      console.log(products);

      const vendorProductOrders = products.filter((productOrder) =>
        // productOrder.productIds.includes(vendor.id)
        console.log(productOrder)
      );
      res.status(200).json("vendorProductOrders");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrderById: async (req, res) => {
    const orderId = req.params.id;

    try {
      const order = await Order.findByPk(orderId);

      if (!order) {
        return res.status(404).json({ message: "order not found" });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = orderController;
