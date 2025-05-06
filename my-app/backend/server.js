const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log(`Created directory: ${uploadDir}`);
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// File Upload Setup with Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only .jpg, .png, and .pdf files are allowed!'));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).array('documents', 5); // Ensure multer middleware is correctly configured

// JWT Authentication Middleware (for protected routes)
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// Booking Schema
const bookingSchema = new mongoose.Schema({
  carModel: { type: String, required: true },
  user: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  address: { type: String, required: true },
  driverPreference: { type: String, required: true },
  documents: [{ type: String }], // Store file paths
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

// Validation Schema with Joi
const bookingValidationSchema = Joi.object({
  carModel: Joi.string().required(),
  user: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
  pickupDate: Joi.date().iso().required(),
  returnDate: Joi.date().iso().greater(Joi.ref('pickupDate')).required(),
  address: Joi.string().min(5).required(),
  driverPreference: Joi.string().valid('self', 'with-driver').required(),
  status: Joi.string().valid('pending', 'confirmed', 'cancelled'),
});

// Routes
app.post('/bookings', (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err.message);
      return res.status(400).json({ error: 'File upload error', details: err.message });
    } else if (err) {
      console.error('Unexpected error during upload:', err.stack);
      return res.status(500).json({ error: 'Server error during upload', details: err.message });
    }

    try {
      console.log('Request received at /bookings');
      console.log('Raw request body:', req.body);
      console.log('Request headers:', req.headers);
      console.log('Uploaded files:', req.files);

      const {
        carModel, user, email, phone, pickupDate, returnDate, address, driverPreference
      } = req.body;

      if (!carModel || !user || !email || !phone || !pickupDate || !returnDate || !address || !driverPreference) {
        console.log('Missing required fields:', { carModel, user, email, phone, pickupDate, returnDate, address, driverPreference });
        return res.status(400).json({ error: 'Missing required fields', details: req.body });
      }

      const { error } = bookingValidationSchema.validate(req.body, { abortEarly: false });
      if (error) {
        console.log('Validation error:', error.details);
        return res.status(400).json({ error: 'Validation error', details: error.details });
      }

      const documents = req.files ? req.files.map(file => file.path) : [];
      console.log('Documents paths:', documents);

      if (!documents.length && req.body.documents) {
        console.log('Warning: No files uploaded despite documents field in body:', req.body.documents);
      }

      const booking = new Booking({
        carModel,
        user,
        email,
        phone,
        pickupDate: new Date(pickupDate),
        returnDate: new Date(returnDate),
        address,
        driverPreference,
        documents,
        status: 'pending',
      });

      booking.save()
        .then(() => res.status(201).json({ message: 'Booking created successfully', booking }))
        .catch(saveErr => {
          console.error('Error saving booking:', saveErr.stack);
          res.status(500).json({ error: 'Error saving booking', details: saveErr.message });
        });
    } catch (error) {
      console.error('Error creating booking:', error.stack);
      res.status(500).json({ error: 'Error creating booking', details: error.message });
    }
  });
});

// Get all bookings (protected route)
app.get('/bookings', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bookings', details: error.message });
  }
});

// Get a single booking by ID (protected route)
app.get('/bookings/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching booking', details: error.message });
  }
});

// Update a booking (protected route)
app.put('/bookings/:id', authMiddleware, (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err.message);
      return res.status(400).json({ error: 'File upload error', details: err.message });
    } else if (err) {
      console.error('Unexpected error during upload:', err.stack);
      return res.status(500).json({ error: 'Server error during upload', details: err.message });
    }

    try {
      const {
        carModel, user, email, phone, pickupDate, returnDate, address, driverPreference, status
      } = req.body;

      const { error } = bookingValidationSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ error: 'Validation error', details: error.details });
      }

      const documents = req.files.length > 0 ? req.files.map(file => file.path) : undefined;

      const updatedData = {
        carModel,
        user,
        email,
        phone,
        pickupDate,
        returnDate,
        address,
        driverPreference,
        status,
        ...(documents && { documents }),
      };

      Booking.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        .then(booking => {
          if (!booking) return res.status(404).json({ error: 'Booking not found' });
          res.status(200).json({ message: 'Booking updated successfully', booking });
        })
        .catch(updateErr => {
          console.error('Error updating booking:', updateErr.stack);
          res.status(500).json({ error: 'Error updating booking', details: updateErr.message });
        });
    } catch (error) {
      console.error('Error updating booking:', error.stack);
      res.status(500).json({ error: 'Error updating booking', details: error.message });
    }
  });
});

// Delete a booking (protected route)
app.delete('/bookings/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting booking', details: error.message });
  }
});

// Catch-all for unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const booking = new Booking(req.body);
await booking.save();
  