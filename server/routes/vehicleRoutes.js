import express from 'express';
import { 
  submitVehicle, 
  getVehicleStatus,
  getVehicleByDriver,
  updateVehicle,
  deleteVehicle,
  updateVehicleStatus,
  getAllVehicles,
  getVehicleById
} from '../controllers/vehicleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Fetch all vehicles
router.get('/', getAllVehicles);

// Fetch single vehicle by ID
router.get('/:id', protect, getVehicleById);

// Existing routes
router.post('/submit', protect, submitVehicle);
router.get('/status/:driverId', getVehicleStatus);
router.get('/driver/:driverId', getVehicleByDriver);
router.put('/:id', protect, updateVehicle);
router.delete('/:id', protect, deleteVehicle);
router.put('/:id/status', protect, updateVehicleStatus);

export { router as default };