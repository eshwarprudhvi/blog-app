import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }
  //checking if user alerady exists
  const user = await User.findOne({ email: email });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    try {
      await newUser.save();
      req.user = newUser;
    } catch (e) {
      res.status(500).json({
        message: "unable to create user",
      });
      return;
    }
    const token = generateToken(newUser._id);
    res.status(201).json({
      message: token,
    });
  } else {
    res.status(409).json({
      message: "user alredy exists",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const token = generateToken(user._id);
    return res.json({
      message: token,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Login failed",
    });
  }
};

export { createUser, loginUser };
