'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    //  Add seed commands here.
    
      // Example:
     await queryInterface.bulkInsert('Orders', [{
      productName: 'Lenovo',
      description: 'silver',
      category: 'Laptops',
      inStock: '6',
      price: '780',
      unitsBought: '2',
      purchaseDate: new Date(),
      status: 'Delivered',
      createdAt: new Date(),
      updatedAt: new Date(),
    
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
      // Add commands to revert seed here.
     
    //  Example:
      await queryInterface.bulkDelete('People', null, {});
  }
};
