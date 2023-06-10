'use strict';
const {
  Model
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
      News.hasMany(models.Comment, { foreignKey: 'newsId' });
    }
  }
  News.init({
    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
    briefContent: DataTypes.TEXT,
    tinyImagePath: DataTypes.STRING,
    largeImagePath: DataTypes.STRING,
    youtubePath: DataTypes.STRING,
    isDraft: DataTypes.BOOLEAN,
    isPremium: DataTypes.BOOLEAN,
    totalViewsCount: DataTypes.BIGINT,
    weeklyViewsCount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};