import express from "express"
import { BookingSystem, MyAppointments } from "../controllers/Appointments.js"
const BookRouter = express.Router()

BookRouter.post("/Booking" , BookingSystem)
BookRouter.get("/Bookingdata/:id" , MyAppointments)


export default BookRouter