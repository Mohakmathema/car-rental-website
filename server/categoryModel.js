import mongoose from 'mongoose';

// const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// module.exports = mongoose.model('Category', categorySchema);
export default mongoose.model('Category', categorySchema);