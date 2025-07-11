const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'Restaurant is required']
  },
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
    maxlength: [100, 'Menu item name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [300, 'Description cannot exceed 300 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['appetizer', 'main-course', 'dessert', 'beverage', 'side-dish'],
    default: 'main-course'
  },
  imageUrl: {
    type: String,
    trim: true,
    maxlength: [200, 'Image URL cannot exceed 200 characters']
  },
  isVegetarian: {
    type: Boolean,
    default: false
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  isGlutenFree: {
    type: Boolean,
    default: false
  },
  isSpicy: {
    type: Boolean,
    default: false
  },
  allergens: [{
    type: String,
    enum: ['dairy', 'eggs', 'fish', 'shellfish', 'tree-nuts', 'peanuts', 'wheat', 'soy']
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number,
    min: [0, 'Preparation time cannot be negative'],
    default: 15
  }
}, {
  timestamps: true
});

// Index for search functionality
menuItemSchema.index({ 
  name: 'text', 
  description: 'text',
  category: 'text'
});

module.exports = mongoose.model('MenuItem', menuItemSchema); 