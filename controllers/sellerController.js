const { Seller } = require("../models/sellerModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");

// Seller registration
const registerSeller = async (req, res) => {
  try {
    // Get seller data from request body
    const { email, ...rest } = req.body;
    // Check if required fields are present
    if (!email || Object.keys(rest).length === 0) {
      return res.status(404).json({ message: "All fields are required" });
    }
    // Check if any seller already exists
    const isSellerExist = await Seller.findOne({ email });
    if (isSellerExist) {
      return res.status(409).json({ message: "Seller already exist" });
    }
    // Password hashing
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(rest.password, saltRounds);

    // create seller
    const newSeller = new Seller({ email, ...rest, password: hashedPassword });
    await newSeller.save();
    if (newSeller) {
      return res.status(201).json("Seller created");
    }

    console.log(newSeller.id);

    // generate token
    const token = generateToken({
      _id: newSeller.id,
      email: newSeller.email,
      role: "seller",
    });
    console.log(token);
    // pass the token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "development" ? false : true,
    });
    res.json({
      success: true,
      message: "Create new seller",
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

// Login seller
const loginSeller = async (req, res) => {
  try {
    // Destructuring fields
    const { email, password } = req.body;

    // Check if required fields
    if ((!email, !password)) {
        return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // check the user signed or not
    const isSellerExist = await Seller.findOne({email})
    if (!isSellerExist) {
        return res
        .status(401)
        .json({ success: false, message: "Seller does not exist" });
    }
    
    // generate token
    const token = generateToken(isSellerExist._id)
    
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.ENVIRONMENT === "development" ? false : true,
        maxAge: 1 * 60 * 60 * 1000,
    })
    // Pass the token as cookie
    res.status(201).json({ success: true, message: "Seller logged in" });
  } catch (error) {
    res.status(404).json({ message: "faild to seller login" });
  }
};
// User logout
const logoutSeller = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ success: true, message: "Seller logged out" });
  } catch (error) {
    res.json({ error });
  }
};
// get all sellers
const getSellersList = async (req, res) => {
  try {
    const sellers = await Seller.find({});
    return res.status(200).json(sellers);
  } catch (error) {
    res.status(404).json({ message: "Server not responese..." });
  }
};

module.exports = {
  registerSeller,
  loginSeller,
  logoutSeller,
  getSellersList,
};
