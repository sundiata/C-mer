const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { changePassword, updateProfile, createAdmin } = require('../controllers/usersController');

const router = express.Router();

// Authenticated user actions
router.put('/me/password', authenticateToken, changePassword);
router.put('/me/profile', authenticateToken, updateProfile);

// Admin-only: create another admin
router.post('/admin', authenticateToken, requireAdmin, createAdmin);

module.exports = router;















