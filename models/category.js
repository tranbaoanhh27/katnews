'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // An Editor has many Categories
      Category.belongsTo(models.Editor, { foreignKey: 'editorId' });
      Category.hasMany(models.SubCategory, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
    }
  }
  Category.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};