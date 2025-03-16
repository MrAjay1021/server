const express = require('express');
const { body } = require('express-validator');
const { auth } = require('../middleware/auth.middleware');
const { register, login, getProfile } = require('../controllers/auth.controller');

const router = express.Router();


const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('mobile').optional().isMobilePhone().withMessage('Please enter a valid mobile number'),
  body('role').optional().isIn(['user', 'recruiter']).withMessage('Invalid role')
];

const loginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];


router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', auth, getProfile);

module.exports = router; 