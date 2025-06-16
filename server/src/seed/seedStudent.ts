import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import bcrypt from 'bcryptjs';

// Загрузка переменных окружения
dotenv.config();

// Функция для создания тестового студента
const seedStudent = async () => {
  try {
    // Подключение к базе данных
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/qazaqeduplus');
    console.log('MongoDB Connected...');

    // Проверка, существует ли уже тестовый студент
    let student = await User.findOne({ email: 'student@qazaqeduplus.kz' });
    
    if (!student) {
      // Хеширование пароля
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      
      // Создание нового студента
      student = new User({
        firstName: 'Алия',
        lastName: 'Казыбекова',
        email: 'student@qazaqeduplus.kz',
        password: hashedPassword,
        role: 'student'
      });
      
      await student.save();
      console.log('Тестовый студент создан');
    } else {
      console.log('Тестовый студент уже существует');
    }

    // Закрытие соединения с базой данных
    mongoose.connection.close();
    console.log('Соединение с базой данных закрыто');

    process.exit(0);
  } catch (error) {
    console.error('Ошибка при создании студента:', error);
    process.exit(1);
  }
};

// Запуск функции
seedStudent();
