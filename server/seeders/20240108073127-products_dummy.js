"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dummyProducts = [];

    for (let i = 1; i <= 40; i++) {
      const category = getCategoryName(i);
      const productData = {
        pname: `Product ${i}`,
        description: `Description for Product ${i}`,
        brand: `Brand ${i}`,
        category: category,
        vendorId: i % 2 === 0 ? 2 : 1, // Alternating vendorIds for diversity
        image: getRandomImageURL(category), // Randomized image URL based on category
        price: parseFloat((Math.random() * 1000).toFixed(2)), // Random price between 0 and 1000
        Rprice: parseFloat((Math.random() * 1000).toFixed(2)), // Random price between 0 and 1000
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

// Function to get category name based on the index
function getCategoryName(index) {
  switch (true) {
    case index <= 10:
      return "food";
    case index <= 20:
      return "tvs";
    case index <= 30:
      return "phones";
    case index <= 40:
      return "beverages";
    default:
      return "Other";
  }
}

// Function to generate a randomized image URL based on the category
function getRandomImageURL(category) {
  const randomImageIndex = Math.floor(Math.random() * 10) + 1; // Assuming there are 10 different images for each category
  return `https://picsum.photos/200/300?random=${randomImageIndex}&category=${category}`;
}
