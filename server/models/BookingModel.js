import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    fullname:{
        type :String,
        require: true
    },
    email:{
        type :String,
        require: true
    },
    phone:{
        type :Number,
        require: true
    },
    city:{
        type :String,
        require: true
    },postolCode:{
        type :Number,
        require: true
    },
    address:{
        type:String,
        require:true
    },
    timeSlots:{
        days:{type:String ,require:true , enum:["Monday", "Tuesday"],
        time :{type:String , require:true}
    },
    createAT:{type:Date , default:Date.now}
    }
})

export const BookingModel = mongoose.model("AllAppointments" ,BookingSchema)

export default BookingModel