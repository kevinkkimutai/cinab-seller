'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      subcategory_id: {
        type: Sequelize.INTEGER
      },
      childcategory_id: {
        type: Sequelize.INTEGER
      },
      tax_id: {
        type: Sequelize.INTEGER
      },
      brand_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT
      },
      slug: {
        type: Sequelize.TEXT
      },
      sku: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.TEXT
      },
      video: {
        type: Sequelize.TEXT
      },
      sort_details: {
        type: Sequelize.TEXT
      },
      specification_name: {
        type: Sequelize.TEXT
      },
      specification_description: {
        type: Sequelize.TEXT
      },
      is_specification: {
        type: Sequelize.INTEGER
      },
      details: {
        type: Sequelize.TEXT
      },
      photo: {
        type: Sequelize.STRING
      },
      discount_price: {
        type: Sequelize.DOUBLE
      },
      previous_price: {
        type: Sequelize.DOUBLE
      },
      stock: {
        type: Sequelize.INTEGER
      },
      meta_keywords: {
        type: Sequelize.TEXT
      },
      meta_description: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.INTEGER
      },
      is_type: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      file: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.TEXT
      },
      file_type: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      license_name: {
        type: Sequelize.TEXT
      },
      license_key: {
        type: Sequelize.TEXT
      },
      item_type: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      affiliate_link: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('items');
  }
};