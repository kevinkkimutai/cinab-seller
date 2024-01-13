'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ticket.init({
    subject: DataTypes.STRING,
    message: DataTypes.TEXT,
    file: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ticket',
  });
  return ticket;
};