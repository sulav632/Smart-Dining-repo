const express = require('express');
const { body, validationResult } = require('express-validator');
const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get user reservations
// @route   GET /api/reservations
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build query
    let query = { user: req.user._id };

    if (status) {
      query.status = status;
    }

    const reservations = await Reservation.find(query)
      .populate('restaurant', 'name cuisine location imageUrl')
      .sort('-date -time')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Reservation.countDocuments(query);

    res.json({
      success: true,
      count: reservations.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: reservations
    });
  } catch (error) {
    console.error('Get reservations error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// @desc    Get single reservation
// @route   GET /api/reservations/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('restaurant', 'name cuisine location imageUrl phone address hours');

    if (!reservation) {
      return res.status(404).json({ 
        success: false,
        message: 'Reservation not found' 
      });
    }

    // Check if user owns this reservation
    if (reservation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to access this reservation' 
      });
    }

    res.json({
      success: true,
      data: reservation
    });
  } catch (error) {
    console.error('Get reservation error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// @desc    Create reservation
// @route   POST /api/reservations
// @access  Private
router.post('/', protect, [
  body('restaurant').isMongoId().withMessage('Valid restaurant ID is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid time in HH:MM format is required'),
  body('guests').isInt({ min: 1, max: 20 }).withMessage('Number of guests must be between 1 and 20'),
  body('contactName').trim().isLength({ min: 1 }).withMessage('Contact name is required'),
  body('contactPhone').trim().isLength({ min: 1 }).withMessage('Contact phone is required'),
  body('contactEmail').isEmail().normalizeEmail().withMessage('Valid contact email is required'),
  body('specialRequests').optional().trim().isLength({ max: 500 }).withMessage('Special requests cannot exceed 500 characters'),
  body('notes').optional().trim().isLength({ max: 300 }).withMessage('Notes cannot exceed 300 characters')
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

    const { 
      restaurant, 
      date, 
      time, 
      guests, 
      contactName, 
      contactPhone, 
      contactEmail, 
      specialRequests, 
      notes 
    } = req.body;

    // Check if restaurant exists and is active
    const restaurantExists = await Restaurant.findById(restaurant);
    if (!restaurantExists || !restaurantExists.isActive) {
      return res.status(404).json({ 
        success: false,
        message: 'Restaurant not found or inactive' 
      });
    }

    // Check if reservation date is in the future
    const reservationDate = new Date(date);
    if (reservationDate <= new Date()) {
      return res.status(400).json({ 
        success: false,
        message: 'Reservation date must be in the future' 
      });
    }

    // Check for conflicting reservations (same restaurant, date, time)
    const conflictingReservation = await Reservation.findOne({
      restaurant,
      date: reservationDate,
      time,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (conflictingReservation) {
      return res.status(400).json({ 
        success: false,
        message: 'This time slot is already booked' 
      });
    }

    const reservation = await Reservation.create({
      restaurant,
      user: req.user._id,
      date: reservationDate,
      time,
      guests,
      contactName,
      contactPhone,
      contactEmail,
      specialRequests,
      notes
    });

    const populatedReservation = await Reservation.findById(reservation._id)
      .populate('restaurant', 'name cuisine location imageUrl');

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      data: populatedReservation
    });
  } catch (error) {
    console.error('Create reservation error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during reservation creation' 
    });
  }
});

// @desc    Update reservation
// @route   PUT /api/reservations/:id
// @access  Private
router.put('/:id', protect, [
  body('date').optional().isISO8601().withMessage('Valid date is required'),
  body('time').optional().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid time in HH:MM format is required'),
  body('guests').optional().isInt({ min: 1, max: 20 }).withMessage('Number of guests must be between 1 and 20'),
  body('contactName').optional().trim().isLength({ min: 1 }).withMessage('Contact name cannot be empty'),
  body('contactPhone').optional().trim().isLength({ min: 1 }).withMessage('Contact phone cannot be empty'),
  body('contactEmail').optional().isEmail().normalizeEmail().withMessage('Valid contact email is required'),
  body('specialRequests').optional().trim().isLength({ max: 500 }).withMessage('Special requests cannot exceed 500 characters'),
  body('notes').optional().trim().isLength({ max: 300 }).withMessage('Notes cannot exceed 300 characters')
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

    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ 
        success: false,
        message: 'Reservation not found' 
      });
    }

    // Check if user owns this reservation
    if (reservation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to modify this reservation' 
      });
    }

    // Check if reservation can be modified
    if (reservation.status === 'cancelled' || reservation.status === 'completed') {
      return res.status(400).json({ 
        success: false,
        message: 'Cannot modify cancelled or completed reservations' 
      });
    }

    // Check if new date is in the future
    if (req.body.date) {
      const newDate = new Date(req.body.date);
      if (newDate <= new Date()) {
        return res.status(400).json({ 
          success: false,
          message: 'Reservation date must be in the future' 
        });
      }
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('restaurant', 'name cuisine location imageUrl');

    res.json({
      success: true,
      message: 'Reservation updated successfully',
      data: updatedReservation
    });
  } catch (error) {
    console.error('Update reservation error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during reservation update' 
    });
  }
});

// @desc    Cancel reservation
// @route   PUT /api/reservations/:id/cancel
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ 
        success: false,
        message: 'Reservation not found' 
      });
    }

    // Check if user owns this reservation
    if (reservation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to cancel this reservation' 
      });
    }

    // Check if reservation can be cancelled
    if (reservation.status === 'cancelled') {
      return res.status(400).json({ 
        success: false,
        message: 'Reservation is already cancelled' 
      });
    }

    if (reservation.status === 'completed') {
      return res.status(400).json({ 
        success: false,
        message: 'Cannot cancel completed reservations' 
      });
    }

    reservation.status = 'cancelled';
    await reservation.save();

    res.json({
      success: true,
      message: 'Reservation cancelled successfully',
      data: reservation
    });
  } catch (error) {
    console.error('Cancel reservation error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during reservation cancellation' 
    });
  }
});

// @desc    Get reservation by confirmation code
// @route   GET /api/reservations/confirm/:code
// @access  Public
router.get('/confirm/:code', async (req, res) => {
  try {
    const reservation = await Reservation.findOne({ 
      confirmationCode: req.params.code 
    }).populate('restaurant', 'name cuisine location imageUrl phone address hours');

    if (!reservation) {
      return res.status(404).json({ 
        success: false,
        message: 'Reservation not found' 
      });
    }

    res.json({
      success: true,
      data: reservation
    });
  } catch (error) {
    console.error('Get reservation by code error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

module.exports = router; 