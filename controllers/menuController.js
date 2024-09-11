const { cloudinaryInstance } = require("../config/cloudinary");
const { Menu } = require("../models/menuModel");

// menu list for restaurant
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find({});
    return res.status(200).json(menuItems);
  } catch (error) {
    res.status(404).json({ message: "Server not responese..." });
  }
};
// get menu item by id
const getMenuItemById = async (req, res) => {
  try {
    // get menu item id from req.param
    const { id } = req.params;
    // find item with id
    const item = await Menu.findOne({ _id: id });
    // check if the item have it or not
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    // if have the item
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "error fetching item", error });
  }
};
// create menu items
const createMenuItem = async (req, res) => {
  try {
    const seller = req.seller;
    console.log(seller, "===seller");
    // destructure data
    const { name, ...rest } = req.body;
    // check if required fileds present
    if (!name || Object.keys(rest).length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if have any same menu item
    const existMenuItem = await Menu.findOne({ name });
    if (existMenuItem) {
      return res.status(409).json({ message: "Item already exists" });
    }

    // add image file clodinery and get from cloudinery
    if (req.file) {
      console.log("Uploading file to Cloudinary...");
      uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
      console.log("Upload result:", uploadResult);
    } else {
      console.log("No file to upload.");
    }

    // Save menu data to database
    const newItem = new Menu({
      name,
      ...rest,
      image: uploadResult.secure_url || "",
    });
    const saveMenuItem = await newItem.save();
    res.status(201).json(saveMenuItem);
  } catch (error) {
    res.status(404).json({ error });
  }
};
// update menu
const updateMenu = async (req, res) => {
  try {
    // update the restaurant with id
    const updatedMenuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // if not have any item
    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Items not found" });
    }
    // if have item
    // send a response json the updated item
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating restaurant", error });
  }
};
// delete menu item
const deleteMenuItem = async (req, res) => {
  try {
    const deletedRestaurant = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting restaurant", error });
  }
};

module.exports = {
  getMenuItems,
  createMenuItem,
  getMenuItemById,
  updateMenu,
  deleteMenuItem,
};
