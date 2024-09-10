const express = require("express")
const { userSignup, userLogin, userLogout, userProfile, getAllUsers,deleteUser, updateUser, checkUser }=require("../../controllers/userController")
const { userAuth, adminAuth, userAndAdminAuth, specificUserAuth } = require("../../middlewares/userAuth")
const {upload}=require("../../middlewares/multer")


const router = express.Router()

//user signup
router.post( "/signup", userSignup )
//user login
router.post( "/login", userLogin )
//user logout
router.post( "/logout", userLogout )

//user profile
router.get("/profile/:id", userAuth, userProfile)
//user update
router.put("/update/:userId",userAuth, updateUser)
//user delete
router.delete("/delete/:userId",userAuth,deleteUser)

//user list
router.get("/userlist", userAuth, )
//check user
router.get("/checkUser", userAuth, checkUser )

module.exports={ userRouter:router }