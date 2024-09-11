const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token")



//UserSignup
const userSignup = async (req,res,next) => {
     try {
        const { name, email, password, phone, address, role, profilePic} = req.body;
        if(!name || !email || !password ) {
          return  res.status(400).json({ success:true,
                message: "all field required",
            });
        }
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({success:false, message:  "user already exist" });
        }
        //password hashing
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(password, saltRounds);
       //createnew 
            const newUser = new User({name, email, password:hashedPassword, phone, profilePic});
            await newUser.save();

            const token = generateToken(newUser._id);
            res.cookie("token",token);
            res.json ({success:true, message: "Signup Successfully"});


     } catch (error){
        console.log(error);
        res.status(error.statusCode || 500).json({message:error.messsage || "Internal server Error"})
     }
};
//UserLogin
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({success:false,message:"all fields are required"})
    }
    const userExists =await User.findOne({ email:email })
    if (!userExists) {
      return res.status(404).json({success:false,message:"user does not exist"})
    }
    
    //compare passwords
    const passwordsMatch=await bcrypt.compare(password, userExists.password)
    if (!passwordsMatch) {
      return res.status(401).json({success:false,message:"unauthorized password"})
    }

    //generate jwt token and set cookies
    const token = await generateToken(userExists._id, userExists.name, userExists.roles)
    res.cookie("Token", token)
    res.status(200).json({success:true,message:"user logged in"})

  } catch (error){
     console.log(error);
     res.status(error.statusCode || 500).json({message:error.messsage || "Internal login server Error"})
  }
};
//userLogout
const userLogout = async (req, res,next) => {
  try {
    res.clearCookie("Token")
    res.status(200).json({success:true,message:"successfully logged out "})

  } catch (error){
    console.log(error);
    res.status(error.statusCode || 500).json({message:error.messsage || "Internal server Error"})
 }
}
//UserProfile
const userProfile = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user,"======user");

    const { id } = req.params;
    const userData = await User.findOne({_id: id });

    res.json({ success:true , message: "user data fetched", data:userData})
  } catch (error){
    console.log(error);
    res.status(error.statusCode || 500).json({message:error.messsage || "Internal server Error"})
 }
}
//checkUser
const checkUser = async (req, res,next) => {
  try {
    const { user }=req;
    if(!user) {
      res.status(401).json({succesd:false,message:"user not autherized"})
    }

    res.json({success: true, messege: "user autherized",});

  } catch (error){
    console.log(error);
    res.status(error.statusCode || 500).json({message:error.messsage || "Internal server Error"})
 }
}
//UserUpdate
const updateUser =async (req, res, next) => {
  try {
    const { userId } = req.params
    const {path} = req.file
    let { name, email } = req.body
    
    const user = await User.findById(userId).exec()

    let imgUrl = await handleImageUpload(path)

    if (!name) {
      name=user.name
    }
    
    if (email && email !== user.email) {
      const emailInUse = await User.findOne({ email }).exec();
      if (emailInUse) {
        return res.status(401).json({ success: false, message: "Email already in use" });
      }
    } else {
      email = user.email;
    }

    const updatedUser=await User.findByIdAndUpdate(userId,{name:name,email:email,profile_img:imgUrl},{new:true})   
    res.status(200).json({success:true,message:"user updated"})

  } catch (error){
    console.log(error);
    res.status(error.statusCode || 500).json({message:error.messsage || "Internal server Error"})
 }
}
//UserList
const getAllUsers = async (req, res, next) => {
  try {
    
    const allUsers = await User.find({}).exec()
    const data = allUsers.map((user) => {
      return {name:user.name,email:user.email,id:user._id,roles:user.roles}
    })
    res.status(200).json({ success: true, message: "fetched all usets", data:data })
    
  } catch (error){
    console.log(error);
    res.status(error.statusCode || 500).json({message:error.messsage || "Internal server Error"})
 }
}
//Userdelete
const deleteUser = async (req, res, next) => {
  try {
    
    const { userId } = req.params

    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the user being deleted is an admin
    if (userToDelete.role.includes("admin")) {
      return res.status(403).json({ success: false, message: "Admins cannot delete other admins" });
    }
    
    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) {
      return res.status(404).json({success:false,message:"user not found"})
    }
    res.status(204).send()

  } catch (error){
    console.log(error);
    res.status(error.statusCode || 500).json({message:error.messsage || "Internal server Error"})
 }
}
//reset password



module.exports={ userSignup, userLogin, userLogout, userProfile, getAllUsers,deleteUser,updateUser, checkUser }