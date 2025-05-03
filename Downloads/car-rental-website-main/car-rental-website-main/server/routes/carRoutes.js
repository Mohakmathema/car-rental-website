// server/models/carModel.js

import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);

export default Car;
