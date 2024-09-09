const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");


const userSignup = async (req,res,next) => {
     try {
        const { name, email, password, phone, address, role, profilePic} = req.body;
        if(!name || !email || !password ) {
            res.status(400).json({ success:true,
                message: "all field required",
            });
        }
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ message:  "user already exist" });
        }
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(password, saltRounds);
            console.log(hashedPassword,'====Hashedpassword');
            const newUser = new User({name, email, password:hashedPassword, phone, profilePic});
            await newUser.save();

            res.json ({success:true, message: "Signup Successfully"});
     } catch (error){
        console.log(error);
        res.status(error.statusCode || 500).json({message:error.messsage || "Internal server Error"})
     }
};

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
  
    } catch (error) {
      console.error("ERROR!:" + error)
      res.status(error.statusCode||500).json({success:false,message:error.message||"internal server error"})
    }
  }

module.exports= { userSignup , userLogin };