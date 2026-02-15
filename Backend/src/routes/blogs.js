const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { createBlogPost, listBlogs, getBlogById, updateBlogById, deleteBlogById } = require('../controllers/blogController');

const router = express.Router();

// Protected: create new blog post
router.post('/', authenticateToken, requireAdmin, createBlogPost);

// Public: list blogs and get by id (can be protected later if needed)
router.get('/', listBlogs);
router.get('/:id', getBlogById);

// Protected: update and delete
router.put('/:id', authenticateToken, requireAdmin, updateBlogById);
router.delete('/:id', authenticateToken, requireAdmin, deleteBlogById);

module.exports = router;


