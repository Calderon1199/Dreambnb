'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, { foreignKey: 'ownerId' });
      Spot.hasMany(models.Review, { foreignKey: 'spotId' });
      Spot.hasMany(models.Booking, { foreignKey: 'spotId' });
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[0-9]+\s[A-Za-z\s]+$/
      }
    },
    city: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        is: /^[A-Za-z\s]+$/
      }
    },
    state: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    country: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        is: /^[A-Za-z\s]+$/
      }
    },
    lat: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false,
      validate: {
        isDecimal: true,
        isNumeric: true
      }
    },
    lng: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false,
      validate: {
        isDecimal: true,
        isNumeric: true
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'Price must be a valid number'
        },
        isBiggerThanZero(value) {
          if (parseInt(value) <= 0) {
            throw new Error('Price must be larger than zero.');
          }
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
