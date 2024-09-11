const { cloudinaryInstance } = require("../config/cloudinary");
const { Restaurant } = require("../models/restModel");

// Restaurant list
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    return res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Server not responding", error });
  }
};

// Get restaurant by ID
const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({ _id: id });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurant", error });
  }
};

// Create restaurant
const createRestaurant = async (req, res) => {
  try {
    const admin = req.admin;
    console.log(admin);
    const { name, ...rest } = req.body;
    if (!name || Object.keys(rest).length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existRestaurant = await Restaurant.findOne({ name });
    if (existRestaurant) {
      return res.status(409).json({ message: "Restaurant already exists" });
    }

    let uploadResult = { secure_url: "" };
    if (req.file) {
      console.log("Uploading file to Cloudinary...");
      uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
      console.log("Upload result:", uploadResult);
    } else {
      console.log("No file to upload.");
    }

    const restaurant = new Restaurant({
      name,
      ...rest,
      image: uploadResult.secure_url,
    });

    const savedRestaurant = await restaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Error creating restaurant", error });
  }
};

// Update restaurant
const updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Error updating restaurant", error });
  }
};

// Delete restaurant
const deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting restaurant", error });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
