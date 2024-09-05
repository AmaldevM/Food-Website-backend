const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", require: true,  },
  items: [{ menuItem: { type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      require: true, },
      quantity: { type: Number, require: true },
      price: { type: Number, require: true }, }, ],
  totalPrice: { type: Number, require: true },
  status: { type: String, default: "pending" },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("order", orderSchema);

module.exports = { Order };
