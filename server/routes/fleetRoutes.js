import express from 'express';
import Fleet from '../fleetModel.js';

const router = express.Router();

// Get all fleets (public route)
router.get('/', async (req, res) => {
  try {
    const fleets = await Fleet.find({});
    res.json(fleets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;