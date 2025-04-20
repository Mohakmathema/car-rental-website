
import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUser, deleteUser, } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
