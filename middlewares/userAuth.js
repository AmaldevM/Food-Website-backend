const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const userAuth = async (req, res, next) => {
  try {
    // destructure token from cookies
    const { Token } = req.cookies
    if (!Token) {
      return res.status(401).json({success:false,message:"unauthorized access"})
    }
    // verify token using jwt verify
    const decoded = jwt.verify(Token, process.env.TOKEN_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({success:false,message:"unauthorized access"})
    }

      // verify token using jwt verify
      const verifiedToken = jwt.verify(token, process.env.USER_JWT_SECRET_KEY);
      
     // Fetch user from the database using the id from the token
     const user = await User.findOne({ email: verifiedToken.email })
     .select("-password")
     .populate("address");

   if (!user) {
     return res
       .status(401)
       .json({ success: false, message: "User not found" });
   }
    // Attach user to the request object
    req.user=decoded;
    next()

  } catch (error){
    console.log(error);
    res.status(error.statusCode || 500).json({message: error.messsage || "Internal server Error"})
 }
  
};


module.exports = { userAuth };
