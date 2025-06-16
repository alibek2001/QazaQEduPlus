import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course';
import User from '../models/User';
import bcrypt from 'bcryptjs';

// Загрузка переменных окружения
dotenv.config();

// Тестовые данные курсов
const courses = [
  {
    title: 'Основы программирования на JavaScript',
    description: 'Изучите основы JavaScript с нуля и создайте свои первые веб-приложения. Курс включает практические задания и проекты.',
    image: 'https://source.unsplash.com/random/300x200/?javascript',
    category: 'programming',
    level: 'beginner',
    duration: '8 недель',
    students: 125,
    rating: 4.7,
    lessons: []
  },
  {
    title: 'Математика для программистов',
    description: 'Курс математики, который поможет вам освоить ключевые концепции, необходимые для программирования и анализа данных.',
    image: 'https://source.unsplash.com/random/300x200/?math',
    category: 'mathematics',
    level: 'intermediate',
    duration: '10 недель',
    students: 87,
    rating: 4.5,
    lessons: []
  },
  {
    title: 'Английский для IT-специалистов',
    description: 'Изучите технический английский, необходимый для работы в IT-сфере. Курс включает профессиональную лексику и практику общения.',
    image: 'https://source.unsplash.com/random/300x200/?english',
    category: 'languages',
    level: 'beginner',
    duration: '12 недель',
    students: 210,
    rating: 4.8,
    lessons: []
  },
  {
    title: 'Разработка мобильных приложений на React Native',
    description: 'Научитесь создавать кроссплатформенные мобильные приложения с использованием React Native. Практические проекты включены.',
    image: 'https://source.unsplash.com/random/300x200/?mobile',
    category: 'programming',
    level: 'intermediate',
    duration: '10 недель',
    students: 156,
    rating: 4.6,
    lessons: []
  },
  {
    title: 'Основы физики',
    description: 'Изучите фундаментальные законы физики и их применение в реальном мире. Курс включает интерактивные эксперименты и задачи.',
    image: 'https://source.unsplash.com/random/300x200/?physics',
    category: 'science',
    level: 'beginner',
    duration: '14 недель',
    students: 92,
    rating: 4.4,
    lessons: []
  },
  {
    title: 'Психология общения',
    description: 'Курс по психологии общения и эффективной коммуникации. Научитесь лучше понимать людей и строить успешные отношения.',
    image: 'https://source.unsplash.com/random/300x200/?psychology',
    category: 'humanities',
    level: 'beginner',
    duration: '6 недель',
    students: 178,
    rating: 4.9,
    lessons: []
  },
  {
    title: 'Маркетинг в социальных сетях',
    description: 'Изучите стратегии продвижения в социальных сетях и создания эффективных рекламных кампаний. Практические кейсы включены.',
    image: 'https://source.unsplash.com/random/300x200/?marketing',
    category: 'business',
    level: 'intermediate',
    duration: '8 недель',
    students: 145,
    rating: 4.7,
    lessons: []
  },
  {
    title: 'Анализ данных с Python',
    description: 'Научитесь анализировать данные с использованием Python и библиотек pandas, NumPy и matplotlib. Курс включает реальные проекты.',
    image: 'https://source.unsplash.com/random/300x200/?data',
    category: 'programming',
    level: 'advanced',
    duration: '12 недель',
    students: 120,
    rating: 4.8,
    lessons: []
  },
  {
    title: 'Основы дизайна UX/UI',
    description: 'Изучите принципы пользовательского опыта и интерфейса. Научитесь создавать удобные и привлекательные дизайны для веб и мобильных приложений.',
    image: 'https://source.unsplash.com/random/300x200/?design',
    category: 'humanities',
    level: 'beginner',
    duration: '9 недель',
    students: 165,
    rating: 4.6,
    lessons: []
  }
];

// Функция для добавления курсов в базу данных
const seedCourses = async () => {
  try {
    // Подключение к базе данных
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/qazaqeduplus');
    console.log('MongoDB Connected...');

    // Удаление существующих курсов
    await Course.deleteMany({});
    console.log('Существующие курсы удалены');

    // Создание тестового преподавателя, если он не существует
    let teacher = await User.findOne({ email: 'teacher@qazaqeduplus.kz' });
    
    if (!teacher) {
      // Хеширование пароля
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      
      // Создание нового преподавателя
      teacher = new User({
        firstName: 'Айдар',
        lastName: 'Сериков',
        email: 'teacher@qazaqeduplus.kz',
        password: hashedPassword,
        role: 'teacher'
      });
      
      await teacher.save();
      console.log('Тестовый преподаватель создан');
    } else {
      console.log('Тестовый преподаватель уже существует');
    }

    // Добавление ID преподавателя к каждому курсу
    const coursesWithInstructor = courses.map(course => ({
      ...course,
      instructor: teacher._id
    }));

    // Добавление новых курсов
    await Course.insertMany(coursesWithInstructor);
    console.log('Тестовые курсы успешно добавлены');

    // Закрытие соединения с базой данных
    mongoose.connection.close();
    console.log('Соединение с базой данных закрыто');

    process.exit(0);
  } catch (error) {
    console.error('Ошибка при добавлении курсов:', error);
    process.exit(1);
  }
};

// Запуск функции
seedCourses();
