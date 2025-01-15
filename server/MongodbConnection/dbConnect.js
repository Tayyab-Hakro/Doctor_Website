import mongoose from "mongoose";

const dbConnection = async () => {
 try {
   const conn = await mongoose.connect("mongodb://127.0.0.1:27017/DoctorWebsite");
   console.log(`MongoDB connected: ${conn.connection.host}`);
 } catch (error) {
   console.error(`MongoDB connection failed: ${error.message}`);
   process.exit(1);
 }
};

export default dbConnection;