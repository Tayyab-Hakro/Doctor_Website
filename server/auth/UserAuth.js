import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js'

export const isLoggedInUser = async(req ,res , next)=>{
const token = req.cookie
if(!token){
    return res.status(401).json({success : false , message:"User in not logged in"})
}
try{
const decoded = await jwt.verify(token ,process.env.SECRET_TOKEN_KEY)
const user = await UserModel.findById(decoded.userId);

 
if (!user) {
    return res.status(401).json({ message: 'Access Denied: User not found' });
}
req.user = user
next()
}catch(error){
    console.log(error)
}

}
