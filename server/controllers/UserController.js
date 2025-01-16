import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import jwt from 'jsonwebtoken'

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
      file: imageUploader.filename, 
      address,
      phone,
    });

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

export const Login = async (req , res) =>{
    try{

    
    const {email , password} = req.body
      if ( !email || !password ) {
        return res.status(400).json({ success: false, message: "Fill all the fields" });
      }
  
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: "User is not signup yet" });
      }
      const isMatch = await bcrypt.compare(password ,user.password)
      if (!isMatch) return res.status(401).json({ success:false, message: 'Invalid credentials!' });
      


    // Create token data
    const tokenData = { userID: user._id };
    const token = await jwt.sign(tokenData , process.env.SECRET_TOKEN_KEY ,{
        expiresIn:"1d"
    })
    res.status(200)
    .cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      httpOnly: true, // Prevent access to cookie from client-side JS
    })
    .json({
      success: true,
      message: `Welcome back ${user.username}`,
      user
    });
    }catch(error){
        console.log(error)
    }
}
