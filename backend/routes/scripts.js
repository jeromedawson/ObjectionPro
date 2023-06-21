const express = require('express');
const router = express.Router();
const scriptsController = require('../controllers/scriptsController');

// Routes for scripts

// Get all scripts
router.get('/', scriptsController.getAllScripts);

// Create a new script
router.post('/', scriptsController.createScript);

// Update a script by ID
router.put('/:id', scriptsController.updateScript);

// Delete a script by ID
router.delete('/:id', scriptsController.deleteScript);

module.exports = router;
