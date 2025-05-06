
import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUser, deleteUser, changePassword,} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/:id', updateUser);
router.put('/:id/change-password', protect, changePassword);
router.delete('/:id', deleteUser);

export default router;
