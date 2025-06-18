import { body, param, query } from 'express-validator';

/**
 * Validation schemas for auth endpoints
 */
export const authValidation = {
  register: [
    body('firstName')
      .notEmpty().withMessage('Имя обязательно')
      .isString().withMessage('Имя должно быть строкой')
      .isLength({ min: 2, max: 50 }).withMessage('Имя должно содержать от 2 до 50 символов'),
    
    body('lastName')
      .notEmpty().withMessage('Фамилия обязательна')
      .isString().withMessage('Фамилия должна быть строкой')
      .isLength({ min: 2, max: 50 }).withMessage('Фамилия должна содержать от 2 до 50 символов'),
    
    body('email')
      .notEmpty().withMessage('Email обязателен')
      .isEmail().withMessage('Введите корректный email')
      .normalizeEmail(),
    
    body('password')
      .notEmpty().withMessage('Пароль обязателен')
      .isLength({ min: 6 }).withMessage('Пароль должен содержать не менее 6 символов'),
    
    body('role')
      .optional()
      .isIn(['student', 'teacher', 'admin']).withMessage('Недопустимая роль')
  ],
  
  login: [
    body('email')
      .notEmpty().withMessage('Email обязателен')
      .isEmail().withMessage('Введите корректный email')
      .normalizeEmail(),
    
    body('password')
      .notEmpty().withMessage('Пароль обязателен')
  ]
};

/**
 * Validation schemas for student endpoints
 */
export const studentValidation = {
  createStudent: [
    body('firstName')
      .notEmpty().withMessage('Имя обязательно')
      .isString().withMessage('Имя должно быть строкой')
      .isLength({ min: 2, max: 50 }).withMessage('Имя должно содержать от 2 до 50 символов'),
    
    body('lastName')
      .notEmpty().withMessage('Фамилия обязательна')
      .isString().withMessage('Фамилия должна быть строкой')
      .isLength({ min: 2, max: 50 }).withMessage('Фамилия должна содержать от 2 до 50 символов'),
    
    body('email')
      .notEmpty().withMessage('Email обязателен')
      .isEmail().withMessage('Введите корректный email')
      .normalizeEmail(),
    
    body('phone')
      .notEmpty().withMessage('Номер телефона обязателен')
      .matches(/^\+?[0-9]{10,15}$/).withMessage('Введите корректный номер телефона'),
    
    body('dateOfBirth')
      .optional()
      .isISO8601().withMessage('Введите корректную дату рождения'),
    
    body('address')
      .optional()
      .isString().withMessage('Адрес должен быть строкой')
      .isLength({ max: 200 }).withMessage('Адрес не может быть длиннее 200 символов'),
    
    body('status')
      .optional()
      .isIn(['active', 'inactive', 'graduated']).withMessage('Недопустимый статус')
  ],
  
  updateStudent: [
    param('id')
      .isMongoId().withMessage('Неверный ID студента'),
    
    body('firstName')
      .optional()
      .isString().withMessage('Имя должно быть строкой')
      .isLength({ min: 2, max: 50 }).withMessage('Имя должно содержать от 2 до 50 символов'),
    
    body('lastName')
      .optional()
      .isString().withMessage('Фамилия должна быть строкой')
      .isLength({ min: 2, max: 50 }).withMessage('Фамилия должна содержать от 2 до 50 символов'),
    
    body('email')
      .optional()
      .isEmail().withMessage('Введите корректный email')
      .normalizeEmail(),
    
    body('phone')
      .optional()
      .matches(/^\+?[0-9]{10,15}$/).withMessage('Введите корректный номер телефона'),
    
    body('dateOfBirth')
      .optional()
      .isISO8601().withMessage('Введите корректную дату рождения'),
    
    body('address')
      .optional()
      .isString().withMessage('Адрес должен быть строкой')
      .isLength({ max: 200 }).withMessage('Адрес не может быть длиннее 200 символов'),
    
    body('status')
      .optional()
      .isIn(['active', 'inactive', 'graduated']).withMessage('Недопустимый статус'),
    
    body('graduationDate')
      .optional()
      .isISO8601().withMessage('Введите корректную дату выпуска')
  ],
  
  getStudentById: [
    param('id')
      .isMongoId().withMessage('Неверный ID студента')
  ],
  
  deleteStudent: [
    param('id')
      .isMongoId().withMessage('Неверный ID студента')
  ],
  
  getStudents: [
    query('status')
      .optional()
      .isIn(['active', 'inactive', 'graduated', 'all']).withMessage('Недопустимый статус'),
    
    query('search')
      .optional()
      .isString().withMessage('Поисковый запрос должен быть строкой')
  ]
};

/**
 * Validation schemas for course endpoints
 */
export const courseValidation = {
  createCourse: [
    body('title')
      .notEmpty().withMessage('Название курса обязательно')
      .isString().withMessage('Название должно быть строкой')
      .isLength({ min: 3, max: 100 }).withMessage('Название должно содержать от 3 до 100 символов'),
    
    body('description')
      .notEmpty().withMessage('Описание курса обязательно')
      .isString().withMessage('Описание должно быть строкой')
      .isLength({ min: 10, max: 2000 }).withMessage('Описание должно содержать от 10 до 2000 символов'),
    
    body('image')
      .optional()
      .isURL().withMessage('Введите корректный URL изображения'),
    
    body('category')
      .notEmpty().withMessage('Категория курса обязательна')
      .isString().withMessage('Категория должна быть строкой'),
    
    body('level')
      .notEmpty().withMessage('Уровень курса обязателен')
      .isIn(['beginner', 'intermediate', 'advanced']).withMessage('Недопустимый уровень курса'),
    
    body('duration')
      .notEmpty().withMessage('Продолжительность курса обязательна')
      .isInt({ min: 1 }).withMessage('Продолжительность должна быть положительным числом')
  ],
  
  updateCourse: [
    param('id')
      .isMongoId().withMessage('Неверный ID курса'),
    
    body('title')
      .optional()
      .isString().withMessage('Название должно быть строкой')
      .isLength({ min: 3, max: 100 }).withMessage('Название должно содержать от 3 до 100 символов'),
    
    body('description')
      .optional()
      .isString().withMessage('Описание должно быть строкой')
      .isLength({ min: 10, max: 2000 }).withMessage('Описание должно содержать от 10 до 2000 символов'),
    
    body('image')
      .optional()
      .isURL().withMessage('Введите корректный URL изображения'),
    
    body('category')
      .optional()
      .isString().withMessage('Категория должна быть строкой'),
    
    body('level')
      .optional()
      .isIn(['beginner', 'intermediate', 'advanced']).withMessage('Недопустимый уровень курса'),
    
    body('duration')
      .optional()
      .isInt({ min: 1 }).withMessage('Продолжительность должна быть положительным числом')
  ],
  
  getCourseById: [
    param('id')
      .isMongoId().withMessage('Неверный ID курса')
  ],
  
  deleteCourse: [
    param('id')
      .isMongoId().withMessage('Неверный ID курса')
  ],
  
  enrollCourse: [
    param('id')
      .isMongoId().withMessage('Неверный ID курса')
  ],
  
  getCourses: [
    query('category')
      .optional()
      .isString().withMessage('Категория должна быть строкой'),
    
    query('level')
      .optional()
      .isIn(['beginner', 'intermediate', 'advanced', 'all']).withMessage('Недопустимый уровень курса'),
    
    query('search')
      .optional()
      .isString().withMessage('Поисковый запрос должен быть строкой')
  ]
};
