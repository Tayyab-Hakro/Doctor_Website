import  mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    username :{
        type:String,
        require:true
    },
    email:{
        type :String,
        require : true
    },
   password:{
        type :String,
        require : true
    },
    file:{
        type :String,
    },
    address:{
        type :String,
        require : true
    },
    phone :{
        type:Number,
        require : true
    }
})

const UserModel = mongoose.model("Users", UserSchema )
export default UserModel