const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class Reservation extends Model {}

Reservation.init({
  // restaurantId and userId will be foreign keys, associations can be set up later
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isFuture(value) {
        if (new Date(value) <= new Date()) {
          throw new Error('Reservation date must be in the future');
        }
      }
    }
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    }
  },
  guests: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 20 },
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
    defaultValue: 'pending',
  },
  specialRequests: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  tableNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  contactPhone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  confirmationCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING(300),
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Reservation',
  timestamps: true,
  indexes: [
    { fields: ['restaurantId', 'date', 'status'] },
    { fields: ['userId', 'date'] },
    { fields: ['confirmationCode'] }
  ],
  hooks: {
    beforeCreate: (reservation) => {
      if (!reservation.confirmationCode) {
        reservation.confirmationCode = 'RES' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase();
      }
    }
  }
});

module.exports = Reservation; 