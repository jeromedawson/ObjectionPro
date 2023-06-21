const express = require('express');
const router = express.Router();
const objectionsController = require('../controllers/objectionsController');

// Routes for objections
router.get('/objections', objectionsController.getAllObjections);
router.post('/objections', objectionsController.createObjection);
router.put('/objections/:id', objectionsController.updateObjection);
router.delete('/objections/:id', objectionsController.deleteObjection);

module.exports = router;
