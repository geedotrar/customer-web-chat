import { body, validationResult } from 'express-validator';
import { errorResponse } from '../utils/response.js';

export const registerValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('name')
    .notEmpty()
    .withMessage('Name is required'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[0-9]/)
    .withMessage('Password must contain a number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain a special character'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg).join('; ');
      return errorResponse(res, 400, errorMessages);
    }
    next();
  }
];

export const loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg).join('; ');
      return errorResponse(res, 400, errorMessages);
    }
    next();
  }
];