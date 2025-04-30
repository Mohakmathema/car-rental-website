import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const driverSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    vehicleImage: {
      type: String,
      required: [true, 'Please add a vehicle image'],
    },
    vehicleDetails: {
      type: Object,
      required: [true, 'Please add vehicle details'],
    }
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
driverSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
driverSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;