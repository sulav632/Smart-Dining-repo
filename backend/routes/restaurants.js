const express = require('express');
const { body, validationResult } = require('express-validator');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const Review = require('../models/Review');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      cuisine, 
      priceRange, 
      rating, 
      location,
      page = 1,
      limit = 10,
      sortBy = 'rating',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    let query = { isActive: true };

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by cuisine
    if (cuisine) {
      query.cuisine = { $regex: cuisine, $options: 'i' };
    }

    // Filter by price range
    if (priceRange) {
      query.priceRange = priceRange;
    }

    // Filter by rating
    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const restaurants = await Restaurant.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Restaurant.countDocuments(query);

    res.json({
      success: true,
      count: restaurants.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: restaurants
    });
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// @desc    Get single restaurant
// @route   GET /api/restaurants/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ 
        success: false,
        message: 'Restaurant not found' 
      });
    }

    // Get menu items
    const menuItems = await MenuItem.find({ 
      restaurant: req.params.id,
      isAvailable: true 
    }).sort('category name');

    // Get reviews
    const reviews = await Review.find({ restaurant: req.params.id })
      .populate('user', 'firstName lastName')
      .sort('-createdAt')
      .limit(10);

    res.json({
      success: true,
      data: {
        restaurant,
        menuItems,
        reviews
      }
    });
  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// @desc    Create restaurant
// @route   POST /api/restaurants
// @access  Private/Admin
router.post('/', protect, authorize('admin'), [
  body('name').trim().isLength({ min: 1 }).withMessage('Restaurant name is required'),
  body('cuisine').trim().isLength({ min: 1 }).withMessage('Cuisine type is required'),
  body('location').trim().isLength({ min: 1 }).withMessage('Location is required'),
  body('description').optional().trim(),
  body('priceRange').optional().isIn(['$', '$$', '$$$', '$$$$']).withMessage('Invalid price range'),
  body('phone').optional().trim(),
  body('address').optional().trim(),
  body('hours').optional().trim(),
  body('imageUrl').optional().trim()
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const restaurant = await Restaurant.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Restaurant created successfully',
      data: restaurant
    });
  } catch (error) {
    console.error('Create restaurant error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during restaurant creation' 
    });
  }
});

// @desc    Update restaurant
// @route   PUT /api/restaurants/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), [
  body('name').optional().trim().isLength({ min: 1 }).withMessage('Restaurant name cannot be empty'),
  body('cuisine').optional().trim().isLength({ min: 1 }).withMessage('Cuisine type cannot be empty'),
  body('location').optional().trim().isLength({ min: 1 }).withMessage('Location cannot be empty'),
  body('priceRange').optional().isIn(['$', '$$', '$$$', '$$$$']).withMessage('Invalid price range')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!restaurant) {
      return res.status(404).json({ 
        success: false,
        message: 'Restaurant not found' 
      });
    }

    res.json({
      success: true,
      message: 'Restaurant updated successfully',
      data: restaurant
    });
  } catch (error) {
    console.error('Update restaurant error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during restaurant update' 
    });
  }
});

// @desc    Delete restaurant
// @route   DELETE /api/restaurants/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({ 
        success: false,
        message: 'Restaurant not found' 
      });
    }

    res.json({
      success: true,
      message: 'Restaurant deleted successfully'
    });
  } catch (error) {
    console.error('Delete restaurant error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during restaurant deletion' 
    });
  }
});

// @desc    Add review to restaurant
// @route   POST /api/restaurants/:id/reviews
// @access  Private
router.post('/:id/reviews', protect, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim().isLength({ max: 500 }).withMessage('Comment cannot exceed 500 characters'),
  body('foodRating').optional().isInt({ min: 1, max: 5 }).withMessage('Food rating must be between 1 and 5'),
  body('serviceRating').optional().isInt({ min: 1, max: 5 }).withMessage('Service rating must be between 1 and 5'),
  body('ambianceRating').optional().isInt({ min: 1, max: 5 }).withMessage('Ambiance rating must be between 1 and 5')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ 
        success: false,
        message: 'Restaurant not found' 
      });
    }

    // Check if user already reviewed this restaurant
    const existingReview = await Review.findOne({
      restaurant: req.params.id,
      user: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({ 
        success: false,
        message: 'You have already reviewed this restaurant' 
      });
    }

    const review = await Review.create({
      restaurant: req.params.id,
      user: req.user._id,
      ...req.body
    });

    const populatedReview = await Review.findById(review._id)
      .populate('user', 'firstName lastName');

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: populatedReview
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during review creation' 
    });
  }
});

// @desc    Get restaurant reviews
// @route   GET /api/restaurants/:id/reviews
// @access  Public
router.get('/:id/reviews', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const reviews = await Review.find({ restaurant: req.params.id })
      .populate('user', 'firstName lastName')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Review.countDocuments({ restaurant: req.params.id });

    res.json({
      success: true,
      count: reviews.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: reviews
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

module.exports = router; 