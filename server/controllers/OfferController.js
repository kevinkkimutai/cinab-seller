const { Offer, Product } = require("../models");

const offerController = {
  // get products with their offers
  getAllOffers: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: {
          model: Offer,
          as: "offers",
          where: { status: "active" },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });

      const combinedData = products.reduce((acc, product) => {
        product.offers.forEach((offer) => {
          acc.push({
            productId: product.id,
            productName: product.pname,
            description: product.description,
            brand: product.brand,
            category: product.category,
            image: product.image,
            Rprice: product.Rprice,
            stock: product.stock,
            Approval: product.approval,
            offerId: offer.id,
            offerPrice: offer.price,
            fromDate: offer.fromDate,
            toDate: offer.toDate,
            status: offer.status,
          });
        });

        return acc;
      }, []);

      res.json(combinedData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = offerController;
