const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { createProject, listProjects, getProjectById, updateProjectById, deleteProjectById } = require('../controllers/projectController');

const router = express.Router();

// Public reads
router.get('/', listProjects);
router.get('/:id', getProjectById);

// Admin create
router.post('/', authenticateToken, requireAdmin, createProject);

// Admin update/delete
router.put('/:id', authenticateToken, requireAdmin, updateProjectById);
router.delete('/:id', authenticateToken, requireAdmin, deleteProjectById);

module.exports = router;


