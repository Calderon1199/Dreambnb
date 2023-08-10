'use strict';
const {
  Model
} = require('sequelize');

const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    toSafeUser(){
      return {
        id: this.id,
        email: this.email,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName
      }
    }
    static associate(models) {
      this.hasMany(models.Spot, { foreignKey: 'ownerId' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(val) {
          if(Validator.isEmail(val)){
            throw new Error('username must not be an email')
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60,60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};
