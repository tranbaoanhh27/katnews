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
    fullName: { type: DataTypes.STRING, allowNull: false },
    cardNumber: { type: DataTypes.STRING, allowNull: false },
    timeExpiration: { type: DataTypes.DATE, allowNull: false },
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};