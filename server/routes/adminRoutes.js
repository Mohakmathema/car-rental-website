import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getUserStats,
  getDriverStats,
  getVehicleStats,
  getBookingStats,
  getAllUsers,
  deleteUser,
  getAllDrivers,
  verifyDriver,
  deleteDriver,
  getAllVehicles,
  verifyVehicle,
  deleteVehicle,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/adminController.js';

const router = express.Router();

// Stats routes
router.get('/stats/users', protect, admin, getUserStats);
router.get('/stats/drivers', protect, admin, getDriverStats);
router.get('/stats/vehicles', protect, admin, getVehicleStats);
router.get('/stats/bookings', protect, admin, getBookingStats);

// User management
router.get('/users', protect, admin, getAllUsers);
router.delete('/users/:id', protect, admin, deleteUser);

// Driver management
router.get('/drivers', protect, admin, getAllDrivers);
router.put('/drivers/:id/verify', protect, admin, verifyDriver);
router.delete('/drivers/:id', protect, admin, deleteDriver);

// Vehicle management
router.get('/vehicles', protect, admin, getAllVehicles);
router.put('/vehicles/:id/verify', protect, admin, verifyVehicle);
router.delete('/vehicles/:id', protect, admin, deleteVehicle);

// Category management
router.get('/categories', protect, admin, getCategories);
router.post('/categories', protect, admin, createCategory);
router.put('/categories/:id', protect, admin, updateCategory);
router.delete('/categories/:id', protect, admin, deleteCategory);

export default router;