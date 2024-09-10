const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const userAuth = async (req, res, next) => {
  try {
    
    const { Token } = req.cookies
    if (!Token) {
      return res.status(401).json({success:false,message:"unauthorized access"})
    }
    const decoded = jwt.verify(Token, process.env.TOKEN_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({success:false,message:"unauthorized access"})
    }
    req.user=decoded
    next()

  } catch (error) {
    next(error)
  }
  
};

const instructorAuth = async (req, res, next) => {
  try {
      
      const { role } = req.user  
      const isInstructor = role.includes("instructor")
      if (!isInstructor) {
        return res.status(401).json({success:false,message:"unauthorized access"})
      }
      next()

    } catch (error) {
      next(error)
    }
}

const adminAuth = async (req, res, next) => {
  try {
      
      const { role } = req.user  
      const isAdmin = role.includes("admin")
      if (!isAdmin) {
        return res.status(401).json({success:false,message:"unauthorized access"})
      }
      next()

    } catch (error) {
      next(error)
    }
}
const learnerAuth = async (req, res, next) => {
  try {
      const { role } = req.user  
      const isLearner = role.includes("learner")
      if (!isLearner) {
        return res.status(401).json({success:false,message:"unauthorized access"})
      }
      next()

    } catch (error) {
      next(error)
    }
}

//middleware that checks if the user is either admin or an instructor of that particular course
const instructorAndAdminAuth = async (req, res, next) => {
  try {
    const { courseId } = req.params
      const { role,id } = req.user  
      const isAdmin = role.includes("admin")
    if (!isAdmin) {
      const user = await User.findById(id)
      const isInstructor = user.courses_managed.includes(courseId)
      if (!isInstructor) {
        return res.status(401).json({ success: false, message: "unauthorized access" })
      }
      }
      next()

    } catch (error) {
      next(error)
    }
}
const userAndAdminAuth = async (req, res, next) => {
  try {
    const {userId}= req.params
    const { role, id } = req.user
    if (userId !== id) {
      const isAdmin = role.includes("admin")
      if (!isAdmin) {
       return res.status(401).json({success:false,message:"unauthorized access"})
      }
      }
      next()

    } catch (error) {
      next(error)
    }
}

const specificUserAuth = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { id } = req.user
    if (userId !== id) {
      return res.status(401).json({success:false,message:"unauthorized access"})
    }
    next()
  } catch (error) {
    next(error)
  }
}


module.exports = {
  userAuth,
  instructorAuth,
  adminAuth,
  learnerAuth,
  instructorAndAdminAuth,
  userAndAdminAuth,
  specificUserAuth
};
