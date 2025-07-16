const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class Restaurant extends Model {}

Restaurant.init({
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cuisine: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5,
    },
  },
  totalReviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  priceRange: {
    type: DataTypes.ENUM('$', '$$', '$$$', '$$$$'),
    defaultValue: '$$',
  },
  imageUrl: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  hours: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  features: {
    type: DataTypes.JSON, // Store as array of strings
    allowNull: true,
  },
  coordinates: {
    type: DataTypes.JSON, // { latitude: ..., longitude: ... }
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Restaurant',
  timestamps: true,
});

module.exports = Restaurant; 