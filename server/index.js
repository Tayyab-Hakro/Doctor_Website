import express from "express";
import dotenv from "dotenv"; 
import  dbConnection  from "./MongodbConnection/dbConnect.js";
import UserRouter from "./routes/UserRoute.js";
import cors from 'cors'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));

app.use(express.json());
dbConnection()
app.use(cors())
app.use(cors({ origin: 'http://localhost:5173' })); // Replace with your frontend URL

app.use('/user/api', UserRouter)
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
