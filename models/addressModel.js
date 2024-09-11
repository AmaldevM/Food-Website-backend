const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  firstname: { type: String,required: true,},
  lastname: { type: String, default: '',},
  phone: { type: String,  required: true,match: /^[0-9]{10}$/, },
  email: {type: String, required: true},
  street: { type: String,required: true,},
  city: {type: String,required: true,},
  pincode: {type: String, required: true,match: /^[0-9]{5,6}$/, },
});


const Address = mongoose.model("Address", addressSchema);

module.exports = { Address };