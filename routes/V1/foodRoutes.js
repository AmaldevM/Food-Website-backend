const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController'); 

// Create a new food item
router.post('/foods', foodController.createFood);

// Get all food items
router.get('/foods', foodController.getAllFoods);

// Get a food item by ID
router.get('/foods/:id', foodController.getFoodById);

// Update a food item by ID
router.put('/foods/:id', foodController.updateFood);

// Delete a food item by ID
router.delete('/foods/:id', foodController.deleteFood);

module.exports = router;
