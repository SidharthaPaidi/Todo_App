const express = require('express');
const { body, validationResult } = require('express-validator');
const { protect } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// @route   GET /api/user/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      data: req.user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters')
], validate, async (req, res) => {
  try {
    const { name, bio } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
});

module.exports = router;
