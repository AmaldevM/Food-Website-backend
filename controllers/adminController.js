const { Admin } = require("../models/adminModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");

//AdminSignup
const adminSignup = async (req,res,next) => {
     try {
        const { name, email, password, phone, address, role, profilePic} = req.body;
        if(!name || !email || !password ) {
          return  res.status(400).json({ success:true,
                message: "all field required",
            });
        }
        const isAdminExist = await Admin.findOne({ email });
        if (isAdminExist) {
            return res.status(400).json({ message:  "user already exist" });
        }
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(password, saltRounds);
      
            const newUser = new Admin({name, email, password:hashedPassword, phone, profilePic});
            await newUser.save();

            const token = generateToken(newUser._id,"admin");
            res.cookie("token",token);
            res.json ({success:true, message: "admin Signup Successfully"});


     } catch (error){
        console.log(error);
        res.status(error.statusCode || 500).json({message:error.messsage || "Internal server Error"})
     }
};
//AdminLogin
const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({success:false,message:"all fields are required"})
    }
    const adminExist =await Admin.findOne({ email:email })
    if (!adminExist) {
      return res.status(404).json({success:false,message:"admin does not exist"})
    }
    
    //compare passwords
    const passwordsMatch=await bcrypt.compare(password, adminExist.password)
    if (!passwordsMatch) {
      return res.status(401).json({success:false,message:"unauthorized password"})
    }

    //generate jwt token and set cookies
    const token = await generateToken(adminExist._id ,'admin')
    res.cookie("Token", token)
    res.status(200).json({success:true,message:"Admin login successfull"})

  } catch (error){
     console.log(error);
     res.status(error.statusCode || 500).json({message:error.messsage || "Internal login server Error"})
  }
};
//adminLogout
const adminLogout = async (req, res,next) => {
  try {
    res.clearCookie("Token")
    res.status(200).json({success:true,message:"admin successfully logged out "})

  } catch (error){
    console.log(error);
    res.status(error.statusCode || 500).json({message:error.messsage || "Internal server Error"})
 }
}
//UserProfile
const adminProfile = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user,"======user");

    const { id } = req.params;
    const userData = await Admin.findOne({_id: id });

    res.json({ success:true , message: "admin data fetched", data:userData})
  } catch (error){
    console.log(error);
    res.status(error.statusCode || 500).json({message:error.messsage || "Internal server Error"})
 }
}
//checkadmin
const checkadmin = async (req, res,next) => {
  try {
    const { user }=req;
    if(!user) {
      res.status(401).json({succesd:false,message:"admin not autherized"})
    }

    res.json({success: true, messege: "user autherized",});

  } catch (error){
    console.log(error);
    res.status(error.statusCode || 500).json({message:error.messsage || "Internal server Error"})
 }
}
//UserUpdate
const updateadmin =async (req, res, next) => {
  try {
    const { userId } = req.params
    const {path} = req.file
    let { name, email } = req.body
    
    const user = await Admin.findById(userId).exec()

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

    const updatedUser=await Admin.findByIdAndUpdate(userId,{name:name,email:email,profile_img:imgUrl},{new:true})   
    res.status(200).json({success:true,message:"user updated"})

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


module.exports={ adminSignup, adminLogin, adminLogout, adminProfile, deleteUser,updateadmin, checkadmin }