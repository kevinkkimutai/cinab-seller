// controllers/productController.js
const { Offer } = require('../models');

const offerController = {

getAllOffers: async (req, res) => {
  try {
    const offers = await Offer.findAll();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},


getOfferById: async (req, res) => {
  const offerId = req.params.id;

  try {
    const offer = await Offer.findByPk(offerId);

    if (!offer) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(offer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

updateOffer: async (req, res) => {
  const offerId = req.params.id;
  const { name, price, description, image } = req.body;

  try {
    const offer = await Offer.findByPk(offerId);

    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    await offer.update({productName, description, category, inStock, previousPrice, offerPrice, endDate});

    res.json(offer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
},

deleteOffer: async (req, res) => {
  const offerId = req.params.id;

  try {
    const offer = await Offer.findByPk(offerId);

    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    await offer.destroy();

    res.json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

};
module.exports = offerController;