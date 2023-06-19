"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class OTP extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OTP.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            otp: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "OTP",
        }
    );
    return OTP;
};
