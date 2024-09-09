const { User } = require("../models/usermodel");
const bcrypt = require("bcrypt");


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
            console.log(hashedPassword,'====Hashedpassword')
            

     } catch (error){
        console.log(error);
     }
};


module.exports= { userSignup };