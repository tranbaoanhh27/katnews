'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Card, { foreignKey: 'userId' });
      User.hasMany(models.Comment, { foreignKey: 'userId' });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    premiumExpiredTime: DataTypes.DATE,
    avatarPath: DataTypes.STRING,
    tokenFacebook: DataTypes.STRING,
    tokenGmail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};