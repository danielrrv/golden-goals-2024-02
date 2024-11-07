const { Router } = require('express');
const router = new Router();
const AuthController = require('../controllers/AuthController');
const { logController } = require('../middleware/logger');
const { body } = require('express-validator');
const verifyToken = require('../middleware/verifyToken');

router.post(
  '/register',
  logController,
  [
    body('username').isLength({ min: 3 }).trim().escape().withMessage('Username must be at least 3 characters long.'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  ],
  (req, res) => {
    AuthController.register(req, res);
  }
);

router.post(
  '/login',
  logController,
  [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address.'),
    body('password').exists().withMessage('Password is required.'),
  ],
  (req, res) => {
    AuthController.login(req, res);
  }
);

router.post('/logout', verifyToken, logController, (req, res) => {
  AuthController.logout(req, res);
});

module.exports = router;
