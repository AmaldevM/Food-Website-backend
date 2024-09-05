const {mongoose,Schema} = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{ type:String, required: true, },
    email:{ type:String, required: true,  unique:true, },
    password: {  type:String, required: true,  },
    phone: { type: String, required: true },
    address: { type: String },
    role: { type: String, },
    profilePic: { type:String, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s",}
});

const User = mongoose.model("user", userSchema);

module.exports = { User };