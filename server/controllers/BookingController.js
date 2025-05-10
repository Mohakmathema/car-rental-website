// import Booking from "../models/BookingModel.js";

// // Create a new booking
// export const createBooking = async (req, res) => {
//   try {
//     const { carModel, user, email, phone, pickupDate, returnDate, address, driverPreference, carId } = req.body;

//     // Validate required fields
//     if (!carModel || !user || !email || !phone || !pickupDate || !returnDate || !address || !driverPreference || !carId) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Create new booking
//     const booking = new Booking({
//       carModel,
//       user,
//       email,
//       phone,
//       pickupDate,
//       returnDate,
//       address,
//       driverPreference,
//       carId,
//     });

//     await booking.save();
//     res.status(201).json({ status: "success", data: booking });
//   } catch (error) {
//     console.error("Error creating booking:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // Cancel a booking
// export const cancelBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findOneAndUpdate(
//       { carId: req.params.carId, status: { $ne: "cancelled" } },
//       { status: "cancelled" },
//       { new: true }
//     );

//     if (!booking) {
//       return res.status(404).json({ error: "Booking not found or already cancelled" });
//     }

//     res.status(200).json({ status: "success", data: booking });
//   } catch (error) {
//     console.error("Error cancelling booking:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };