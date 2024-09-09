const {mongoose,Schema} = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
});
const Shop = mongoose.model("shop", shopSchema);
module.exports = { Shop };
