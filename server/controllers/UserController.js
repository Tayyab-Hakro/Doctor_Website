import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";

// Multer Use for Image Uploader
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

export const SignUp = async (req, res) => {
  try {
    const { username, email, password, address, phone } = req.body;
    const imageUploader = req.file;

    // Validate all required fields
    if (!username || !email || !password || !imageUploader || !address || !phone) {
      return res.status(400).json({ success: false, message: "Fill all the fields" });
    }

    // Check if user already exists
    const isMatch = await UserModel.findOne({ email });
    if (isMatch) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      file: imageUploader.filename, // Save the uploaded file name
      address,
      phone,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({
      success: true,
      message: "User signed up successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
