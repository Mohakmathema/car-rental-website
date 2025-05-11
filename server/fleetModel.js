import mongoose from 'mongoose';

const fleetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  logoUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Fleet = mongoose.model('Fleet', fleetSchema);
export default Fleet;