const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: {type: String,required: true,},
    price: { type: Number,required: true,},
    description: {type: String,required: true,},
    category: 
      {
        type: [String],
        required: true,
      },
    image: {type: String,
    default: "https://www.writersdigest.com/.image/t_share/MTcxMDY0NzcwNzg0MDEyMjcz/image-placeholder-title.jpg", },
    restaurant: {  type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',  // Make sure this matches the model name exactly
      required: true, }
  });

const Food = mongoose.model("Food", foodSchema);

module.exports = { Food };
