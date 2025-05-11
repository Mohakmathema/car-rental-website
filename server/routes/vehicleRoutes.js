import express from 'express';
import { 
  submitVehicle, 
  getVehicleStatus,
  getVehicleByDriver,
  updateVehicle,
  deleteVehicle ,
  updateVehicleStatus,
  getAllVehicles,
  getVehicleById
} from '../controllers/vehicleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/submit', protect, submitVehicle);
router.get('/status/:driverId', getVehicleStatus);
router.get('/driver/:driverId', getVehicleByDriver);
router.put('/:id', protect, updateVehicle);
router.delete('/:id', protect, deleteVehicle);
router.put('/:id/status', protect, updateVehicleStatus);
// router.get('/', getAllVehicles); // Public route to get all verified vehicles
router.get('/', getAllVehicles);
router.get('/:id', getVehicleById);

export { router as default };