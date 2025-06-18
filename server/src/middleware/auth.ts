import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

// Расширяем интерфейс Request для добавления пользователя
// Using interface merging instead of namespace
import 'express';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
    token?: string;
  }
}

// Основное middleware для проверки аутентификации
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Получаем токен из заголовка или из cookie
    const token = req.header('x-auth-token') || 
                 req.header('Authorization')?.replace('Bearer ', '') ||
                 req.cookies?.token;

    // Проверяем, есть ли токен
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Нет токена, авторизация отклонена' 
      });
    }

    // Проверяем наличие JWT_SECRET
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT Secret is not defined in environment variables');
      return res.status(500).json({ 
        success: false,
        message: 'Ошибка конфигурации сервера' 
      });
    }
    
    // Проверяем токен
    const decoded = jwt.verify(token, jwtSecret) as { user: { id: string; role: string } };
    
    // Проверяем, существует ли пользователь в базе данных
    const user = await User.findById(decoded.user.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Пользователь не найден' 
      });
    }
    
    // Сохраняем токен и информацию о пользователе в запросе
    req.token = token;
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        success: false,
        message: 'Недействительный токен' 
      });
    }
    
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        success: false,
        message: 'Срок действия токена истек' 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Ошибка сервера при аутентификации' 
    });
  }
};

// Middleware для проверки роли пользователя
export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Нет авторизации' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: 'Доступ запрещен. Недостаточно прав.' 
      });
    }

    next();
  };
};

// Middleware для опциональной аутентификации
// Используется для маршрутов, которые могут работать и с аутентифицированными,
// и с неаутентифицированными пользователями
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('x-auth-token') || 
                 req.header('Authorization')?.replace('Bearer ', '') ||
                 req.cookies?.token;

    if (!token) {
      return next(); // Продолжаем без аутентификации
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return next(); // Продолжаем без аутентификации в случае ошибки конфигурации
    }
    
    const decoded = jwt.verify(token, jwtSecret) as { user: { id: string; role: string } };
    
    // Добавляем пользователя к запросу, если токен действителен
    req.user = decoded.user;
    next();
  } catch {
    // В случае ошибки проверки токена просто продолжаем без аутентификации
    next();
  }
};
