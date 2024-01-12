'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    photo: DataTypes.STRING,
    email_token: DataTypes.STRING,
    password: DataTypes.STRING,
    ship_address1: DataTypes.STRING,
    ship_address2: DataTypes.STRING,
    ship_zip: DataTypes.STRING,
    ship_city: DataTypes.STRING,
    ship_country: DataTypes.STRING,
    ship_company: DataTypes.STRING,
    bill_address1: DataTypes.STRING,
    bill_address2: DataTypes.STRING,
    bill_zip: DataTypes.STRING,
    bill_city: DataTypes.STRING,
    bill_country: DataTypes.STRING,
    bill_company: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    state_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};