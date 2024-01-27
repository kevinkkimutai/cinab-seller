// controllers/orderController.js
const { Order, order, Vendor, item } = require("../models");

const API = "https://cinab-seller-2m51.onrender.com/v2";

const orderController = {
  getAllOrders: async (req, res) => {
    const userId = "1"; // Assuming this is the user ID for the vendor
    try {
      // Find the vendor based on the provided user ID
      const vendor = await Vendor.findOne({ where: { userId } });

      if (!vendor) {
        console.log("Not found vendor");
        return res.status(404).json({ message: "Vendor not found" });
      }

      // Find all orders
      const allOrders = await order.findAll({
        order: [["id", "ASC"]],
      });

      // Extract order details and product details for each order
      const ordersWithProducts = await Promise.all(
        allOrders.map(async (order) => {
          const cart = JSON.parse(order.cart);

          // Extract product IDs and quantities from the cart
          const productDetails = await Promise.all(
            Object.keys(cart).map(async (productId) => {
              const formattedProductId = productId.replace("-", "");
              const product = await item.findOne({
                where: { id: formattedProductId },
              });

              // Check if the product belongs to the vendor
              if (product && product.vendorId === vendor.id) {
                return {
                  id: product.id,
                  name: product.name,
                  image: product.image, // Assuming you have an 'image' attribute in the item model
                  qty: cart[productId].qty, // Extracting quantity from the cart attribute
                };
              } else {
                return null;
              }
            })
          );

          // Filter out null values (products not belonging to the vendor)
          const filteredProductDetails = productDetails.filter(Boolean);

          // Extract order details
          const orderDetails = {
            id: order.id,
            payment_status: order.payment_status,
            image:
              filteredProductDetails.length > 0
                ? filteredProductDetails[0].image
                : null,
            name:
              filteredProductDetails.length > 0
                ? filteredProductDetails[0].name
                : null,
            qty:
              filteredProductDetails.length > 0
                ? filteredProductDetails[0].qty
                : null,
            orders_status: order.order_status,
          };

          return orderDetails;
        })
      );

      // Filter out orders where none of the products belong to the vendor
      const finalOrders = ordersWithProducts.filter(
        (orderDetails) => orderDetails.image !== null
      );

      // Check if there are any vendor orders
      if (finalOrders.length === 0) {
        return res
          .status(404)
          .json({ message: "No data found for the vendor" });
      }

      res.status(200).json(finalOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Packaging orders

  PackageOrder: async (req, res) => {
    const { id } = req.params;
    try {
      const orders = await order.findOne({ where: { id } });
      if (!orders) {
        return res.status(404).send("Order Not Found");
      }
      const packedOrder = await orders.update({
        order_status: "Packaging",
      });
      console.log(orders);
      return res.status(202).send({ packedOrder });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  },
  // REJECT ORDER
  RejectOrder: async (req, res) => {
    const { id } = req.params;
    try {
      const orders = await order.findOne({ where: { id } });
      if (!orders) {
        return res.status(404).send("Order Not Found");
      }
      const packedOrder = await orders.update({
        order_status: "Rejected",
      });
      console.log(orders);
      return res.status(202).send({ packedOrder });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  },
         
  TransitOrder: async (req, res) => {
    const { id } = req.params;
    try {
      const orders = await order.findOne({ where: { id } });
      if (!orders) {
        return res.status(404).send("Order Not Found");
      }
      const packedOrder = await orders.update({
        order_status: "Transit",
      });
      console.log(orders);
      return res.status(202).send({ packedOrder });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
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
