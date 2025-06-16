import express from 'express';
import { 
  getCourses, 
  getCourseById, 
  createCourse, 
  updateCourse, 
  deleteCourse,
  enrollCourse
} from '../controllers/courseController';
import { auth, checkRole } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/courses
// @desc    Получение всех курсов
// @access  Public
router.get('/', getCourses);

// @route   GET /api/courses/:id
// @desc    Получение курса по ID
// @access  Public
router.get('/:id', getCourseById);

// @route   POST /api/courses
// @desc    Создание нового курса
// @access  Private/Teacher
router.post('/', auth, checkRole(['teacher', 'admin']), createCourse);

// @route   PUT /api/courses/:id
// @desc    Обновление курса
// @access  Private/Teacher
router.put('/:id', auth, checkRole(['teacher', 'admin']), updateCourse);

// @route   DELETE /api/courses/:id
// @desc    Удаление курса
// @access  Private/Teacher
router.delete('/:id', auth, checkRole(['teacher', 'admin']), deleteCourse);

// @route   POST /api/courses/:id/enroll
// @desc    Запись на курс
// @access  Private
router.post('/:id/enroll', auth, enrollCourse);

export default router;
