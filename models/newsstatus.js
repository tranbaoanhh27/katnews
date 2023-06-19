'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewsStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NewsStatus.belongsTo(models.News, {foreignKey: "newsId"})
      NewsStatus.belongsTo(models.Editor, {foreignKey: "editorId"})
    }
  }
  NewsStatus.init({
    status: { type: DataTypes.STRING, allowNull: false }, // "pending", "rejected", or "approved"
    reasonReject: DataTypes.TEXT,
    publishDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'NewsStatus',
  });
  return NewsStatus;
};