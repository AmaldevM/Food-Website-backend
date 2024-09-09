const mongoose = require("mongoose");

const restSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
});
const Restaurant = mongoose.model("Restaurant", restSchema);
module.exports = { Restaurant };
