const Lesson = require("../models/Lesson");
const { validationResult } = require("express-validator");
const logger = require("../utils/logger");

class LessonController {
  async getAllLessons(req, res) {
    try {
      const lessons = await Lesson.find();
      logger.info(`Lessons retrieved by user ID: ${req.user._id}`);
      res.status(200).json(lessons);
    } catch (err) {
      logger.error("Error retrieving lessons:", err);
      res.status(500).json({ message: "An error occurred." });
    }
  }

  async getLessonById(req, res) {
    try {
      const lesson = await Lesson.findById(req.params.lessonId);
      if (!lesson) {
        logger.warn(`Lesson not found: ${req.params.lessonId}`);
        return res.status(404).json({ message: "Lesson not found." });
      }
      logger.info(`Lesson retrieved: ${lesson.title}`);
      res.status(200).json(lesson);
    } catch (err) {
      logger.error("Error retrieving lesson:", err);
      res.status(500).json({ message: "An error occurred." });
    }
  }

  async createLesson(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn("Lesson creation failed due to validation errors.");
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, content } = req.body;
      const lesson = new Lesson({
        title,
        content
      });
      const savedLesson = await lesson.save();
      logger.info(`Lesson created: ${savedLesson.title}`);
      res.status(201).json(savedLesson);
    } catch (err) {
      logger.error("Error creating lesson:", err);
      res.status(500).json({ message: "An error occurred." });
    }
  }

  async updateLesson(req, res) {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn("Lesson update failed due to validation errors.");
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updateData = req.body;
      updateData.updatedAt = Date.now();

      const updatedLesson = await Lesson.findByIdAndUpdate(req.params.lessonId, updateData, {
        new: true,
        runValidators: true
      });

      if (!updatedLesson) {
        logger.warn(`Lesson not found: ${req.params.lessonId}`);
        return res.status(404).json({ message: "Lesson not found." });
      }

      logger.info(`Lesson updated: ${updatedLesson.title}`);
      res.status(200).json(updatedLesson);
    } catch (err) {
      logger.error("Error updating lesson:", err);
      res.status(500).json({ message: "An error occurred." });
    }
  }

  async deleteLesson(req, res) {
    try {
      const deletedLesson = await Lesson.findByIdAndDelete(req.params.lessonId);

      if (!deletedLesson) {
        logger.warn(`Lesson not found: ${req.params.lessonId}`);
        return res.status(404).json({ message: "Lesson not found." });
      }

      logger.info(`Lesson deleted: ${deletedLesson.title}`);
      res.status(200).json({ message: "Lesson deleted successfully." });
    } catch (err) {
      logger.error("Error deleting lesson:", err);
      res.status(500).json({ message: "An error occurred." });
    }
  }
}

module.exports = new LessonController();
