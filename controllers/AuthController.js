const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../utils/logger");
const redisClient = require("../utils/redisClient");

class AuthController {
  async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn("Registration failed due to validation errors.");
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        logger.warn(`Registration failed: User already exists (${email}).`);
        return res.status(400).json({ message: "User already exists." });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({
        username,
        email,
        password: hashedPassword
      });

      const savedUser = await user.save();

      logger.info(`User registered: ${savedUser.email}`);
      res.status(201).json({ userId: savedUser._id });
    } catch (err) {
      logger.error("Registration error:", err);
      res.status(500).json({ message: "An error occurred during registration." });
    }
  }

  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn("Login failed due to validation errors.");
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        logger.warn(`Login failed: User not found (${email}).`);
        return res.status(400).json({ message: "Invalid credentials." });
      }

      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) {
        logger.warn(`Login failed: Invalid password (${email}).`);
        return res.status(400).json({ message: "Invalid credentials." });
      }

      logger.debug(`User: ${JSON.stringify(user.toJSON())}`);

      const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      });

      logger.info(`User logged in: ${user.email}`);
      res.header("auth-token", token).json({ token });
    } catch (err) {
      logger.error("Login error:", err);
      res.status(500).json({ message: "An error occurred during login." });
    }
  }

  async logout(req, res) {
    try {
      const token = req.header("auth-token");

      const decoded = jwt.decode(token);
      const exp = decoded.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      const ttl = exp - currentTime;

      await redisClient.set(`blacklist_${token}`, "blacklisted", "EX", ttl);
      logger.debug(`User: ${JSON.stringify(req.user)}`);

      logger.info(`User logged out: ${req.user._id}`);
      res.status(200).json({ message: "Logged out successfully." });
    } catch (err) {
      logger.error("Logout error:", err);
      res.status(500).json({ message: "An error occurred during logout." });
    }
  }
}

module.exports = new AuthController();
