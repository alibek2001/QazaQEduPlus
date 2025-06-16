import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import bcrypt from 'bcryptjs';

// Загрузка переменных окружения
dotenv.config();

// Функция для создания тестовых пользователей
const seedTestUsers = async () => {
  try {
    // Подключение к базе данных
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/qazaqeduplus');
    console.log('MongoDB Connected...');

    // Удаление существующих тестовых пользователей
    await User.deleteMany({ email: { $in: ['test@test.com', 'teacher@test.com'] } });
    console.log('Существующие тестовые пользователи удалены');

    // Хеширование пароля
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('test123', salt);
    
    // Создание тестового студента
    const testStudent = new User({
      firstName: 'Тест',
      lastName: 'Студент',
      email: 'test@test.com',
      password: hashedPassword,
      role: 'student'
    });
    
    await testStudent.save();
    console.log('Тестовый студент создан');
    
    // Создание тестового преподавателя
    const testTeacher = new User({
      firstName: 'Тест',
      lastName: 'Преподаватель',
      email: 'teacher@test.com',
      password: hashedPassword,
      role: 'teacher'
    });
    
    await testTeacher.save();
    console.log('Тестовый преподаватель создан');

    // Закрытие соединения с базой данных
    mongoose.connection.close();
    console.log('Соединение с базой данных закрыто');

    console.log('Данные для входа:');
    console.log('Студент: test@test.com / test123');
    console.log('Преподаватель: teacher@test.com / test123');

    process.exit(0);
  } catch (error) {
    console.error('Ошибка при создании тестовых пользователей:', error);
    process.exit(1);
  }
};

// Запуск функции
seedTestUsers();
