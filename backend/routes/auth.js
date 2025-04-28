import express from 'express';
import { register, login, profile } from '../controllers/authController.js';
import authenticate from '../middleware/authMiddleware.js';
import { registerValidation,loginValidation } from '../middleware/authValidation.js';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', authenticate, profile);

export default router;
