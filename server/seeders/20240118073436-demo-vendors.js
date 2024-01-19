"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Generate seed data for 10 vendors
    const vendorsData = Array.from({ length: 10 }, (_, index) => {
      return {
        companyName: `Company ${index + 1}`,
        secretCode: `SecretCode${index + 1}`,
        companyEMail: `company${index + 1}@example.com`,
        Kra: `KRA${index + 1}`,
        licence: `Licence${index + 1}`,
        AddressOne: `AddressOne ${index + 1}`,
        AddressTwo: `AddressTwo ${index + 1}`,
        city: `City ${index + 1}`,
        state: `State ${index + 1}`,
        website: `http://www.website${index + 1}.com`,
        services: `Services ${index + 1}`,
        BankName: `Bank ${index + 1}`,
        status: index % 2 === 0 ? "Pending" : "Approved",
        AccountNumber: `AccountNumber${index + 1}`,
        MpesaNumber: `MpesaNumber${index + 1}`,
        MpesaName: `MpesaName${index + 1}`,
        SAddressOne: `SAddressOne ${index + 1}`,
        SAddressTwo: `SAddressTwo ${index + 1}`,
        Scity: `SCity ${index + 1}`,
        Sstate: `SState ${index + 1}`,
        country: `Country ${index + 1}`,
        Postal_Address: `PostalAddress ${index + 1}`,
        businessType: `BusinessType ${index + 1}`,
        shopName: `ShopName ${index + 1}`,
        shopZone: `ShopZone ${index + 1}`,
        username: `Username ${index + 1}`,
        image: `ImageURL${index + 1}.jpg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    // Insert seed data into the 'Vendors' table
    await queryInterface.bulkInsert("Vendors", vendorsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seed data from the 'Vendors' table
    await queryInterface.bulkDelete("Vendors", null, {});
  },
};
