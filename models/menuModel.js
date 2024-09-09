const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false },
});
const Menu = mongoose.model("items", this.itemsSchema);

module.exports = { items };
