import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

/**
 * Middleware to handle validation errors
 * @returns Middleware function that checks for validation errors
 */
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));
    
    // Check for validation errors
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      return next();
    }
    
    // Log validation errors
    console.error('Validation errors:', JSON.stringify(errors.array()));
    
    // Return validation errors
    return res.status(400).json({
      success: false,
      message: 'Ошибка валидации',
      errors: errors.array()
    });
  };
};

/**
 * Sanitize request body to prevent MongoDB injection
 * @param req Request object
 * @param res Response object
 * @param next Next function
 */
export const sanitizeMongoQuery = (req: Request, res: Response, next: NextFunction) => {
  // List of potentially dangerous keys in MongoDB queries
  const dangerousKeys = ['$where', '$ne', '$gt', '$lt', '$gte', '$lte', '$in', '$nin', '$or', '$and', '$not', '$nor'];
  
  // Function to recursively check and sanitize objects
  const sanitizeObject = <T>(obj: T): T => {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }
    
    // Handle arrays
    if (Array.isArray(obj)) {
      return obj.map(item => sanitizeObject(item)) as unknown as T;
    }
    
    // Handle objects
    const sanitized: Record<string, unknown> = {};
    
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      // Check if key is potentially dangerous
      if (dangerousKeys.some(dangerous => key.includes(dangerous)) && req.path !== '/api/courses') {
        // Skip this key-value pair for non-course queries
        console.warn(`Potentially dangerous query parameter detected and sanitized: ${key}`);
        continue;
      }
      
      // Recursively sanitize nested objects
      sanitized[key] = sanitizeObject(value);
    }
    
    return sanitized as unknown as T;
  };
  
  // Sanitize query parameters, body, and params
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }
  
  next();
};

/**
 * Error handling middleware
 * @param err Error object
 * @param req Request object
 * @param res Response object
 * @param next Next function
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err);
  
  // Check if headers have already been sent
  if (res.headersSent) {
    return next(err);
  }
  
  // Send error response
  res.status(500).json({
    success: false,
    message: 'Ошибка сервера',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
};

/**
 * Not found middleware
 * @param req Request object
 * @param res Response object
 */
export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Маршрут ${req.originalUrl} не найден`
  });
};
