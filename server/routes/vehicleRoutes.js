import express from 'express';
import { 
  submitVehicle, 
  getVehicleStatus,
  getVehicleByDriver,
  updateVehicle,
  deleteVehicle 
} from '../controllers/vehicleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/submit', protect, submitVehicle);
router.get('/status/:driverId', getVehicleStatus);
router.get('/driver/:driverId', getVehicleByDriver);
router.put('/:id', protect, updateVehicle);
router.delete('/:id', protect, deleteVehicle);

export { router as default };