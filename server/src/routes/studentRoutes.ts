import express from 'express';
import { 
  getStudents, 
  getStudentById, 
  createStudent, 
  updateStudent, 
  deleteStudent,
  getStudentProfile
} from '../controllers/studentController';
import { auth, checkRole } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { studentValidation } from '../middleware/validationSchemas';

const router = express.Router();

// @route   GET /api/students
// @desc    Get all students
// @access  Private/Admin
router.get('/', auth, checkRole(['admin']), validate(studentValidation.getStudents), getStudents);

// @route   GET /api/students/profile
// @desc    Get current student's profile
// @access  Private
router.get('/profile', auth, getStudentProfile);

// @route   GET /api/students/:id
// @desc    Get student by ID
// @access  Private
router.get('/:id', auth, validate(studentValidation.getStudentById), getStudentById);

// @route   POST /api/students
// @desc    Create a new student
// @access  Private/Admin
router.post('/', auth, checkRole(['admin']), validate(studentValidation.createStudent), createStudent);

// @route   PUT /api/students/:id
// @desc    Update student
// @access  Private/Admin
router.put('/:id', auth, checkRole(['admin']), validate(studentValidation.updateStudent), updateStudent);

// @route   DELETE /api/students/:id
// @desc    Delete student
// @access  Private/Admin
router.delete('/:id', auth, checkRole(['admin']), validate(studentValidation.deleteStudent), deleteStudent);

export default router;
