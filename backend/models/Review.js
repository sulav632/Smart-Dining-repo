const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [500, 'Review comment cannot exceed 500 characters']
  },
  foodRating: {
    type: Number,
    min: [1, 'Food rating must be at least 1'],
    max: [5, 'Food rating cannot exceed 5']
  },
  serviceRating: {
    type: Number,
    min: [1, 'Service rating must be at least 1'],
    max: [5, 'Service rating cannot exceed 5']
  },
  ambianceRating: {
    type: Number,
    min: [1, 'Ambiance rating must be at least 1'],
    max: [5, 'Ambiance rating cannot exceed 5']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  helpful: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    helpful: {
      type: Boolean,
      default: true
    }
  }]
}, {
  timestamps: true
});

// Ensure one review per user per restaurant
reviewSchema.index({ restaurant: 1, user: 1 }, { unique: true });

// Update restaurant rating when review is saved
reviewSchema.post('save', async function() {
  await this.constructor.calcAverageRating(this.restaurant);
});

// Update restaurant rating when review is updated
reviewSchema.post('findOneAndUpdate', async function() {
  await this.constructor.calcAverageRating(this.restaurant);
});

// Update restaurant rating when review is deleted
reviewSchema.post('findOneAndDelete', async function() {
  await this.constructor.calcAverageRating(this.restaurant);
});

// Static method to calculate average rating
reviewSchema.statics.calcAverageRating = async function(restaurantId) {
  const stats = await this.aggregate([
    {
      $match: { restaurant: restaurantId }
    },
    {
      $group: {
        _id: '$restaurant',
        avgRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    await mongoose.model('Restaurant').findByIdAndUpdate(restaurantId, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      totalReviews: stats[0].numOfReviews
    });
  } else {
    await mongoose.model('Restaurant').findByIdAndUpdate(restaurantId, {
      rating: 0,
      totalReviews: 0
    });
  }
};

module.exports = mongoose.model('Review', reviewSchema); 