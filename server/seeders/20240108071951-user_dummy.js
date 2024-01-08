"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        name: "John Doe",
        otp: "123456",
        refreshToken: "sample_refresh_token",
        role: "user",
        email: "johndoe@example.com",
        password: "samplepassword",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Smith",
        otp: "654321",
        refreshToken: "another_refresh_token",
        role: "admin",
        email: "janesmith@example.com",
        password: "anotherpassword",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more user data objects as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
