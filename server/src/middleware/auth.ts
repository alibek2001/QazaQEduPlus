import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Расширяем интерфейс Request для добавления пользователя
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  // Получаем токен из заголовка
  const token = req.header('x-auth-token');

  // Проверяем, есть ли токен
  if (!token) {
    return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });
  }

  try {
    // Проверяем токен
    const jwtSecret = process.env.JWT_SECRET as string;
    
    if (!jwtSecret) {
      throw new Error('JWT Secret is not defined in environment variables');
    }
    
    const decoded = jwt.verify(token, jwtSecret) as { user: { id: string; role: string } };
    
    // Добавляем пользователя к запросу
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Токен недействителен' });
  }
};

// Middleware для проверки роли пользователя
export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    next();
  };
};
