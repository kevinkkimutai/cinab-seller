'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      favicon: {
        type: Sequelize.STRING
      },
      loader: {
        type: Sequelize.STRING
      },
      is_loader: {
        type: Sequelize.INTEGER
      },
      feature_image: {
        type: Sequelize.STRING
      },
      primary_color: {
        type: Sequelize.STRING
      },
      smtp_check: {
        type: Sequelize.INTEGER
      },
      email_host: {
        type: Sequelize.STRING
      },
      email_port: {
        type: Sequelize.STRING
      },
      email_encryption: {
        type: Sequelize.STRING
      },
      email_user: {
        type: Sequelize.STRING
      },
      email_pass: {
        type: Sequelize.STRING
      },
      email_from: {
        type: Sequelize.STRING
      },
      email_from_name: {
        type: Sequelize.STRING
      },
      contact_email: {
        type: Sequelize.STRING
      },
      version: {
        type: Sequelize.STRING
      },
      overlay: {
        type: Sequelize.TEXT
      },
      google_analytics_id: {
        type: Sequelize.STRING
      },
      meta_keywords: {
        type: Sequelize.TEXT
      },
      meta_description: {
        type: Sequelize.TEXT
      },
      is_shop: {
        type: Sequelize.INTEGER
      },
      is_blog: {
        type: Sequelize.INTEGER
      },
      is_faq: {
        type: Sequelize.INTEGER
      },
      is_contact: {
        type: Sequelize.INTEGER
      },
      facebook_check: {
        type: Sequelize.INTEGER
      },
      facebook_client_id: {
        type: Sequelize.STRING
      },
      facebook_client_secret: {
        type: Sequelize.STRING
      },
      facebook_redirect: {
        type: Sequelize.STRING
      },
      google_check: {
        type: Sequelize.INTEGER
      },
      google_client_id: {
        type: Sequelize.STRING
      },
      google_client_secret: {
        type: Sequelize.STRING
      },
      google_redirect: {
        type: Sequelize.STRING
      },
      min_price: {
        type: Sequelize.DOUBLE
      },
      max_price: {
        type: Sequelize.DOUBLE
      },
      footer_phone: {
        type: Sequelize.STRING
      },
      footer_address: {
        type: Sequelize.TEXT
      },
      footer_email: {
        type: Sequelize.STRING
      },
      footer_gateway_img: {
        type: Sequelize.STRING
      },
      social_link: {
        type: Sequelize.TEXT
      },
      friday_start: {
        type: Sequelize.STRING
      },
      friday_end: {
        type: Sequelize.STRING
      },
      satureday_start: {
        type: Sequelize.STRING
      },
      satureday_end: {
        type: Sequelize.STRING
      },
      copy_right: {
        type: Sequelize.STRING
      },
      is_slider: {
        type: Sequelize.INTEGER
      },
      is_category: {
        type: Sequelize.INTEGER
      },
      is_product: {
        type: Sequelize.INTEGER
      },
      is_top_banner: {
        type: Sequelize.INTEGER
      },
      is_recent: {
        type: Sequelize.INTEGER
      },
      is_top: {
        type: Sequelize.INTEGER
      },
      is_best: {
        type: Sequelize.INTEGER
      },
      is_flash: {
        type: Sequelize.INTEGER
      },
      is_brand: {
        type: Sequelize.INTEGER
      },
      is_blogs: {
        type: Sequelize.INTEGER
      },
      is_campaign: {
        type: Sequelize.INTEGER
      },
      is_brands: {
        type: Sequelize.INTEGER
      },
      is_bottom_banner: {
        type: Sequelize.INTEGER
      },
      is_service: {
        type: Sequelize.INTEGER
      },
      campaign_title: {
        type: Sequelize.STRING
      },
      campaign_end_date: {
        type: Sequelize.STRING
      },
      campaign_status: {
        type: Sequelize.INTEGER
      },
      twilio_sid: {
        type: Sequelize.STRING
      },
      twilio_token: {
        type: Sequelize.STRING
      },
      twilio_form_number: {
        type: Sequelize.STRING
      },
      twilio_country_code: {
        type: Sequelize.STRING
      },
      is_announcement: {
        type: Sequelize.INTEGER
      },
      announcement: {
        type: Sequelize.STRING
      },
      announcement_delay: {
        type: Sequelize.DOUBLE
      },
      is_maintainance: {
        type: Sequelize.INTEGER
      },
      maintainance_image: {
        type: Sequelize.STRING
      },
      maintainance_text: {
        type: Sequelize.TEXT
      },
      is_twilio: {
        type: Sequelize.INTEGER
      },
      twilio_section: {
        type: Sequelize.TEXT
      },
      is_three_c_b_first: {
        type: Sequelize.INTEGER
      },
      is_popular_category: {
        type: Sequelize.INTEGER
      },
      is_three_c_b_second: {
        type: Sequelize.INTEGER
      },
      is_highlighted: {
        type: Sequelize.INTEGER
      },
      is_two_column_category: {
        type: Sequelize.INTEGER
      },
      is_popular_brand: {
        type: Sequelize.INTEGER
      },
      is_featured_category: {
        type: Sequelize.INTEGER
      },
      is_two_c_b: {
        type: Sequelize.INTEGER
      },
      theme: {
        type: Sequelize.STRING
      },
      google_recaptcha_site_key: {
        type: Sequelize.STRING
      },
      google_recaptcha_secret_key: {
        type: Sequelize.STRING
      },
      recaptcha: {
        type: Sequelize.INTEGER
      },
      currency_direction: {
        type: Sequelize.INTEGER
      },
      google_analytics: {
        type: Sequelize.TEXT
      },
      google_adsense: {
        type: Sequelize.TEXT
      },
      facebook_pixel: {
        type: Sequelize.TEXT
      },
      facebook_messenger: {
        type: Sequelize.TEXT
      },
      is_google_analytics: {
        type: Sequelize.INTEGER
      },
      is_google_adsense: {
        type: Sequelize.INTEGER
      },
      is_facebook_pixel: {
        type: Sequelize.INTEGER
      },
      is_facebook_messenger: {
        type: Sequelize.INTEGER
      },
      announcement_link: {
        type: Sequelize.TEXT
      },
      is_attribute_search: {
        type: Sequelize.INTEGER
      },
      is_range_search: {
        type: Sequelize.INTEGER
      },
      view_product: {
        type: Sequelize.INTEGER
      },
      home_page_title: {
        type: Sequelize.STRING
      },
      is_privacy_trams: {
        type: Sequelize.INTEGER
      },
      policy_link: {
        type: Sequelize.STRING
      },
      terms_link: {
        type: Sequelize.STRING
      },
      is_guest_checkout: {
        type: Sequelize.INTEGER
      },
      custom_css: {
        type: Sequelize.TEXT
      },
      announcement_title: {
        type: Sequelize.STRING
      },
      announcement_type: {
        type: Sequelize.STRING
      },
      is_cookie: {
        type: Sequelize.INTEGER
      },
      cookie_text: {
        type: Sequelize.STRING
      },
      announcement_details: {
        type: Sequelize.TEXT
      },
      decimal_separator: {
        type: Sequelize.STRING
      },
      thousand_separator: {
        type: Sequelize.STRING
      },
      disqus: {
        type: Sequelize.TEXT
      },
      is_disqus: {
        type: Sequelize.INTEGER
      },
      is_decimal: {
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('settings');
  }
};