const express = require("express")
const { adminSignup, adminLogin, adminLogout } = require("../../controllers/adminController")
const router = express.Router()

//user signup
router.post( "/signup", adminSignup)
//user login
router.post( "/login", adminLogin)
//user logout
router.post( "/logout", adminLogout )

//user profile
router.get("/profile/:id")
//user update
router.put("/update/:userId")
//user delete
router.delete("/delete/:userId")

//user list
router.get("/userlist")
//check user
router.get("/checkUser" )

module.exports={ adminRouter : router }