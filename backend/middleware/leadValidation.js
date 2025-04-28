import { body, validationResult } from 'express-validator';
import { errorResponse } from '../utils/response.js';

export const leadValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone()
    .withMessage('Invalid phone number'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('loanType')
    .notEmpty()
    .withMessage('Loan type is required')
    .isIn
    (
      ['Personal Loan Consolidation', 
      'Credit Card Installment Consolidation', 
      'Paylater Loan Consolidation', 
      'Online Loan Consolidation'
      ]
    )
    .withMessage('Invalid loan type'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg).join('; ');
      return errorResponse(res, 400, errorMessages);
    }
    next();
  }
];