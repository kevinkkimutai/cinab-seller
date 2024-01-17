// controllers/orderController.js
const { Order, User } = require("../models");

const API = "https://cinab-seller-2m51.onrender.com/v2";

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.findAll();
      res.status(201).json(orders);
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
