const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const userAuth = async (req, res, next) => {
  try {
    const { Token } = req.cookies
    if (!Token) {
      return res.status(401).json({success:false,message:"unauthorized access"})
    }
    const decoded = jwt.verify(Token, process.env.TOKEN_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({success:false,message:"unauthorized access"})
    }
    req.user=decoded;
    next()

  } catch (error){
    console.log(error);
    res.status(error.statusCode || 500).json({message:error.messsage || "Internal server Error"})
 }
  
};


module.exports = { userAuth };
