const express = require('express');
const { login, logout, verifyToken } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.get('/verify', authenticateToken, verifyToken);

module.exports = router;


