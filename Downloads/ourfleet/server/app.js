// File: app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/carfleet', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Car Schema
const CarSchema = new mongoose.Schema({
  name: String,
  brand: String,
  description: String,
  price: Number,
  available: { type: Boolean, default: true },
  image: String,
  createdDate: { type: Date, default: Date.now }
});

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// Create models
const Car = mongoose.model('Car', CarSchema);
const User = mongoose.model('User', UserSchema);

// Basic car routes
app.get('/api/items', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/items', async (req, res) => {
  const newCar = new Car({
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    price: req.body.price,
    available: req.body.available !== undefined ? req.body.available : true,
    image: req.body.image
  });

  try {
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Basic user routes
app.post('/api/users/register', async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password, // In a real app, hash this password
      role: req.body.role || 'user'
    });
    
    const savedUser = await newUser.save();
    res.status(201).json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Simple password check (would use bcrypt in production)
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Sample data
const seedDatabase = async () => {
  const carCount = await Car.countDocuments();
  if (carCount === 0) {
    const sampleCars = [
      {
        name: "Model S",
        brand: "Tesla",
        description: "Electric sedan with long range and high performance",
        price: 79990,
        available: true,
        image: "/images/tesla-model-s.jpg"
      },
      {
        name: "F-150",
        brand: "Ford",
        description: "America's best-selling pickup truck",
        price: 45000,
        available: true,
        image: "/images/ford-f150.jpg"
      }
    ];

    try {
      await Car.insertMany(sampleCars);
      console.log("Sample cars added to database");
    } catch (err) {
      console.error("Error seeding cars:", err);
    }
  }
};

// Home route
app.get('/', (req, res) => {
  res.send('Car Fleet API is running');
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedDatabase();
});