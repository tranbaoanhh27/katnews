'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.belongsToMany(models.News, {through: "NewsTag", foreignKey: "tagId", otherKey: "newsId", onDelete: 'CASCADE'})
    }
  }
  Tag.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};