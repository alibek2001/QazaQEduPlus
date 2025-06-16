import { Request, Response } from 'express';
import Course from '../models/Course';
import Lesson from '../models/Lesson';
import Enrollment from '../models/Enrollment';

// @desc    Получение всех курсов
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req: Request, res: Response) => {
  try {
    const { category, level, search } = req.query;
    
    const query: Record<string, unknown> = {};
    
    // Фильтрация по категории
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Фильтрация по уровню
    if (level && level !== 'all') {
      query.level = level;
    }
    
    // Поиск по названию или описанию
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const courses = await Course.find(query)
      .populate('instructor', 'firstName lastName')
      .sort({ createdAt: -1 });
      
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Получение курса по ID
// @route   GET /api/courses/:id
// @access  Public
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'firstName lastName email')
      .populate('lessons');
      
    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }
    
    res.json(course);
  } catch (err) {
    console.error(err);
    
    if (err instanceof Error && err.name === 'CastError') {
      return res.status(400).json({ message: 'Неверный ID курса' });
    }
    
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Создание нового курса
// @route   POST /api/courses
// @access  Private/Teacher
export const createCourse = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }
    
    const { 
      title, 
      description, 
      image, 
      category, 
      level, 
      duration 
    } = req.body;
    
    const newCourse = new Course({
      title,
      description,
      image,
      category,
      level,
      duration,
      instructor: req.user.id,
      students: 0,
      rating: 0,
      lessons: []
    });
    
    const course = await newCourse.save();
    
    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Обновление курса
// @route   PUT /api/courses/:id
// @access  Private/Teacher
export const updateCourse = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }
    
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }
    
    // Проверка, является ли пользователь создателем курса или администратором
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }
    
    const { 
      title, 
      description, 
      image, 
      category, 
      level, 
      duration 
    } = req.body;
    
    course.title = title || course.title;
    course.description = description || course.description;
    course.image = image || course.image;
    course.category = category || course.category;
    course.level = level || course.level;
    course.duration = duration || course.duration;
    
    const updatedCourse = await course.save();
    
    res.json(updatedCourse);
  } catch (err) {
    console.error(err);
    
    if (err instanceof Error && err.name === 'CastError') {
      return res.status(400).json({ message: 'Неверный ID курса' });
    }
    
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Удаление курса
// @route   DELETE /api/courses/:id
// @access  Private/Teacher
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }
    
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }
    
    // Проверка, является ли пользователь создателем курса или администратором
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }
    
    // Удаляем все уроки курса
    await Lesson.deleteMany({ course: req.params.id });
    
    // Удаляем все записи на курс
    await Enrollment.deleteMany({ course: req.params.id });
    
    // Удаляем сам курс
    await course.deleteOne();
    
    res.json({ message: 'Курс успешно удален' });
  } catch (err) {
    console.error(err);
    
    if (err instanceof Error && err.name === 'CastError') {
      return res.status(400).json({ message: 'Неверный ID курса' });
    }
    
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Запись на курс
// @route   POST /api/courses/:id/enroll
// @access  Private
export const enrollCourse = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }
    
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }
    
    // Проверяем, не записан ли пользователь уже на этот курс
    const existingEnrollment = await Enrollment.findOne({
      user: req.user.id,
      course: req.params.id
    });
    
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Вы уже записаны на этот курс' });
    }
    
    // Создаем новую запись
    const enrollment = new Enrollment({
      user: req.user.id,
      course: req.params.id,
      progress: 0,
      completedLessons: [],
      status: 'active',
      enrolledAt: new Date()
    });
    
    await enrollment.save();
    
    // Увеличиваем количество студентов курса
    course.students += 1;
    await course.save();
    
    res.status(201).json(enrollment);
  } catch (err) {
    console.error(err);
    
    if (err instanceof Error && err.name === 'CastError') {
      return res.status(400).json({ message: 'Неверный ID курса' });
    }
    
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
