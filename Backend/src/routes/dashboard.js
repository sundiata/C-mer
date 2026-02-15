const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getSummary } = require('../controllers/dashboardController');

const router = express.Router();

router.get('/summary', authenticateToken, getSummary);

module.exports = router;















