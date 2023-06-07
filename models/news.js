'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.belongsTo(models.Writer, {foreignKey: "writerId"})
      News.belongsTo(models.SubCategory, {foreignKey: "categoryId"})
      News.belongsToMany(models.Tag, {through: 'NewsTag', foreignKey: 'newsId', otherKey: 'tagId'})
    }
  }
  News.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    briefContent: DataTypes.STRING,
    tinyImagePath: DataTypes.STRING,
    largeImagePath: DataTypes.STRING,
    youtubePath: DataTypes.STRING,
    status: STRING,
    isPremium: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};