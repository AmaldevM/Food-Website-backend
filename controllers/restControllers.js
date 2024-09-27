const { cloudinaryInstance } = require("../config/cloudinary");
const { Restaurant } = require("../models/restModel");



// Create restaurant
const createRestaurant = async (req, res) => {
  try {

    console.log("create restaurant route hitted")
    console.log(req.file," ==== image in controlroller")

    const { name, description, address, phone, cuisineType } = req.body;

    // Validation
    if (!name || !description || !phone || !address || !cuisineType) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existRestaurant = await Restaurant.findOne({ name });

    if (existRestaurant) {
      return res
        .status(409)
        .json({ success: false, message: "Restaurant already exists" });
    }




    // let uploadResult = { secure_url: "" };
    // if (req.file) {
    //   console.log("Uploading file to Cloudinary...");
    //   uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
    //   console.log("Upload result:", uploadResult);
    // } else {
    //   console.log("No file to upload.");
    // }

    // const restaurant = new Restaurant({ name, description, address,phone,cuisineType, });

    // const savedRestaurant = await restaurant.save();
    //  restaurant: savedRestaurant,
   res
     .status(201)
     .json({ success: true, message: "restaurant created successfully" });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating restaurant", error });
  }
};


// Restaurant list
const getAllRestaurants = async (_req, res) => {
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
