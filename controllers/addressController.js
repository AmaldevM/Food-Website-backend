const { Address } = require("../models/addressModel");

// create address
const createAddress = async (req, res) => {
    try {
      // destructure values from req.body
      const { firstname, lastname, city, street, mobile, pincode } = req.body;
      // validation
      if (!firstname || !street || !city || !mobile || !pincode) {
        return res
          .status(400)
          .json({ success: false, message: "All fields required" });
      }
      // Get user info from auth middleware
      const userInfo = req.user;
  
      // Find the user and check if they already have an address
      const user = await User.findOne({ email: userInfo.email }).populate(
        "address"
      );
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized user" });
      }
  
      if (user.address) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "User already has an address. Please update the existing address.",
          });
      }
      
    // create new address
    const newaddress = new Address({
        firstname,
        lastname,
        city,
        street,
        mobile,
        pincode,
      });

    // save address
    await newaddress.save();

    // new address with the user
    user.address = newAddress._id;
    await user.save()
    res.status(200).json({
        success: true,
        message: "Address created successfully",
        data: newAddress,
      });
  } catch (error) {
    // send error response
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
// update address
const updateAddress = async (req, res) => {
    try {
        // destructure values from req.body
        const { firstname, lastname, city, street, mobile, pincode } = req.body;
        // get user  from authuser
        const userInfo = req.user;
        // find user
        const user = await User.findOne({ email: userInfo.email }).populate(
          "address"
        );
        if (!user) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthoraized user" });
        }
        // Check if the user has an address
        if (!user.address) {
          return res
            .status(404)
            .json({ success: false, message: "Address not found" });
        }
        // Update address fields
        if (firstname) user.address.firstname = firstname;
        if (lastname) user.address.lastname = lastname;
        if (city) user.address.city = city;
        if (phone) user.address.mobile = phone;
        if (pincode) user.address.pincode = pincode;
        if (street) user.address.street = street;
    
        // Save the updated address
        await user.address.save();
        res
          .status(200)
          .json({
            success: true,
            message: "address data updated",
            data: user.address,
          });
      } catch (error) {
        // send error response
        res
          .status(error.status || 500)
          .json({ message: error.message || "Internal server error" });
      }
    };
    

module.exports = {
  createAddress,
  updateAddress,
};
