const mongoose = require("mongoose");

const restSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String },
  cuisineType: [String],
  rating: { type: Number, min: 0, max: 5 },
  openingHours: { open: String, close: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
});


const Restaurant = mongoose.model("restaurant", restSchema);
module.exports = { Restaurant };
