const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  storeName: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
});

const Seller = mongoose.model("seller", sellerSchema);

module.exports = { Seller };
