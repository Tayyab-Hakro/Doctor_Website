import UserModel from "../models/UserModel.js"
import bcrypt from 'bcryptjs'
import multer, { diskStorage } from "multer"

//Multer Use for Image Uploader
const storage = multer.diskStorage({
    destination:function(req , file,cb){
        cb(null ,"../Images")
    },
    filename:function(req , file, cb){
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + '-' + file.originalname); 
          },
    }
)

export const upload = multer({storage :storage})
export const SignUp = async(req ,res) =>{
    try{
        const {username , email ,file, passoword , address ,phone} = req.body
       const ImageUploader = req.file
        if(!username || !email  || !passoword  || file || !address || !phone ){
            return res.status(401).json({success : false , message:"fILL ALL the fields"})
        }
        const IsMatch = await UserModel.findOne({email})
        if(IsMatch){
            return res.status(401).json({success : false , message:"User is Already aviable"})
            
        }
        const hashedPassword = await bcrypt.hash(passoword, 10);

 
        const NewUser =   new UserModel({
            username,email,passoword:hashedPassword,file:ImageUploader,address,phone
        })
        await  NewUser.save();

    res.status(201).json({
        message: 'User signed up successfully',
      });
    }catch(error){
        console.log(error)
    }

}
