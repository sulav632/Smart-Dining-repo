const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class MenuItem extends Model {}

MenuItem.init({
  // restaurantId will be a foreign key, association can be set up later
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(300),
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { min: 0 },
  },
  category: {
    type: DataTypes.ENUM('appetizer', 'main-course', 'dessert', 'beverage', 'side-dish'),
    allowNull: false,
    defaultValue: 'main-course',
  },
  imageUrl: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  isVegetarian: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isVegan: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isGlutenFree: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isSpicy: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  allergens: {
    type: DataTypes.JSON, // Store as array of strings
    allowNull: true,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  preparationTime: {
    type: DataTypes.INTEGER,
    defaultValue: 15,
    validate: { min: 0 },
  }
}, {
  sequelize,
  modelName: 'MenuItem',
  timestamps: true,
});

module.exports = MenuItem; 