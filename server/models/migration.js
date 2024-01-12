'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class migration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  migration.init({
    id: DataTypes.INTEGER,
    migration: DataTypes.STRING,
    batch: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'migration',
  });
  return migration;
};