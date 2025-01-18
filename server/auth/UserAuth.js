import jwt from 'jsonwebtoken'


export const isLoggedInUser = async(req,res,next)=>{
   
        const {token} = req.headers
        if(!token){
            return res.json({success:false , message:"User is not authorised"})
        }
       try{
        const token_decode = jwt.verify(token,process.env.SECRET_TOKEN);
        req.body.userId = token_decode.id
        next()
    }catch(error){
console.log(error)
        return res.json({success:false , message:"error message"})
    }
}

export default isLoggedInUser