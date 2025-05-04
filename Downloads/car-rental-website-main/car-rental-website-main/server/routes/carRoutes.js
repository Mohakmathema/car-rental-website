
// server/routes/carRoutes.js

import express from 'express';
import { getAllCars } from '../controllers/carController.js';

const router = express.Router();

// Fetch all cars
router.get('/', getAllCars);

export default router;

