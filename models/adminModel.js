const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  qualifications:{type: String},
  phone: { type: String, required: true },
  role: { type: String, enum: ["seller", "admin"], default: "admin" },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Admin };