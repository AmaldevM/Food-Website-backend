const bcrypt = require('bcrypt');
const { User } = require("../models/usermodel");
const { generateToken } = require("../utils/token")