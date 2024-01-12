'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmailTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmailTemplate.init({
    type: DataTypes.STRING,
    subject: DataTypes.TEXT,
    body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'EmailTemplate',
  });
  return EmailTemplate;
};