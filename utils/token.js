const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

const generateToken = async (id,name,role) => {
  try {
    const token = jwt.sign(
      { 
      id: id, 
      name: name, 
      role: role || "user"
      }, 
      process.env.TOKEN_SECRET_KEY);
    return token
  } catch (error) {
    console.error("ERROR:" + error)
    throw new Error("failed to generate token");
    
  }
};

module.exports={ generateToken };