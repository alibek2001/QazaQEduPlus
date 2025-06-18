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
import { validate } from '../middleware/validation';
import { courseValidation } from '../middleware/validationSchemas';

const router = express.Router();

// @route   GET /api/courses
// @desc    Получение всех курсов
// @access  Public
router.get('/', validate(courseValidation.getCourses), getCourses);

// @route   GET /api/courses/:id
// @desc    Получение курса по ID
// @access  Public
router.get('/:id', validate(courseValidation.getCourseById), getCourseById);

// @route   POST /api/courses
// @desc    Создание нового курса
// @access  Private/Teacher
router.post('/', auth, checkRole(['teacher', 'admin']), validate(courseValidation.createCourse), createCourse);

// @route   PUT /api/courses/:id
// @desc    Обновление курса
// @access  Private/Teacher
router.put('/:id', auth, checkRole(['teacher', 'admin']), validate(courseValidation.updateCourse), updateCourse);

// @route   DELETE /api/courses/:id
// @desc    Удаление курса
// @access  Private/Teacher
router.delete('/:id', auth, checkRole(['teacher', 'admin']), validate(courseValidation.deleteCourse), deleteCourse);

// @route   POST /api/courses/:id/enroll
// @desc    Запись на курс
// @access  Private
router.post('/:id/enroll', auth, validate(courseValidation.enrollCourse), enrollCourse);

export default router;
