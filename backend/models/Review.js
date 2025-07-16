const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class Review extends Model {}

Review.init({
  // restaurantId and userId will be foreign keys, associations can be set up later
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },
  comment: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  foodRating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: { min: 1, max: 5 },
  },
  serviceRating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: { min: 1, max: 5 },
  },
  ambianceRating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: { min: 1, max: 5 },
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  helpful: {
    type: DataTypes.JSON, // Store as array of objects: [{ userId, helpful }]
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Review',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['restaurantId', 'userId'] // To ensure one review per user per restaurant (add these fields in associations)
    }
  ]
});

module.exports = Review; 