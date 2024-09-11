const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const userAuth = async (req, res, next) => {
  try {
    // Destructure token from cookies
    const { token } = req.cookies;  // Ensure the key matches the cookie name
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    // Verify token using jwt verify
    const decoded = jwt.verify(token, process.env.USER_JWT_SECRET_KEY);
    
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    // Fetch user from the database using the email from the token
    const user = await User.findOne({ email: decoded.email })
      .select("-password")
      .populate("address");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};

module.exports = { userAuth };
