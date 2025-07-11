const express = require('express');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      count: users.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// @desc    Get user by ID (Admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
router.get('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('favorites', 'name cuisine location rating imageUrl');

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address, role, isActive } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during user update' 
    });
  }
});

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Deactivate user instead of deleting
    user.isActive = false;
    await user.save();

    res.json({
      success: true,
      message: 'User deactivated successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during user deletion' 
    });
  }
});

// @desc    Add restaurant to favorites
// @route   POST /api/users/favorites/:restaurantId
// @access  Private
router.post('/favorites/:restaurantId', protect, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant || !restaurant.isActive) {
      return res.status(404).json({ 
        success: false,
        message: 'Restaurant not found' 
      });
    }

    const user = await User.findById(req.user._id);
    
    // Check if already in favorites
    if (user.favorites.includes(req.params.restaurantId)) {
      return res.status(400).json({ 
        success: false,
        message: 'Restaurant is already in favorites' 
      });
    }

    user.favorites.push(req.params.restaurantId);
    await user.save();

    const updatedUser = await User.findById(req.user._id)
      .populate('favorites', 'name cuisine location rating imageUrl');

    res.json({
      success: true,
      message: 'Restaurant added to favorites',
      data: updatedUser.favorites
    });
  } catch (error) {
    console.error('Add to favorites error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// @desc    Remove restaurant from favorites
// @route   DELETE /api/users/favorites/:restaurantId
// @access  Private
router.delete('/favorites/:restaurantId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Check if in favorites
    if (!user.favorites.includes(req.params.restaurantId)) {
      return res.status(400).json({ 
        success: false,
        message: 'Restaurant is not in favorites' 
      });
    }

    user.favorites = user.favorites.filter(
      id => id.toString() !== req.params.restaurantId
    );
    await user.save();

    const updatedUser = await User.findById(req.user._id)
      .populate('favorites', 'name cuisine location rating imageUrl');

    res.json({
      success: true,
      message: 'Restaurant removed from favorites',
      data: updatedUser.favorites
    });
  } catch (error) {
    console.error('Remove from favorites error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// @desc    Get user favorites
// @route   GET /api/users/favorites
// @access  Private
router.get('/favorites', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('favorites', 'name cuisine location rating imageUrl description priceRange');

    res.json({
      success: true,
      data: user.favorites
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

module.exports = router; 