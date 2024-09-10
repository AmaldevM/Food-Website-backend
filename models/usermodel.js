const {mongoose,Schema} = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{ type:String, required: true, },
    email:{ type:String, required: true,unique:true, },
    password: {  type:String, required: true, minLength: 8  },
    phone: { type: String, },
    address: { type: String, },
    role: { type: String, enum:["customer","admin","seller"],default: "customer"},
    profilePic: { type:String, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s",}
});

userSchema.index({ roles: 1 });
const User = mongoose.model("user", userSchema);


module.exports = { User };