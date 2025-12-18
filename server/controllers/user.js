import Blog from "../models/blog.js";
import user from "../models/user.js";
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
    } catch (e) {
      res.status(500).json({
        message: "unable to create user",
      });
      return;
    }
    const token = generateToken(res, newUser._id);
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
    const token = generateToken(res, user._id);
    return res.json({
      message: token,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Login failed",
    });
  }
};

const logoutUser = async (req, res) => {
  console.log(req.user);
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 0,
  });
  res.json({
    message: "Logged Out successfully",
  });
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch users",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found ",
      });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch user",
    });
  }
};
const updateUserById = async (req, res) => {
  try {
    if (req.user.id != req.params.id) {
      return res.status(403).json({
        message: "Not authorized to update this user",
      });
    }
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found ",
      });
    }
    const { username, email } = req.body;
    user.username = username || user.username;
    user.email = email || user.email;
    const updatedUser = await user.save();
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch user",
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    //check if authorzied
    if (req.user.id != req.params.id) {
      return res.status(403).json({
        message: "Not authorized to delete the user",
      });
    }
    //check if user is present or not
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    //delete all the blogs by this user
    await Blog.deleteMany({ author: req.params.id });

    await user.deleteOne();

    res.status(500).json({
      message: "User and related blogs deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete   user",
    });
  }
};
export {
  createUser,
  loginUser,
  logoutUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
