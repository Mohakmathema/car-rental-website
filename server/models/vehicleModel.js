import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  brand: String,
  model: String,
  licensePlate: String,
  description: String,
  images: [String],
  isVerified: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { collection: 'vehicles' });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;