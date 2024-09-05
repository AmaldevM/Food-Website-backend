const mongoose = require("mongoose");

const asminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

const Admin = mongoose.model("admin", asminSchema);

module.exports = { Admin };