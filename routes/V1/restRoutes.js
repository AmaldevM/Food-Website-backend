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

// Get all reastaurant
router.get("/allRest", getAllRestaurants);
// Get reastarant by id
router.get("/rest/:id", getRestaurantById);
// Create new restaurant
router.post("/allRest", adminAuth, upload.single("image"), createRestaurant);
// Updata ratauarant
router.put("/rest/:id", adminAuth, updateRestaurant);
// Delete restaurant
router.delete("/rest/:id", adminAuth, deleteRestaurant);

module.exports = { restRouter: router };
