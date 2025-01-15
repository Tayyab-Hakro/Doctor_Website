import express from "express";
import dotenv from "dotenv"; 
import  dbConnection  from "./MongodbConnection/dbConnect.js";
import UserRouter from "./routes/UserRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use('/Images', express.static('./Images'));

app.use(express.json());
dbConnection()
app.use('/user/api', UserRouter)
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
