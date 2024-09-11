const { Cart } = require("../models/cartModel");
const { Menu } = require("../models/menuModel");

const { Food } = require('../models/foodModel'); // Adjust the path according to your directory structure

// Create a new food item
const createFood = async (req, res) => {
    try {
        const newFood = new Food(req.body);
        await newFood.save();
        res.status(201).json(newFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all food items
const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a food item by ID
const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) return res.status(404).json({ message: 'Food item not found' });
        res.status(200).json(food);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a food item by ID
const updateFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!food) return res.status(404).json({ message: 'Food item not found' });
        res.status(200).json(food);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a food item by ID
const deleteFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if (!food) return res.status(404).json({ message: 'Food item not found' });
        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createFood,
    getAllFoods,
    getFoodById,
    updateFood,
    deleteFood,
};
