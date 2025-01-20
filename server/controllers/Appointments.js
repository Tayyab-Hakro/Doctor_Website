import BookingModel from "../models/BookingModel.js";
// BookingSystem API
export const BookingSystem = async (req, res) => {
  try {
    const { fullname, email, phone, address, timeSlots, userId } = req.body;

    // Validate required fields
    const requiredFields = { fullname, email, phone, address, timeSlots, userId };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number format",
      });
    }

    // Check if the time slot is already booked
    const isSlotBooked = await BookingModel.findOne({
      "timeSlots.days": timeSlots.days,
      "timeSlots.time": timeSlots.time,
    });

    if (isSlotBooked) {
      return res.status(409).json({
        success: false,
        message: "This time slot is already booked.",
      });
    }

    // Create a new booking
    const newBooking = new BookingModel({
      fullname,
      email,
      phone,
      address,
      timeSlots,
      userId, // Include userId in the booking
    });

    // Save the booking to the database
    await newBooking.save();

    return res.status(201).json({
      success: true,
      message: "Booking successful!",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// MyAppointments API
export const MyAppointments = async (req, res) => {
    try {
      // Extract the ID from the request parameters
      const { id } = req.params;
  
      // Find a single document by its _id
      const document = await BookingModel.findOne({ _id: id });
  
      // If no document is found, handle the case
      if (!document) {
        return res.status(404).json({ message: "No appointment found with this ID" });
      }
  
      // Send the found document as a response
      res.status(200).json({ message: "Data found", data: document });
    } catch (error) {
      // Log and handle any errors
      console.error("Error fetching appointment:", error);
      res.status(500).json({ message: "An error occurred", error: error.message });
    }
  };
  