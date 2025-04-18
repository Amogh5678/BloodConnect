import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protectedRoute = async (req, res, next) => {
  try {
    // Retrieve token from the cookies
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Access denied. No token provided." 
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.userId).select("-password")

    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "User not found" 
      })
    }

    // console.log("Authenticated User:", req.user)
    next()
  } catch (err) {
    res.status(401).json({ 
      success: false, 
      message: "Invalid token", 
      error: err.message 
    })
  }
}

export default protectedRoute
