"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dummyProducts = [];

    for (let i = 1; i <= 40; i++) {
      const productData = {
        pname: `Product ${i}`,
        description: `Description for Product ${i}`,
        brand: `Brand ${i}`,
        category: `Category ${i}`,
        vendorId: i % 2 === 0 ? 2 : 1, // Alternating vendorIds for diversity
        image: `https://picsum.photos/200/300?random=${i}`, // Placeholder image URL from Lorem Picsum
        price: parseFloat((Math.random() * 100).toFixed(2)), // Random price between 0 and 100
        approval: i % 3 === 0 ? "approved" : "pending", // 'approved' for every third product
        stock: `125${i}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      dummyProducts.push(productData);
    }

    await queryInterface.bulkInsert("Products", dummyProducts);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
