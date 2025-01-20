import express from "express"
import { BookingSystem, MyAppointments } from "../controllers/Appointments.js"
import isLoggedInUser from "../auth/UserAuth.js"
const BookRouter = express.Router()

BookRouter.post("/Booking" ,isLoggedInUser, BookingSystem)
BookRouter.get("/Bookingdata/:id" , MyAppointments)


export default BookRouter