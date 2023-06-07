'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Card.belongsTo(models.User, {foreignKey: "userId"})
    }
  }
  Card.init({
    fullName: DataTypes.STRING,
    cardNumber: DataTypes.STRING,
    timeExpiration: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};