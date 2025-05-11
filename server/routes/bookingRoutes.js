import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createBooking, getDriverBookings, updateBookingStatus} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/driver/:driverId', protect, getDriverBookings);
router.put('/:bookingId/status', protect, updateBookingStatus);
// router.get('/user/:userId', protect, getUserBookings);

export default router;