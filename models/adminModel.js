const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    // Custom error message for invalid email
    validate: {
      validator: function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: (props) => `${props.value} is not a valid email!`,
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,  // Ensure passwords have a minimum length
    select: false  // Don't return the password field in queries by default
  },
  role: {
    type: String,
    enum: ["admin", "superadmin"],  // Ensure only these values are accepted
    default: "admin"
  }
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Admin };
