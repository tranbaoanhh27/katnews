'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubCategory.belongsTo(models.Category, { foreignKey: "categoryId" })
      SubCategory.hasMany(models.News, { foreignKey: "categoryId", onDelete: 'CASCADE' })
    }
  }
  SubCategory.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SubCategory',
  });
  return SubCategory;
};