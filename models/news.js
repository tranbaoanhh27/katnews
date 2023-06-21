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
      News.belongsTo(models.Writer, { foreignKey: "writerId" })
      News.belongsTo(models.SubCategory, { foreignKey: "categoryId" })
      News.belongsToMany(models.Tag, { through: 'NewsTag', foreignKey: 'newsId', otherKey: 'tagId' , onDelete: 'CASCADE'})
      News.hasMany(models.Comment, { foreignKey: 'newsId' });
    }
  }
  News.init({
    title: { type: DataTypes.TEXT, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    abstract: { type: DataTypes.TEXT, allowNull: false },
    tinyImagePath: DataTypes.STRING,
    largeImagePath: { type: DataTypes.STRING, allowNull: false },
    youtubePath: DataTypes.STRING,
    isDraft: DataTypes.BOOLEAN,
    isPremium: DataTypes.BOOLEAN,
    totalViewsCount: { type: DataTypes.BIGINT, allowNull: false },
    weeklyViewsCount: { type: DataTypes.INTEGER, allowNull: false },
    isDeleted: DataTypes.BOOLEAN,
    ts: {
      type: `TSVECTOR GENERATED ALWAYS AS (setweight(to_tsvector('english', coalesce(title, '')), 'A') || setweight(to_tsvector('english', coalesce(abstract, '')), 'B') || setweight(to_tsvector('english', coalesce(content, '')), 'C')) STORED`,
    }
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};