const jwt = require("jsonwebtoken");

const sellerAuth = (req, res, next) => {
  try {
    // Get token form req.cookies
    const { token } = req.cookies;
    console.log("get token", token)
    // Check have any token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authorized",
      });      
    }
    // Verify the token
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verifyToken) {
      return res.status(401).json({
        success: false,
        message: "user not autherized",
      });
    }
    // If have token send the token as object
    req.seller = verifyToken;
    next()
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
    
  }
};
module.exports = { sellerAuth }