const jwt = require("jsonwebtoken");
const { Admin } = require("../models/adminModel");

const adminAuth = async (req, res, next) => {
  try {
    // Destructure token from cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized admin, no token provided" });
    }
    // Verify token using jwt.verify
    let verifiedToken;
    try {
      verifiedToken = jwt.verify(token, process.env.ADMIN_JWT_SECRET_KEY);
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
    // Check if the admin exists in the database
    const admin = await Admin.findById(verifiedToken._id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    // Assign admin data to the request object
    req.admin = admin;
    // Proceed to the next middleware
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};

module.exports = { adminAuth };
