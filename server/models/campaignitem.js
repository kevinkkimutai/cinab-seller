'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CampaignItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CampaignItem.init({
    item_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    is_feature: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CampaignItem',
  });
  return CampaignItem;
};