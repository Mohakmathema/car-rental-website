
// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema({
//   carModel: {
//     type: String,
//     required: true,
//   },
//   user: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   pickupDate: {
//     type: String,
//     required: true,
//   },
//   returnDate: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   driverPreference: {
//     type: String,
//     enum: ["self", "with-driver"],
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["pending", "confirmed", "cancelled"],
//     default: "pending",
//   },
//   carId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Vehicle",
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model("Booking", bookingSchema);
