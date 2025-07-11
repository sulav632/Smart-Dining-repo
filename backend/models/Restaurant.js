const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Restaurant name is required'],
    trim: true,
    maxlength: [100, 'Restaurant name cannot exceed 100 characters']
  },
  cuisine: {
    type: String,
    required: [true, 'Cuisine type is required'],
    trim: true,
    maxlength: [50, 'Cuisine type cannot exceed 50 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  priceRange: {
    type: String,
    enum: ['$', '$$', '$$$', '$$$$'],
    default: '$$'
  },
  imageUrl: {
    type: String,
    trim: true,
    maxlength: [200, 'Image URL cannot exceed 200 characters']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  address: {
    type: String,
    trim: true,
    maxlength: [200, 'Address cannot exceed 200 characters']
  },
  hours: {
    type: String,
    trim: true,
    maxlength: [100, 'Hours cannot exceed 100 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  features: [{
    type: String,
    enum: ['delivery', 'takeout', 'dine-in', 'outdoor-seating', 'private-dining', 'wifi', 'parking']
  }],
  coordinates: {
    latitude: Number,
    longitude: Number
  }
}, {
  timestamps: true
});

// Index for search functionality
restaurantSchema.index({ 
  name: 'text', 
  cuisine: 'text', 
  location: 'text',
  description: 'text'
});

// Calculate average rating
restaurantSchema.methods.updateRating = function() {
  return this.model('Review').aggregate([
    { $match: { restaurant: this._id } },
    { $group: { _id: null, avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]).then(result => {
    if (result.length > 0) {
      this.rating = Math.round(result[0].avgRating * 10) / 10;
      this.totalReviews = result[0].count;
    } else {
      this.rating = 0;
      this.totalReviews = 0;
    }
    return this.save();
  });
};

module.exports = mongoose.model('Restaurant', restaurantSchema); 