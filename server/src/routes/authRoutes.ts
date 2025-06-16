import express from 'express';
import { register, login, getMe } from '../controllers/authController';
import { auth } from '../middleware/auth';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Регистрация пользователя
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Аутентификация пользователя и получение токена
// @access  Public
router.post('/login', login);

// @route   GET /api/auth/me
// @desc    Получение данных текущего пользователя
// @access  Private
router.get('/me', auth, getMe);

export default router;
