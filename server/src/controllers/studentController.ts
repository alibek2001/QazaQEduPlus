import { Request, Response } from 'express';
import { Student } from '../models/Student';
import User from '../models/User';
import mongoose from 'mongoose';

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Admin
export const getStudents = async (req: Request, res: Response) => {
  try {
    const { status, search } = req.query;
    
    const query: Record<string, unknown> = {};
    
    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Search by name or email
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const students = await Student.find(query)
      .populate('userId', 'email role')
      .sort({ createdAt: -1 });
      
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('userId', 'email role');
      
    if (!student) {
      return res.status(404).json({ message: 'Студент не найден' });
    }
    
    // Check if the user is authorized to view this student
    if (req.user && (req.user.role === 'admin' || student.userId.toString() === req.user.id)) {
      return res.json(student);
    }
    
    res.status(403).json({ message: 'Доступ запрещен' });
  } catch (err) {
    console.error('Error fetching student:', err);
    
    if (err instanceof Error && err.name === 'CastError') {
      return res.status(400).json({ message: 'Неверный ID студента' });
    }
    
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Create new student
// @route   POST /api/students
// @access  Private/Admin
export const createStudent = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }
    
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      dateOfBirth, 
      address, 
      status,
      password
    } = req.body;
    
    // Check if email already exists
    const existingStudent = await Student.findOne({ email });
    
    if (existingStudent) {
      return res.status(400).json({ message: 'Студент с таким email уже существует' });
    }
    
    // Create a user account for the student
    const user = new User({
      firstName,
      lastName,
      email,
      password: password || 'password123', // Default password if not provided
      role: 'student'
    });
    
    const savedUser = await user.save({ session });
    
    // Create the student profile
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      address,
      status: status || 'active',
      enrollmentDate: new Date(),
      userId: savedUser._id
    });
    
    const student = await newStudent.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
    res.status(201).json(student);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    
    console.error('Error creating student:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private/Admin
export const updateStudent = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }
    
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({ message: 'Студент не найден' });
    }
    
    // Only admin can update student profiles
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }
    
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      dateOfBirth, 
      address,
      status,
      graduationDate
    } = req.body;
    
    // Update fields
    student.firstName = firstName || student.firstName;
    student.lastName = lastName || student.lastName;
    student.email = email || student.email;
    student.phone = phone || student.phone;
    student.dateOfBirth = dateOfBirth || student.dateOfBirth;
    student.address = address || student.address;
    student.status = status || student.status;
    student.graduationDate = graduationDate || student.graduationDate;
    
    const updatedStudent = await student.save();
    
    // If email was updated, also update the user account
    if (email && email !== student.email) {
      await User.findByIdAndUpdate(student.userId, { email });
    }
    
    res.json(updatedStudent);
  } catch (err) {
    console.error('Error updating student:', err);
    
    if (err instanceof Error && err.name === 'CastError') {
      return res.status(400).json({ message: 'Неверный ID студента' });
    }
    
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Admin
export const deleteStudent = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }
    
    // Only admin can delete students
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }
    
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({ message: 'Студент не найден' });
    }
    
    // Delete the student profile
    await student.deleteOne({ session });
    
    // Delete the associated user account
    await User.findByIdAndDelete(student.userId, { session });
    
    await session.commitTransaction();
    session.endSession();
    
    res.json({ message: 'Студент успешно удален' });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    
    console.error('Error deleting student:', err);
    
    if (err instanceof Error && err.name === 'CastError') {
      return res.status(400).json({ message: 'Неверный ID студента' });
    }
    
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Get student profile (for student users)
// @route   GET /api/students/profile
// @access  Private
export const getStudentProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }
    
    const student = await Student.findOne({ userId: req.user.id });
    
    if (!student) {
      return res.status(404).json({ message: 'Профиль студента не найден' });
    }
    
    res.json(student);
  } catch (err) {
    console.error('Error fetching student profile:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
