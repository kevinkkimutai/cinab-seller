'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('extra_settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      is_t4_slider: {
        type: Sequelize.INTEGER
      },
      is_t4_featured_banner: {
        type: Sequelize.INTEGER
      },
      is_t4_specialpick: {
        type: Sequelize.INTEGER
      },
      is_t4_3_column_banner_first: {
        type: Sequelize.INTEGER
      },
      is_t4_flashdeal: {
        type: Sequelize.INTEGER
      },
      is_t4_3_column_banner_second: {
        type: Sequelize.INTEGER
      },
      is_t4_popular_category: {
        type: Sequelize.INTEGER
      },
      is_t4_2_column_banner: {
        type: Sequelize.INTEGER
      },
      is_t4_blog_section: {
        type: Sequelize.INTEGER
      },
      is_t4_brand_section: {
        type: Sequelize.INTEGER
      },
      is_t4_service_section: {
        type: Sequelize.INTEGER
      },
      is_t3_slider: {
        type: Sequelize.INTEGER
      },
      is_t3_service_section: {
        type: Sequelize.INTEGER
      },
      is_t3_3_column_banner_first: {
        type: Sequelize.INTEGER
      },
      is_t3_popular_category: {
        type: Sequelize.INTEGER
      },
      is_t3_flashdeal: {
        type: Sequelize.INTEGER
      },
      is_t3_3_column_banner_second: {
        type: Sequelize.INTEGER
      },
      is_t3_pecialpick: {
        type: Sequelize.INTEGER
      },
      is_t3_brand_section: {
        type: Sequelize.INTEGER
      },
      is_t3_2_column_banner: {
        type: Sequelize.INTEGER
      },
      is_t3_blog_section: {
        type: Sequelize.INTEGER
      },
      is_t2_slider: {
        type: Sequelize.INTEGER
      },
      is_t2_service_section: {
        type: Sequelize.INTEGER
      },
      is_t2_3_column_banner_first: {
        type: Sequelize.INTEGER
      },
      is_t2_flashdeal: {
        type: Sequelize.INTEGER
      },
      is_t2_new_product: {
        type: Sequelize.INTEGER
      },
      is_t2_3_column_banner_second: {
        type: Sequelize.INTEGER
      },
      is_t2_featured_product: {
        type: Sequelize.INTEGER
      },
      is_t2_bestseller_product: {
        type: Sequelize.INTEGER
      },
      is_t2_toprated_product: {
        type: Sequelize.INTEGER
      },
      is_t2_2_column_banner: {
        type: Sequelize.INTEGER
      },
      is_t2_blog_section: {
        type: Sequelize.INTEGER
      },
      is_t2_brand_section: {
        type: Sequelize.INTEGER
      },
      is_t1_falsh: {
        type: Sequelize.INTEGER
      },
      is_t2_falsh: {
        type: Sequelize.INTEGER
      },
      is_t3_falsh: {
        type: Sequelize.INTEGER
      },
      is_t4_falsh: {
        type: Sequelize.INTEGER
      },
      is_t2_three_column_category: {
        type: Sequelize.INTEGER
      },
      is_t3_three_column_category: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('extra_settings');
  }
};