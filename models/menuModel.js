const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // unique constraint to prevent duplicate names
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "" }, // default empty string if no image
}, { timestamps: true }); // adds createdAt and updatedAt fields

const Menu = mongoose.model("Menu", menuSchema);

module.exports = { Menu };
