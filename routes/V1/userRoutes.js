const express = require("express")
const { userSignup, userLogin, userLogout, userProfile, getAllUsers,deleteUser, updateUser }=require("../../controllers/userController")
const { userAuth, adminAuth, userAndAdminAuth, specificUserAuth } = require("../../middlewares/authMiddlewares")
const {upload}=require("../../middlewares/multer")


const router = express.Router()

//user signup
router.post( "/signup", userSignup )
//user login
router.post( "/login", userLogin )
//user logout
router.post( "/logout", userLogout )
//user profile
router.get("/profile",userAuth, userProfile)
//user update
router.put("/update/:userId",userAuth,specificUserAuth,upload.single("profile_img"),updateUser)
//user delete
router.delete("/delete/:userId",userAuth,userAndAdminAuth,deleteUser)
//user list
router.get("/userlist", userAuth, adminAuth, getAllUsers)
//check user
router.get("/checkUser",)

module.exports={ userRouter:router }