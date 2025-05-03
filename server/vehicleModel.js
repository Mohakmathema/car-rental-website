import mongoose from 'mongoose';

const vehicleSchema = mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Driver'
    },
    brand: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    licensePlate: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    images: [{
      type: String,
      required: true
    }],
    isVerified: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['available', 'rented', 'maintenance'],
      default: 'available'
    }
  },
  {
    timestamps: true
  }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;