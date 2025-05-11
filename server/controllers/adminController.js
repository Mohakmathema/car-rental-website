import User from '../models/userModel.js';
import Driver from '../driverModel.js';
import Vehicle from '../vehicleModel.js';
import Category from '../categoryModel.js';
import Fleet from '../fleetModel.js';
// import Fleet from '../fleetModel.js';


// Stats controllers
export const getUserStats = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDriverStats = async (req, res) => {
  try {
    const count = await Driver.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVehicleStats = async (req, res) => {
  try {
    const count = await Vehicle.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingStats = async (req, res) => {
  try {
    const activeCount = 0; // Implement your booking stats logic here
    res.json({ activeCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User management
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Driver management
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({}).select('-password');
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDriver = async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Vehicle management
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Category management
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fleet management
export const getFleets = async (req, res) => {
  try {
    const fleets = await Fleet.find({});
    res.json(fleets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFleets = async (req, res) => {
  try {
    const { name, logoUrl } = req.body;
    const fleet = await Fleet.create({ name, logoUrl });
    res.status(201).json(fleet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFleets = async (req, res) => {
  try {
    await Fleet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Fleet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};