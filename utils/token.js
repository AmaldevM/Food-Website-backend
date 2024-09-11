const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); 


const generateToken = (id, name, role) => {
  try {
    if (!id || !name || !role) {
      throw new Error("Cannot generate token: invalid parameters");
    }

    const secretKey = role === 'user'
      ? process.env.USER_JWT_SECRET_KEY
      : role === 'restaurant'
        ? process.env.RESTAURANT_JWT_SECRET_KEY
        : process.env.ADMIN_JWT_SECRET_KEY;

    if (!secretKey) {
      throw new Error("JWT secret key not found for the specified role");
    }

    const token = jwt.sign({ id, name, role }, secretKey, { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw new Error(error.message); // Propagate the error to be handled by the caller
  }
};

module.exports = { generateToken };
