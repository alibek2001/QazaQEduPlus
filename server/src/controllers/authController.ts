import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

// @desc    Регистрация пользователя
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    // Проверяем, существует ли пользователь
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Создаем нового пользователя
    user = new User({
      firstName,
      lastName,
      email,
      password,
      role: role || 'student'
    });

    // Сохраняем пользователя (пароль будет хешироваться в pre-save хуке)
    await user.save();

    // Создаем JWT токен
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    const jwtSecret = process.env.JWT_SECRET as string;
    
    if (!jwtSecret) {
      throw new Error('JWT Secret is not defined in environment variables');
    }

    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Аутентификация пользователя и получение токена
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Проверяем, существует ли пользователь
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    // Проверяем пароль
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    // Создаем JWT токен
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    const jwtSecret = process.env.JWT_SECRET as string;
    
    if (!jwtSecret) {
      throw new Error('JWT Secret is not defined in environment variables');
    }

    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Получение данных текущего пользователя
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }
    
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
