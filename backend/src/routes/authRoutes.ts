import express from 'express';
import {
  register,
  login,
  logout,
  getCurrentUser,
  refreshAccessToken
} from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import {
  registerValidation,
  loginValidation,
  validate
} from '../middleware/validator';

const router = express.Router();

// Public routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/refresh', refreshAccessToken);

// Protected routes
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getCurrentUser);

export default router;

