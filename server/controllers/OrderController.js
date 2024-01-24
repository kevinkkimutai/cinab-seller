// controllers/orderController.js
const { Order, order, Vendor, item } = require("../models");

const API = "https://cinab-seller-2m51.onrender.com/v2";

const orderController = {
  getAllOrders: async (req, res) => {
    const userId = req.user.id; // Assuming this is the user ID for the vendor

    try {
      // Find the vendor based on the provided user ID
      const vendor = await Vendor.findOne({ where: { userId } });

      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }

      // Find all orders
      const allOrders = await order.findAll({
        order: [["id", "ASC"]],
      });

      // Extract product IDs from the cart attribute and filter orders
      const filteredOrders = await Promise.all(
        allOrders.map(async (order) => {
          const cart = JSON.parse(order.cart);
          const productIds = Object.keys(cart).map((productId) =>
            productId.replace("-", "")
          );
          console.log(productIds);

          // Check if any of the product IDs belong to the vendor
          const productsForVendor = await Promise.all(
            productIds.map(async (productId) => {
              const product = await item.findOne({
                where: { id: productId },
              });
              console.log(product);
              return product && product.vendorId === vendor.id;
            })
          );

          return productsForVendor.some(Boolean);
        })
      );

      // Filter out orders where none of the products belong to the vendor

      const finalOrders = allOrders.filter(
        (order, index) => filteredOrders[index]
      );

      // Check if there are any vendor orders
      if (finalOrders.length === 0) {
        return res
          .status(404)
          .json({ message: "No data found for the vendor" });
      }

      const vendorOrders = finalOrders.map((order) => JSON.parse(order.cart));
      res.status(200).json({ orders: vendorOrders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
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
