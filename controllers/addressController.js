const { Address } = require("../models/addressModel");
const { User } = require("../models/userModel");

// create address
const createAddress = async (req, res) => {
  try {
    const { firstname, lastname, city, street, mobile, pincode } = req.body;

    // validation
    if (!firstname || !street || !city || !mobile || !pincode) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    // Get user info from auth middleware
    const userInfo = req.user;
    const user = await User.findOne({ email: userInfo.email }).populate("address");

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized user" });
    }

    if (user.address) {
      return res.status(400).json({
        success: false,
        message: "User already has an address. Please update the existing address.",
      });
    }

    const newAddress = new Address({
      firstname,
      lastname,
      city,
      street,
      mobile,
      pincode,
    });

    await newAddress.save();
    user.address = newAddress._id;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Address created successfully",
      data: newAddress,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};

// update address
const updateAddress = async (req, res) => {
  try {
    const { firstname, lastname, city, street, mobile, pincode } = req.body;
    const userInfo = req.user;
    const user = await User.findOne({ email: userInfo.email }).populate("address");

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized user" });
    }

    if (!user.address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    const address = await Address.findById(user.address._id);

    if (firstname) address.firstname = firstname;
    if (lastname) address.lastname = lastname;
    if (city) address.city = city;
    if (mobile) address.mobile = mobile;
    if (pincode) address.pincode = pincode;
    if (street) address.street = street;

    await address.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: address,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};

module.exports = {
  createAddress,
  updateAddress,
};
