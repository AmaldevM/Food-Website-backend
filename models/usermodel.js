const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{ type:String, required: true, },
    email:{ type:String, required: true,unique:true, },
    password: {  type:String, required: true, minLength: 8  },
    phone: { type: String, match: /^[0-9]{10}$/,},
    address: { type: mongoose.Schema.Types.ObjectId,
        ref: 'Address' },
    role: { type: String, enum:["customer","admin","seller"],default: "customer"},
    profilePic: { type:String, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s",},
    orders: [{ type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'}]
});

userSchema.index({ roles: 1 });
const User = mongoose.model("User", userSchema);


module.exports = { User };