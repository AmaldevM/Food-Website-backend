const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); 

const generateToken = (email, role) => {
  try {
    if (!email) {
      return res
        .status(400)
        .json({ message: "Cannot generate token: invalid email" });
    }
    const secretKey =
      role === "user"
        ? process.env.USER_JWT_SECRET_KEY
        : role === "restaurant"
        ? process.env.RESTAURANT_JWT_SECRET_KEY
        : process.env.ADMIN_JWT_SECRET_KEY;

    if (!secretKey) {
      throw new Error("JWT secret key not found for the specified role");
    }
    const token = jwt.sign({ email, role }, secretKey, { expiresIn: "3h" });
    return token;
  } catch (error) {
    throw new Error(error.message); 
  }
};

module.exports = { generateToken };
