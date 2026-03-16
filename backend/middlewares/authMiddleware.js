import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
dotenv.config();
const protect = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found " });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};

export default protect;
