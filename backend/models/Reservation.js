const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'Restaurant is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  date: {
    type: Date,
    required: [true, 'Reservation date is required'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Reservation date must be in the future'
    }
  },
  time: {
    type: String,
    required: [true, 'Reservation time is required'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format']
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: [1, 'At least 1 guest is required'],
    max: [20, 'Maximum 20 guests allowed']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  specialRequests: {
    type: String,
    trim: true,
    maxlength: [500, 'Special requests cannot exceed 500 characters']
  },
  tableNumber: {
    type: String,
    trim: true
  },
  contactName: {
    type: String,
    required: [true, 'Contact name is required'],
    trim: true,
    maxlength: [100, 'Contact name cannot exceed 100 characters']
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required'],
    trim: true,
    maxlength: [20, 'Contact phone cannot exceed 20 characters']
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  confirmationCode: {
    type: String,
    unique: true,
    sparse: true
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [300, 'Notes cannot exceed 300 characters']
  }
}, {
  timestamps: true
});

// Generate confirmation code before saving
reservationSchema.pre('save', function(next) {
  if (!this.confirmationCode) {
    this.confirmationCode = 'RES' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase();
  }
  next();
});

// Index for efficient queries
reservationSchema.index({ restaurant: 1, date: 1, status: 1 });
reservationSchema.index({ user: 1, date: 1 });
reservationSchema.index({ confirmationCode: 1 });

// Virtual for formatted date
reservationSchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual for formatted time
reservationSchema.virtual('formattedTime').get(function() {
  const [hours, minutes] = this.time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
});

// Ensure virtual fields are serialized
reservationSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Reservation', reservationSchema); 