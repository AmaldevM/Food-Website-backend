// const express = require("express")
// const { userSignup, userLogin, userLogout, userProfile, getAllUsers,deleteUser, updateUser, checkUser }=require("../../controllers/userController")
// const { userAuth, adminAuth, userAndAdminAuth, specificUserAuth } = require("../../middlewares/userAuth")
// const { userAuth, adminAuth, userAndAdminAuth, specificUserAuth } = require("../../middlewares/userAuth")

const express = require("express");
const { 
  userSignup, 
  userLogin, 
  userLogout, 
  userProfile, 
  getAllUsers, 
  deleteUser, 
  updateUser, 
  checkUser 
} = require("../../controllers/userController");

const { userAuth, } = require("../../middlewares/userAuth");

const { upload } = require("../../middlewares/multer");

const router = express.Router();

// User signup
router.post("/signup", userSignup);

// User login
router.post("/login", userLogin);

// User logout
router.post("/logout", userLogout);

// User profile
router.get("/profile/:id", userAuth, userProfile);

// User update
router.put("/update/:id", userAuth, updateUser);

// User delete
router.delete("/delete/:id", userAuth, deleteUser);

// User list
router.get("/userlist", userAuth, getAllUsers);

// Check user
router.get("/checkUser", userAuth, checkUser);

module.exports = { userRouter: router };
