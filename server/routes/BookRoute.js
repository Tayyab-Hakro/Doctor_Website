import express from "express"
import { BookingSystem } from "../controllers/Appointments.js"
const BookRouter = express.Router()

BookRouter.post("/Booking" , BookingSystem)

export default BookRouter