// 20231220-demo-vendors.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const vendorsData = [];

    const businessNames = [
      'Business A',
      'Business B',
      'Business C',
      // Add more business names...
    ];

    const cities = [
      'City X',
      'City Y',
      'City Z',
      // Add more cities...
    ];

    for (let i = 0; i < 20; i++) {
      const randomBusinessIndex = Math.floor(Math.random() * businessNames.length);
      const randomCityIndex = Math.floor(Math.random() * cities.length);

      vendorsData.push({
        businessName: businessNames[randomBusinessIndex],
        kraPin: generateRandomAlphanumeric(10), // Function to generate random alphanumeric string
        tradingLicense: generateRandomAlphanumeric(8), // Function to generate random alphanumeric string
        companyAddress: `Address ${i + 1}`,
        streetAddress: `Street ${i + 1}`,
        city: cities[randomCityIndex],
        phoneNumber: generateRandomPhoneNumber(),
        companyEmail: `email${i + 1}@example.com`,
        website: `https://website${i + 1}.com`,
        serviceDetails: `Service details ${i + 1}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('Vendors', vendorsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Vendors', null, {});
  },
};

// Function to generate random alphanumeric string of given length
function generateRandomAlphanumeric(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Function to generate random phone number
function generateRandomPhoneNumber() {
  const countryCode = '+1'; // Change country code if needed
  const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // Generate 10-digit number
  return `${countryCode}${randomNumber}`;
}
