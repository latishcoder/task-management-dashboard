import { body, param, validationResult } from 'express-validator';
import { errorResponse } from '../utils/apiResponse.js';

export const createTaskValidation = [
  body('title')
    .notEmpty()
    .withMessage('Task title is required'),

  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Invalid task status'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, 'Validation error', errors.array());
    }
    next();
  },
];

export const updateTaskValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid task ID'),

  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Invalid task status'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, 'Validation error', errors.array());
    }
    next();
  },
];
