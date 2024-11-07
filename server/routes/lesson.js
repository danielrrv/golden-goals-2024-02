const { Router } = require('express');
const router = new Router();
const LessonController = require('../controllers/LessonController');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');
const { logController } = require('../middleware/logger');
const { body } = require('express-validator');

router.get('/', verifyToken, logController, (req, res) => {
  LessonController.getAllLessons(req, res);
});

router.get('/:lessonId', verifyToken, logController, (req, res) => {
  LessonController.getLessonById(req, res);
});

// (Admin Only)
router.post(
  '/',
  verifyToken,
  isAdmin,
  logController,
  [
    body('title').notEmpty().withMessage('Title is required.'),
    body('content').notEmpty().withMessage('Content is required.'),
  ],
  (req, res) => {
    LessonController.createLesson(req, res);
  }
);

// (Admin Only)
router.put(
  '/:lessonId',
  verifyToken,
  isAdmin,
  logController,
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty.'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty.'),
  ],
  (req, res) => {
    LessonController.updateLesson(req, res);
  }
);

// (Admin Only)
router.delete('/:lessonId', verifyToken, isAdmin, logController, (req, res) => {
  LessonController.deleteLesson(req, res);
});

module.exports = router;
