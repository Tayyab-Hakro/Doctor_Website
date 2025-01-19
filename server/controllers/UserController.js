import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Configure multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; // Allow only specific file types
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Only images (jpeg, jpg, png) are allowed!"));
    }
  },
});

// User signup
export const SignUp = async (req, res) => {
  try {
    const { username, email, password, address, phone } = req.body;
    const imageUploader = req.file;

    // Validate required fields
    if (!username || !email || !password || !imageUploader || !address || !phone) {
      return res.status(400).json({ success: false, message: "Please fill in all fields." });
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      file: imageUploader.filename, // Save file name
      address,
      phone,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User signed up successfully.",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// User login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please fill in all fields." });
    }

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not registered." });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    // Check for secret token key
    if (!process.env.SECRET_TOKEN_KEY) {
      throw new Error("Missing SECRET_TOKEN_KEY in environment variables.");
    }

    // Generate JWT token
    const tokenData = { userID: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_TOKEN_KEY, { expiresIn: "1d" });

    res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true, // Prevent client-side access
        secure: process.env.NODE_ENV === "production", // Secure in production
      })
      .json({
        success: true,
        message: `Welcome back, ${user.username}!`,
        user: { id: user._id, username: user.username, email: user.email },
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// User logout
export const Logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ success: true, message: "Logged out successfully." });
};

// Get profile data
export const GetProfileData = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await UserModel.findById({ _id: id });
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};
