const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const redisClient = require("../utils/redisClient");

async function verifyToken(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    logger.warn("Access denied. No token provided.");
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const value = await redisClient.get(`blacklist_${token}`);

    if (value) {
      logger.warn("Access denied. Token is blacklisted.");
      return res.status(401).json({ message: "Invalid token." });
    } else {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified; // Attach user info to request
      logger.info(`Token verified for user ID: ${req.user._id}`);
      next();
    }
  } catch (err) {
    logger.warn(`Invalid token. ${err}`);
    res.status(400).json({ message: "Invalid token." });
  }
}

module.exports = verifyToken;
