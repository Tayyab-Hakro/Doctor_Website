import jwt from 'jsonwebtoken'

export const isLoggedInUser = async(req ,res , next)=>{
const token = req.headers
if(!token){
    return res.status(401).json({success : false , message:"User in not logged in"})
}
try{
    const token_decode = jwt.verify(token,process.env.SECRET_TOKEN);
    req.body.userId = token_decode.id;

 
if (!user) {
    return res.status(401).json({ message: 'Access Denied: User not found' });
}
req.user = user
next()
}catch(error){
    console.log(error)
}

}
