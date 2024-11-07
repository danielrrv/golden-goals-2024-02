const { Router } = require("express");
const router = new Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const verifyToken = require("../middleware/verifyToken");
const { logController } = require("../middleware/logger");
const logger = require("../utils/logger");

router.get("/:userId", verifyToken, logController, async (req, res) => {
  try {
    if (req.user._id !== req.params.userId) {
      logger.warn(`Unauthorized profile access attempt by user ID: ${req.user._id}`);
      return res.status(403).json({ message: "Access denied." });
    }

    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      logger.warn(`User not found: ${req.params.userId}`);
      return res.status(404).json({ message: "User not found." });
    }

    logger.info(`User profile retrieved: ${user.email}`);
    res.status(200).json(user);
  } catch (err) {
    logger.error("Error retrieving user profile:", err);
    res.status(500).json({ message: "An error occurred." });
  }
});

router.put("/:userId", verifyToken, logController, async (req, res) => {
  try {
    if (req.user._id !== req.params.userId) {
      logger.warn(`Unauthorized profile update attempt by user ID: ${req.user._id}`);
      return res.status(403).json({ message: "Access denied." });
    }

    const { username, email, password } = req.body;
    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, updateData, {
      new: true,
      runValidators: true
    }).select("-password");

    if (!updatedUser) {
      logger.warn(`User not found: ${req.params.userId}`);
      return res.status(404).json({ message: "User not found." });
    }

    logger.info(`User profile updated: ${updatedUser.email}`);
    res.status(200).json(updatedUser);
  } catch (err) {
    logger.error("Error updating user profile:", err);
    res.status(500).json({ message: "An error occurred." });
  }
});

router.delete("/:userId", verifyToken, logController, async (req, res) => {
  try {
    if (req.user._id !== req.params.userId) {
      logger.warn(`Unauthorized account deletion attempt by user ID: ${req.user._id}`);
      return res.status(403).json({ message: "Access denied." });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.userId);

    if (!deletedUser) {
      logger.warn(`User not found: ${req.params.userId}`);
      return res.status(404).json({ message: "User not found." });
    }

    logger.info(`User account deleted: ${deletedUser.email}`);
    res.status(200).json({ message: "User account deleted successfully." });
  } catch (err) {
    logger.error("Error deleting user account:", err);
    res.status(500).json({ message: "An error occurred." });
  }
});

module.exports = router;
