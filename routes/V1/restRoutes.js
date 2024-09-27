const express = require("express");
const {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
} = require("../../controllers/restControllers");
const { adminAuth } = require("../../middlewares/adminAuth");
const { upload } = require("../../middlewares/multer");
const router = express.Router();

// Create new restaurant
router.post( "/restaurants", upload.single("image"),  createRestaurant );

// Get all restaurants
router.get("/restaurants", getAllRestaurants);
// Get restaurant by id
router.get("/restaurants/:id", getRestaurantById);

// Update restaurant
router.put("/restaurants/:id", adminAuth, updateRestaurant);
// Delete restaurant
router.delete("/restaurants/:id", adminAuth, deleteRestaurant);

module.exports = { restRouter: router };
