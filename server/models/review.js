'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  review.init({
    user_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    subject: DataTypes.STRING,
    rating: DataTypes.DOUBLE,
    status: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};