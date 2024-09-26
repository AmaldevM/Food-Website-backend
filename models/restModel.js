const mongoose = require("mongoose");

const restSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  description: { type: String, required: true},
  address: {  type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String },
  cuisineType: { type: String },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  openingHours: {
    open: { type: String, },
    close: { type: String, },
  },
  isActive: { type: Boolean, default: true },
  menu: [
    {
      name: String,
      description: String,
      price: Number,
      imageUrl: String,
    },
  ],
  images: {
    type: [String],
    default:
      "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  createdAt: { type: Date, default: Date.now },
});


const Restaurant = mongoose.model("restaurant", restSchema);
module.exports = { Restaurant };


// openingHours: {
//     open: { type: String, required: true },
//     close: { type: String, required: true },
//   },