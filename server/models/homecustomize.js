'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HomeCustomize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HomeCustomize.init({
    banner_first: DataTypes.TEXT,
    banner_secend: DataTypes.TEXT,
    banner_third: DataTypes.TEXT,
    popular_category: DataTypes.TEXT,
    two_column_category: DataTypes.TEXT,
    feature_category: DataTypes.TEXT,
    home_page4: DataTypes.TEXT,
    home_4_popular_category: DataTypes.TEXT,
    hero_banner: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'HomeCustomize',
  });
  return HomeCustomize;
};