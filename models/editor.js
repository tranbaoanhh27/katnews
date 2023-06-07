'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Editor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Editor.belongsTo(models.Category, {foreignKey: "categoryId"})
    }
  }
  Editor.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    information: DataTypes.TEXT,
    registrationDate: DataTypes.DATE,
    fullName: DataTypes.STRING,
    avatarPath: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Editor',
  });
  return Editor;
};