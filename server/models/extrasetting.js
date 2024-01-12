'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExtraSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExtraSetting.init({
    is_t4_slider: DataTypes.INTEGER,
    is_t4_featured_banner: DataTypes.INTEGER,
    is_t4_specialpick: DataTypes.INTEGER,
    is_t4_3_column_banner_first: DataTypes.INTEGER,
    is_t4_flashdeal: DataTypes.INTEGER,
    is_t4_3_column_banner_second: DataTypes.INTEGER,
    is_t4_popular_category: DataTypes.INTEGER,
    is_t4_2_column_banner: DataTypes.INTEGER,
    is_t4_blog_section: DataTypes.INTEGER,
    is_t4_brand_section: DataTypes.INTEGER,
    is_t4_service_section: DataTypes.INTEGER,
    is_t3_slider: DataTypes.INTEGER,
    is_t3_service_section: DataTypes.INTEGER,
    is_t3_3_column_banner_first: DataTypes.INTEGER,
    is_t3_popular_category: DataTypes.INTEGER,
    is_t3_flashdeal: DataTypes.INTEGER,
    is_t3_3_column_banner_second: DataTypes.INTEGER,
    is_t3_pecialpick: DataTypes.INTEGER,
    is_t3_brand_section: DataTypes.INTEGER,
    is_t3_2_column_banner: DataTypes.INTEGER,
    is_t3_blog_section: DataTypes.INTEGER,
    is_t2_slider: DataTypes.INTEGER,
    is_t2_service_section: DataTypes.INTEGER,
    is_t2_3_column_banner_first: DataTypes.INTEGER,
    is_t2_flashdeal: DataTypes.INTEGER,
    is_t2_new_product: DataTypes.INTEGER,
    is_t2_3_column_banner_second: DataTypes.INTEGER,
    is_t2_featured_product: DataTypes.INTEGER,
    is_t2_bestseller_product: DataTypes.INTEGER,
    is_t2_toprated_product: DataTypes.INTEGER,
    is_t2_2_column_banner: DataTypes.INTEGER,
    is_t2_blog_section: DataTypes.INTEGER,
    is_t2_brand_section: DataTypes.INTEGER,
    is_t1_falsh: DataTypes.INTEGER,
    is_t2_falsh: DataTypes.INTEGER,
    is_t3_falsh: DataTypes.INTEGER,
    is_t4_falsh: DataTypes.INTEGER,
    is_t2_three_column_category: DataTypes.INTEGER,
    is_t3_three_column_category: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ExtraSetting',
  });
  return ExtraSetting;
};