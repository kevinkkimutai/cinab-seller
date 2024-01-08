"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dummyOffers = [];

    for (let i = 1; i <= 30; i++) {
      const offerData = {
        productId: getRandomProductId(), // Getting a random product ID between 1 and 15
        offerPrice: parseFloat((Math.random() * 100).toFixed(2)), // Random offer price between 0 and 100
        fromDate: getRandomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), // Random date within 2023
        status: i % 2 === 0 ? "active" : "inactive", // Alternate between 'active' and 'inactive'
        toDate: getRandomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), // Random date within 2023
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      dummyOffers.push(offerData);
    }

    await queryInterface.bulkInsert("Offers", dummyOffers);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Offers", null, {});
  },
};

// Function to generate a random product ID between 1 and 15
function getRandomProductId() {
  return Math.floor(Math.random() * 40) + 1;
}

// Function to generate a random date within a range
function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
