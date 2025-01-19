
import BookingModel from "../models/BookingModel.js";
export const BookingSystem =async (req , res ) =>{
   try{
    const { fullname, email, phone, address, city, postolCode, timeSlots } = req.body;

        // Validate required fields
        if (!fullname || !email || !phone || !address  || !timeSlots) {
            return res.status(400).json({ success: false, message: "Please fill all required fields." });
        }

        // Check if the time slot is already booked
        const isSlotBooked = await BookingModel.findOne({
            "timeSlots.days": timeSlots.days,
            "timeSlots.time": timeSlots.time,
        });

        if (isSlotBooked) {
            return res.status(409).json({ success: false, message: "This time slot is already booked." });
        }

        // Create a new booking
        const newBooking = new BookingModel({
            fullname,
            email,
            phone,
            address,
                       timeSlots,
        });

        // Save the booking to the database
        await newBooking.save();

        return res.status(201).json({ success: true, message: "Booking successful!", booking: newBooking });
    } catch (error) {
        console.error("Error booking appointment:", error);
        return res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}