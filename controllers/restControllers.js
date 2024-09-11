const { cloudinaryInstance } = require("../config/cloudinary");
const { Restaurant } = require("../models/restModel");

// restaurant list
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    return res.status(200).json(restaurants);
  } catch (error) {
    res.status(404).json({ message: "Server not responese..." });
  }
};
// get restaurant by id
const getRestaurantById = async (req, res) => {
  try {
    // get restaurant id from req.params
    const { id } = req.params;
    // find restaurant with the id
    const restaurant = await Restaurant.findOne({ _id: id });
    // check if the restaurant has it or not
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "error fetching restaurant", error });
  }
};
// create restaurant
const createRestaurant = async (req, res) => {
  try {
    // destructure user from req.user
    const admin = req.admin;
    console.log(admin);
    // destructure data
    const { name, ...rest } = req.body;
    // check if required fileds present
    if (!name || Object.keys(rest).length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // check if a restaurent with same name
    const existRestaurant = await Restaurant.findOne({ name });
    if (existRestaurant) {
      return res.status(409).json({ message: "Restaurant already exists" });
    }

    if (req.file) {
      console.log("Uploading file to Cloudinary...");
      uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
      console.log("Upload result:", uploadResult);
    } else {
      console.log("No file to upload.");
    }

    // Save restaurant data to database
    const restaurant = new Restaurant({
      name,
      ...rest,
      image: uploadResult.secure_url || "",
    });

    const savedRestaurant = await restaurant.save();

    res.status(201).json(savedRestaurant);
  } catch (error) {}
};
// update restaurant
const updateRestaurant = async (req, res) => {
  try {
    // update the restaurant with id
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // if not have the restaurant
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    // send a response json the updated restaurant
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Error updating restaurant", error });
  }
};
// delete restaurant
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
