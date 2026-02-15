const express = require('express');
const cors = require('cors');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { submitContact, listContacts } = require('../controllers/contactController');

const router = express.Router();

// Allow broad CORS for public submissions (frontend may be on Netlify or other domains)
router.options('*', cors({ origin: true }));

// Public submission from Apply page
router.post('/', cors({ origin: true }), submitContact);

// Admin list contacts
router.get('/', authenticateToken, requireAdmin, listContacts);

module.exports = router;


