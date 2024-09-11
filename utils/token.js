const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

const generateToken = async (id,name,role) => {
  try {
    if (!email) {
      return res.status(400).json({message:"Cannot generate token: invalid email"});
    }

    const secretKey = role === 'user'
      ? process.env.USER_JWT_SECRET_KEY
      : role === 'restaurant'
        ? process.env.RESTAURANT_JWT_SECRET_KEY
        : process.env.ADMIN_JWT_SECRET_KEY;

    if (!secretKey) {
        return res.status(400).json({message:"JWT secret key not found for the specified role"});
    }

    const token = jwt.sign({ email, role }, secretKey, { expiresIn: '1h' });
    return token;
  } catch (error) {
    res.status(500).json({true:false , message:error.message});
  }
};

module.exports={ generateToken };